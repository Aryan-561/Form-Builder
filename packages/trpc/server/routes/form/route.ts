import { formService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel, getUserFormsOutputModel } from "./model";
import z from "zod";

const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
  createForm: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/create"), tags: TAGS } })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as string;

      const form = await formService.createForm(userId, input);

      return {
        id: form.id,
        title: form.title,
        slug: form.slug,
        status: form.status,
        createdAt: form.createdAt,
      };
    }),

  getUserForms: publicProcedure
    .meta({ openapi: { method: "GET", path: getPath("/list"), tags: TAGS } })
    .input(z.void())
    .output(getUserFormsOutputModel)
    .query(async ({ ctx }) => {
      const userId = ctx.user?.id as string;

      return await formService.getUserForms(userId);
    }),
});
