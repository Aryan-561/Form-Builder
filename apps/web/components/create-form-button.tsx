"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useCreateForm } from "~/hooks/use-form";
import type { ButtonProps } from "~/components/ui/button";

export function CreateFormButton({ children, disabled, className, ...props }: ButtonProps) {
  const router = useRouter();
  const { mutateAsync: createForm, isPending } = useCreateForm();

  const handleCreateForm = async () => {
    const slug = `form-${Date.now()}`;

    try {
      const data = await createForm({
        title: "Untitled Form",
        slug,
        status: "draft",
        description: "",
      });

      router.push(`/b/${data.id}`);
    } catch (error) {
      toast.error("Failed to create form");
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleCreateForm}
      disabled={disabled || isPending}
      className={className}
      {...props}
    >
      {isPending ? (
        <Loader2 className="size-4 shrink-0 animate-spin" />
      ) : (
        <Plus className="size-4 shrink-0" />
      )}
      {children ? (
        children
      ) : (
        <span className="group-data-[collapsible=icon]:hidden">
          {isPending ? "Creating..." : "Create New Form"}
        </span>
      )}
    </Button>
  );
}
