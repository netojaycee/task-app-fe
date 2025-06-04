"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, deleteUser, updateUserRole } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminUserTable() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "delete" | "confirm";
    action?: string;
    newRole?: string;
  }>({
    isOpen: false,
    type: "delete",
  });

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getAllUsers();
      return response.data;
    },
  });

  const users = (data && data) || [];

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user role");
    },
  });

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setModalState({
      isOpen: true,
      type: "delete",
    });
  };

  const handleRoleChange = (user: any, newRole: string) => {
    setSelectedUser(user);
    setModalState({
      isOpen: true,
      type: "confirm",
      action: "role",
      newRole,
    });
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;

    if (modalState.type === "delete") {
      await deleteMutation.mutateAsync(selectedUser._id);
    } else if (modalState.action === "role" && modalState.newRole) {
      await roleMutation.mutateAsync({
        id: selectedUser._id,
        role: modalState.newRole,
      });
    }

    setModalState({ isOpen: false, type: "delete" });
  };

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Users Management</h2>
        <div className='space-x-2'>
          <Link href='/dashboard'>
            <Button
              variant='outline'
              className='group transition-all duration-300'
            >
              Dashboard
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 ml-2 transition-transform group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Button>
          </Link>
          <Link href='/'>
            <Button
              variant='outline'
              className='group transition-all duration-300'
            >
              Home
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 ml-2 transition-transform group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>

      <Table className='border rounded-lg shadow-sm'>
        <TableHeader className='bg-gray-50'>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow
              key={user._id}
              className='hover:bg-gray-50 transition-colors'
            >
              <TableCell className='font-medium'>{user.email}</TableCell>
              <TableCell>
                <Select
                  defaultValue={user.role}
                  onValueChange={(value) => handleRoleChange(user, value)}
                >
                  <SelectTrigger className='w-[100px] border-gray-300 hover:bg-gray-50'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='user'>User</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className='text-right space-x-2'>
                <Button
                  className='bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:shadow-md'
                  onClick={() => router.push(`/admin/users/${user._id}/tasks`)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-1'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                    <polyline points='14 2 14 8 20 8'></polyline>
                    <line x1='16' y1='13' x2='8' y2='13'></line>
                    <line x1='16' y1='17' x2='8' y2='17'></line>
                    <polyline points='10 9 9 9 8 9'></polyline>
                  </svg>
                  View Tasks
                </Button>
                <Button
                  variant='destructive'
                  onClick={() => handleDeleteUser(user)}
                  className='hover:bg-red-700 transition-all duration-300 hover:shadow-md'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-1'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='3 6 5 6 21 6'></polyline>
                    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                    <line x1='10' y1='11' x2='10' y2='17'></line>
                    <line x1='14' y1='11' x2='14' y2='17'></line>
                  </svg>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete User Modal */}
      <CustomModal
        type={modalState.type}
        open={modalState.isOpen}
        onOpenChange={(open) => setModalState({ ...modalState, isOpen: open })}
        module='user'
        data={{
          ...selectedUser,
          customAction: handleConfirmAction,
          actionLabel:
            modalState.type === "delete"
              ? "Delete User"
              : `Change Role to ${modalState.newRole}`,
        }}
      />
    </>
  );
}
