import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  LayoutTemplate,
  Loader2,
  MessageSquareHeart,
  Briefcase,
  CalendarDays,
  GraduationCap,
  Headphones,
  Bug,
  Smile,
  ShoppingBag,
  HeartPulse,
  Wrench,
  PartyPopper,
  Building2,
} from "lucide-react";

export interface TemplateCardProps {
  title: string;
  description: string;
  slug?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  gradient?: string;
  iconColor?: string;
}

interface TemplateMeta {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  iconColor: string;
  glowColor: string;
  pattern: React.ReactNode;
}

const TEMPLATE_META_MAP: Record<string, TemplateMeta> = {
  "customer-feedback": {
    icon: MessageSquareHeart,
    gradient: "from-rose-500/20 via-pink-500/15 to-purple-600/20",
    iconColor: "text-rose-500 dark:text-rose-400",
    glowColor: "group-hover:border-rose-500/40 group-hover:shadow-rose-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path
          d="M20 40 Q50 10 90 40 T160 30 T190 70"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="text-rose-400"
        />
        <circle
          cx="150"
          cy="30"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-pink-400"
        />
        <path
          d="M145 28 L155 28 M150 23 L150 33"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-rose-400"
        />
        <path
          d="M30 80 Q60 110 100 85 T170 95"
          stroke="currentColor"
          strokeWidth="2"
          className="text-purple-400"
        />
        <circle cx="45" cy="85" r="8" fill="currentColor" className="text-rose-300/40" />
      </svg>
    ),
  },
  "job-application": {
    icon: Briefcase,
    gradient: "from-blue-600/20 via-indigo-500/15 to-cyan-500/20",
    iconColor: "text-blue-500 dark:text-blue-400",
    glowColor: "group-hover:border-blue-500/40 group-hover:shadow-blue-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <line
          x1="0"
          y1="30"
          x2="200"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 6"
          className="text-blue-400"
        />
        <line
          x1="0"
          y1="70"
          x2="200"
          y2="70"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 6"
          className="text-indigo-400"
        />
        <rect
          x="25"
          y="20"
          width="40"
          height="50"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400"
        />
        <line
          x1="33"
          y1="32"
          x2="57"
          y2="32"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-cyan-400"
        />
        <line
          x1="33"
          y1="42"
          x2="52"
          y2="42"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-cyan-400"
        />
        <circle
          cx="160"
          cy="65"
          r="18"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-indigo-400"
        />
        <path
          d="M153 65 L158 70 L168 60"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400"
        />
      </svg>
    ),
  },
  "event-registration": {
    icon: CalendarDays,
    gradient: "from-amber-500/20 via-orange-500/15 to-red-500/20",
    iconColor: "text-amber-500 dark:text-amber-400",
    glowColor: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <circle
          cx="100"
          cy="60"
          r="50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-amber-400"
        />
        <circle
          cx="100"
          cy="60"
          r="30"
          stroke="currentColor"
          strokeWidth="1"
          className="text-orange-400"
        />
        <path
          d="M20 20 L40 40 M180 20 L160 40 M20 100 L40 80 M180 100 L160 80"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-amber-300"
        />
      </svg>
    ),
  },
  "course-enrollment": {
    icon: GraduationCap,
    gradient: "from-emerald-500/20 via-teal-500/15 to-green-600/20",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    glowColor: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <ellipse
          cx="100"
          cy="60"
          rx="80"
          ry="35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          className="text-emerald-400"
        />
        <polygon
          points="100,25 150,45 100,65 50,45"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-teal-400"
        />
        <circle cx="35" cy="60" r="6" fill="currentColor" className="text-emerald-400/40" />
        <circle cx="165" cy="60" r="6" fill="currentColor" className="text-teal-400/40" />
      </svg>
    ),
  },
  "contact-us": {
    icon: Headphones,
    gradient: "from-violet-500/20 via-purple-500/15 to-indigo-600/20",
    iconColor: "text-violet-500 dark:text-violet-400",
    glowColor: "group-hover:border-violet-500/40 group-hover:shadow-violet-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path
          d="M10 60 Q 30 20, 50 60 T 90 60 T 130 60 T 170 60 T 190 60"
          stroke="currentColor"
          strokeWidth="2"
          className="text-violet-400"
        />
        <path
          d="M10 60 Q 30 100, 50 60 T 90 60 T 130 60 T 170 60 T 190 60"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="text-purple-400"
        />
        <rect
          x="145"
          y="20"
          width="30"
          height="22"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-indigo-400"
        />
        <path
          d="M145 20 L160 32 L175 20"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-indigo-400"
        />
      </svg>
    ),
  },
  "bug-report": {
    icon: Bug,
    gradient: "from-red-500/20 via-rose-500/15 to-orange-600/20",
    iconColor: "text-red-500 dark:text-red-400",
    glowColor: "group-hover:border-red-500/40 group-hover:shadow-red-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <polygon
          points="100,15 140,35 140,85 100,105 60,85 60,35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-red-400"
        />
        <path
          d="M25 35 L45 35 L55 50"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-rose-400"
        />
        <path
          d="M175 35 L155 35 L145 50"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-rose-400"
        />
        <circle
          cx="100"
          cy="60"
          r="18"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-orange-400"
        />
      </svg>
    ),
  },
  "employee-satisfaction": {
    icon: Smile,
    gradient: "from-sky-500/20 via-cyan-500/15 to-teal-500/20",
    iconColor: "text-sky-500 dark:text-sky-400",
    glowColor: "group-hover:border-sky-500/40 group-hover:shadow-sky-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <circle
          cx="40"
          cy="40"
          r="25"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-sky-400"
        />
        <circle
          cx="160"
          cy="40"
          r="25"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-cyan-400"
        />
        <circle
          cx="100"
          cy="80"
          r="30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-teal-400"
        />
        <path
          d="M90 75 Q100 88 110 75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-sky-400"
        />
      </svg>
    ),
  },
  "product-preorder": {
    icon: ShoppingBag,
    gradient: "from-fuchsia-500/20 via-pink-500/15 to-rose-500/20",
    iconColor: "text-fuchsia-500 dark:text-fuchsia-400",
    glowColor: "group-hover:border-fuchsia-500/40 group-hover:shadow-fuchsia-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path
          d="M100 20 L140 40 L100 60 L60 40 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-fuchsia-400"
        />
        <path
          d="M60 40 L60 80 L100 100 L100 60"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-pink-400"
        />
        <path
          d="M140 40 L140 80 L100 100"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-rose-400"
        />
        <circle cx="30" cy="30" r="4" fill="currentColor" className="text-fuchsia-400/50" />
        <circle cx="170" cy="90" r="6" fill="currentColor" className="text-pink-400/50" />
      </svg>
    ),
  },
  "patient-intake": {
    icon: HeartPulse,
    gradient: "from-teal-500/20 via-emerald-500/15 to-cyan-600/20",
    iconColor: "text-teal-500 dark:text-teal-400",
    glowColor: "group-hover:border-teal-500/40 group-hover:shadow-teal-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path
          d="M0 60 L50 60 L60 30 L75 90 L90 45 L105 70 L115 60 L200 60"
          stroke="currentColor"
          strokeWidth="2"
          className="text-teal-400"
        />
        <path
          d="M150 25 V45 M140 35 H160"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-emerald-400"
        />
      </svg>
    ),
  },
  "it-helpdesk-ticket": {
    icon: Wrench,
    gradient: "from-blue-500/20 via-sky-500/15 to-indigo-500/20",
    iconColor: "text-blue-500 dark:text-blue-400",
    glowColor: "group-hover:border-blue-500/40 group-hover:shadow-blue-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path
          d="M20 20 H70 V50 H20 Z M130 70 H180 V100 H130 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="text-blue-400"
        />
        <path
          d="M70 35 H100 V85 H130"
          stroke="currentColor"
          strokeWidth="2"
          className="text-indigo-400"
        />
        <circle cx="100" cy="35" r="4" fill="currentColor" className="text-sky-400" />
        <circle cx="100" cy="85" r="4" fill="currentColor" className="text-blue-400" />
      </svg>
    ),
  },
  "rsvp-event-planning": {
    icon: PartyPopper,
    gradient: "from-amber-400/25 via-yellow-500/20 to-orange-500/25",
    iconColor: "text-amber-500 dark:text-amber-400",
    glowColor: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <path
          d="M30 90 Q 60 40 90 80 T 150 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="5 5"
          className="text-amber-400"
        />
        <polygon
          points="30,20 35,30 45,30 37,36 40,46 30,40 20,46 23,36 15,30 25,30"
          fill="currentColor"
          className="text-yellow-400/50"
        />
        <polygon
          points="160,70 163,77 170,77 165,82 167,89 160,85 153,89 155,82 150,77 157,77"
          fill="currentColor"
          className="text-orange-400/50"
        />
        <circle cx="100" cy="30" r="5" fill="currentColor" className="text-amber-300" />
      </svg>
    ),
  },
  "client-onboarding": {
    icon: Building2,
    gradient: "from-indigo-500/20 via-violet-500/15 to-blue-600/20",
    iconColor: "text-indigo-500 dark:text-indigo-400",
    glowColor: "group-hover:border-indigo-500/40 group-hover:shadow-indigo-500/20",
    pattern: (
      <svg
        className="absolute inset-0 size-full opacity-20 group-hover:opacity-35 transition-all duration-500 group-hover:scale-110"
        viewBox="0 0 200 120"
        fill="none"
      >
        <rect
          x="30"
          y="20"
          width="50"
          height="80"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-indigo-400"
        />
        <rect
          x="105"
          y="40"
          width="65"
          height="60"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-violet-400"
        />
        <line
          x1="42"
          y1="35"
          x2="68"
          y2="35"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-indigo-300"
        />
        <line
          x1="42"
          y1="50"
          x2="68"
          y2="50"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-indigo-300"
        />
        <line
          x1="117"
          y1="55"
          x2="158"
          y2="55"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-violet-300"
        />
      </svg>
    ),
  },
};

const DEFAULT_META: TemplateMeta = {
  icon: LayoutTemplate,
  gradient: "from-slate-500/15 via-muted/40 to-slate-600/20",
  iconColor: "text-muted-foreground",
  glowColor: "group-hover:border-primary/40 group-hover:shadow-primary/10",
  pattern: (
    <svg
      className="absolute inset-0 size-full opacity-15 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110"
      viewBox="0 0 200 120"
      fill="none"
    >
      <rect
        x="20"
        y="20"
        width="160"
        height="80"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        className="text-muted-foreground"
      />
      <circle
        cx="100"
        cy="60"
        r="20"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted-foreground"
      />
    </svg>
  ),
};

export function TemplateCard({
  title,
  description,
  slug,
  onClick,
  isLoading = false,
  disabled = false,
  icon: CustomIcon,
  gradient: customGradient,
  iconColor: customIconColor,
}: TemplateCardProps) {
  const inactive = disabled || isLoading;
  const meta = (slug && TEMPLATE_META_MAP[slug]) || DEFAULT_META;

  const IconComponent = CustomIcon || meta.icon;
  const gradientClass = customGradient || meta.gradient;
  const iconColorClass = customIconColor || meta.iconColor;

  return (
    <Card
      role="button"
      tabIndex={inactive ? -1 : 0}
      onClick={inactive ? undefined : onClick}
      className={[
        "group flex h-full flex-col overflow-hidden rounded-xl border bg-background transition-all duration-300",
        inactive ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-primary/40 ",
      ].join(" ")}
    >
      {/* Banner Preview */}
      <div
        className={`relative flex h-36 items-center justify-center overflow-hidden border-b bg-gradient-to-br ${gradientClass} transition-all duration-500`}
      >
        {/* Dynamic SVG Background Pattern */}
        {meta.pattern}

        {/* Center Icon Badge */}
        <div
          className={`relative z-10 flex size-14 items-center justify-center rounded-xl border bg-background/90 backdrop-blur-md shadow-sm transition-all  group-hover:-translate-y-0.5 ${meta.glowColor}`}
        >
          <IconComponent
            className={`size-7 ${iconColorClass} transition-transform duration-300 `}
          />
        </div>
      </div>

      <CardHeader className="flex-1 space-y-2">
        <CardTitle className="line-clamp-1 text-base font-semibold transition-colors duration-200 group-hover:text-primary">
          {title}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm leading-6">{description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          variant="ghost"
          disabled={inactive}
          className="pointer-events-none w-full justify-between px-0 hover:bg-transparent"
        >
          {isLoading ? (
            <>
              <span className="text-sm font-medium text-primary">Creating form...</span>
              <Loader2 className="size-4 animate-spin text-primary" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium transition-colors duration-200 group-hover:text-primary">
                Use template
              </span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
