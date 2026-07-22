import { Button } from "~/components/ui/button";
import { Link as LinkIcon, Download } from "lucide-react";
import { InputGroup, InputGroupInput } from "~/components/ui/input-group";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { generateQRCodeDataUrl } from "~/lib/qrcode";
import { useMemo } from "react";

interface ShareModalRightSideProps {
  isEnabled: boolean;
}

export function ShareModalRightSide({ isEnabled }: ShareModalRightSideProps) {
  const { id } = useParams();

  // Dynamically derive domain using env variable or fallback
  const domain = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }, []);

  const shareLink = `${domain}/d/${id}`;

  const qrCodeDataUrl = useMemo(() => {
    if (!shareLink) return "";
    return generateQRCodeDataUrl(shareLink, 6, 2);
  }, [shareLink]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const onDownloadQR = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = `form-qr-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded!");
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
            <InputGroupInput
              disabled
              value={shareLink}
              className="text-ellipsis overflow-hidden whitespace-nowrap"
            />
            <Button onClick={onCopy} type="button" aria-label="Copy share link">
              <LinkIcon className="w-4 h-4" />
            </Button>
          </InputGroup>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-foreground">QR Code</h3>
        <div className="flex gap-4">
          <div className="w-24 h-24 border border-border rounded-xl flex items-center justify-center bg-background shrink-0 p-1">
            {qrCodeDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrCodeDataUrl}
                alt="Form QR Code"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground font-medium">QR</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Button
              variant="outline"
              className="w-full justify-start h-9 shadow-sm"
              onClick={onDownloadQR}
              disabled={!qrCodeDataUrl}
            >
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
