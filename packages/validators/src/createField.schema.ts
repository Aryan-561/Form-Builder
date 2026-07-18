import z from "zod"

const OPTION_BASED_TYPES = ["select", "checkbox"] as const;

export const fieldTypeSchema = z.enum([
  "text",
  "textarea",
  "email",
  "number",
  "select",
  "checkbox",
  "rating",
  "date",
]);

export const fieldOptionSchema = z
  .string()
  .trim()
  .min(1, "Options cannot be empty.")
  .max(80, "Options must be 80 characters or fewer.");


export const createFieldSchema = z.object({
    label: z.string().trim().min(1, "Field label is required.").max(180),
    type: fieldTypeSchema,
    placeholder: z.string().trim().max(240).optional().nullable(),
    required: z.boolean().default(false),
    options: z.array(fieldOptionSchema).max(20, "A field can have at most 20 options.").optional(),
    
}).refine(
    (data) =>
      !OPTION_BASED_TYPES.includes(data.type as any) ||
      (Array.isArray(data.options) && data.options.length > 0),
    {
      message: "At least one option is required for select/checkbox fields",
      path: ["options"],
    }
  )
  .refine(
    (data) =>
      OPTION_BASED_TYPES.includes(data.type as any) ||
      data.options === undefined ||
      data.options.length === 0,
    {
      message: "Options should only be provided for select/checkbox fields",
      path: ["options"],
    }
  );

  export type FieldType = z.infer<typeof fieldTypeSchema>;
export type CreateFieldInput = z.infer<typeof createFieldSchema>;