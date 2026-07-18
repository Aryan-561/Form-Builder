import { pgEnum, pgTable, uuid, varchar, check, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./user";
export const formStatus = pgEnum("form_status",["draft", "publish", "private", "unpublish"])

export const formsTable =  pgTable("forms",{
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", {length:55}).notNull(),
    description: varchar("description", {length: 150}),
    slug: varchar("slug", {length:180}).notNull(),
    status: formStatus("status").default("draft").notNull(),
    accessCode: varchar("accessCode", {length:18}),
    createdBy: uuid("createdBy")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
},
    (table)=>[
        check(
    "access_code_required_when_private",
    sql`${table.status} <> 'private' OR ${table.accessCode} IS NOT NULL`
  ),
    ]

)

export type SelectForm = typeof formsTable.$inferSelect;
export type InsertForm = typeof formsTable.$inferInsert;