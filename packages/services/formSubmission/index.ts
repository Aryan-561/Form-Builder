import db, { eq, desc, and } from "@repo/database";
import {
  formSubmisssoinsTable,
  FormSubmissionValueRow,
} from "@repo/database/models/form_submission";
import { formsTable } from "@repo/database/models/form";
import type { UUidInput, CreateFormSubmissionInput } from "@repo/validators/src";
import { createFormSubmissionSchema } from "@repo/validators/src";
import { z } from "zod";

export class FormSubmissionService {
  /**
   * Verify the form exists and is publicly accessible (or matches an access
   * code if private).  Returns the form row.
   */
  private async getPublishedFormOrThrow(formId: UUidInput) {
    const form = await db.query.formsTable.findFirst({
      where: eq(formsTable.id, formId),
    });

    if (!form) {
      throw new Error("Form not found.");
    }

    if (form.status === "draft" || form.status === "unpublish") {
      throw new Error("This form is not accepting submissions.");
    }

    return form;
  }

  // -------------------------------------------------------------------------
  // Create
  // -------------------------------------------------------------------------

  async createSubmission(input: CreateFormSubmissionInput) {
    const result = await createFormSubmissionSchema.safeParseAsync(input);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(message);
    }

    const { formId, email, values } = result.data;

    await this.getPublishedFormOrThrow(formId);

    try {
      const [submission] = await db
        .insert(formSubmisssoinsTable)
        .values({
          formId,
          email: email ?? null,
          values: values as FormSubmissionValueRow,
        })
        .returning();

      if (!submission) {
        throw new Error("Failed to save submission.");
      }

      return submission;
    } catch (error) {
      console.error("Failed to create submission:", error);
      throw new Error(
        `Failed to create submission: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // -------------------------------------------------------------------------
  // Read — owner only
  // -------------------------------------------------------------------------

  /**
   * Fetch all submissions for a form.  The caller must be the form owner.
   */
  async getSubmissionsByForm(userId: UUidInput, formId: UUidInput) {
    // Verify ownership
    const form = await db.query.formsTable.findFirst({
      where: and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)),
    });

    if (!form) {
      throw new Error("Form not found or access denied.");
    }

    try {
      return await db
        .select()
        .from(formSubmisssoinsTable)
        .where(eq(formSubmisssoinsTable.formId, formId))
        .orderBy(desc(formSubmisssoinsTable.createdAt));
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
      throw new Error(
        `Failed to fetch submissions: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Fetch a single submission by its id.  The caller must own the parent form.
   */
  async getSubmissionById(userId: UUidInput, submissionId: UUidInput) {
    const submission = await db.query.formSubmisssoinsTable.findFirst({
      where: eq(formSubmisssoinsTable.id, submissionId),
    });

    if (!submission) {
      throw new Error("Submission not found.");
    }

    // Verify ownership via the parent form
    const form = await db.query.formsTable.findFirst({
      where: and(eq(formsTable.id, submission.formId), eq(formsTable.createdBy, userId)),
    });

    if (!form) {
      throw new Error("Access denied.");
    }

    return submission;
  }

  // -------------------------------------------------------------------------
  // Delete — owner only
  // -------------------------------------------------------------------------

  async deleteSubmission(userId: UUidInput, submissionId: UUidInput) {
    const submission = await this.getSubmissionById(userId, submissionId);

    try {
      await db.delete(formSubmisssoinsTable).where(eq(formSubmisssoinsTable.id, submission.id));

      return { success: true };
    } catch (error) {
      console.error("Failed to delete submission:", error);
      throw new Error(
        `Failed to delete submission: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
