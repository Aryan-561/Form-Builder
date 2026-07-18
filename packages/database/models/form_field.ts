import { pgTable, uuid, varchar, text, boolean, pgEnum, jsonb, numeric, timestamp, unique } from "drizzle-orm/pg-core";
import { formsTable } from "./form";


export const formTypes = pgEnum("formTypes", [
    "text",
    "textarea",
    "email",
    "number",
    "select",
    "checkbox",
    "rating",
    "date",
])

export const formFieldsTable = pgTable("formFields", {
    id: uuid("id").defaultRandom().primaryKey(),
    formId: uuid("formId").notNull()
        .references(() => formsTable.id, { onDelete: "cascade" }),
    label: varchar("label", { length: 180 }).notNull(),
    type: formTypes("type").notNull(),
    placeholder: text("placeholder"),
    required: boolean("required").default(false).notNull(),
    options: jsonb("options").$type<string[]>(),
    index: numeric('index', { scale: 2 }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
},
(table)=>{
    return{
        uniqueFormIdandIndex: unique().on(table.formId, table.index)
    }
} 
)

