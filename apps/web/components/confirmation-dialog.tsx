"use client";

import * as React from "react";
import {
  Archive,
  CirclePlus,
  EyeOff,
  Globe,
  Loader2,
  Pencil,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export type AlertVariant =
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "unpublish"
  | "archive"
  | "warning";

export interface ReusableConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: AlertVariant;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig: Record<
  AlertVariant,
  {
    icon: React.ReactNode;
    confirmClassName: string;
    defaultText: string;
  }
> = {
  create: {
    icon: <CirclePlus className="size-5 text-blue-600 dark:text-blue-400" />,
    confirmClassName:
      "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700",
    defaultText: "Create",
  },
  update: {
    icon: <Pencil className="size-5 text-blue-600 dark:text-blue-400" />,
    confirmClassName:
      "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700",
    defaultText: "Save",
  },
  delete: {
    icon: <Trash2 className="size-5 text-red-600 dark:text-red-400" />,
    confirmClassName:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    defaultText: "Delete",
  },
  publish: {
    icon: <Globe className="size-5 text-emerald-600 dark:text-emerald-400" />,
    confirmClassName:
      "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700",
    defaultText: "Publish",
  },
  unpublish: {
    icon: <EyeOff className="size-5 text-amber-600 dark:text-amber-400" />,
    confirmClassName:
      "bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700",
    defaultText: "Unpublish",
  },
  archive: {
    icon: <Archive className="size-5 text-slate-600 dark:text-slate-400" />,
    confirmClassName:
      "bg-slate-700 hover:bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-800",
    defaultText: "Archive",
  },
  warning: {
    icon: <TriangleAlert className="size-5 text-amber-500" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700 text-white",
    defaultText: "Continue",
  },
};

export function ConfirmationDialogUI({
  open,
  onOpenChange,
  variant = "warning",
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ReusableConfirmationDialogProps) {
  const current = variantConfig[variant] || variantConfig.warning;

  return (
    <AlertDialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
      <AlertDialogContent className="sm:max-w-md rounded-2xl p-6 border border-border bg-card">
        <AlertDialogHeader className="space-y-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-muted/50">
            {current.icon}
          </div>

          <AlertDialogTitle className="text-lg font-bold tracking-tight text-foreground">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 mt-6 sm:justify-end">
          <AlertDialogCancel
            disabled={loading}
            onClick={onCancel}
            className="rounded-lg h-10 font-medium"
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              if (!loading) onConfirm();
            }}
            disabled={loading}
            className={`rounded-lg h-10 font-medium ${current.confirmClassName}`}
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {confirmText ?? current.defaultText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
