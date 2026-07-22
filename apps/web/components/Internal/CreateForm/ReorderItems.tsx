import {
  DndContext,
  closestCenter,
  DragEndEvent,
  SensorDescriptor,
  SensorOptions,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { FormElement } from "./types";

function SortableStructureItem({ element }: { element: FormElement }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.uniqueId!,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg shadow-sm w-full group transition-colors hover:border-primary/50"
    >
      <div
        {...attributes}
        {...listeners}
        className="text-muted-foreground cursor-grab active:cursor-grabbing focus:opacity-100 outline-none"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{element.label}</span>
    </div>
  );
}

interface ReorderItemsProps {
  selectedElement: FormElement[];
  sensors: SensorDescriptor<SensorOptions>[];
  handleDragEnd: (event: DragEndEvent) => void;
}

export function ReorderItems({ selectedElement, sensors, handleDragEnd }: ReorderItemsProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-muted p-2 rounded-md m-2 z-50 ">
      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-2 flex flex-col">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedElement.map((e) => e.uniqueId!)}
              strategy={verticalListSortingStrategy}
            >
              {selectedElement.map((element) => (
                <SortableStructureItem key={element.uniqueId} element={element} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
