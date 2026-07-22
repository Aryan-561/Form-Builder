import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ShareModalLeftSide, FormStatusType } from "./left-side";
import { ShareModalRightSide } from "./right-side";
import { useForm, useUpdateStatus } from "~/hooks/use-form";
import { useAlert } from "~/hooks/use-alert";

export function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { id } = useParams();
  const formId = id as string;
  const { data: formData } = useForm(formId);
  const updateStatusMutation = useUpdateStatus();
  const alert = useAlert();

  const [status, setStatus] = useState<FormStatusType>("publish");
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    if (formData) {
      setStatus(formData.status as FormStatusType);
      if (formData.accessCode) {
        setAccessCode(formData.accessCode);
      }
    }
  }, [formData]);

  const isEnabled = status === "publish" || status === "private";

  const handleSaveStatus = async () => {
    if (!formId) return;

    if (status === "private" && (!accessCode || accessCode.trim().length < 6)) {
      toast.error("Access code must be at least 6 characters long when status is private.");
      return;
    }

    try {
      await alert.promise({
        variant:
          status === "publish"
            ? "publish"
            : status === "unpublish" || status === "draft"
              ? "unpublish"
              : "update",
        title: "Update Form Status?",
        description: `Are you sure you want to change this form's status to "${status}"?`,
        confirmText: "Update Status",
        action: () =>
          updateStatusMutation.mutateAsync({
            formId,
            status: status as any,
            accessCode: status === "private" ? accessCode.trim() : null,
          }),
        success: "Form status updated successfully!",
        error: (err) => err?.message || "Failed to update status",
        onSuccess: () => {
          onClose();
        },
      });
    } catch {
      // User cancelled
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl p-0 overflow-hidden bg-card border-border">
        <DialogHeader className="p-6 pb-4 border-b border-border text-left">
          <DialogTitle className="text-xl font-bold">Share your form</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Choose how you want people to access your form.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row">
          <ShareModalLeftSide
            status={status}
            setStatus={setStatus}
            accessCode={accessCode}
            setAccessCode={setAccessCode}
          />
          <ShareModalRightSide isEnabled={isEnabled} />
        </div>

        <DialogFooter className="p-4 border-t border-border bg-muted/10 sm:justify-end gap-2 flex-col sm:flex-row">
          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto font-medium">
            Close
          </Button>
          <Button
            onClick={handleSaveStatus}
            disabled={updateStatusMutation.isPending}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-medium"
          >
            {updateStatusMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
