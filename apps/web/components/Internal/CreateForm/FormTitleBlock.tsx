import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export function FormTitleBlock({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: {
  title: string;
  description: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  return (
    <div className="bg-card rounded-xl p-8 shadow-sm border-2 border-transparent hover:border-border transition-all relative mb-12">
      <div className="absolute top-0 left-0 w-full h-3 bg-primary rounded-t-xl" />
      <div className="flex flex-col gap-2 mt-2">
        {isEditingTitle ? (
          <Input
            autoFocus
            className="font-sans text-4xl font-bold text-foreground h-auto py-2 px-3 -mx-3 border-primary"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditingTitle(false);
            }}
          />
        ) : (
          <h1
            className="font-sans text-4xl font-bold text-foreground cursor-text hover:bg-accent/50 px-3 py-2 -mx-3 rounded transition-colors border border-transparent hover:border-border"
            onClick={() => setIsEditingTitle(true)}
          >
            {title}
          </h1>
        )}

        {isEditingDesc ? (
          <Textarea
            autoFocus
            className="text-lg text-foreground h-auto py-2 px-3 -mx-3 border-primary resize-none"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            onBlur={() => setIsEditingDesc(false)}
          />
        ) : (
          <p
            className="text-lg text-muted-foreground cursor-text hover:bg-accent/50 px-3 py-2 -mx-3 rounded transition-colors border border-transparent hover:border-border min-h-[48px]"
            onClick={() => setIsEditingDesc(true)}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
