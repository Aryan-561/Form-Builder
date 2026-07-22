import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { UsageProgress } from "~/components/ui/usage-progress";
import { cn } from "~/lib/utils";

export interface PlanUsageCardProps {
  plan: "free" | "pro";
  usedForms: number;
  maxForms: number;
  credits: number;
  className?: string;
}

export function PlanUsageCard({
  plan,
  usedForms,
  maxForms,
  credits,
  className,
}: PlanUsageCardProps) {
  const isFree = plan === "free";

  return (
    <Card className={cn("border-border shadow-xs outline-1 ", className)}>
      <CardTitle className="text-xs font-semibold capitalize px-6">{plan} Plan</CardTitle>
      <CardContent className="space-y-4">
        <UsageProgress current={usedForms} max={maxForms} label="Forms Used" />

        <div className="text-xs font-medium text-muted-foreground">{credits} Credits Remaining</div>

        {isFree && (
          <Button variant="default" size="sm" className="w-full justify-between mt-2 h-8 text-xs">
            Upgrade Plan
            <ArrowUpRight className="size-3" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
