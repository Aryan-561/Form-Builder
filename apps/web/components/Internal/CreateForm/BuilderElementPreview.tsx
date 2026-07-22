import { Star, Calendar as CalendarIcon } from "lucide-react";
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

  if (element.type === "rating") {
    return (
      <div className="flex items-center gap-1.5 py-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="size-6 text-amber-400 fill-amber-400 opacity-60 pointer-events-none"
          />
        ))}
        <span className="text-xs text-muted-foreground ml-2">(5 Stars)</span>
      </div>
    );
  }

  if (element.type === "date") {
    return (
      <div className="flex items-center gap-2 py-3 px-4 rounded-lg bg-accent/50 border border-input text-muted-foreground text-sm">
        <CalendarIcon className="size-4" />
        <span>Select Date...</span>
      </div>
    );
  }

  if (element.type === "checkbox") {
    const opts = element.options || [];
    if (opts.length > 0) {
      return (
        <div className="grid gap-2 py-1">
          {opts.map((opt, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-accent/30 text-sm font-normal text-foreground"
            >
              <input
                type="checkbox"
                disabled
                className="size-4 rounded border-input text-primary shrink-0"
              />
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-accent/30 text-sm font-normal text-foreground">
        <input
          type="checkbox"
          disabled
          className="size-4 rounded border-input text-primary shrink-0"
        />
        <span>{element.placeholder || "I accept the Privacy Policy & Terms of Service"}</span>
      </div>
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
