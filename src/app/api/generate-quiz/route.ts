import { questionSchema, questionsSchema } from "@/lib/schemas";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const files = await req.body
  console.log("files", files, "...................")

  // return new Response(
  //   JSON.stringify({ message: "GET request works!" }),
  //   { status: 200, headers: { "Content-Type": "application/json" } }
  // );
  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are a teacher. Your job is to take a document, and create a multiple choice test (with 10 questions) based on the content of the document also the language. Each option should be roughly equal in length.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test based on this document.",
          },
          {
            type: "file",
            data: files,
            mimeType: "application/pdf",
          },
        ],
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
