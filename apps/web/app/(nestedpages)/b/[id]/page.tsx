"use client";

import { useState, useEffect } from "react";
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
import { Save, Loader2 } from "lucide-react";
import { useForm, useUpdateForm } from "~/hooks/use-form";
import { toast } from "sonner";

import { BackButton } from "~/components/ui/navigation-history-buttons";
import { useParams } from "next/navigation";

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
    min?: number;
    max?: number;
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
        index: Number(index),
        type: el.type,
        label: el.label,
        placeholder: el.placeholder || undefined,
      };

      if (el.required) field.required = true;
      if (el.min !== undefined) field.min = Number(el.min);
      if (el.max !== undefined) field.max = Number(el.max);
      if (el.options && el.options.length > 0) {
        field.options = el.options.map((opt) => opt.label);
      }

      return field;
    }),
  };
}

// --- Main Page ---

export default function BuilderPage() {
  const { id } = useParams();
  const { data: form, isLoading: isLoadingForm } = useForm(id as string);
  const updateFormMutation = useUpdateForm();

  // Main form states
  const [selectedElement, setSelectedElement] = useState<FormElement[]>([]);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [formDetails, setFormDetails] = useState({ title: "", description: "" });
  const [slug, setSlug] = useState(() => buildSlug(formDetails.title));
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (form && !hasHydrated) {
      setFormDetails({
        title: form.title || "",
        description: form.description || "",
      });
      if (form.slug) {
        setSlug(form.slug);
      }
      if (form.fields && form.fields.length > 0) {
        const restoredFields = form.fields.map((f: any) => ({
          id: 0,
          name: f.label,
          uniqueId: f.id || crypto.randomUUID(),
          type: f.type as FormElement["type"],
          label: f.label,
          placeholder: f.placeholder ?? "",
          required: f.required ?? false,
          min: f.min !== undefined ? Number(f.min) : undefined,
          max: f.max !== undefined ? Number(f.max) : undefined,
          disabled: false,
          options: f.options?.map((o: string) => ({ label: o, value: o })) || [],
        }));
        setSelectedElement(restoredFields);
      }
      setHasHydrated(true);
    }
  }, [form, hasHydrated]);

  // Manual save button handler
  const handleManualSave = async () => {
    const payload = buildPayload(formDetails.title, formDetails.description, selectedElement, slug);
    console.log(payload);
    console.log(id);
    await toast.promise(updateFormMutation.mutateAsync({ ...payload, id: id } as any), {
      loading: "Saving form...",
      success: "Form saved successfully!",
      error: "Failed to save form.",
    });
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
        <div className="p-2">
          <Logo />
        </div>
        <Tabs defaultValue="fields" className="flex flex-col h-full ">
          <div className="px-4  shrink-0 ">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="fields">Fields</TabsTrigger>
              <TabsTrigger value="structure">Re-order</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="fields"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col overflow-y-auto bg-muted rounded-md p-2"
          >
            <BasicFieldsSidebar onClickElement={onClickElement} />
          </TabsContent>
          <TabsContent
            value="structure"
            className="flex-1 min-h-0 mt-0 data-[state=active]:flex flex-col overflow-y-auto"
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
      <main className="ml-72 mr-72 flex-1 flex flex-col h-screen overflow-hidden">
        <div className="bg-muted/50 border-b py-2 px-8 flex items-center justify-between gap-3 shrink-0">
          <BackButton fallbackUrl="/dashboard" />

          {/* Manual save button (right) */}
          <Button
            onClick={handleManualSave}
            disabled={updateFormMutation.isPending}
            variant="outline"
            className="font-semibold"
            size="sm"
          >
            {updateFormMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>

        {/* Scrollable Middle Canvas Container */}
        <div className="flex-1 overflow-y-auto p-8 relative min-h-0">
          <div className="max-w-200 mx-auto pb-32">
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
