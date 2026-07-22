"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TemplateCard } from "~/components/ui/template-card";

export const MOCK_TEMPLATES = [
  {
    id: 1,
    title: "Contact Form",
    description: "A simple contact form to receive inquiries from your visitors.",
  },
  {
    id: 2,
    title: "Feedback Form",
    description: "Gather valuable feedback from your customers and users.",
  },
  {
    id: 3,
    title: "Event Registration",
    description: "Collect attendee details for your upcoming event.",
  },
  {
    id: 4,
    title: "Job Application",
    description: "Standardized job application form for new candidates.",
  },
  { id: 5, title: "Survey", description: "In-depth survey to understand user satisfaction." },
  {
    id: 6,
    title: "Newsletter Signup",
    description: "Capture emails to grow your newsletter audience.",
  },
  {
    id: 7,
    title: "Lead Capture",
    description: "Optimized form to collect lead information quickly.",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-2">Start quickly with pre-built form templates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            onClick={() => router.push(`/b/${template.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
