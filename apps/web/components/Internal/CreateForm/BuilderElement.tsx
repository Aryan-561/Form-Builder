import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { FormElement } from "./types";
import { BuilderElementPreview } from "./BuilderElementPreview";

export function BuilderElement({
  element,
  isActive,
  onClick,
  onElementRemove,
}: {
  element: FormElement;
  isActive?: boolean;
  onClick?: () => void;
  onElementRemove?: (id: string) => void;
}) {
  const hasOptions = ["radio", "select", "multiselect"].includes(element.type);

  return (
    <div
      className={`bg-card rounded-xl p-8 shadow-sm border-2 transition-all group relative cursor-pointer ${isActive ? "border-primary ring-4 ring-primary/10" : "border-transparent hover:border-border"}`}
      onClick={(e) => {
        // Prevent clicking if we hit the delete button
        if ((e.target as HTMLElement).closest(".delete-btn")) return;
        if (onClick) onClick();
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel className="font-sans text-xl font-semibold text-foreground mb-4 break-all">
            {element.label}
            {element.required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>

          <div className="pointer-events-none">
            <BuilderElementPreview element={element} />
          </div>
        </Field>
      </FieldGroup>

      <div className="absolute top-4 right-4   delete-btn">
        {onElementRemove && (
          <Button
            size="icon"
            variant="destructive"
            type="button"
            onClick={() => {
              if (element.uniqueId) onElementRemove(element.uniqueId);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
