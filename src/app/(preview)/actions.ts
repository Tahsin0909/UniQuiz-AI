"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const generateQuizTitle = async (file: string) => {
  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return file.replace(/\.pdf$/i, "").slice(0, 30) || "Quiz";
  }

  try {
    const google = createGoogleGenerativeAI({ apiKey });
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        title: z
          .string()
          .describe(
            "A max three word title for the quiz based on the file provided as context",
          ),
      }),
      prompt:
        "Generate a title for a quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n " +
        file,
    });
    return result.object.title;
  } catch (error) {
    console.error("Failed to generate AI quiz title:", error);
    return file.replace(/\.pdf$/i, "").slice(0, 30) || "Quiz";
  }
};

export const getYoutubeVideoTitle = async (url: string): Promise<string> => {
  try {
    const trimmed = url.trim();
    let videoId = trimmed;
    if (!/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      const match =
        trimmed.match(
          /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/i
        ) || trimmed.match(/v=([a-zA-Z0-9_-]{11})/i);
      if (match) videoId = match[1];
    }

    const oembedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { cache: "no-store" }
    );
    if (oembedRes.ok) {
      const data = await oembedRes.json();
      if (data?.title) return data.title;
    }
  } catch {
    // fallback
  }
  return "YouTube Video Quiz";
};

