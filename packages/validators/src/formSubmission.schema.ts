import z from "zod";

export const formSubmissionValue = z.object({
  formFieldId: z.uuid(),
  value: z.string(),
});

export const createFormSubmissionSchema = z.object({
  formId: z.uuid(),
  email: z.string().email().optional(),
  values: z.array(formSubmissionValue).min(1, "At least one field value is required"),
});

export type CreateFormSubmissionInput = z.infer<typeof createFormSubmissionSchema>;
