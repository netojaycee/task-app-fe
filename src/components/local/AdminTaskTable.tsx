"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserTasks, deleteTask } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Task } from "@/types";
// import { mockTasks } from "@/lib/data";

interface AdminTaskTableProps {
  userId: string;
}

export default function AdminTaskTable({ userId }: AdminTaskTableProps) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["userTasks", userId],
    queryFn: async () => {
      const response = await getUserTasks(userId);
      return response.data;
    },
  });

  const tasks = (data && data.data) || [];

  // const tasks = mockTasks;
  

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userTasks", userId] }),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task: Task)=> (
          <TableRow key={task._id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description || "-"}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>
              <Button
                variant='destructive'
                onClick={() => deleteMutation.mutate(task._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
