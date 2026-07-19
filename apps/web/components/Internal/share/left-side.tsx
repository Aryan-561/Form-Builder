import { Info } from "lucide-react";

interface ShareModalLeftSideProps {
  status: "draft" | "public" | "private";
  setStatus: (status: "draft" | "public" | "private") => void;
}

export function ShareModalLeftSide({ status, setStatus }: ShareModalLeftSideProps) {
  return (
    <div className="flex-1 p-6 md:border-r border-border space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-3 text-foreground">Publish Status</h3>
        <div className="flex items-center p-1 bg-muted/60 rounded-xl w-full border border-border/50">
          <button
            onClick={() => setStatus("draft")}
            className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all ${
              status === "draft"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Draft
          </button>
          <button
            onClick={() => setStatus("public")}
            className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all ${
              status === "public"
                ? "bg-background shadow-sm text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => setStatus("private")}
            className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-all ${
              status === "private"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Private
          </button>
        </div>
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-4 flex gap-3 text-sm">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-muted-foreground leading-relaxed">
          {status === "draft"
            ? "Your form is currently in draft. It is not accessible to anyone."
            : status === "public"
            ? "Your form is currently live and collecting responses."
            : "Your form is private. Only specific people can access it."}
        </div>
      </div>
    </div>
  );
}
