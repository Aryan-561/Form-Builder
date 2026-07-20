"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Eye, Trash2, BarChart2, MoreVertical } from "lucide-react";

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
    className: "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
  },
  publish: {
    label: "Published",
    className: "border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400",
  },
  private: {
    label: "Private",
    className: "border-amber-200 text-amber-600 dark:border-amber-800 dark:text-amber-400",
  },
  unpublish: {
    label: "Unpublished",
    className: "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
  },
} as const;

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

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

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (target.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  if (days < 7) {
    return target.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  return target.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function FormCard({ id, title, description, status, createdAt, updatedAt }: FormCardProps) {
  const router = useRouter();

  const statusMeta = statusConfig[status];

  const handleDelete = () => {
    toast.success("Form deleted (Mock)");
  };

  return (
    <Card
      onClick={() => router.push(`/builder/${id}`)}
      className="
        group
        cursor-pointer
        rounded-2xl
        border
        border-border/70
        bg-background
        p-7
        shadow-none
        transition-all
        duration-200
        hover:border-primary/30
      "
    >
      <div className="flex items-start justify-between">
        <Badge
          variant="outline"
          className={cn(
            "rounded-lg border px-2.5 py-1 text-[11px] font-medium",
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
              className="
                size-8
                rounded-lg
             
              "
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()} className="w-44">
            <DropdownMenuItem onClick={() => router.push(`/builder?id=${id}`)}>
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/forms/${id}/preview`)}>
              <Eye className="mr-2 size-4" />
              Preview
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push(`/analytics?formId=${id}`)}>
              <BarChart2 className="mr-2 size-4" />
              Analytics
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-6">
        <h3 className="line-clamp-1 text-xl font-semibold tracking-tight">{title}</h3>

        <p className="mt-3 min-h-12 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {description || "No description provided."}
        </p>
      </div>

      <div className="mt-8 border-t pt-5">
        <div className="flex items-start justify-between text-xs">
          <div className="space-y-1">
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium text-foreground">{formatDate(createdAt)}</p>
          </div>

          <div className="space-y-1 text-right">
            <p className="text-muted-foreground">Updated</p>
            <p className="font-medium text-foreground">{formatUpdated(updatedAt)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
