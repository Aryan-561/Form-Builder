"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  Check,
  Sparkles,
  KeyRound,
  ShieldCheck,
  Lock,
  Type,
  Mail,
  List,
  CheckSquare,
  Upload,
  Star,
  Zap,
  Sliders,
  Eye,
  Share2,
  Send,
  BarChart2,
  ChevronDown,
} from "lucide-react";

// Realistic FormCanvas IDE Interface Mockup Component
function FormCanvasIdePreview() {
  const [isChecked, setIsChecked] = useState(true);

  // Periodic Checkbox Ticking Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChecked((prev) => !prev);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-6xl mx-auto rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 overflow-hidden select-none"
    >
      {/* macOS Window Top Bar */}
      <div className="px-4 py-3 bg-slate-50/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        {/* Window Dots & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-[#EF4444]" />
            <div className="size-3 rounded-full bg-[#F59E0B]" />
            <div className="size-3 rounded-full bg-[#10B981]" />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono pl-3 border-l border-slate-200 dark:border-slate-800">
            <Lock className="size-3 text-emerald-600" />
            <span>formcanvas.ai / workspace / Customer Feedback</span>
          </div>
        </div>

        {/* Top App Toolbar Actions */}
        <div className="flex items-center gap-2">
          {/* AI Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-[11px] font-semibold text-blue-700 dark:text-blue-400">
            <Sparkles className="size-3 text-blue-600 animate-pulse" />
            <span>Gemini 1.5 Active</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 text-slate-600 dark:text-slate-400"
          >
            <Eye className="size-3.5" /> Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1 text-slate-700 dark:text-slate-300 border-slate-200"
          >
            <Share2 className="size-3.5" /> Share
          </Button>
          <Button size="sm" className="h-7 text-xs gap-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="size-3.5" /> Publish
          </Button>
        </div>
      </div>

      {/* 3-COLUMN IDE APP LAYOUT */}
      <div className="grid grid-cols-12 min-h-[460px] bg-slate-50/50 dark:bg-slate-950/50">
        {/* COLUMN 1: LEFT SIDEBAR (Form Element Palette) */}
        <div className="col-span-3 lg:col-span-2 border-r border-slate-200 dark:border-slate-800 p-3 space-y-3 bg-white dark:bg-slate-900 hidden sm:block">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
            Form Elements
          </div>
          <div className="space-y-1">
            {[
              { icon: Type, label: "Short Text", active: true },
              { icon: Mail, label: "Email Address" },
              { icon: List, label: "Dropdown Select" },
              { icon: CheckSquare, label: "Checkbox Group" },
              { icon: Upload, label: "File Upload" },
              { icon: Star, label: "Rating Score" },
              { icon: Zap, label: "Logic Rule" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  item.active
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/60"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon className="size-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: CENTER DRAG-AND-DROP CANVAS */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-7 p-4 sm:p-6 space-y-4 overflow-hidden relative">
          {/* Active Canvas Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Customer Onboarding Survey
              </h3>
              <p className="text-xs text-slate-500">4 fields • AI validation enabled</p>
            </div>
            {/* Floating Telemetry Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-900/50">
              <BarChart2 className="size-3.5" />
              <span>98.4% Conversion</span>
            </div>
          </div>

          {/* QUESTION CARD 1: Full Name Input (Selected Active Field) */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-sm space-y-1.5 relative">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Full Name <span className="text-blue-600">*</span>
              </label>
              <span className="text-[10px] text-blue-600 font-mono">Text Field</span>
            </div>
            <div className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center text-xs text-slate-900 dark:text-slate-100">
              <span>Alex Morgan</span>
              <span className="w-0.5 h-4 bg-blue-600 animate-pulse ml-0.5" />
            </div>
          </div>

          {/* QUESTION CARD 2: Work Email */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <label className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              Work Email <span className="text-blue-600">*</span>
            </label>
            <div className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center text-xs text-slate-400">
              alex@company.com
            </div>
          </div>

          {/* QUESTION CARD 3: Department Select */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <label className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Department Role
            </label>
            <div className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200">
              <span>Product & Engineering</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </div>
          </div>

          {/* QUESTION CARD 4: Animated Checkbox + Logic Rule */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2.5">
              <div
                onClick={() => setIsChecked(!isChecked)}
                className={`size-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                  isChecked
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-300 dark:border-slate-700 bg-white"
                }`}
              >
                {isChecked && <Check className="size-3 stroke-[3]" />}
              </div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Send AI summary report to manager
              </span>
            </div>
            {/* Logic Badge Tag */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
              <Zap className="size-3 text-blue-600" />
              <span>IF checked → Trigger Slack Notification</span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: RIGHT PROPERTIES PANEL */}
        <div className="col-span-3 border-l border-slate-200 dark:border-slate-800 p-3.5 space-y-4 bg-white dark:bg-slate-900 hidden lg:block">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>Field Settings</span>
            <Sliders className="size-3 text-slate-400" />
          </div>

          {/* Setting 1: Label */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Field Label
            </label>
            <div className="h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 flex items-center bg-slate-50 dark:bg-slate-950">
              Full Name
            </div>
          </div>

          {/* Setting 2: Placeholder */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Placeholder
            </label>
            <div className="h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center bg-white dark:bg-slate-900">
              e.g. Alex Morgan
            </div>
          </div>

          {/* Setting 3: Required Switch */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Required Field
            </span>
            <div className="w-8 h-4 rounded-full bg-blue-600 p-0.5 flex justify-end cursor-pointer">
              <div className="size-3 rounded-full bg-white shadow-2xs" />
            </div>
          </div>

          {/* Setting 4: AI Validation */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Sparkles className="size-3" /> AI Smart Validation
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">
              Auto-formats capitalized names and strips special symbols.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 pb-20 px-4 sm:px-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200/80 dark:border-slate-800">
      {/* React Bits Interactive DotField Canvas Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-60"></div>

      {/* CONTINUOUS HERO CONTAINER */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
        {/* Main Hero Headline */}
        <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.06]">
          Your smartest forms,
          <br />
          <span className="text-blue-600">built by AI in minutes.</span>
        </h1>

        {/* Supporting Copy (Max 2 lines) */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Describe your form or workflow in plain English. Gemini 1.5 generates complete multi-step
          forms, logic rules, and validation automatically.
        </p>

        {/* Primary & Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            size="lg"
            className="h-12 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md transition-all pointer-events-auto"
            asChild
          >
            <Link href="/signup">
              Start Free <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-7 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 pointer-events-auto"
            asChild
          >
            <Link href="/demo">Live Interactive Demo</Link>
          </Button>
        </div>

        {/* Trust Telemetry Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-blue-600" /> 3 Free Forms
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-blue-600" /> 100 AI Credits
          </span>
          <span className="flex items-center gap-1.5">
            <KeyRound className="size-3.5 text-blue-600" /> BYOK (Gemini API)
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-blue-600" /> Private Passcodes
          </span>
        </div>

        {/* SEAMLESS FLOATING PRODUCT PREVIEW (Overlaps continuous hero naturally) */}
        <div className="w-full pt-10 sm:pt-14 relative z-20 pointer-events-auto">
          {/* Soft Top Radial Dissolve Mask to blend background smoothly under text */}
          <div className="absolute -top-12 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent pointer-events-none z-10" />

          {/* FormCanvas IDE App Window */}
          <FormCanvasIdePreview />
        </div>
      </div>
    </section>
  );
}
