"use client";

import { use } from "react";
import { PublicFormPage } from "~/components/public-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DeployedFormPage({ params }: PageProps) {
  const { id } = use(params);
  return <PublicFormPage formId={id} />;
}
