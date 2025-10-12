import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { YoutubeTranscript } from '@danielxceron/youtube-transcript';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { videoUrl } = await req.json();
        if (!videoUrl) {
            return new Response(JSON.stringify({ error: "No video URL provided" }), {
                status: 400,
            });
        }

        // extract videoId
        const videoId = videoUrl.split("v=")[1]?.split("&")[0];
        if (!videoId) {
            return new Response(JSON.stringify({ error: "Invalid YouTube URL" }), {
                status: 400,
            });
        }

        // get transcript using youtube-transcript
        let transcriptData;
        try {
            transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
            console.log(transcriptData)
        } catch (err) {
            console.error("Transcript error:", err);
            return new Response(
                JSON.stringify({ error: "Transcript not available for this video" }),
                { status: 404 }
            );
        }

        const transcriptText = transcriptData.map((i) => i.text).join(" ");

        // generate quiz
        const result = streamObject({
            model: google("gemini-2.5-flash"),
            messages: [
                {
                    role: "system",
                    content:
                        "You are a teacher. Create 4 multiple-choice questions from the given video transcript. Each question must have 4 options (A, B, C, D) and a hint.",
                },
                { role: "user", content: transcriptText },
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
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}

export async function GET() {
    return new Response(
        JSON.stringify({ message: "GET request working fine!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
