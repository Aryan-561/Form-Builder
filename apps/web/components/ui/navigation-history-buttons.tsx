"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface NavigationHistoryButtonsProps {
  className?: string;
  fallbackUrl?: string;
}

export function NavigationHistoryButtons({
  className,
  fallbackUrl = "/dashboard",
}: NavigationHistoryButtonsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  const handleForward = () => {
    router.forward();
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button variant="ghost" size="icon" onClick={handleBack} title="Go back" aria-label="Go back">
        <ArrowLeft className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleForward}
        title="Go forward"
        aria-label="Go forward"
      >
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

interface BackButtonProps {
  className?: string;
  fallbackUrl?: string;
}

export function BackButton({ className, fallbackUrl = "/dashboard" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleBack} className={cn("gap-2", className)}>
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}
