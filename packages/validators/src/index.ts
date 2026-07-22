import z from "zod";
export * from "zod";
export * from "./createField.schema.js";
export * from "./createForm.schema.js";
export * from "./updateForm.schema.js";
export * from "./updateStatus.schema.js";
export * from "./formSubmission.schema.js";

export const uuidInput = z.uuid();

export type UUidInput = z.infer<typeof uuidInput>;
