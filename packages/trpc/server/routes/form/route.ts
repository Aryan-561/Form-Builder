import { formService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel } from "./model";


const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
  createForm: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/create"), tags: TAGS } })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      // TODO: replace with authenticated user id once auth middleware is wired up
      const userId = "temp-user-id";

      const form = await formService.createForm(userId, input);

      return {
        id: form.id,
        title: form.title,
        slug: form.slug,
        status: form.status,
        createdAt: form.createdAt,
      };
    }),
});
