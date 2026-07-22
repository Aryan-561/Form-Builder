import z from "zod";
import { createFormSubmissionSchema, formSubmissionValue } from "@repo/validators/src";

export { createFormSubmissionSchema as createSubmissionInputModel };

// --- Shared sub-schemas ---
const submissionValueOutputModel = z.object({
  formFieldId: z.string().describe("ID of the form field"),
  value: z.string().describe("Submitted value for the field"),
});

// --- createSubmission output ---
export const createSubmissionOutputModel = z.object({
  id: z.string().describe("ID of the created submission"),
  formId: z.string().describe("ID of the parent form"),
  email: z.string().nullable().describe("Submitter email address"),
  values: z.array(submissionValueOutputModel).describe("Submitted field values"),
  createdAt: z.date().describe("Submission timestamp"),
});

// --- getSubmissionsByForm input / output ---
export const formIdInputModel = z.object({
  formId: z.uuid().describe("ID of the form"),
});

export const getSubmissionsByFormOutputModel = z.array(
  z.object({
    id: z.string().describe("ID of the submission"),
    formId: z.string().describe("ID of the parent form"),
    email: z.string().nullable().describe("Submitter email address"),
    values: z.array(submissionValueOutputModel).describe("Submitted field values"),
    createdAt: z.date().describe("Submission timestamp"),
  }),
);

// --- getSubmissionById input / output ---
export const submissionIdInputModel = z.object({
  submissionId: z.uuid().describe("ID of the submission"),
});

export const getSubmissionByIdOutputModel = z.object({
  id: z.string().describe("ID of the submission"),
  formId: z.string().describe("ID of the parent form"),
  email: z.string().nullable().describe("Submitter email address"),
  values: z.array(submissionValueOutputModel).describe("Submitted field values"),
  createdAt: z.date().describe("Submission timestamp"),
});

// --- deleteSubmission output ---
export const deleteSubmissionOutputModel = z.object({
  success: z.boolean().describe("Whether the submission was deleted successfully"),
});
