"use client";

import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks, updateTaskPosition } from "@/lib/api";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TaskCard from "./TaskCard";
import { Task, TaskFilter, PaginatedResponse } from "@/types";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import SearchFilter from "./SearchFilter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";


export default function TaskList() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<TaskFilter>({
    page: 1,
    limit: 10,
  });
  const [debouncedValue] = useDebounce(search, 500);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["tasks", { ...filters, search: debouncedValue }],
    queryFn: async () => {
      const response = await getTasks({ ...filters, search: debouncedValue });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const tasks = (data && data?.data) || [];
  const totalPages = data?.meta?.pages || 1;

  //   console.log(data)

  const handleSearch = (value: string) => {
    setSearch(value);
    setFilters((prev) => ({ ...prev, page: 1 })); // Reset page when searching
  };

  // Filter handler
  const handleFilterChange = useCallback(
    (filter: { status?: string; priority?: string }) => {
      setFilters((prev) => ({
        ...prev,
        status: filter.status as TaskFilter["status"],
        priority: filter.priority as TaskFilter["priority"],
        page: 1,
      }));
    },
    []
  );

  // Add a new handler for drag movement
  const handleDragMove = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task: Task) => task._id === active.id);
      const newIndex = tasks.findIndex((task: Task) => task._id === over?.id);

      // Update UI immediately during drag
      queryClient.setQueryData(
        ["tasks", filters],
        (old: PaginatedResponse<Task> | undefined) => ({
          ...(old || { total: 0, page: 1, limit: 10, totalPages: 1 }),
          items: arrayMove(tasks, oldIndex, newIndex),
        })
      );
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task: Task) => task._id === active.id);
      const newIndex = tasks.findIndex((task: Task) => task._id === over?.id);
      queryClient.setQueryData(
        ["tasks", filters],
        (old: PaginatedResponse<Task> | undefined) => ({
          ...(old || { total: 0, page: 1, limit: 10, totalPages: 1 }),
          items: arrayMove(tasks, oldIndex, newIndex),
        })
      );
      try {
        // Persist the change to the backend
        await updateTaskPosition(active.id, { position: newIndex });
        // No need to invalidate immediately as we've already updated the UI
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } catch (error) {
        console.error("Failed to update task position:", error);
        // Revert the UI on failure
        queryClient.setQueryData(
          ["tasks", filters],
          (old: PaginatedResponse<Task> | undefined) => ({
            ...(old || { total: 0, page: 1, limit: 10, totalPages: 1 }),
            items: arrayMove(tasks, newIndex, oldIndex),
          })
        );
        toast.error("Failed to update task position");
      }
    }
  };
  //   const sensors = useSensors(useSensor(PointerSensor));

  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Increased activation area for better touch response
      activationConstraint: {
        distance: 8,
        tolerance: 8,
        delay: 100, // Small delay to differentiate between tap and drag
      },
    }),
    useSensor(TouchSensor, {
      // Customized settings for touch devices
      activationConstraint: {
        delay: 250, // Increased delay for touch to differentiate between scroll and drag
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      // Added keyboard support for accessibility
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className='max-w-6xl mx-auto'>
        <SearchFilter
          onSearchChange={handleSearch}
          onFilterChange={handleFilterChange}
          defaultValues={filters}
          isLoading={isFetching}
        />
        <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
          <h3 className='text-xl font-semibold mb-2'>No tasks found</h3>
          <p className='text-muted-foreground mb-4'>
            {filters.search
              ? "Try adjusting your search or filters"
              : "Start by creating your first task"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <SearchFilter
        onSearchChange={handleSearch}
        onFilterChange={handleFilterChange}
        defaultValues={filters}
        isLoading={isFetching}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className='space-y-4 mb-6'>
          <SortableContext
            items={tasks.map((task: Task) => task._id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task: Task) => (
              <SortableTask key={task._id} id={task._id}>
                {({ attributes, listeners, ref, style }) => (
                  <TaskCard
                    task={task}
                    cardRef={ref}
                    style={style}
                    dragHandleProps={{
                      attributes,
                      listeners,
                    }}
                  />
                )}
              </SortableTask>
            ))}
          </SortableContext>
        </div>
      </DndContext>

      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 mt-4'>
          <Button
            variant='outline'
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: (prev.page || 1) - 1 }))
            }
            disabled={filters.page === 1 || isFetching}
          >
            Previous
          </Button>
          <span className='text-sm'>
            Page {filters.page || 1} of {totalPages}
          </span>
          <Button
            variant='outline'
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))
            }
            disabled={filters.page === totalPages || isFetching}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
