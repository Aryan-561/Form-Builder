"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import Logo from "../logo/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:flex items-center gap-7">
            <Link
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              href="#templates"
            >
              Templates
            </Link>
            <Link
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              href="#pricing"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs rounded-lg text-xs px-4"
            asChild
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
