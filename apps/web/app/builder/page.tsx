"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FormElement } from "~/components/Internal/CreateForm/types";
import { FormTitleBlock } from "~/components/Internal/CreateForm/FormTitleBlock";
import { BuilderElement } from "~/components/Internal/CreateForm/BuilderElement";
import { ReorderItems } from "~/components/Internal/CreateForm/ReorderItems";
import { BasicFieldsSidebar } from "~/components/Internal/CreateForm/BasicFieldsSidebar";
import { PropertiesSidebar } from "~/components/Internal/CreateForm/PropertiesSidebar";
import Logo from "~/components/logo/logo";

import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useCreateForm } from "~/hooks/use-form";
import { useAutosave } from "~/hooks/use-autosave";
import { toast } from "sonner";
import { cn } from "~/lib/utils";

// --- Types ---

interface FormDefinitionPayload {
  title: string;
  description: string;
  slug: string;
  status: "draft";
  fields: {
    index: number;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
  }[];
}

// --- Helpers ---

function buildSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Math.random().toString(36).substring(2, 6)
  );
}

function buildPayload(
  formTitle: string,
  formDescription: string,
  selectedElement: FormElement[],
  slug: string,
): FormDefinitionPayload {
  return {
    title: formTitle,
    description: formDescription,
    slug,
    status: "draft",
    fields: selectedElement.map((el, index) => {
      const field: FormDefinitionPayload["fields"][number] = {
        index,
        type: el.type,
        label: el.label,
        placeholder: el.placeholder || undefined,
      };

      if (el.required) field.required = true;
      if (el.options && el.options.length > 0) {
        field.options = el.options.map((opt) => opt.label);
      }

      return field;
    }),
  };
}

// --- Status indicator component ---

// function SaveStatusIndicator({
//   status,
//   lastSavedAt,
// }: {
//   status: "idle" | "saving" | "saved" | "error";
//   lastSavedAt: Date | null;
// }) {
//   if (status === "idle") return null;

//   return (
//     <div
//       className={cn(
//         "flex items-center gap-1.5 text-xs font-medium transition-all duration-300",
//         status === "saving" && "text-muted-foreground",
//         status === "saved" && "text-emerald-600 dark:text-emerald-400",
//         status === "error" && "text-destructive",
//       )}
//     >
//       {status === "saving" && (
//         <>
//           <Loader2 className="w-3.5 h-3.5 animate-spin" />
//           <span>Saving…</span>
//         </>
//       )}
//       {status === "saved" && (
//         <>
//           <CheckCircle2 className="w-3.5 h-3.5" />
//           <span>
//             Saved
//             {lastSavedAt && (
//               <span className="text-muted-foreground font-normal ml-1">
//                 at {lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             )}
//           </span>
//         </>
//       )}
//       {status === "error" && (
//         <>
//           <AlertCircle className="w-3.5 h-3.5" />
//           <span>Failed to save</span>
//         </>
//       )}
//     </div>
//   );
// }

// --- Main Page ---

export default function BuilderPage() {
  const [selectedElement, setSelectedElement] = useState<FormElement[]>([]);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [formDetails, setFormDetails] = useState({ title: "", description: "" });

  // Stable slug per session — generated once, reused on every save
  const [slug] = useState(() => buildSlug("event-registration"));

  const createFormMutation = useCreateForm();

  // Build the payload every time form state changes
  const formPayload = useMemo(
    () => buildPayload(formDetails.title, formDetails.description, selectedElement, slug),
    [formDetails.title, formDetails.description, selectedElement, slug],
  );

  // The save function passed to useAutosave
  const saveFn = useCallback(
    async (payload: FormDefinitionPayload) => {
      await createFormMutation.mutateAsync(payload as any);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // --- Autosave ---
  const DRAFT_STORAGE_KEY = "formcraft:builder:draft";

  const {
    status: saveStatus,
    lastSavedAt,
    saveNow,
    restoredDraft,
    clearDraft,
  } = useAutosave({
    data: formPayload,
    saveFn,
    debounceMs: 3000,
    enabled: true,
    storageKey: DRAFT_STORAGE_KEY,
  });

  // Guard so we only hydrate once even if restoredDraft updates
  const hasHydratedRef = useRef(false);

  // Hydrate form state from localStorage draft.
  // restoredDraft arrives asynchronously (client-side useEffect in the hook),
  // so we depend on it here instead of using an empty deps array.
  useEffect(() => {
    if (!restoredDraft || hasHydratedRef.current) return;
    hasHydratedRef.current = true;
    setFormDetails({ title: restoredDraft.title, description: restoredDraft.description });
    // Restore fields with stable uniqueIds
    const restoredFields = restoredDraft.fields.map((f) => ({
      id: 0,
      name: f.label,
      uniqueId: crypto.randomUUID(),
      type: f.type as FormElement["type"],
      label: f.label,
      placeholder: f.placeholder ?? "",
      required: f.required ?? false,
      disabled: false,
      options: f.options?.map((o) => ({ label: o, value: o })),
    }));
    setSelectedElement(restoredFields);
  }, [restoredDraft]);

  // Manual save button handler (saves immediately then clears draft)
  const handleManualSave = async () => {
    try {
      await saveNow();
      clearDraft();
      toast.success("Form saved!");
    } catch {
      toast.error("Failed to save form.");
    }
  };

  // --- DnD ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onClickElement = (elem: FormElement) => {
    const newElement = { ...elem, uniqueId: crypto.randomUUID() };
    setSelectedElement((prev) => [...prev, newElement]);
    setActiveElementId(newElement.uniqueId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSelectedElement((items) => {
        const oldIndex = items.findIndex((item) => item.uniqueId === active.id);
        const newIndex = items.findIndex((item) => item.uniqueId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleElementRemove = (id: string) => {
    setSelectedElement((items) => items.filter((item) => item.uniqueId !== id));
    if (activeElementId === id) setActiveElementId(null);
  };

  const handleElementUpdate = (id: string, updates: Partial<FormElement>) => {
    setSelectedElement((items) =>
      items.map((item) => (item.uniqueId === id ? { ...item, ...updates } : item)),
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Sidebar */}
      <aside className="w-72 min-w-[288px] h-screen fixed left-0 top-0 bg-card border-r border-border shadow-sm flex flex-col z-50">
        <Logo />
        <Tabs defaultValue="fields" className="flex flex-col h-full">
          <div className="px-4 pb-2 shrink-0 border-b border-border">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="fields">Fields</TabsTrigger>
              <TabsTrigger value="structure">Re-order</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="fields"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col"
          >
            <BasicFieldsSidebar onClickElement={onClickElement} />
          </TabsContent>
          <TabsContent
            value="structure"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col"
          >
            <ReorderItems
              selectedElement={selectedElement}
              sensors={sensors}
              handleDragEnd={handleDragEnd}
            />
          </TabsContent>
        </Tabs>
      </aside>

      {/* Main Builder Canvas */}
      <main className="ml-72 mr-72 flex-1 flex flex-col h-screen">
        {/* Sticky Action Bar */}
        <div className="bg-muted/50 border-b py-2 px-8 flex items-center justify-between gap-3">
          {/* Autosave status (left) */}
          {/* <SaveStatusIndicator status={saveStatus} lastSavedAt={lastSavedAt} /> */}

          {/* Manual save button (right) */}
          <Button
            onClick={handleManualSave}
            disabled={saveStatus === "saving"}
            variant="outline"
            className="font-semibold"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {saveStatus === "saving" ? "Saving…" : "Save"}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[800px] mx-auto pb-32">
            <FormTitleBlock
              title={formDetails.title}
              description={formDetails.description}
              onTitleChange={(val) => setFormDetails((prev) => ({ ...prev, title: val }))}
              onDescriptionChange={(val) =>
                setFormDetails((prev) => ({ ...prev, description: val }))
              }
            />

            <div className="space-y-6">
              {selectedElement.map((element) => (
                <BuilderElement
                  key={element.uniqueId}
                  element={element}
                  isActive={element.uniqueId === activeElementId}
                  onClick={() => setActiveElementId(element.uniqueId || null)}
                  onElementRemove={handleElementRemove}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (Properties) */}
      <PropertiesSidebar
        activeElement={selectedElement.find((el) => el.uniqueId === activeElementId) || null}
        onElementUpdate={handleElementUpdate}
      />
    </div>
  );
}
