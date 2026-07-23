import { UUidInput } from "@repo/validators/src";
import { formService } from "../../services";
import { publicProcedure, router, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { generatePath } from "../../utils/path-generator";
import {
  createFormInputModel,
  createFormOutputModel,
  getUserFormsOutputModel,
  getUserFormByIdOutputModel,
  updateFormInputModel,
  updateFormOutputModel,
  deleteFormOutputModel,
  formIdInputModel,
  updateStatusInputModel,
  updateStatusOutputModel,
  getLiveFormByIdOutputModel,
} from "./model";
import z from "zod";

const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
  createForm: protectedProcedure
    .meta({ openapi: { method: "POST", path: getPath("/create"), tags: TAGS } })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      const form = await formService.createForm(userId, input);

      return {
        id: form.id,
        title: form.title,
        slug: form.slug,
        status: form.status,
        createdAt: form.createdAt,
      };
    }),

  getUserForms: protectedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/list"), tags: TAGS } })
    .input(z.void())
    .output(getUserFormsOutputModel)
    .query(async ({ ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      return await formService.getUserForms(userId);
    }),

  getUserFormById: protectedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/{formId}"), tags: TAGS } })
    .input(formIdInputModel)
    .output(getUserFormByIdOutputModel)
    .query(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      return await formService.getUserFormById(userId, input.formId);
    }),

  updateForm: protectedProcedure
    .meta({ openapi: { method: "PATCH", path: getPath("/update"), tags: TAGS } })
    .input(updateFormInputModel)
    .output(updateFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      const form = await formService.updateForm(userId, input);

      return {
        id: form.id,
        title: form.title,
        description: form.description ?? null,
        slug: form.slug,
        status: form.status,
        accessCode: form.accessCode ?? null,
        createdBy: form.createdBy,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
      };
    }),

  deleteForm: protectedProcedure
    .meta({ openapi: { method: "DELETE", path: getPath("/{formId}"), tags: TAGS } })
    .input(formIdInputModel)
    .output(deleteFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      return await formService.deleteForm(userId, input.formId);
    }),

  updateStatus: protectedProcedure
    .meta({ openapi: { method: "PATCH", path: getPath("/status"), tags: TAGS } })
    .input(updateStatusInputModel)
    .output(updateStatusOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      // Cross-field validation: accessCode is required when status is "private"
      if (input.status === "private" && !input.accessCode?.trim()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Access code is required when status is 'private'",
        });
      }

      const form = await formService.updateStatus({ ...input, userId });
      if (!form) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update status." });
      }
      return {
        id: form.id,
        status: form.status,
        accessCode: form.accessCode ?? null,
        updatedAt: form.updatedAt,
      };
    }),

  getLiveFormById: publicProcedure
    .meta({ openapi: { method: "GET", path: getPath("/live/{formId}"), tags: TAGS } })
    .input(formIdInputModel)
    .output(getLiveFormByIdOutputModel)
    .query(async ({ input }) => {
      try {
        return await formService.getLiveFormById(input.formId);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";

        if (message === "Form not found") {
          throw new TRPCError({ code: "NOT_FOUND", message });
        }

        if (message === "form is not live now!") {
          throw new TRPCError({ code: "FORBIDDEN", message });
        }

        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
      }
    }),
});
