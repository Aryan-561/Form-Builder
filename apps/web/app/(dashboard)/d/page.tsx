"use client";

import * as React from "react";
import {
  FileText,
  MessageSquare,
  TrendingUp,
  PlusCircle,
  LayoutTemplate,
  MoreVertical,
  Calendar,
  Box,
  Brain,
  Loader2,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/navigation";
import { AiGenerateFormDialog } from "~/components/ai-generate-form-dialog";
import { CreateFormButton } from "~/components/create-form-button";
import { trpc } from "~/trpc/client";
import { useMe } from "~/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const FILTER_LABELS = {
  today: "Today",
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
};

function getRelativeTime(dateString: string | Date | undefined): string {
  if (!dateString) return "unknown";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) return "just now";
  if (diffInMins < 60) return `${diffInMins}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "yesterday";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<"today" | "7d" | "30d">("30d");

  // Fetch current login user name
  const { data: userData, isLoading: isUserLoading } = useMe();
  const userName = userData?.fullName || "User";

  // Fetch analytics stats in real-time
  const { data: stats, isLoading: isStatsLoading } = trpc.analytics.getDashboardStats.useQuery({
    filter,
  });

  if (isStatsLoading || isUserLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalForms = stats?.forms.totalForms ?? 0;
  const totalResponses = stats?.responses.totalResponses ?? 0;
  const avgResponsesPerForm = stats?.analytics.avgResponsesPerForm ?? 0;
  const bestPerformingForm = stats?.analytics.bestPerformingForm;

  // Always force exactly 7 items in the trend response chart
  const rawTrend = stats?.analytics.responseTrend ?? [];
  let responseTrend = [...rawTrend];
  if (responseTrend.length > 7) {
    responseTrend = responseTrend.slice(-7);
  } else if (responseTrend.length < 7) {
    const paddingCount = 7 - responseTrend.length;
    const padding = Array.from({ length: paddingCount }, (_, i) => ({
      label: `Day ${i + 1}`,
      timestamp: `pad-${i}`,
      count: 0,
    }));
    responseTrend = [...padding, ...responseTrend];
  }
  const maxCount = Math.max(...responseTrend.map((pt) => pt.count), 1);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-sans text-3xl font-bold text-foreground">Good morning, {userName}</h2>
          <p className="text-lg text-muted-foreground mt-1">
            Here's what's happening with your forms today.
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              {FILTER_LABELS[filter]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {Object.entries(FILTER_LABELS).map(([key, label]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className="cursor-pointer"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Forms
              </span>
              <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight tracking-tight text-foreground">
                {totalForms}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mt-1.5">
                <span>{stats?.forms.publishedForms ?? 0} active forms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Responses
              </span>
              <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight tracking-tight text-foreground">
                {totalResponses.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-600 mt-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>
                  {(stats?.analytics.responseGrowthPercentage ?? 0 >= 0) ? "+" : ""}
                  {stats?.analytics.responseGrowthPercentage ?? 0}% vs last period
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avg Responses/Form Card */}
        <Card className="shadow-sm border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Avg Responses / Form
              </span>
              <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold leading-tight tracking-tight text-foreground">
                {avgResponsesPerForm.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mt-1.5">
                <span>Average responses per form</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Performing Form Card */}
        <Card className="shadow-sm border-border hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Best Performing
              </span>
              <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-lg font-bold leading-tight truncate text-foreground">
                {bestPerformingForm?.title
                  ? bestPerformingForm.title.length > 20
                    ? `${bestPerformingForm.title.slice(0, 20)}...`
                    : bestPerformingForm.title
                  : "N/A"}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-amber-600 mt-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{bestPerformingForm?.responseCount ?? 0} responses</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Graph (always shows exactly 7 days with primary blue bars) */}
        <Card className="lg:col-span-2 shadow-sm border-border hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Response Trends</CardTitle>
                <CardDescription>Engagement over last 7 days</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-medium text-primary">Responses</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-between flex-1 pb-6">
            <div className="flex items-end gap-3 mt-4 flex-1">
              {/* Y-axis Labels */}
              <div className="h-64 flex flex-col justify-between text-[10px] text-muted-foreground/60 select-none pb-5 pr-2 font-mono text-right w-8 shrink-0">
                <span>{maxCount}</span>
                <span>{Math.round(maxCount / 2)}</span>
                <span>0</span>
              </div>

              {/* Chart container */}
              <div className="flex-1 h-64 flex items-end justify-between gap-3 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-b border-border w-full h-px"></div>
                  <div className="border-b border-border w-full h-px"></div>
                  <div className="border-b border-border w-full h-px"></div>
                  <div className="border-b border-border w-full h-px"></div>
                </div>

                {responseTrend.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                    No response trend data available
                  </div>
                ) : (
                  responseTrend.map((pt, idx) => {
                    const heightPercentage = maxCount > 0 ? (pt.count / maxCount) * 85 : 5;
                    return (
                      <div
                        key={pt.timestamp || idx}
                        className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300 rounded-t-md shadow-sm relative group cursor-pointer"
                        style={{ height: `${Math.max(heightPercentage, 5)}%` }}
                      >
                        {/* Hover Tooltip */}
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-popover border border-border text-popover-foreground text-[11px] font-semibold py-1 px-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-30 font-mono">
                          {pt.count}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {/* X-axis Labels */}
            <div className="flex justify-between mt-3 text-xs font-semibold text-muted-foreground pl-10 pr-2">
              {responseTrend.map((pt, idx) => (
                <span key={pt.timestamp || idx} className="flex-1 text-center truncate">
                  {pt.label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col justify-between gap-3.5 h-full">
          {/* AI Generate */}
          <AiGenerateFormDialog>
            <button
              className="
                group relative overflow-hidden
                flex-1 w-full
                rounded-2xl
                border border-border/60
                bg-gradient-to-br from-background via-card to-muted/30
                p-5
                flex flex-row items-center gap-4
                text-left
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                hover:shadow-md
                hover:border-primary/30
                active:scale-[0.99]
              "
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-violet-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                <Brain className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold tracking-tight">Generate with AI</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  Describe your form in plain English and let AI build every field instantly.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
            </button>
          </AiGenerateFormDialog>

          {/* Blank Form */}
          <CreateFormButton
            className="
              group relative overflow-hidden
              flex-1 w-full
              rounded-2xl
              border border-primary/20
              bg-gradient-to-br from-primary/5 via-background to-primary/10
              p-5
              flex flex-row items-center gap-4
              text-left
              font-normal
              transition-all duration-300 ease-out
              hover:-translate-y-0.5
              hover:shadow-md
              hover:border-primary/40
              active:scale-[0.99]
            "
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold tracking-tight">Create Blank Form</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                Start from scratch with our powerful drag-and-drop builder.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </CreateFormButton>

          {/* Templates */}
          <button
            onClick={() => router.push("/t")}
            className="
              group relative overflow-hidden
              flex-1 w-full
              rounded-2xl
              border border-border/60
              bg-gradient-to-br from-background via-card to-muted/30
              p-5
              flex flex-row items-center gap-4
              text-left
              transition-all duration-300 ease-out
              hover:-translate-y-0.5
              hover:shadow-md
              hover:border-primary/30
              active:scale-[0.99]
            "
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 via-primary to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-3 bg-muted text-muted-foreground rounded-xl shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold tracking-tight">Browse Templates</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                Choose from professionally designed, high-converting templates.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Recent Forms Table */}
      <Card className="shadow-sm border-border">
        <div className="px-8 py-6 flex justify-between items-center border-b border-border">
          <h3 className="font-sans text-xl font-bold text-foreground">Recent Forms</h3>
          <Button
            variant="link"
            className="text-primary font-bold"
            onClick={() => router.push("/f")}
          >
            View All
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground text-right">
                Responses
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground text-right">
                Views
              </TableHead>
              <TableHead className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Last Updated
              </TableHead>
              <TableHead className="px-8 py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats?.recentData.recentCreatedForms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                  No recent forms found.
                </TableCell>
              </TableRow>
            ) : (
              stats?.recentData.recentCreatedForms.slice(0, 5).map((form) => (
                <TableRow
                  key={form.id}
                  onClick={() => router.push(`/b/${form.id}`)}
                  className="hover:bg-accent/50 cursor-pointer transition-colors group"
                >
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Box className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-semibold">{form.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <Badge
                      variant="outline"
                      className={
                        form.status === "publish"
                          ? "bg-green-100/50 text-green-700 border-green-200"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {form.status === "publish" ? "Active" : form.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right font-sans font-medium">
                    {form.totalResponses}
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right font-sans font-medium">
                    {form.totalViews}
                  </TableCell>
                  <TableCell className="px-8 py-5 text-sm text-muted-foreground">
                    {getRelativeTime(form.updatedAt)}
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
