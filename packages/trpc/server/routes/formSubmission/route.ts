import { UUidInput } from "@repo/validators/src";
import { formSubmissionService } from "../../services";
import { publicProcedure, router, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { generatePath } from "../../utils/path-generator";
import {
  createSubmissionInputModel,
  createSubmissionOutputModel,
  formIdInputModel,
  getSubmissionsByFormOutputModel,
  submissionIdInputModel,
  getSubmissionByIdOutputModel,
  deleteSubmissionOutputModel,
} from "./model";

const TAGS = ["Form Submission"];
const getPath = generatePath("/form-submission");

export const formSubmissionRouter = router({
  /**
   * Public — anyone with the form link can submit.
   */
  createSubmission: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/create"), tags: TAGS } })
    .input(createSubmissionInputModel)
    .output(createSubmissionOutputModel)
    .mutation(async ({ input }) => {
      const submission = await formSubmissionService.createSubmission(input);

      return {
        id: submission.id,
        formId: submission.formId,
        email: submission.email ?? null,
        values: submission.values as { formFieldId: string; value: string }[],
        createdAt: submission.createdAt,
      };
    }),

  /**
   * Protected — form owner only.
   */
  getSubmissionsByForm: protectedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/list/{formId}"), tags: TAGS } })
    .input(formIdInputModel)
    .output(getSubmissionsByFormOutputModel)
    .query(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      const submissions = await formSubmissionService.getSubmissionsByForm(userId, input.formId);

      return submissions.map((s) => ({
        id: s.id,
        formId: s.formId,
        email: s.email ?? null,
        values: s.values as { formFieldId: string; value: string }[],
        createdAt: s.createdAt,
      }));
    }),

  getSubmissionById: protectedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/{submissionId}"), tags: TAGS } })
    .input(submissionIdInputModel)
    .output(getSubmissionByIdOutputModel)
    .query(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      const submission = await formSubmissionService.getSubmissionById(userId, input.submissionId);

      return {
        id: submission.id,
        formId: submission.formId,
        email: submission.email ?? null,
        values: submission.values as { formFieldId: string; value: string }[],
        createdAt: submission.createdAt,
      };
    }),

  deleteSubmission: protectedProcedure
    .meta({ openapi: { method: "DELETE", path: getPath("/{submissionId}"), tags: TAGS } })
    .input(submissionIdInputModel)
    .output(deleteSubmissionOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      return await formSubmissionService.deleteSubmission(userId, input.submissionId);
    }),
});
