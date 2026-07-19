import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link as LinkIcon, Download } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "~/components/ui/input-group";
import { toast } from "sonner";
interface ShareModalRightSideProps {
  isEnabled: boolean;
}

export function ShareModalRightSide({ isEnabled }: ShareModalRightSideProps) {
  const onCopy = async () => {
    try {
      toast.success("copied successfully");
    } catch (error) {
      toast.error("failed to copy");
    }
  };

  return (
    <div
      className={`flex-1 p-6 space-y-8 transition-opacity duration-300 ${
        !isEnabled ? "opacity-30 pointer-events-none select-none grayscale" : ""
      }`}
    >
      <div>
        <h3 className="text-sm font-medium mb-3 text-foreground">Share Link</h3>
        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput disabled value="http://localhost:4000/form" />
            <Button onClick={onCopy}>
              <LinkIcon className="w-4 h-4" />
            </Button>
          </InputGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-foreground">QR Code</h3>
        <div className="flex gap-4">
          <div className="w-24 h-24 border border-border rounded-xl flex items-center justify-center bg-background shrink-0">
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground font-medium">QR</span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Button variant="outline" className="w-full justify-start h-9 shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Best for physical menus or flyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
