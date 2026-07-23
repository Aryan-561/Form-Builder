"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm as useFormQuery } from "~/hooks/use-form";
import {
  useGetSubmissionsByForm,
  useGetSubmissionById,
  useDeleteSubmission,
} from "~/hooks/use-submitform";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "~/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Inbox,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  AlertTriangle,
  Clock,
  UserCheck,
  Copy,
  Check,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

function SubmissionDetailSheet({
  submissionId,
  open,
  onOpenChange,
  fields,
}: {
  submissionId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields?: any[];
}) {
  const { data: submission, isLoading, isError } = useGetSubmissionById(submissionId ?? "");
  const deleteMutation = useDeleteSubmission();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!submissionId) return;
    try {
      await deleteMutation.mutateAsync({ submissionId });
      toast.success("Submission deleted successfully!");
      onOpenChange(false);
    } catch {
      toast.error("Failed to delete submission.");
    }
  };

  const handleCopyId = () => {
    if (!submissionId) return;
    navigator.clipboard.writeText(submissionId);
    setCopiedId(true);
    toast.success("Submission ID copied to clipboard");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyValue = (val: string, fieldId: string) => {
    navigator.clipboard.writeText(val);
    setCopiedField(fieldId);
    toast.success("Value copied");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getFieldLabel = (fieldId: string) => {
    const matched = fields?.find((f) => f.id === fieldId);
    return matched?.label || fieldId;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-lg w-full p-0 flex flex-col bg-background border-l border-border shadow-2xl"
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-border space-y-2 bg-muted/20">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border-border"
            >
              ID: {submissionId ? submissionId.slice(0, 12) : "..."}
            </Badge>
            <Button
              onClick={handleCopyId}
              variant="ghost"
              size="icon"
              className="size-7 rounded-md text-muted-foreground hover:text-foreground"
            >
              {copiedId ? (
                <Check className="size-3.5 text-emerald-600" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
          <SheetTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Inbox className="size-5 text-primary" /> Submission Response
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Detailed view of submission entry and recorded field responses.
          </SheetDescription>
        </SheetHeader>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ) : isError || !submission ? (
            <div className="text-center py-12 space-y-3">
              <AlertTriangle className="mx-auto size-8 text-destructive" />
              <p className="text-sm font-medium text-muted-foreground">
                Failed to load submission details.
              </p>
            </div>
          ) : (
            <>
              {/* Submitter Metadata Card */}
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {submission.email ? submission.email[0]?.toUpperCase() : "A"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {submission.email || "Anonymous Submitter"}
                      </p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Mail className="size-3" /> {submission.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                    Recorded
                  </Badge>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3 text-muted-foreground" />
                    {submission.createdAt
                      ? format(new Date(submission.createdAt), "PPP 'at' p")
                      : "Unknown"}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/80">
                    {submission.values?.length || 0} fields
                  </span>
                </div>
              </div>

              {/* Form Responses Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                    <FileText className="size-3.5 text-primary" /> Form Responses
                  </h4>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {submission.values?.length || 0} Answers
                  </span>
                </div>

                {submission.values && submission.values.length > 0 ? (
                  <div className="space-y-3">
                    {submission.values.map(
                      (v: { formFieldId: string; value: string }, idx: number) => {
                        const fieldLabel = getFieldLabel(v.formFieldId);
                        const isCopied = copiedField === v.formFieldId;

                        return (
                          <div
                            key={idx}
                            className="group relative rounded-xl border border-border/80 bg-card p-4 space-y-2 transition-all hover:border-primary/30"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                {fieldLabel}
                              </span>
                              <Button
                                onClick={() => handleCopyValue(v.value, v.formFieldId)}
                                variant="ghost"
                                size="icon"
                                className="size-6 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                              >
                                {isCopied ? (
                                  <Check className="size-3 text-emerald-600" />
                                ) : (
                                  <Copy className="size-3" />
                                )}
                              </Button>
                            </div>
                            <div className="rounded-lg bg-muted/40 p-3 border border-border/40 font-mono text-xs text-foreground leading-relaxed break-words">
                              {v.value}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                    No field answers recorded for this submission.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <SheetFooter className="p-4 border-t border-border bg-muted/20 flex flex-row items-center justify-between gap-2">
          <Button
            variant="destructive"
            size="sm"
            className="h-9 px-3 text-xs rounded-lg gap-1.5"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash2 className="size-3.5" />
            {deleteMutation.isPending ? "Deleting..." : "Delete Entry"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-9 px-4 text-xs rounded-lg"
          >
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function FormSubmissionsPage() {
  const { id } = useParams();
  const formId = id as string;
  const router = useRouter();

  const { data: formData, isLoading: isFormLoading } = useFormQuery(formId);
  const {
    data: submissions,
    isLoading: isSubmissionsLoading,
    isError,
    refetch,
  } = useGetSubmissionsByForm(formId);
  const deleteMutation = useDeleteSubmission();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleOpenDetail = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setSheetOpen(true);
  };

  const handleDeleteSubmission = async (submissionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteMutation.mutateAsync({ submissionId });
      toast.success("Submission deleted.");
    } catch {
      toast.error("Failed to delete submission.");
    }
  };

  const filteredSubmissions = submissions?.filter((sub) => {
    const q = searchQuery.toLowerCase();
    const matchesEmail = sub.email?.toLowerCase().includes(q);
    const matchesId = sub.id.toLowerCase().includes(q);
    const matchesValue = sub.values.some((v) => v.value.toLowerCase().includes(q));
    return matchesEmail || matchesId || matchesValue;
  });

  const isLoading = isFormLoading || isSubmissionsLoading;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              href="/s"
              className="flex items-center gap-1 hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="size-3.5" /> Submissions
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <span className="font-semibold text-foreground">
              {formData?.title || "Form Responses"}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Inbox className="size-5" />
            </div>
            {isFormLoading ? (
              <Skeleton className="h-7 w-48" />
            ) : (
              formData?.title || "Form Submissions"
            )}
          </h1>
          <p className="text-xs text-muted-foreground max-w-xl">
            {formData?.description || "Review and manage all submitted entries for this form."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs rounded-lg gap-1.5 border-border"
          >
            <RefreshCw className="size-3.5" /> Refresh
          </Button>
          {formData && (
            <Button
              onClick={() => router.push(`/b/${formId}`)}
              size="sm"
              className="h-8 px-3 text-xs rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-1.5 shadow-sm"
            >
              <ExternalLink className="size-3.5" /> Edit Builder
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl border border-border/80 bg-card p-4 shadow-none">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Inbox className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Responses</p>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {isLoading ? <Skeleton className="h-6 w-12" /> : (submissions?.length ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border/80 bg-card p-4 shadow-none">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <UserCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Known Emails</p>
              <p className="text-xl font-bold text-foreground mt-0.5">
                {isLoading ? (
                  <Skeleton className="h-6 w-12" />
                ) : (
                  (submissions?.filter((s) => Boolean(s.email)).length ?? 0)
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border/80 bg-card p-4 shadow-none">
          <CardContent className="p-0 flex items-center gap-4">
            <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Latest Entry</p>
              <p className="text-xs font-semibold text-foreground mt-1">
                {isLoading ? (
                  <Skeleton className="h-4 w-20" />
                ) : submissions && submissions.length > 0 ? (
                  format(new Date(submissions[0]!.createdAt), "MMM d, h:mm a")
                ) : (
                  "No submissions"
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Container */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by email, ID or value..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-lg border-border"
            />
          </div>
          <Badge variant="secondary" className="w-fit text-[11px] px-2.5 py-1 font-medium">
            Showing {filteredSubmissions?.length ?? 0} of {submissions?.length ?? 0} entries
          </Badge>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ) : isError ? (
          <div className="text-center py-12 space-y-3">
            <AlertTriangle className="mx-auto size-8 text-destructive" />
            <p className="text-sm font-medium text-muted-foreground">
              Failed to load submission data for this form.
            </p>
          </div>
        ) : filteredSubmissions?.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Inbox className="mx-auto size-10 text-muted-foreground/50" />
            <h3 className="text-sm font-semibold text-foreground">No Submissions Found</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              {searchQuery
                ? "No submissions match your search query."
                : "This form has not received any response submissions yet."}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs font-semibold w-14">#</TableHead>
                  <TableHead className="text-xs font-semibold">Submitter Email</TableHead>
                  <TableHead className="text-xs font-semibold">Submitted Date</TableHead>
                  <TableHead className="text-xs font-semibold">Values Preview</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions?.map((sub, index) => {
                  const summaryText = sub.values.map((v) => v.value).join(" • ");

                  return (
                    <TableRow
                      key={sub.id}
                      onClick={() => handleOpenDetail(sub.id)}
                      className="cursor-pointer hover:bg-muted/50 transition-colors border-border"
                    >
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-xs font-medium text-foreground">
                        {sub.email ? (
                          <span className="flex items-center gap-1.5">
                            <Mail className="size-3.5 text-primary" />
                            {sub.email}
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">Anonymous</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {format(new Date(sub.createdAt), "MMM d, yyyy • h:mm a")}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                        {summaryText || "No response content"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-end gap-1"
                        >
                          <Button
                            onClick={() => handleOpenDetail(sub.id)}
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            onClick={(e) => handleDeleteSubmission(sub.id, e)}
                            variant="ghost"
                            size="icon"
                            disabled={deleteMutation.isPending}
                            className="size-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Submission Detail Sheet (Drawer) */}
      <SubmissionDetailSheet
        submissionId={selectedSubmissionId}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        fields={formData?.fields}
      />
    </div>
  );
}
