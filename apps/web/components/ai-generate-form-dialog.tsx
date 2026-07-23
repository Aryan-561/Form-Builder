"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Brain, Loader2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { useGenerateFormWithAi } from "~/hooks/use-form";

export interface AiGenerateFormDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
  isIconOnly?: boolean;
  variant?: "button" | "card";
}

interface PromptSuggestion {
  title: string;
  subtitle: string;
  prompt: string;
}

const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    title: "Customer Feedback Form",
    subtitle: "Collect customer satisfaction after a purchase.",
    prompt:
      "Create a customer feedback form for a coffee shop that asks customers to rate service, food quality, staff friendliness and leave additional comments.",
  },
  {
    title: "Job Application Form",
    subtitle: "Hiring React developers.",
    prompt:
      "Create a job application form for a Senior React Developer asking for contact info, portfolio link, years of experience, and resume attachment.",
  },
  {
    title: "Event Registration",
    subtitle: "RSVP with dietary preferences.",
    prompt:
      "Create an event registration form requesting name, email, guest count, dietary preferences, and workshop selections.",
  },
  {
    title: "Support Request",
    subtitle: "Customer support ticket.",
    prompt:
      "Create a customer support ticket form with issue category, severity level, problem description, and preferred contact method.",
  },
];

// Shared trigger styling tokens so the three variants stay visually consistent
// and changes to hover/elevation behavior only need to happen in one place.
const triggerBase =
  "border border-border bg-background text-foreground transition-all duration-150 ease-out " +
  "hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function AiGenerateFormDialog({
  children,
  triggerClassName = "",
  isIconOnly = false,
  variant = "button",
}: AiGenerateFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");

  const { mutateAsync: generateForm, isPending } = useGenerateFormWithAi();

  const handleGenerate = async (promptToUse?: string) => {
    const finalPrompt = promptToUse ?? prompt;
    if (!finalPrompt.trim()) {
      toast.error("Please enter a prompt describing your form.");
      return;
    }

    try {
      const form = await generateForm({ prompt: finalPrompt });
      toast.success("AI Form generated successfully!");
      setOpen(false);
      setPrompt("");
      router.push(`/b/${form.id}`);
    } catch (error) {
      console.error("AI form generation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate form with AI. Check API Key.",
      );
    }
  };

  const renderTrigger = () => {
    if (children) {
      return children;
    }

    if (isIconOnly) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Generate with AI"
                onClick={() => setOpen(true)}
                className={`h-9 w-9 rounded-full ${triggerBase} hover:bg-accent shadow-sm active:scale-[0.97] ${triggerClassName}`}
              >
                <Brain className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Generate with AI</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (variant === "card") {
      return (
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label="Generate with AI. Describe your form in natural language and AI creates it automatically."
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={`group relative flex cursor-pointer items-center justify-between gap-3 rounded-xl ${triggerBase} bg-card px-3.5 py-3 text-left hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md ${triggerClassName}`}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-150 group-hover:bg-primary group-hover:text-primary-foreground">
              <Brain className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold leading-tight text-foreground">
                Generate with AI
              </h3>
              <p className="truncate text-[11px] leading-tight text-muted-foreground">
                Describe your form, AI builds it for you.
              </p>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      );
    }

    return (
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className={`h-8 rounded-lg ${triggerBase} hover:bg-accent hover:text-accent-foreground gap-1.5 px-3 text-[13px] font-medium shadow-sm ${triggerClassName}`}
      >
        <Brain className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span>Generate with AI</span>
        <span className="rounded border border-border/50 bg-muted px-1 py-0.5 font-mono text-[9px] uppercase leading-none text-muted-foreground">
          AI
        </span>
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children ? <DialogTrigger asChild>{renderTrigger()}</DialogTrigger> : renderTrigger()}
      <DialogContent className="gap-0 space-y-4 rounded-2xl border border-border bg-background p-5 shadow-xl duration-150 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-[480px]">
        <DialogHeader className="space-y-0 text-left">
          <div className="flex items-center gap-2.5">
            <div className="min-w-0">
              <DialogTitle className="text-[15px] font-semibold leading-tight tracking-tight text-foreground">
                Generate Form with AI
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-xs leading-snug text-muted-foreground">
                Describe the form and AI builds fields, labels, and validation for you.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-1.5">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A customer feedback form for a coffee shop asking about service, food quality, and staff friendliness."
            disabled={isPending}
            autoFocus
            className="h-[104px] min-h-[104px] w-full resize-none rounded-xl border border-border bg-muted/20 p-3 text-[13px] text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
          />
          <div className="flex items-center justify-between px-0.5 text-[11px] text-muted-foreground">
            <span>More details produce better forms.</span>
            <span className="font-mono">{prompt.length}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="px-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
            Suggestions
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item.title}
                type="button"
                disabled={isPending}
                onClick={() => setPrompt(item.prompt)}
                className="group rounded-lg border border-border bg-card px-2.5 py-2 text-left transition-colors duration-150 hover:border-foreground/20 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 flex items-start gap-2"
              >
                <Brain className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors mt-0.5" />
                <div className="min-w-0">
                  <h4 className="truncate text-[12px] font-medium text-foreground">{item.title}</h4>
                  <p className="mt-0.5 line-clamp-1 text-[11px] leading-tight text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="h-9 shrink-0 rounded-lg px-3 text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isPending || !prompt.trim()}
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary text-[13px] font-medium text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Brain className="h-3.5 w-3.5 text-primary-foreground" />
                <span>Generate Form</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
