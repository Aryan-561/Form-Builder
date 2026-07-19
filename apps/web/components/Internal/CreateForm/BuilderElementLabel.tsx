import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { FieldLabel } from "~/components/ui/field";

export function BuilderElementLabel({ initialLabel }: { initialLabel: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(initialLabel);

  return (
    <div 
      className="flex justify-between items-start w-full cursor-text rounded-md hover:bg-accent/20 transition-colors p-2 -ml-2"
      onClick={() => {
        if (!isEditing) setIsEditing(true);
      }}
    >
      {isEditing ? (
        <Textarea
          autoFocus
          className="font-sans text-xl font-semibold text-foreground h-auto py-1 px-2 border-primary w-full"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsEditing(false);
          }}
        />
      ) : (
        <FieldLabel
          className="font-sans text-xl font-semibold text-foreground break-all w-full pointer-events-none"
        >
          {label}
        </FieldLabel>
      )}
    </div>
  );
}
