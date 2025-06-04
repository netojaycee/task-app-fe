"use client";

// import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks  } from "@/lib/api";
import TaskCard from "./TaskCard";
import { Task } from "@/types";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
// import SearchFilter from "./SearchFilter";

// interface SortableTaskProps {
//   task: Task;
// }

// function SortableTask({ task }: SortableTaskProps) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: task._id });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//     //   <TaskCard task={task} />
//     // </div>
//      <div ref={setNodeRef} style={style}>
//       {/* Drag handle */}
//       <div {...attributes} {...listeners} style={{ cursor: "grab", width: 24, height: 24 }}>
//       <span>::</span>
//     </div>
//     <TaskCard task={task} />
//   </div>
//   );
// }

export default function TaskList() {
  const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState({ status: "", priority: "" });

  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getTasks();
      return response.data;
    },
  });

  const tasks = data && data || [];




//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.title.toLowerCase().includes(search.toLowerCase()) &&
//       (!filter.status || task.status === filter.status) &&
//       (!filter.priority || task.priority === filter.priority)
//   );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(
        (task: Task) => task._id === active.id
      );
      const newIndex = tasks.findIndex((task: Task) => task._id === over.id);
      queryClient.setQueryData(["tasks"], () =>
        arrayMove(tasks, oldIndex, newIndex)
      );
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      {/* <SearchFilter onSearchChange={setSearch} onFilterChange={setFilter} /> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks.map((task: Task) => task._id)}>
          {tasks.map((task: Task) => (
            <SortableTask key={task._id} id={task._id}>
              {({ attributes, listeners, ref, style }) => (
                <TaskCard
                  task={task}
                  dragHandleProps={{ attributes, listeners }}
                  cardRef={ref}
                  style={style}
                />
              )}
            </SortableTask>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
