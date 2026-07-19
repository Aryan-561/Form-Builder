import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ShareModalLeftSide } from "./left-side";
import { ShareModalRightSide } from "./right-side";

export function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"draft" | "public" | "private">("public");

  const isEnabled = status === "public" || status === "private";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl p-0 overflow-hidden bg-card border-border">
        <DialogHeader className="p-6 pb-4 border-b border-border text-left">
          <DialogTitle className="text-xl font-bold">Share your form</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Choose how you want people to access your content.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row">
          <ShareModalLeftSide status={status} setStatus={setStatus} />
          <ShareModalRightSide isEnabled={isEnabled} />
        </div>

        <DialogFooter className="p-4 border-t border-border bg-muted/10 sm:justify-end gap-2 flex-col sm:flex-row">
          <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto font-medium">
            Close
          </Button>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-medium">
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
