import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";

interface SortableTaskProps {
  id: string;
  children: (handleProps: {
    attributes: Record<string, any>;
    listeners: Record<string, any> | undefined;
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  }) => ReactNode;
}

export function SortableTask({ id, children }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <>{children({ attributes, listeners, ref: setNodeRef, style })}</>;
}
