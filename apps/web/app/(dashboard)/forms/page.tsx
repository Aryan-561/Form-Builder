"use client";

import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";
import { FormCard } from "~/components/organisms/FormCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_TEMPLATES } from "../templates/page";
import { TemplateCard } from "~/components/ui/template-card";
import { CreateFormButton } from "~/components/create-form-button";

// Mock data for UI development before backend integration
const MOCK_FORMS = [
  {
    id: "1",
    title: "Event Registration Form",
    description: "Form for the upcoming tech conference registration.",
    status: "publish" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "2",
    title: "Customer Feedback",
    description: "Quarterly customer satisfaction survey.",
    status: "draft" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "3",
    title: "Internal Onboarding",
    description: "New employee onboarding questionnaire.",
    status: "private" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
];

export default function FormsPage() {
  const router = useRouter();
  const [forms] = useState(MOCK_FORMS);
  const isLoading = false;
  const isError = false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Forms</h1>
          <p className="text-muted-foreground mt-1">
            {forms ? `${forms.length} form${forms.length !== 1 ? "s" : ""}` : "Manage your forms"}
          </p>
        </div>
        <CreateFormButton />
      </div>

      {/* Empty state */}
      {!isLoading && !isError && forms?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border rounded-xl">
          <div className="size-14 bg-muted rounded-xl flex items-center justify-center mb-4">
            <FileSpreadsheet className="size-7 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No forms yet</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-xs">
            Create your first form to start collecting responses from your audience.
          </p>
          <CreateFormButton>Create your first form</CreateFormButton>
        </div>
      )}

      {/* Forms grid */}
      <div className="flex w-full gap-6 overflow-x-auto pb-8 snap-x">
        {MOCK_TEMPLATES.map((template) => (
          <div key={template.id} className="w-80 shrink-0 snap-start">
            <TemplateCard
              title={template.title}
              description={template.description}
              onClick={() => router.push(`/builder/${template.id}`)}
            />
          </div>
        ))}
      </div>
      {!isLoading && !isError && forms && forms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
              status={form.status}
              createdAt={form.createdAt}
              updatedAt={form.updatedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
