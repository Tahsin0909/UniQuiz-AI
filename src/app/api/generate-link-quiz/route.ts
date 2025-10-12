import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";


export const maxDuration = 60;

export async function POST(req: Request) {
    const { videoUrl } = await req.json();
    console.log("Video URL:", videoUrl);

    // 1. Extract video ID from the URL
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    if (!videoId) {
        return new Response(
            JSON.stringify({ error: "Invalid YouTube URL" }),
            { status: 400 }
        );
    }

    // 2. Get transcript from an API (you can use any transcript API or library)
    // Example: use 'https://youtubetranscriptapi.vercel.app/api/transcript/<videoId>'
    const transcriptRes = await fetch(`https://youtubetranscriptapi.vercel.app/api/transcript/${videoId}`);
    const transcriptData = await transcriptRes.json();

    if (!transcriptData || !Array.isArray(transcriptData)) {
        return new Response(
            JSON.stringify({ error: "Transcript not found for this video" }),
            { status: 404 }
        );
    }

    // Join all text
    const transcriptText = transcriptData.map(item => item.text).join(" ");

    // 3. Send transcript to AI
    const result = streamObject({
        model: google("gemini-2.5-flash"),
        messages: [
            {
                role: "system",
                content:
                    "You are a teacher. Your job is to create a multiple-choice quiz (10 questions) based on the transcript text. Make sure each question and option is based on the actual content and language of the transcript.",
            },
            {
                role: "user",
                content: transcriptText,
            },
        ],
        schema: questionSchema,
        output: "array",
        onFinish: ({ object }) => {
            const res = questionsSchema.safeParse(object);
            if (res.error) {
                throw new Error(res.error.errors.map((e) => e.message).join("\n"));
            }
        },
    });

    return result.toTextStreamResponse();
}

export async function GET() {
    return new Response(
        JSON.stringify({ message: "GET request works!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
