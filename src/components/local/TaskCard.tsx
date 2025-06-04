"use client";
import { useState } from "react";
import { Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomModal } from "./CustomModal";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TaskCardProps {
  task: Task;
  dragHandleProps?: {
    attributes?: Record<string, any>;
    listeners?: Record<string, any>;
  };
  //   cardRef?: (node: HTMLElement | null) => void;
  cardRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ task, dragHandleProps, cardRef, style }, _ref) => {
    const [modalState, setModalState] = useState<{
      isOpen: boolean;
      type: "edit" | "delete";
    }>({
      isOpen: false,
      type: "edit",
    });

    // Define status and priority badge colors
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "completed":
          return "bg-green-500/20 text-green-700 border-green-600";
        case "in progress":
          return "bg-blue-500/20 text-blue-700 border-blue-600";
        case "pending":
          return "bg-amber-500/20 text-amber-700 border-amber-600";
        default:
          return "bg-gray-500/20 text-gray-700 border-gray-600";
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority.toLowerCase()) {
        case "high":
          return "bg-red-500/20 text-red-700 border-red-600";
        case "medium":
          return "bg-orange-500/20 text-orange-700 border-orange-600";
        case "low":
          return "bg-green-500/20 text-green-700 border-green-600";
        default:
          return "bg-gray-500/20 text-gray-700 border-gray-600";
      }
    };

    return (
      <>
        <Card
          ref={cardRef}
          className='mb-4 overflow-hidden border-l-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 py-3 hover-shadow-effect'
          style={{
            ...style,
            borderLeftColor:
              task.priority.toLowerCase() === "high"
                ? "#ef4444"
                : task.priority.toLowerCase() === "medium"
                ? "#f97316"
                : "#22c55e",
          }}
        >
          <div className='flex items-stretch'>
            {/* Drag handle - this is the dedicated area for drag and drop */}
            <div
              className='flex items-center px-2 bg-gray-50 hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors'
              data-drag-handle
              {...dragHandleProps?.attributes}
              {...dragHandleProps?.listeners}
            >
              <GripVertical className='h-5 w-5 text-gray-400' />
            </div>

            {/* Main content */}
            <CardContent className='flex-1'>
              <div className='flex justify-between items-start'>
                <h3 className='font-medium text-lg mb-2 text-gray-800'>
                  {task.title}
                </h3>
                <div className='flex space-x-1'>
                  <Badge
                    variant='outline'
                    className={cn(
                      "text-xs py-0 h-6",
                      getStatusColor(task.status)
                    )}
                  >
                    {task.status}
                  </Badge>
                  <Badge
                    variant='outline'
                    className={cn(
                      "text-xs py-0 h-6",
                      getPriorityColor(task.priority)
                    )}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>

              <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                {task.description}
              </p>

              <div className='flex justify-end items-center'>
                <div className='flex space-x-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 group'
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalState({ isOpen: true, type: "edit" });
                    }}
                  >
                    <Pencil className='h-4 w-4 mr-1 transition-transform group-hover:scale-110' />
                    Edit
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 px-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-all duration-300 group'
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalState({ isOpen: true, type: "delete" });
                    }}
                  >
                    <Trash2 className='h-4 w-4 mr-1 transition-transform group-hover:scale-110' />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        <CustomModal
          type={modalState.type}
          module='task'
          data={task}
          open={modalState.isOpen}
          isEditMode={modalState.type === "edit"}
          onOpenChange={(isOpen) =>
            setModalState((prev) => ({ ...prev, isOpen }))
          }
        />
      </>
    );
  }
);

TaskCard.displayName = "TaskCard";
export default TaskCard;
