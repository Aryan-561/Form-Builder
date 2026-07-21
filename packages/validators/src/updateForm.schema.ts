import z from "zod";
import { slugSchema, statusTypeSchema } from "./createForm.schema.js";
import { createFieldBaseSchema, createFieldSchema } from "./createField.schema.js";

export const updateFormBaseSchema = z.object({
  id: z.uuid(),
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(160),
  description: z.string().trim().max(2000).optional().nullable(),
  slug: slugSchema,
  status: statusTypeSchema,
  fields: z.array(createFieldBaseSchema).max(50, "A form can have at most 50 fields.").default([]),
  accessCode: z.string().trim().min(8, "Code will min 8 character").max(18).optional().nullable(),
});

export const updateFormSchema = z
  .object({
    id: z.uuid(),
    title: z.string().trim().min(3, "Title must be at least 3 characters.").max(160),
    description: z.string().trim().max(2000).optional().nullable(),
    slug: slugSchema,
    status: statusTypeSchema,
    fields: z.array(createFieldSchema).max(50, "A form can have at most 50 fields.").default([]),
    accessCode: z.string().trim().min(8, "Code will min 8 character").max(18).optional().nullable(),
  })
  .refine((data) => data.status !== "private" || !!data.accessCode?.trim(), {
    message: "Access code is required when status is 'private'",
    path: ["accessCode"],
  });

export type UpdateFormInput = z.infer<typeof updateFormSchema>;
