"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTask, updateTask } from "@/lib/api";
import { Task } from "@/types";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

type TaskFormData = {
  title: string;
  description?: string | null;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
};

const schema: yup.ObjectSchema<TaskFormData> = yup
  .object({
    title: yup.string().required(),
    description: yup.string().optional().nullable(),
    status: yup
      .string()
      .oneOf(["pending", "in-progress", "completed"])
      .required(),
    priority: yup.string().oneOf(["low", "medium", "high"]).required(),
  })
  .required();

interface TaskFormProps {
  task?: Task;
  isEditMode: boolean;
  onSuccess: () => void;
}

export default function TaskForm({
  task,
  isEditMode = false,
  onSuccess,
}: TaskFormProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting: loading },
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: task || {
      status: "pending",
      priority: "low",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (task && isEditMode) {
        const { data: updatedTask } = await updateTask(task._id, data);
        // console.log("Updated Task:", updatedTask);
        if (updatedTask) {
          onSuccess();
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          toast.success("Task updated successfully!");
        }
      } else {
        const { data: createdTask } = await createTask(data);
        // console.log("Created Task:", createdTask);
        if (createdTask) {
          onSuccess();
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          toast.success("Task created successfully!");
        }
      }
    } catch (error) {
      toast.error(task ? "Failed to update task." : "Failed to create task.");
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Title
          </label>
          <Input
            id='title'
            placeholder='Enter task title'
            className='focus-visible:ring-blue-500'
            {...register("title")}
          />
          {errors.title && (
            <p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description
          </label>
          <Input
            id='description'
            placeholder='Describe your task (optional)'
            className='min-h-[80px] focus-visible:ring-blue-500'
            {...register("description")}
          />
          {errors.description && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.description.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Status
            </label>
            <Select
              onValueChange={(value: "pending" | "in-progress" | "completed") =>
                setValue("status", value)
              }
              defaultValue={task?.status || "pending"}
            >
              <SelectTrigger id='status' className='w-full focus:ring-blue-500'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='in-progress'>In Progress</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='priority'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Priority
            </label>
            <Select
              onValueChange={(value: "low" | "medium" | "high") =>
                setValue("priority", value)
              }
              defaultValue={task?.priority || "low"}
            >
              <SelectTrigger
                id='priority'
                className='w-full focus:ring-blue-500'
              >
                <SelectValue placeholder='Select priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='low'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 rounded-full bg-green-500 mr-2'></div>
                    Low
                  </div>
                </SelectItem>
                <SelectItem value='medium'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 rounded-full bg-orange-500 mr-2'></div>
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value='high'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 rounded-full bg-red-500 mr-2'></div>
                    High
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.priority.message}
              </p>
            )}
          </div>
        </div>

        <div className='pt-4'>
          <Button
            type='submit'
            className={`w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group ${
              isEditMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin mr-2' />
            ) : isEditMode ? (
              <span className='flex items-center'>
                <svg
                  className='h-4 w-4 mr-2 transition-transform group-hover:scale-110'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Update Task
              </span>
            ) : (
              <span className='flex items-center'>
                <Plus className='h-4 w-4 mr-2 transition-transform group-hover:rotate-90' />
                Create Task
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
