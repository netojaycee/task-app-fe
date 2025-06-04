"use client";

import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "@/lib/api";
import TaskCard from "./TaskCard";
import { Task, TaskFilter, PaginatedResponse } from "@/types";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import SearchFilter from "./SearchFilter";
import { Button } from "@/components/ui/button";

export default function TaskList() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<TaskFilter>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const response = await getTasks(filters);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const tasks = data && data?.data || [];
  const totalPages = data?.meta?.pages || 1;

  console.log(data)

  // Debounced search handler
  const debouncedSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined, page: 1 }));
  }, []);

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task: Task) => task._id === active.id);
      const newIndex = tasks.findIndex((task: Task) => task._id === over.id);
      queryClient.setQueryData(
        ["tasks", filters],
        (old: PaginatedResponse<Task> | undefined) => ({
          ...(old || { total: 0, page: 1, limit: 10, totalPages: 1 }),
          items: arrayMove(tasks, oldIndex, newIndex),
        })
      );
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

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
          onSearchChange={debouncedSearch}
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
        onSearchChange={debouncedSearch}
        onFilterChange={handleFilterChange}
        defaultValues={filters}
        isLoading={isFetching}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className='space-y-4 mb-6'>
          <SortableContext items={tasks.map((task: Task) => task._id)}>
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
