"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { deleteTask, deleteUser } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

interface ConfirmationFormProps {
  data: any;
  type: "delete" | "confirm";
  onSuccess: () => void;
  module: "task" | "user";
}

export default function ConfirmationForm({
  data,
  type,
  onSuccess,
  module,
}: ConfirmationFormProps) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleAction = async () => {
    setLoading(true);
    try {
      if (type === "confirm" && data?.customAction) {
        // Use custom confirmation handler if provided
        await data.customAction();
      } else if (type === "delete") {
        // Default delete handlers
        if (!data || !data._id) {
          toast.error("Invalid data for deletion");
          setLoading(false);
          return;
        }

        if (module === "task") {
          await deleteTask(data._id);
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          toast.success("Task deleted successfully!");
        } else if (module === "user") {
          await deleteUser(data._id);
          queryClient.invalidateQueries({ queryKey: ["users"] });
          toast.success("User deleted successfully!");
        }
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(
        `Failed to ${type === "delete" ? "delete" : "confirm"} ${module}.`
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col space-y-4'>
      {data?.actionLabel && (
        <p className='text-center font-medium text-gray-700 mb-2'>
          {data.actionLabel}
        </p>
      )}
      <div className='flex justify-end space-x-2'>
        <Button
          variant='outline'
          onClick={onSuccess}
          disabled={loading}
          className='transition-all duration-300 hover:shadow-md'
        >
          No, Cancel
        </Button>
        <Button
          variant={type === "delete" ? "destructive" : "default"}
          onClick={handleAction}
          disabled={loading}
          className={`transition-all duration-300 hover:shadow-md ${
            type === "delete"
              ? "hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <Loader2 className='h-4 w-4 animate-spin mr-2' />
          ) : type === "delete" ? (
            <Trash2 className='h-4 w-4 mr-2' />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-2'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          )}
          {type === "delete" ? "Yes, Delete" : "Yes, Confirm"}
        </Button>
      </div>
    </div>
  );
}
