import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths."
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on."
    ),
  difficulty: z
    .enum(["easy", "medium", "hard"])
    .describe("The difficulty level of the question."),
  sourceText: z
    .string()
    .describe("The text from which the question was derived."),
  hint: z.string().describe("A hint to help the user answer."), // making hint required
});

export type Question = z.infer<typeof questionSchema>;

export const questionsSchema = z.array(questionSchema).length(4);
