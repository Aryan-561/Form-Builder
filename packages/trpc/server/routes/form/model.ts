import z from "zod";
import { createFormSchema as createFormInputModel } from "@repo/validators/src/createFrom.schema";

export {createFormInputModel}

export const createFormOutputModel = z.object({
  id: z.string().describe("id of the created form"),
  title: z.string().describe("title of the form"),
  slug: z.string().describe("slug of the form"),
  status: z.enum(["draft", "publish", "private", "unpublish"]).describe("status of the form"),
  createdAt: z.date().describe("creation timestamp"),
});
