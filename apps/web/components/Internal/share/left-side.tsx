import { Info } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export type FormStatusType = "draft" | "publish" | "private" | "unpublish";

interface ShareModalLeftSideProps {
  status: FormStatusType;
  setStatus: (status: FormStatusType) => void;
  accessCode: string;
  setAccessCode: (code: string) => void;
}

export function ShareModalLeftSide({
  status,
  setStatus,
  accessCode,
  setAccessCode,
}: ShareModalLeftSideProps) {
  return (
    <div className="flex-1 p-6 md:border-r border-border space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3 text-foreground">Publish Status</h3>
        <div className="flex items-center p-1 bg-muted/60 rounded-xl w-full border border-border/50">
          <button
            type="button"
            onClick={() => setStatus("draft")}
            className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all ${
              status === "draft" || status === "unpublish"
                ? "bg-background shadow-sm text-foreground font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Draft
          </button>
          <button
            type="button"
            onClick={() => setStatus("publish")}
            className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all ${
              status === "publish"
                ? "bg-background shadow-sm text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Public
          </button>
          <button
            type="button"
            onClick={() => setStatus("private")}
            className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all ${
              status === "private"
                ? "bg-background shadow-sm text-foreground font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Private
          </button>
        </div>
      </div>

      {/* Access Code Input when Status is Private */}
      {status === "private" && (
        <div className="space-y-2 bg-muted/40 p-4 rounded-xl border border-border">
          <Label htmlFor="accessCode" className="text-xs font-semibold text-foreground">
            Access Code (Min 6 Characters) *
          </Label>
          <Input
            id="accessCode"
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter passcode..."
            className="bg-background text-sm h-9 rounded-lg"
          />
          <p className="text-[11px] text-muted-foreground">
            Viewers must enter this access code to view and fill out the form.
          </p>
        </div>
      )}

      <div className="bg-muted/30 border border-border rounded-xl p-4 flex gap-3 text-sm">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-muted-foreground leading-relaxed">
          {status === "draft" || status === "unpublish"
            ? "Your form is currently in draft. It is not accessible to anyone."
            : status === "publish"
              ? "Your form is currently live and collecting responses."
              : "Your form is private. Only specific people with the passcode can access it."}
        </div>
      </div>
    </div>
  );
}
