CREATE TABLE "formSubmisssoins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"formId" uuid NOT NULL,
	"values" json,
	"email" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "start" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "stop" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "formSubmisssoins" ADD CONSTRAINT "formSubmisssoins_formId_forms_id_fk" FOREIGN KEY ("formId") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;