import { TRPCError } from "@trpc/server";
import { aiFormService } from "@repo/ai";
import { formService } from "../../services";
import { protectedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { generateFormInputModel, generateFormOutputModel } from "./model";
import type { UUidInput } from "@repo/validators/src";

const TAGS = ["AI"];
const getPath = generatePath("/ai");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const aiRouter = router({
  generateForm: protectedProcedure
    .meta({ openapi: { method: "POST", path: getPath("/generate-form"), tags: TAGS } })
    .input(generateFormInputModel)
    .output(generateFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;

      try {
        const generatedForm = await aiFormService.generateFormFromPrompt(input.prompt);

        const baseSlug = slugify(generatedForm.title) || "ai-generated-form";
        const slug = `${baseSlug.slice(0, 50)}-${Date.now()}`;

        const createdForm = await formService.createForm(userId, {
          title: generatedForm.title.slice(0, 55),
          description: generatedForm.description ? generatedForm.description.slice(0, 150) : null,
          slug,
          status: "draft",
          accessCode: null,
          fields: generatedForm.fields.map((f, index) => ({
            label: f.label.slice(0, 180),
            type: f.type,
            placeholder: f.placeholder ?? undefined,
            required: f.required,
            options: f.options ?? undefined,
            index,
          })),
        });

        return {
          id: createdForm.id,
          title: createdForm.title,
          slug: createdForm.slug,
          status: createdForm.status,
          createdAt: createdForm.createdAt,
        };
      } catch (error) {
        console.error("aiRouter.generateForm error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to generate form with AI.",
        });
      }
    }),
});
