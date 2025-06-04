"use client";
import React, { useState } from "react";
import TaskList from "@/components/local/TaskList";
import { Button } from "@/components/ui/button";
import { CustomModal } from "@/components/local/CustomModal";
import LogoutButton from "@/components/local/LogoutButton";
import {
  PlusCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api";
import { Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const { data: tasksData } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getTasks();
      return response.data;
    },
  });

  const tasks: Task[] = tasksData || [];
  // const { data } = useQuery({
  //     queryKey: ["tasks"],
  //     queryFn: getTasks,
  // });

  // const tasks: Task[] = data?.data ?? [];
  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with gradient background */}
        <div className='mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-md relative overflow-hidden'>
          <div className='absolute inset-0 bg-[url(/pattern.svg)] opacity-10'></div>
          <div className='relative z-10'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
              <div>
                <h1 className='text-3xl font-bold mb-2'>Task Dashboard</h1>
                <p className='text-blue-100'>
                  Manage, track, and organize all your tasks in one place
                </p>
              </div>
              <div className='flex space-x-3'>
                <Button
                  onClick={handleCreateTask}
                  size='lg'
                  className='mt-4 md:mt-0 bg-white text-blue-700 hover:bg-blue-50 shadow-sm'
                >
                  <PlusCircle className='mr-2 h-5 w-5' />
                  Create New Task
                </Button>
                {user?.role === "admin" && (
                  <Link href='/admin'>
                    <Button
                      size='lg'
                      variant='secondary'
                      className='mt-4 md:mt-0 shadow-sm border border-white/20 hover:bg-white/10 transition-all duration-300 group'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                        <circle cx='9' cy='7' r='4'></circle>
                        <path d='M23 21v-2a4 4 0 0 0-3-3.87'></path>
                        <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                      </svg>
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href='/'>
                  <Button
                    size='lg'
                    variant='secondary'
                    className='mt-4 md:mt-0 shadow-sm border border-white/20 hover:bg-white/10 transition-all duration-300 group'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 mr-2'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                      <polyline points='9 22 9 12 15 12 15 22'></polyline>
                    </svg>
                    Home
                  </Button>
                </Link>
                <LogoutButton
                  size='lg'
                  variant='secondary'
                  className='mt-4 md:mt-0 shadow-sm border border-white/20 hover:bg-white/10 transition-all duration-300'
                />
              </div>
            </div>
            {user && (
              <div className='text-sm text-blue-100 flex items-center animate-fade-in'>
                <div className='h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse-slow'></div>
                Signed in as:{" "}
                <span className='font-semibold ml-1'>{user.email}</span>
                {user.role === "admin" && (
                  <span className='ml-2 bg-gradient-to-r from-blue-800/50 to-indigo-800/50 py-1 px-3 rounded-full text-xs border border-blue-400/20 shadow-inner'>
                    Admin
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
          <Card className='bg-white shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-blue-500'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-gray-500'>
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center'>
                <BarChart3 className='h-8 w-8 text-blue-600 mr-3' />
                <div>
                  <p className='text-2xl font-bold'>{totalTasks}</p>
                  <p className='text-xs text-gray-500'>Total tracked tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-green-500'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-gray-500'>
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center'>
                <CheckCircle2 className='h-8 w-8 text-green-600 mr-3' />
                <div>
                  <p className='text-2xl font-bold'>{completedTasks}</p>
                  <p className='text-xs text-gray-500'>
                    {Math.round((completedTasks / totalTasks) * 100) || 0}%
                    completion rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-amber-500'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-gray-500'>
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center'>
                <Clock className='h-8 w-8 text-amber-600 mr-3' />
                <div>
                  <p className='text-2xl font-bold'>{inProgressTasks}</p>
                  <p className='text-xs text-gray-500'>
                    Tasks currently in progress
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-white shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-red-500'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium text-gray-500'>
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center'>
                <AlertCircle className='h-8 w-8 text-red-600 mr-3' />
                <div>
                  <p className='text-2xl font-bold'>{highPriorityTasks}</p>
                  <p className='text-xs text-gray-500'>
                    Tasks needing attention
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List Section */}
        <div className='bg-white rounded-lg shadow-sm'>
          <div className='p-6 border-b'>
            <h2 className='text-xl font-semibold'>My Tasks</h2>
            <p className='text-sm text-gray-500'>
              Drag and drop to reorder tasks based on priority
            </p>
          </div>
          <div className='p-6'>
            <TaskList />
          </div>
        </div>

        <CustomModal
          open={isModalOpen}
          onOpenChange={() => setIsModalOpen(false)}
          module='task'
          type='add'
          isEditMode={false}
          data={null}
        />
      </div>
    </div>
  );
}
