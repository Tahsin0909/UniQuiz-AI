import { questionSchema, questionsSchema } from "@/lib/schemas";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamObject } from "ai";
import { fetchTranscript, listLanguages, toPlainText } from "youtube-transcript-plus";

export const maxDuration = 60;

/**
 * Robust YouTube video identifier extractor.
 * Handles:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - Raw 11-character video IDs
 */
function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match =
    trimmed.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/i
    ) || trimmed.match(/v=([a-zA-Z0-9_-]{11})/i);

  return match ? match[1] : null;
}

/**
 * Fetch video metadata via YouTube oEmbed and public page meta tags
 * Used as a fallback when closed captions are disabled on the video.
 */
async function getVideoMetadata(videoId: string) {
  try {
    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { cache: "no-store" }
    );
    const oembed = oembedRes.ok ? await oembedRes.json() : null;

    let desc = "";
    try {
      const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
        cache: "no-store",
      });
      const html = await pageRes.text();
      const descMatch =
        html.match(/<meta name="description" content="([^"]*)">/i) ||
        html.match(/"shortDescription":"(.*?)"/);
      desc = descMatch
        ? descMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
        : "";
    } catch {
      // ignore
    }

    return {
      title: oembed?.title || "YouTube Video",
      author: oembed?.author_name || "YouTube Creator",
      description: desc,
    };
  } catch {
    return null;
  }
}

/**
 * Retrieve transcript or fallback to video topic metadata
 */
async function getYouTubeContent(videoId: string): Promise<{
  content: string;
  isFallback: boolean;
  title?: string;
}> {
  // Strategy 1: Fetch genuine closed captions via youtube-transcript-plus
  try {
    const langs = await listLanguages(videoId);
    if (langs && langs.length > 0) {
      const en = langs.find(
        (l) => l.languageCode === "en" || l.languageCode?.startsWith("en")
      );
      const chosenLang = en ? en.languageCode : langs[0].languageCode;
      const transcript = await fetchTranscript(videoId, { lang: chosenLang });
      const plainText = toPlainText(transcript);
      if (plainText && plainText.trim().length > 30) {
        return {
          content: plainText.trim(),
          isFallback: false,
        };
      }
    }
  } catch (err) {
    console.warn(
      `[generate-link-quiz] Direct captions not available for ${videoId}:`,
      err instanceof Error ? err.message : err
    );
  }

  // Strategy 2: Fallback to video title, description & syllabus context
  const meta = await getVideoMetadata(videoId);
  if (meta && (meta.title || meta.description)) {
    const fallbackText = `Video Title: ${meta.title}\nCreator: ${meta.author}\nVideo Details & Overview:\n${meta.description}`;
    return {
      content: fallbackText,
      isFallback: true,
      title: meta.title,
    };
  }

  throw new Error(
    "No transcript or public details found for this video. Please ensure the video is public and accessible."
  );
}

export async function POST(req: Request) {
  try {
    const apiKey =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "Google Generative AI API key is missing. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { videoUrl } = await req.json();
    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: "Please provide a YouTube video URL." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const videoId = extractYoutubeVideoId(videoUrl);
    if (!videoId) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid YouTube URL. Please enter a valid YouTube video link (e.g., https://www.youtube.com/watch?v=... or https://youtu.be/...)",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let videoData: { content: string; isFallback: boolean; title?: string };
    try {
      videoData = await getYouTubeContent(videoId);
    } catch (fetchErr) {
      console.error("[generate-link-quiz] Content fetch error:", fetchErr);
      return new Response(
        JSON.stringify({
          error:
            fetchErr instanceof Error
              ? fetchErr.message
              : "Could not retrieve transcript or details for this video.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });
    // Cap content length safely
    const contextContent = videoData.content.slice(0, 35000);

    const userPrompt = videoData.isFallback
      ? `Note: Closed captions were unavailable for this video. Generate 10 multiple-choice questions based on the video title, topic, and description:\n\n${contextContent}`
      : `Create 10 comprehensive multiple-choice questions directly from this video transcript:\n\n${contextContent}`;

    const result = streamObject({
      model: google("gemini-2.5-flash"),
      instructions:
        "You are a university professor. Generate 10 multiple-choice questions. Each question must include 'question' (string), 'options' (array of 4 distinct strings: A, B, C, D choices), 'answer' (exact match with one option), and 'hint' (a helpful explanation/concept clue).",
      prompt: userPrompt,
      schema: questionSchema,
      output: "array",
      onFinish: ({ object }) => {
        const res = questionsSchema.safeParse(object);
        if (res.error) {
          throw new Error(res.error.issues.map((e) => e.message).join("\n"));
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[generate-link-quiz] Unhandled error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while generating the quiz.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: "UniQuiz-AI YouTube Quiz Service is operational." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
