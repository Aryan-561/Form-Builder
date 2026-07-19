import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { FormElement } from "./types";

export function BuilderElementPreview({ element }: { element: FormElement }) {
  if (element.type === "textarea") {
    return (
      <Textarea
        className="min-h-[120px] bg-accent/50 text-base resize-none"
        placeholder={element.placeholder}
        disabled
      />
    );
  }

  return (
    <Input
      className="py-6 bg-accent/50 text-base"
      type={element.type}
      placeholder={element.placeholder}
      disabled
    />
  );
}
