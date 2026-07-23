import z from "zod";

export const generateFormInputModel = z.object({
  prompt: z
    .string()
    .trim()
    .min(3, "Prompt must be at least 3 characters.")
    .max(1000, "Prompt must be 1000 characters or fewer."),
});

export const generateFormOutputModel = z.object({
  id: z.string().describe("ID of the generated form"),
  title: z.string().describe("Title of the generated form"),
  slug: z.string().describe("Slug of the generated form"),
  status: z
    .enum(["draft", "publish", "private", "unpublish"])
    .describe("Status of the generated form"),
  createdAt: z.date().describe("Creation timestamp"),
});
