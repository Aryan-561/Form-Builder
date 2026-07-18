import z, { success } from "zod"

export const statusTypeSchema = z.enum(["draft", "publish", "private", "unpublish"])

export const slugSchema = z
  .string()
  .trim()
  .min(3, "Slug must be at least 3 characters.")
  .max(180, "Slug must be 180 characters or fewer.")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only.");

export const createFormSchema  = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters.").max(160),
    description:  z.string().trim().max(2000).optional().nullable(),
    slug: slugSchema,
    status: statusTypeSchema,
    accessCode: z.string().trim().min(8,"Code will min 8 character").max(18).optional().nullable()
}).refine(
    (data) => data.status !== "private" || !!data.accessCode?.trim(),
    {
      message: "Access code is required when status is 'private'",
      path: ["accessCode"],
    }
  );


export type CreateFormInput = z.infer<typeof createFormSchema>;
