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

type ConfirmationType =
  | "create"
  | "update"
  | "delete"
  | "publish"
  | "unpublish"
  | "archive"
  | "warning";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  type?: ConfirmationType;

  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;

  onConfirm: () => Promise<void> | void;
}

const config: Record<
  ConfirmationType,
  {
    icon: React.ReactNode;
    confirmClassName: string;
    defaultText: string;
  }
> = {
  create: {
    icon: <CirclePlus className="size-5 text-blue-600" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700",
    defaultText: "Create",
  },
  update: {
    icon: <Pencil className="size-5 text-blue-600" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700",
    defaultText: "Save",
  },
  delete: {
    icon: <Trash2 className="size-5 text-red-600" />,
    confirmClassName: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    defaultText: "Delete",
  },
  publish: {
    icon: <Globe className="size-5 text-green-600" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700",
    defaultText: "Publish",
  },
  unpublish: {
    icon: <EyeOff className="size-5 text-orange-600" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700",
    defaultText: "Unpublish",
  },
  archive: {
    icon: <Archive className="size-5 text-slate-600" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700",
    defaultText: "Archive",
  },
  warning: {
    icon: <TriangleAlert className="size-5 text-yellow-600" />,
    confirmClassName: "bg-blue-600 hover:bg-blue-700",
    defaultText: "Continue",
  },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  type = "warning",
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  loading = false,
  onConfirm,
}: ConfirmationDialogProps) {
  const current = config[type];

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      // Keep dialog open if mutation fails.
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border bg-muted">
            {current.icon}
          </div>

          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={current.confirmClassName}
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}

            {confirmText ?? current.defaultText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
