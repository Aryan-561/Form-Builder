"use client";

import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";
import { FormCard } from "~/components/organisms/FormCard";
import { useRouter } from "next/navigation";
import { MOCK_TEMPLATES } from "../t/page";
import { TemplateCard } from "~/components/ui/template-card";
import { CreateFormButton } from "~/components/create-form-button";

import { useForms } from "~/hooks/use-form";

export default function FormsPage() {
  const router = useRouter();
  const { data: forms, isLoading, isError } = useForms();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Forms</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading
              ? "Loading forms..."
              : forms
                ? `${forms.length} form${forms.length !== 1 ? "s" : ""}`
                : "Manage your forms"}
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
              onClick={() => router.push(`/b/${template.id}`)}
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
