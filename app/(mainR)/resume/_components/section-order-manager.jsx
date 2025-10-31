"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function SortableSection({ id, title, isVisible, onToggleVisibility }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-3 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg ring-2 ring-primary" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isVisible ? "default" : "secondary"} className="text-xs">
            {isVisible ? "Visible" : "Hidden"}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(id);
            }}
            className="h-8 w-8 p-0"
          >
            {isVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function SectionOrderManager({
  sections,
  sectionOrder,
  onOrderChange,
  onVisibilityChange
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);

      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      onOrderChange(newOrder);
    }
  }

  const sectionLabels = {
    contact: "Contact Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects"
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Drag sections to reorder them. Click the eye icon to show/hide sections.
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sectionOrder.map((sectionId) => (
              <SortableSection
                key={sectionId}
                id={sectionId}
                title={sectionLabels[sectionId] || sectionId}
                isVisible={sections[sectionId]?.visible !== false}
                onToggleVisibility={onVisibilityChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}