"use client";

import { useParams } from "next/navigation";
import { PublicFormPage } from "~/components/public-form";

export default function DeployedFormPage() {
  const { id } = useParams();
  return <PublicFormPage formId={id as string} />;
}
