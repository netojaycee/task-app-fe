"use client";
import AdminTaskTable from "@/components/local/AdminTaskTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ListTodo } from "lucide-react";
import LogoutButton from "@/components/local/LogoutButton";
import Link from "next/link";

export default function UserTasksPage({ id }: { id: string }) {
  const { user } = useAuth();

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with gradient background */}
        <div className='mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-md relative overflow-hidden'>
          <div className='absolute inset-0 bg-[url(/pattern.svg)] opacity-10'></div>
          <div className='relative z-10'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
              <div className='flex items-center gap-3'>
                <ListTodo className='h-8 w-8' />
                <div>
                  <h1 className='text-3xl font-bold mb-2'>User Tasks</h1>
                  <p className='text-blue-100'>Manage tasks for this user</p>
                </div>
              </div>
              <div className='flex space-x-3'>
                <Link href='/admin'>
                  <Button
                    variant='secondary'
                    className='mt-4 md:mt-0 shadow-sm border border-white/20 hover:bg-white/10 transition-all duration-300 group'
                  >
                    <ArrowLeft className='mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1' />
                    Back to Admin
                  </Button>
                </Link>
                <Link href='/dashboard'>
                  <Button
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
                      <rect
                        x='3'
                        y='3'
                        width='18'
                        height='18'
                        rx='2'
                        ry='2'
                      ></rect>
                      <line x1='3' y1='9' x2='21' y2='9'></line>
                      <line x1='9' y1='21' x2='9' y2='9'></line>
                    </svg>
                    Dashboard
                  </Button>
                </Link>
                <Link href='/'>
                  <Button
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

        <div className='bg-white rounded-lg shadow-sm p-6'>
          <AdminTaskTable userId={id} />
        </div>
      </div>
    </div>
  );
}
