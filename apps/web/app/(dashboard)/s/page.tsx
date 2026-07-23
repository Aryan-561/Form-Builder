"use client";

import { useState } from "react";
import Link from "next/link";
import { useForms } from "~/hooks/use-form";
import { useGetSubmissionsByForm } from "~/hooks/use-submitform";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Inbox,
  Search,
  ArrowRight,
  Calendar,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function FormSubmissionSummaryCard({ form }: { form: any }) {
  const { data: submissions, isLoading } = useGetSubmissionsByForm(form.id);

  const defaultStatusMeta = {
    label: "Draft",
    className: "bg-muted text-muted-foreground border-border",
  };

  const statusConfig: Record<string, { label: string; className: string }> = {
    draft: defaultStatusMeta,
    publish: {
      label: "Published",
      className: "bg-primary/10 text-primary border-primary/20",
    },
    private: {
      label: "Private",
      className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    unpublish: {
      label: "Unpublished",
      className: "bg-muted text-muted-foreground border-border",
    },
  };

  const statusMeta = statusConfig[form.status] ?? defaultStatusMeta;

  return (
    <Card className="group relative rounded-xl border border-border/80 bg-card p-5 shadow-none transition-all duration-200 hover:border-primary/40 hover:shadow-xs flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={`rounded-md border px-2.5 py-0.5 text-xs font-medium ${statusMeta.className}`}
          >
            {statusMeta.label}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium bg-muted/50 px-2 py-0.5 rounded-md border border-border/40">
            <Inbox className="size-3.5 text-primary" />
            <span className="font-bold text-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-6 inline-block" />
              ) : (
                (submissions?.length ?? 0)
              )}
            </span>{" "}
            entries
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {form.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground min-h-[2.25rem]">
            {form.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
          <Calendar className="size-3.5" />
          {form.updatedAt
            ? formatDistanceToNow(new Date(form.updatedAt), { addSuffix: true })
            : "Recently"}
        </span>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="h-8 px-2.5 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
        >
          <Link href={`/s/${form.id}`}>
            View Responses <ArrowRight className="ml-1 size-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export default function SubmissionsPage() {
  const { data: forms, isLoading, isError } = useForms();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredForms = forms?.filter(
    (f: any) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.description && f.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Inbox className="size-5" />
            </div>
            Form Submissions
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Overview and access to collected response data across all your active forms.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl border border-border/80 bg-card p-4 shadow-none">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileSpreadsheet className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Forms</p>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {isLoading ? <Skeleton className="h-6 w-12" /> : (forms?.length ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border/80 bg-card p-4 shadow-none">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Published Forms</p>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {isLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  (forms?.filter((f: any) => f.status === "publish").length ?? 0)
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border/80 bg-card p-4 shadow-none">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Layers className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Form Responses</p>
              <p className="text-xs font-semibold text-foreground mt-1">
                Select form below to view entries
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Filter forms by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-xs rounded-lg border-border"
        />
      </div>

      {/* Forms Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 space-y-4 rounded-xl border border-border">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-muted-foreground text-sm font-medium">
          Failed to load forms. Please try again.
        </div>
      ) : filteredForms?.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-card rounded-xl border border-border">
          <Inbox className="mx-auto size-10 text-muted-foreground/50" />
          <h3 className="text-base font-bold text-foreground">No Forms Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {searchQuery
              ? "No forms match your search query."
              : "Create a form to start receiving and managing submissions."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredForms?.map((form: any) => (
            <FormSubmissionSummaryCard key={form.id} form={form} />
          ))}
        </div>
      )}
    </div>
  );
}
