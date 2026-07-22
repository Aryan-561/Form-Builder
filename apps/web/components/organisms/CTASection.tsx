"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-[#FAFBFC] dark:bg-slate-950">
      <div className="max-w-4xl mx-auto rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 md:p-14 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Ready to build better forms?
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Create your first form in minutes and start collecting structured responses immediately.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            className="w-full sm:w-auto h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-xs"
            asChild
          >
            <Link href="/signup">
              Create Form Now <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
