"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Eye, Trash2, BarChart2, Calendar } from "lucide-react";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { useDeleteForm } from "~/hooks/use-form";

interface FormCardProps {
  id: string;
  title: string;
  description: string | null;
  status: "draft" | "publish" | "private" | "unpublish";
  createdAt: Date;
  updatedAt: Date;
}

const statusConfig = {
  draft: {
    label: "Draft",
    className:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
  publish: {
    label: "Published",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60",
  },
  private: {
    label: "Private",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60",
  },
  unpublish: {
    label: "Unpublished",
    className:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  },
} as const;

function formatUpdated(date: Date) {
  const now = new Date();
  const target = new Date(date);
  const diff = now.getTime() - target.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return target.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function FormCard({ id, title, description, status, createdAt, updatedAt }: FormCardProps) {
  const router = useRouter();
  const deleteFormMutation = useDeleteForm();

  const statusMeta = statusConfig[status];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.promise(deleteFormMutation.mutateAsync({ formId: id }), {
      loading: "Deleting form...",
      success: "Form deleted successfully!",
      error: (err) => err?.message || "Failed to delete form.",
    });
  };

  return (
    <Card
      onClick={() => router.push(`/builder/${id}`)}
      className="
        group
        relative
        cursor-pointer
        rounded-xl
        border
        border-slate-200/80
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-6
        shadow-none
        transition-all
        duration-200
        hover:border-blue-500/40
        hover:shadow-xs
      "
    >
      <div className="flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={cn(
            "rounded-md border px-2.5 py-0.5 text-xs font-medium tracking-tight",
            statusMeta.className,
          )}
        >
          {statusMeta.label}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.stopPropagation()}
              className="size-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
            className="w-40 rounded-lg"
          >
            <DropdownMenuItem onClick={() => router.push(`/builder/${id}`)}>
              <Pencil className="mr-2 size-4 text-blue-600" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/p/${id}`)}>
              <Eye className="mr-2 size-4 text-slate-500" />
              Preview
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/a/${id}`)}>
              <BarChart2 className="mr-2 size-4 text-slate-500" />
              Analytics
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 dark:text-red-400"
              disabled={deleteFormMutation.isPending}
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 size-4" />
              {deleteFormMutation.isPending ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-5 space-y-1.5">
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 min-h-[2.5rem]">
          {description || "No description provided."}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar className="size-3.5" /> Updated {formatUpdated(updatedAt)}
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-medium text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
          Open Builder →
        </span>
      </div>
    </Card>
  );
}
