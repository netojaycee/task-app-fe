"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import ConfirmationForm from "./ConfirmationForm";

interface CustomModalProps {
  type: "add" | "edit" | "delete" | "confirm";
  isEditMode?: boolean;
  data?: any;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  module: "task" | "user";
}

export function CustomModal({
  data,
  type,
  isEditMode = false,
  open,
  onOpenChange,
  module,
}: CustomModalProps) {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-full p-2'>
        <DialogHeader className='sticky top-0 p-1 border-b'>
          <DialogTitle>
            {type === "add" && module === "task" && "Create Task"}
            {type === "edit" && module === "task" && "Edit Task"}
            {type === "delete" && module === "task" && "Delete Task"}
            {type === "confirm" && module === "task" && "Confirm Action"}
            {type === "add" && module === "user" && "Create User"}
            {type === "edit" && module === "user" && "Edit User"}
            {type === "delete" && module === "user" && "Delete User"}
            {type === "confirm" && module === "user" && "Confirm Action"}
          </DialogTitle>
          <DialogDescription>
            {type === "add" && module === "task" && "Add a new task"}
            {type === "edit" && module === "task" && "Edit the selected task"}
            {type === "delete" &&
              module === "task" &&
              "Are you sure you want to delete this task?"}
            {type === "confirm" &&
              module === "task" &&
              "Please confirm your action"}
            {type === "add" && module === "user" && "Add a new user"}
            {type === "edit" && module === "user" && "Edit the selected user"}
            {type === "delete" &&
              module === "user" &&
              "Are you sure you want to delete this user?"}
            {type === "confirm" &&
              module === "user" &&
              "Please confirm your action"}
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[70vh] overflow-y-auto p-2'>
          {(type === "delete" || type === "confirm") && (
            <ConfirmationForm
              data={data}
              type={type}
              onSuccess={handleClose}
              module={module}
            />
          )}

          {module === "task" && (type === "add" || type === "edit") && (
            <TaskForm
              task={data}
              isEditMode={isEditMode}
              onSuccess={handleClose}
            />
          )}

          {module === "user" && (type === "add" || type === "edit") && (
            <TaskForm
              task={data}
              isEditMode={isEditMode}
              onSuccess={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
