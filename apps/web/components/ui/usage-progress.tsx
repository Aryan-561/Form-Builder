import * as React from "react";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";

export interface UsageProgressProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
}

export function UsageProgress({ current, max, label, className }: UsageProgressProps) {
  const percentage = Math.min(Math.round((current / max) * 100), 100);

  return (
    <div className={cn("space-y-2 ", className)}>
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>{label || "Usage"}</span>
        <span>
          {current} / {max}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
