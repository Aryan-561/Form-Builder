import { pgTable, timestamp, uuid, json, varchar } from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export interface FormSubmissionValue {
  formFieldId: string;
  value: string;
}

export type FormSubmissionValueRow = FormSubmissionValue[];

export const formSubmisssoinsTable = pgTable("formSubmisssoins", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("formId")
    .notNull()
    .references(() => formsTable.id),
  values: json("values").$type<FormSubmissionValueRow>(),
  email: varchar("email"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
