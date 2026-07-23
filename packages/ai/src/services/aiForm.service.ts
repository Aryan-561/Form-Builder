import { z } from "zod";
import { ai } from "../client";
import { FORM_BUILDER_SYSTEM_PROMPT } from "../prompts/form-builder.system";

const generatedFieldSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(180),
  type: z.enum(["text", "textarea", "email", "number", "select", "checkbox", "rating", "date"]),
  placeholder: z.string().trim().max(240).optional().nullable(),
  required: z.boolean().default(false),
  options: z.array(z.string().trim().min(1)).optional().nullable(),
});

export const generatedFormSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().max(2000).optional().nullable(),
  fields: z.array(generatedFieldSchema).min(1, "Form must contain at least one field"),
});

export type GeneratedFormOutput = z.infer<typeof generatedFormSchema>;

export class AiFormService {
  async generateFormFromPrompt(prompt: string): Promise<GeneratedFormOutput> {
    if (!prompt.trim()) {
      throw new Error("Prompt cannot be empty.");
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const fullPrompt = `${FORM_BUILDER_SYSTEM_PROMPT}\n\nUser Request: ${prompt}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });

      const text = response.text;
      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      // Clean markdown formatting if present
      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const json = JSON.parse(cleanedText);
      const parsed = generatedFormSchema.parse(json);

      // Normalize fields (assign index, sanitize options)
      const normalizedFields = parsed.fields.map((field, idx) => ({
        ...field,
        index: idx,
        options:
          field.type === "select" || field.type === "checkbox"
            ? field.options && field.options.length > 0
              ? field.options
              : ["Option 1", "Option 2"]
            : undefined,
      }));

      return {
        title: parsed.title.slice(0, 55),
        description: parsed.description ? parsed.description.slice(0, 150) : "",
        fields: normalizedFields,
      };
    } catch (error) {
      console.error("AiFormService error:", error);
      if (error instanceof z.ZodError) {
        throw new Error(
          `Failed to parse AI output: ${error.issues.map((i) => i.message).join(", ")}`,
        );
      }
      throw new Error(
        `AI Form Generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

export const aiFormService = new AiFormService();
