import { questionSchema, questionsSchema } from "@/lib/schemas";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

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

    const { files } = await req.json();
    if (!files || !files[0]?.data) {
      return new Response(
        JSON.stringify({ error: "No PDF file data provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const rawFile = files[0].data;
    const base64Data = rawFile.includes(",") ? rawFile.split(",")[1] : rawFile;

    const google = createGoogleGenerativeAI({ apiKey });

    const result = streamObject({
      model: google("gemini-2.5-flash"),
      instructions:
        "You are a teacher. Your job is to take a document, and create a multiple choice test (with 10 questions) based on the content of the document also the language. Each option should be roughly equal in length.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Create a multiple choice test based on this document.",
            },
            {
              type: "file",
              data: base64Data,
              mediaType: "application/pdf",
            },
          ],
        },
      ],
      schema: questionSchema,
      output: "array",
      onFinish: ({ object }) => {
        const res = questionsSchema.safeParse(object);
        if (res.error) {
          console.warn("Quiz validation notice:", res.error.issues);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in generate-quiz route:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate quiz",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: "GET request works!" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
