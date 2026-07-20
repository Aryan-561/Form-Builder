import db, { eq, desc } from "@repo/database";
import type { CreateFormInput } from "@repo/validators/src";
import type { CreateFieldInput } from "@repo/validators/src";
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

  async createForm(userId: string, input: CreateFormInput) {
    const normalizedFields = this.normalizeFields(input.fields);

    try {
      return await db.transaction(async (tx) => {
        const [form] = await tx
          .insert(formsTable)
          .values({
            title: input.title,
            description: input.description?.trim(),
            slug: input.slug,
            status: input.status,
            createdBy: userId,
            accessCode: input.status === "private" ? input.accessCode : null,
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
}
