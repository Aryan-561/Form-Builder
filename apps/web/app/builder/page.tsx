"use client";

import { useState, useMemo } from "react";
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
import { Save } from "lucide-react";

export default function BuilderPage() {
  const [selectedElement, setSelectedElement] = useState<FormElement[]>([]);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState("Event Registration");
  const [formDescription, setFormDescription] = useState("Register for the AI Workshop");

  const handleSaveFormDefinition = () => {
    const formDefinition = {
      title: formTitle,
      description: formDescription,
      fields: selectedElement.map((el) => {
        const baseField: any = {
          id: el.uniqueId,
          type: el.type,
          label: el.label,
          placeholder: el.placeholder,
        };

        if (el.required) {
          baseField.required = true;
        }

        if (el.options && el.options.length > 0) {
          baseField.options = el.options.map((opt) => opt.label);
        }

        return baseField;
      }),
    };

    console.log("Form Definition Payload (Backend schema):", formDefinition);
    alert("Form Definition Payload:\n" + JSON.stringify(formDefinition, null, 2));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onClickElement = (elem: FormElement) => {
    const newElement = { ...elem, uniqueId: crypto.randomUUID() };
    setSelectedElement([...selectedElement, newElement]);
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
      <aside className="w-72 min-w-[288px] h-screen fixed left-0 top-0 bg-card border-r border-border shadow-sm flex flex-col z-50 ">
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
        <div className="bg-muted/50 border-b py-2 px-8 flex justify-end gap-3">
          <Button
            onClick={handleSaveFormDefinition}
            variant="outline"
            className="font-semibold"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Form Definition
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[800px] mx-auto pb-32">
            <FormTitleBlock
              title={formTitle}
              description={formDescription}
              onTitleChange={setFormTitle}
              onDescriptionChange={setFormDescription}
            />

            <div className="space-y-6">
              {/* Added Elements */}
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
