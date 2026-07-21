import z from "zod";

export const updateStatusTypeSchema = z.enum(["publish", "private", "unpublish"]);

export const updateStatusSchema = z
  .object({
    status: updateStatusTypeSchema,
    formId: z.uuid(),
    userId: z.uuid(),
    accessCode: z.string().trim().min(6, "Code will min 6 character").max(18).optional().nullable(),
  })
  .refine((data) => data.status !== "private" || !!data.accessCode?.trim(), {
    message: "Access code is required when status is 'private'",
    path: ["accessCode"],
  });

export type UpdateStatusSchema = z.infer<typeof updateStatusSchema>;
