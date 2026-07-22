"use client";

import { Sparkles } from "lucide-react";

// Minimal SVG Illustrations for Each Feature
function AIIllustration() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="200"
        height="60"
        rx="8"
        className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
      />
      <path
        d="M40 40H140"
        className="stroke-slate-300 dark:stroke-slate-700"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 54H100"
        className="stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="160"
        y="35"
        width="45"
        height="30"
        rx="6"
        className="fill-blue-50 dark:fill-blue-950/60 stroke-blue-200 dark:stroke-blue-800"
        strokeWidth="1"
      />
      <circle cx="182.5" cy="50" r="6" className="fill-blue-600" />
      <path
        d="M182.5 40V44M182.5 56V60M172.5 50H176.5M188.5 50H192.5"
        className="stroke-blue-500"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GeminiIllustration() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="200"
        height="60"
        rx="8"
        className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
      />
      <rect
        x="35"
        y="38"
        width="110"
        height="24"
        rx="6"
        className="fill-slate-50 dark:fill-slate-950 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1"
      />
      <circle cx="47" cy="50" r="3" className="fill-blue-600" />
      <circle cx="55" cy="50" r="3" className="fill-blue-600" />
      <circle cx="63" cy="50" r="3" className="fill-blue-600" />
      <rect x="155" y="38" width="50" height="24" rx="6" className="fill-blue-600" />
      <text
        x="180"
        y="54"
        textAnchor="middle"
        className="fill-white text-[10px] font-medium font-sans"
      >
        Active
      </text>
    </svg>
  );
}

function PrivateFormIllustration() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="200"
        height="60"
        rx="8"
        className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
      />
      <rect
        x="75"
        y="38"
        width="90"
        height="24"
        rx="6"
        className="fill-slate-50 dark:fill-slate-950 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1"
      />
      <circle cx="95" cy="50" r="3.5" className="fill-slate-400" />
      <circle cx="107" cy="50" r="3.5" className="fill-slate-400" />
      <circle cx="119" cy="50" r="3.5" className="fill-slate-400" />
      <circle cx="131" cy="50" r="3.5" className="fill-slate-400" />
      <circle cx="143" cy="50" r="3.5" className="fill-blue-600" />
      <rect
        x="40"
        y="40"
        width="20"
        height="20"
        rx="4"
        className="fill-blue-50 dark:fill-blue-950/60 stroke-blue-200 dark:stroke-blue-800"
        strokeWidth="1"
      />
      <path
        d="M47 47V45A3 3 0 0153 45V47M46 47H54V54H46V47Z"
        className="stroke-blue-600"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FreemiumIllustration() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="200"
        height="60"
        rx="8"
        className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
      />
      <rect
        x="35"
        y="44"
        width="130"
        height="12"
        rx="6"
        className="fill-slate-100 dark:fill-slate-800"
      />
      <rect x="35" y="44" width="85" height="12" rx="6" className="fill-blue-600" />
      <text
        x="195"
        y="53"
        textAnchor="end"
        className="fill-slate-600 dark:fill-slate-400 text-xs font-semibold font-sans"
      >
        100 / mo
      </text>
    </svg>
  );
}

function AnalyticsIllustration() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="200"
        height="60"
        rx="8"
        className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="52"
        width="18"
        height="18"
        rx="3"
        className="fill-slate-200 dark:fill-slate-800"
      />
      <rect x="68" y="42" width="18" height="28" rx="3" className="fill-blue-400" />
      <rect x="96" y="34" width="18" height="36" rx="3" className="fill-blue-600" />
      <rect x="124" y="46" width="18" height="24" rx="3" className="fill-blue-300" />
      <path
        d="M155 52L170 42L185 46L200 34"
        className="stroke-blue-600"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DynamicUIIllustration() {
  return (
    <svg
      className="w-full h-24"
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="200"
        height="60"
        rx="8"
        className="fill-white dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
      />
      <rect
        x="35"
        y="35"
        width="75"
        height="14"
        rx="3"
        className="fill-slate-100 dark:fill-slate-800 border border-slate-200 dark:border-slate-700"
      />
      <rect
        x="120"
        y="35"
        width="85"
        height="14"
        rx="3"
        className="fill-blue-50 dark:fill-blue-950/60 border border-blue-200 dark:border-blue-800"
      />
      <rect
        x="35"
        y="55"
        width="170"
        height="14"
        rx="3"
        className="fill-slate-100 dark:fill-slate-800 border border-slate-200 dark:border-slate-700"
      />
    </svg>
  );
}

const features = [
  {
    title: "AI Integration & Generation",
    description:
      "Generate complete forms instantly with AI prompt engineering built directly into the builder workflow.",
    badge: "AI Powered",
    illustration: AIIllustration,
  },
  {
    title: "Gemini API Key Support (BYOK)",
    description:
      "Bring your own Google Gemini API key to override default quotas and get unlimited high-speed AI generation.",
    badge: "Gemini Supported",
    illustration: GeminiIllustration,
  },
  {
    title: "Passcode & Private Forms",
    description:
      "Secure confidential forms with an access code gate. Users must verify the code before viewing or submitting.",
    badge: "Security",
    illustration: PrivateFormIllustration,
  },
  {
    title: "Freemium Credit Allowance",
    description:
      "Start free with 100 AI credits monthly or upgrade for higher volume generation and team collaboration.",
    badge: "Freemium",
    illustration: FreemiumIllustration,
  },
  {
    title: "Real-Time Response Analytics",
    description:
      "Track completion metrics, analyze drop-offs, and inspect user submissions with clean dashboard charts.",
    badge: "Analytics",
    illustration: AnalyticsIllustration,
  },
  {
    title: "Dynamic Input Field Rendering",
    description:
      "Render text, textarea, select, radio, checkbox, and date inputs dynamically from structured schema.",
    badge: "Dynamic UI",
    illustration: DynamicUIIllustration,
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-24 px-6 bg-[#FAFBFC] dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
      id="features"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-medium">
            <Sparkles className="size-3.5 text-blue-600" />
            <span>Next-Gen Platform</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Clean, Minimal & Intelligent
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything required to generate, secure, and deploy dynamic forms with Google Gemini AI
            integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Illustration = feature.illustration;
            return (
              <div
                key={i}
                className="group p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 hover:border-blue-500/40 transition-all duration-300"
              >
                {/* SVG Illustration header */}
                <div className="rounded-lg bg-[#FAFBFC] dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 p-2 group-hover:border-blue-100 dark:group-hover:border-blue-900/40 transition-colors">
                  <Illustration />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
