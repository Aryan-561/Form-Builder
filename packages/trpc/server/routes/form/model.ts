import z from "zod";
import {
  createFormBaseSchema as createFormInputModel,
  updateStatusTypeSchema,
} from "@repo/validators/src";
import { updateFormBaseSchema as updateFormInputModel } from "@repo/validators/src";

export { createFormInputModel };
export { updateFormInputModel };

export const formIdInputModel = z.object({
  formId: z.uuid().describe("ID of the form"),
});

// --- createForm ---
export const createFormOutputModel = z.object({
  id: z.string().describe("id of the created form"),
  title: z.string().describe("title of the form"),
  slug: z.string().describe("slug of the form"),
  status: z.enum(["draft", "publish", "private", "unpublish"]).describe("status of the form"),
  createdAt: z.date().describe("creation timestamp"),
});

// --- getUserForms ---
export const getUserFormsOutputModel = z.array(
  z.object({
    id: z.string().describe("id of the form"),
    title: z.string().describe("title of the form"),
    description: z.string().nullable().describe("description of the form"),
    slug: z.string().describe("slug of the form"),
    status: z.enum(["draft", "publish", "private", "unpublish"]).describe("status of the form"),
    createdAt: z.date().describe("creation timestamp"),
    updatedAt: z.date().describe("last updated timestamp"),
  }),
);

// --- getUserFormById ---
const formFieldOutputModel = z.object({
  id: z.string().describe("id of the field"),
  formId: z.string().describe("id of the parent form"),
  label: z.string().describe("label of the field"),
  type: z
    .enum(["text", "textarea", "email", "number", "select", "checkbox", "rating", "date"])
    .describe("type of the field"),
  placeholder: z.string().nullable().describe("placeholder text"),
  required: z.boolean().describe("whether the field is required"),
  options: z.array(z.string()).nullable().describe("options for select/checkbox fields"),
  index: z.number().describe("display order of the field"),
  createdAt: z.date().describe("creation timestamp"),
  updatedAt: z.date().describe("last updated timestamp"),
});

export const getUserFormByIdOutputModel = z.object({
  id: z.string().describe("id of the form"),
  title: z.string().describe("title of the form"),
  description: z.string().nullable().describe("description of the form"),
  slug: z.string().describe("slug of the form"),
  status: z.enum(["draft", "publish", "private", "unpublish"]).describe("status of the form"),
  accessCode: z.string().nullable().describe("access code for private forms"),
  createdBy: z.string().describe("id of the user who created the form"),
  createdAt: z.date().describe("creation timestamp"),
  updatedAt: z.date().describe("last updated timestamp"),
  fields: z.array(formFieldOutputModel).describe("fields of the form"),
});

// --- updateForm ---
export const updateFormOutputModel = getUserFormByIdOutputModel.omit({ fields: true });

// --- deleteForm ---
export const deleteFormOutputModel = z.object({
  success: z.boolean().describe("whether the form was deleted successfully"),
});

// Plain z.object — no .refine() here because trpc-to-openapi calls .omit()
// internally when generating the OpenAPI spec and crashes on ZodEffects.
// Cross-field validation (accessCode required when private) is enforced in the route handler.
export const updateStatusInputModel = z.object({
  status: updateStatusTypeSchema,
  formId: z.uuid(),
  accessCode: z.string().trim().min(6, "Code will min 6 character").max(18).optional().nullable(),
});

export const updateStatusOutputModel = z.object({
  id: z.string(),
  status: z.enum(["draft", "publish", "private", "unpublish"]),
  accessCode: z.string().nullable(),
  updatedAt: z.date(),
});
