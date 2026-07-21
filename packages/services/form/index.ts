import db, { eq, desc, and, inArray, not } from "@repo/database";
import { createFormSchema, type CreateFormInput } from "@repo/validators/src";
import type { CreateFieldInput, UpdateFormInput, UUidInput } from "@repo/validators/src";
import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form_field";

export class FormService {
  private normalizeFields(fields: CreateFieldInput[]) {
    return fields.map((field, index) => ({
      ...field,
      index,
      placeholder: field.placeholder?.trim() || null,
      options:
        field.type === "select" || field.type === "checkbox"
          ? [...new Set(field.options?.map((option) => option.trim()).filter(Boolean) ?? [])]
          : null,
    }));
  }

  private async getOwnedFormOrThrow(userId: UUidInput, formId: UUidInput) {
    const form = await db.query.formsTable.findFirst({
      where: and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)),
    });

    if (!form) {
      throw new Error("Form not found.");
    }

    return form;
  }

  async createForm(userId: string, input: CreateFormInput) {
    const result = await createFormSchema.safeParseAsync(input);
    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(message);
    }
    const { title, description, slug, status, accessCode, fields } = result.data;
    const normalizedFields = this.normalizeFields(fields);

    const existForm = await db.query.formsTable.findFirst({
      where: eq(formsTable.slug, slug),
    });

    if (existForm) {
      throw new Error("please choose different slug");
    }

    try {
      return await db.transaction(async (tx) => {
        const [form] = await tx
          .insert(formsTable)
          .values({
            title: title,
            description: description?.trim(),
            slug: slug,
            status: status,
            createdBy: userId,
            accessCode: status === "private" ? accessCode : null,
          })
          .returning();

        if (!form) {
          throw new Error("Unable to create form.");
        }

        if (normalizedFields.length) {
          await tx.insert(formFieldsTable).values(
            normalizedFields.map((field) => ({
              formId: form.id,
              type: field.type,
              label: field.label,
              placeholder: field.placeholder,
              required: field.required,
              options: field.options,
              index: field.index,
            })),
          );
        }

        return form;
      });
    } catch (error) {
      console.error("Failed to create form:", error);
      throw new Error(
        `Failed to create form: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async updateForm(userId: UUidInput, input: UpdateFormInput) {
    const existingForm = await this.getOwnedFormOrThrow(userId, input.id);

    const normalizedFields = this.normalizeFields(input.fields);

    return db.transaction(async (tx) => {
      const [updatedForm] = await tx
        .update(formsTable)
        .set({
          title: input.title,
          description: input.description?.trim() || null,
          slug: input.slug,
        })
        .where(and(eq(formsTable.id, existingForm.id), eq(formsTable.createdBy, userId)))
        .returning();

      const submittedFieldIds = normalizedFields.flatMap((field) => (field.id ? [field.id] : []));

      if (submittedFieldIds.length) {
        await tx
          .delete(formFieldsTable)
          .where(
            and(
              eq(formFieldsTable.formId, existingForm.id),
              not(inArray(formFieldsTable.id, submittedFieldIds)),
            ),
          );
      } else {
        await tx.delete(formFieldsTable).where(eq(formFieldsTable.formId, existingForm.id));
      }

      for (const field of normalizedFields) {
        if (field.id) {
          await tx
            .update(formFieldsTable)
            .set({
              type: field.type,
              label: field.label,
              placeholder: field.placeholder,
              required: field.required,
              options: field.options,
              index: field.index,
            })
            .where(
              and(eq(formFieldsTable.id, field.id), eq(formFieldsTable.formId, existingForm.id)),
            );
        } else {
          await tx.insert(formFieldsTable).values({
            formId: existingForm.id,
            type: field.type,
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
            options: field.options,
            index: field.index,
          });
        }
      }

      return updatedForm ?? existingForm;
    });
  }

  async getUserFormById(userId: UUidInput, formId: UUidInput) {
    try {
      const form = await this.getOwnedFormOrThrow(userId, formId);
      if (!form) {
        throw new Error("Form not found.");
      }

      const fields = await db
        .select()
        .from(formFieldsTable)
        .where(eq(formFieldsTable.formId, formId))
        .orderBy(formFieldsTable.index);

      return {
        ...form,
        fields,
      };
    } catch (error) {
      console.error("Failed to get user form by ID:", error);
      throw new Error(
        `Failed to get user form by ID: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async getUserForms(userId: string) {
    try {
      const forms = await db
        .select({
          id: formsTable.id,
          title: formsTable.title,
          description: formsTable.description,
          slug: formsTable.slug,
          status: formsTable.status,
          createdAt: formsTable.createdAt,
          updatedAt: formsTable.updatedAt,
        })
        .from(formsTable)
        .where(eq(formsTable.createdBy, userId))
        .orderBy(desc(formsTable.createdAt));

      return forms;
    } catch (error) {
      console.error("Failed to get user forms:", error);
      throw new Error(
        `Failed to get user forms: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async deleteForm(userId: UUidInput, formId: UUidInput) {
    try {
      await this.getOwnedFormOrThrow(userId, formId);

      await db
        .delete(formsTable)
        .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)));

      return { success: true };
    } catch (error) {
      console.error("Failed to delete form:", error);
      throw new Error(
        `Failed to delete form: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
