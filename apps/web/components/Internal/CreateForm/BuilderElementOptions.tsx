import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Option } from "./types";

export function BuilderElementOptions({ 
  initialOptions,
  onOptionsChange
}: { 
  initialOptions: Option[];
  onOptionsChange?: (options: Option[]) => void;
}) {
  const options = initialOptions;

  const updateOption = (index: number, newLabel: string) => {
    const newOptions = [...options];
    newOptions[index] = {
      label: newLabel,
      value: newLabel.toLowerCase().replace(/\s+/g, "-"),
    };
    if (onOptionsChange) onOptionsChange(newOptions);
  };

  const addOption = () => {
    const newOptions = [
      ...options,
      { label: `Option ${options.length + 1}`, value: `option-${options.length + 1}` },
    ];
    if (onOptionsChange) onOptionsChange(newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    if (onOptionsChange) onOptionsChange(newOptions);
  };

  return (
    <div className="space-y-3 mt-2 p-4 border rounded-lg bg-accent/20">
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border border-primary/50 shrink-0" />
          <Input
            value={opt.label}
            onChange={(e) => updateOption(i, e.target.value)}
            className="h-9 bg-background border-border focus-visible:ring-1 transition-colors"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => removeOption(i)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={addOption}
        className="mt-2 text-xs font-semibold"
      >
        <Plus className="w-3 h-3 mr-1" /> Add Option
      </Button>
    </div>
  );
}
