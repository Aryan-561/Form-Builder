// ============================================================
// PUBLIC FORM HOOKS — MOCK / STUB IMPLEMENTATION
// Backend dev: replace these with real trpc calls when ready.
//
// Swap pattern:
//   useGetPublicForm   → trpc.form.getPublicForm.useQuery({ formId })
//   useVerifyCode      → trpc.form.verifyFormAccessCode.useMutation()
//   useSubmitResponse  → trpc.form.submitFormResponse.useMutation()
// ============================================================

import { useMutation, useQuery } from "@tanstack/react-query";

// --- Types (mirror what the real API will return) ---

export type FormStatus = "draft" | "publish" | "private" | "unpublish";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "rating";

export interface PublicFormField {
  id: string;
  index: number;
  type: FieldType;
  label: string;
  placeholder: string | null;
  required: boolean;
  options: string[] | null;
}

export interface PublicForm {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  status: FormStatus;
  isPrivate: boolean; // true when status === "private" — accessCode value never sent to client
  fields: PublicFormField[];
}

export interface FormResponsePayload {
  formId: string;
  responses: Record<string, string | string[]>;
}

// --- Mock Data ---

const MOCK_FORM: PublicForm = {
  id: "mock-form-id-001",
  title: "Event Registration Form",
  description: "Register for our upcoming tech conference. All fields marked * are required.",
  slug: "event-registration-demo",
  status: "publish",
  isPrivate: false,
  fields: [
    {
      id: "f1",
      index: 0,
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      options: null,
    },
    {
      id: "f2",
      index: 1,
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      required: true,
      options: null,
    },
    {
      id: "f3",
      index: 2,
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      required: false,
      options: null,
    },
    {
      id: "f4",
      index: 3,
      type: "textarea",
      label: "Tell us about yourself",
      placeholder: "Brief introduction...",
      required: false,
      options: null,
    },
    {
      id: "f5",
      index: 4,
      type: "select",
      label: "Which track interests you?",
      placeholder: "Select a track",
      required: true,
      options: [
        "Frontend Development",
        "Backend Development",
        "DevOps & Cloud",
        "AI & ML",
        "Product Design",
      ],
    },
    {
      id: "f6",
      index: 5,
      type: "checkbox",
      label: "Which topics would you like to see covered?",
      placeholder: null,
      required: false,
      options: ["React & Next.js", "TypeScript", "System Design", "Database Optimization"],
    },
    {
      id: "f7",
      index: 6,
      type: "radio",
      label: "How did you hear about us?",
      placeholder: null,
      required: true,
      options: ["Social Media", "Friend / Colleague", "Newsletter", "Search Engine", "Other"],
    },
    {
      id: "f8",
      index: 7,
      type: "date",
      label: "Preferred session date",
      placeholder: null,
      required: false,
      options: null,
    },
    {
      id: "f9",
      index: 8,
      type: "rating",
      label: "How excited are you for this event?",
      placeholder: null,
      required: false,
      options: null,
    },
  ],
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Hook: fetch public form by id ---
export function useGetPublicForm(formId: string) {
  return useQuery({
    queryKey: ["public-form", formId],
    queryFn: async (): Promise<PublicForm> => {
      await delay(900); // simulate network
      // TODO: replace with → trpc.form.getPublicForm.useQuery({ formId })
      // Uncomment below to test different statuses:
      // return { ...MOCK_FORM, status: "draft" };
      // return { ...MOCK_FORM, status: "private", isPrivate: true };
      return MOCK_FORM;
    },
    enabled: !!formId,
    retry: 1,
  });
}

// --- Hook: verify access code for private forms ---
export function useVerifyAccessCode() {
  return useMutation({
    mutationFn: async ({
      formId,
      code,
    }: {
      formId: string;
      code: string;
    }): Promise<{ valid: boolean }> => {
      await delay(700); // simulate network
      // TODO: replace with → trpc.form.verifyFormAccessCode.useMutation()
      // Mock: code "secret123" is valid
      return { valid: code === "secret123" };
    },
  });
}

// --- Hook: submit form response ---
export function useSubmitFormResponse() {
  return useMutation({
    mutationFn: async (payload: FormResponsePayload): Promise<{ success: boolean }> => {
      await delay(1200); // simulate network
      // TODO: replace with → trpc.form.submitFormResponse.useMutation()
      console.log("[MOCK] Submitting form response:", payload);
      return { success: true };
    },
  });
}
