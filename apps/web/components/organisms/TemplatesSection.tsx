"use client";

import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { Button } from "~/components/ui/button";

const templates = [
  {
    title: "Event Registration & RSVP",
    category: "Events",
    description:
      "Capture attendee details, track session preferences, and manage headcount effortlessly.",
  },
  {
    title: "Customer Satisfaction Survey",
    category: "Feedback",
    description:
      "Gather feedback with star ratings, multi-choice metrics, and open-ended text areas.",
  },
  {
    title: "Support & Helpdesk Request",
    category: "Support",
    description:
      "Triage incoming tickets with category selectors, file inputs, and contact fields.",
  },
];

export function TemplatesSection() {
  return (
    <section
      className="py-24 px-6 bg-[#FAFBFC] dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
      id="templates"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800 pb-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Start with pre-built templates
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Conversion-optimized layouts ready for immediate customization.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs h-9"
            asChild
          >
            <Link href="/templates">
              Browse All Templates <ArrowRight className="ml-1.5 size-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl, i) => (
            <div
              key={i}
              className="group rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 flex flex-col justify-between hover:border-blue-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {tpl.category}
                  </span>
                  <LayoutTemplate className="size-4 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-0 h-8"
                asChild
              >
                <Link href="/signup">
                  <span>Use Template</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
