import { Settings2 } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { FormElement } from "./types";
import { BuilderElementOptions } from "./BuilderElementOptions";
import { ButtonGroup } from "~/components/ui/button-group";
import { ShareModal } from "~/components/Internal/share";

export function PropertiesSidebar({
  activeElement,
  onElementUpdate,
}: {
  activeElement: FormElement | null;
  onElementUpdate: (id: string, updates: Partial<FormElement>) => void;
}) {
  const params = useParams();
  const router = useRouter();
  const formId = params?.id as string;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const hasOptions =
    activeElement && ["checkbox", "radio", "select", "multiselect"].includes(activeElement.type);

  const handlePreview = () => {
    if (formId) {
      window.open(`/p/${formId}`, "_blank");
    }
  };

  return (
    <>
      <aside className="w-72 min-w-[288px] h-screen fixed right-0 top-0 bg-card border-l border-border shadow-sm flex flex-col z-50">
        {/* Always Visible Header Buttons */}
        <div className="px-6 mb-6 border-b py-2 shrink-0">
          <ButtonGroup className="w-full">
            <Button variant="outline" className="flex-1" onClick={handlePreview}>
              Preview
            </Button>
            <Button className="flex-1" onClick={() => setIsShareModalOpen(true)}>
              Share
            </Button>
          </ButtonGroup>
        </div>

        {!activeElement ? (
          <>
            <div className="px-6 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Settings2 className="w-5 h-5" />
                <h2 className="text-lg font-bold">Properties</h2>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Select an element on the canvas to edit its properties.
            </div>
          </>
        ) : (
          <>
            <div className="px-6 mb-6">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-foreground" />
                <h2 className="text-lg font-bold text-foreground">Properties</h2>
              </div>

              <p className="text-xs text-muted-foreground mt-1">Editing {activeElement.name}</p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Title</Label>
                <Input
                  value={activeElement.label}
                  onChange={(e) =>
                    onElementUpdate(activeElement.uniqueId!, {
                      label: e.target.value,
                    })
                  }
                  placeholder="Field Label"
                />
              </div>

              {/* Placeholder / Single Checkbox Text */}
              {activeElement.type !== "radio" && activeElement.type !== "select" && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    {activeElement.type === "checkbox" ? "Checkbox Text / Hint" : "Placeholder"}
                  </Label>
                  <Input
                    value={activeElement.placeholder || ""}
                    onChange={(e) =>
                      onElementUpdate(activeElement.uniqueId!, {
                        placeholder: e.target.value,
                      })
                    }
                    placeholder={
                      activeElement.type === "checkbox"
                        ? "e.g. I accept the Privacy Policy & Terms"
                        : "e.g. Enter value..."
                    }
                  />
                </div>
              )}

              {/* Required */}
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Required</Label>

                <Switch
                  checked={activeElement.required}
                  onCheckedChange={(checked) =>
                    onElementUpdate(activeElement.uniqueId!, {
                      required: checked,
                    })
                  }
                />
              </div>

              {/* Min & Max Bounds (Supports Numbers, Quantity, and Character Lengths) */}
              {[
                "text",
                "textarea",
                "email",
                "password",
                "tel",
                "url",
                "number",
                "range",
                "rating",
                "date",
                "multiselect",
              ].includes(activeElement.type) && (
                <div className="pt-4 border-t border-border space-y-3">
                  <Label className="text-sm font-semibold block">
                    {["text", "textarea", "email", "password", "tel", "url"].includes(
                      activeElement.type,
                    )
                      ? "Character Length Limits"
                      : "Min / Max Bounds"}
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">
                        {["text", "textarea", "email", "password", "tel", "url"].includes(
                          activeElement.type,
                        )
                          ? "Min Characters"
                          : "Min Value / Quantity"}
                      </Label>
                      <Input
                        type="number"
                        value={activeElement.min ?? ""}
                        onChange={(e) =>
                          onElementUpdate(activeElement.uniqueId!, {
                            min: e.target.value !== "" ? Number(e.target.value) : undefined,
                          })
                        }
                        placeholder="e.g. 1"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">
                        {["text", "textarea", "email", "password", "tel", "url"].includes(
                          activeElement.type,
                        )
                          ? "Max Characters"
                          : "Max Value / Quantity"}
                      </Label>
                      <Input
                        type="number"
                        value={activeElement.max ?? ""}
                        onChange={(e) =>
                          onElementUpdate(activeElement.uniqueId!, {
                            max: e.target.value !== "" ? Number(e.target.value) : undefined,
                          })
                        }
                        placeholder="e.g. 100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Options */}
              {hasOptions && (
                <div className="pt-4 border-t border-border">
                  <Label className="text-sm font-semibold mb-2 block">
                    {activeElement.type === "checkbox" ? "Checkbox Options List" : "Options"}
                  </Label>

                  <BuilderElementOptions
                    initialOptions={activeElement.options || []}
                    onOptionsChange={(newOptions) =>
                      onElementUpdate(activeElement.uniqueId!, {
                        options: newOptions,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
      </aside>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
}
