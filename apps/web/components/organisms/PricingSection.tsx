"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Check, Sparkles } from "lucide-react";

export function PricingSection() {
  return (
    <section
      className="py-24 px-6 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60"
      id="pricing"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-medium">
            <Sparkles className="size-3.5 text-blue-600" />
            <span>AI Powered & BYOK Enabled</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Simple, predictable pricing
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Start for free with built-in AI credits or bring your own Gemini API key.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-[#FAFBFC] dark:bg-slate-950 p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Free</h3>
                <p className="text-xs text-slate-500 mt-1">Ideal for side projects & testing</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">₹0</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Up to 3 active forms
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> 100 free AI credits / month
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Bring your own Gemini API key
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Passcode-protected private
                  forms
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              className="w-full h-10 rounded-lg text-xs font-medium border-slate-200 dark:border-slate-800"
              asChild
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-xl border-2 border-blue-600 bg-white dark:bg-slate-900 p-8 flex flex-col justify-between space-y-8 shadow-xs relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
              Most Popular
            </span>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pro</h3>
                <p className="text-xs text-slate-500 mt-1">For growing products & startups</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">₹29</span>
                  <span className="text-xs text-slate-500">/week</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Up to 10 active forms
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> 300 free AI credits / month
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Priority Gemini AI generation
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Custom Gemini API key override
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Private forms with custom
                  access code
                </li>
              </ul>
            </div>

            <Button
              className="w-full h-10 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              asChild
            >
              <Link href="/signup">Buy now</Link>
            </Button>
          </div>

          {/* Business / Enterprise Plan */}
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-[#FAFBFC] dark:bg-slate-950 p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Custom Business
                </h3>
                <p className="text-xs text-slate-500 mt-1">For high-volume business needs</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    Custom
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Unlimited forms & credits
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Dedicated Gemini AI quota &
                  model tuning
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="size-4 text-blue-600 shrink-0" /> Enterprise SLA & dedicated
                  support
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              className="w-full h-10 rounded-lg text-xs font-medium border-slate-200 dark:border-slate-800"
              asChild
            >
              <Link href="mailto:sales@formcraft.com">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
