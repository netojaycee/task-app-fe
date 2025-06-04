"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, register } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Loader2, LogIn, UserPlus, Mail, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await (type === "login" ? login(data) : register(data));
      setUser(response.data.user);
      toast.success(
        type === "login"
          ? "Successfully logged in!"
          : "Account created successfully!"
      );
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        type === "login"
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again."
      );
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <div className='w-full max-w-md'>
        <div className='flex justify-center mb-6'>
          <div className='flex items-center space-x-2'>
            <Image
              src='/logo.png'
              alt='TaskFlow Logo'
              width={40}
              height={40}
              className='animate-fade-in'
            />
            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent animate-fade-in'>
              TaskFlow
            </span>
          </div>
        </div>

        <Card className='border border-gray-100 shadow-xl overflow-hidden animate-slide-up'>
          <div className='h-2 bg-gradient-to-r from-blue-500 to-indigo-600'></div>
          <CardHeader className='space-y-1 pb-4'>
            <CardTitle className='text-2xl font-bold text-center bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent'>
              {type === "login" ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription className='text-center text-gray-500'>
              {type === "login"
                ? "Enter your email and password to access your account"
                : "Enter your details to create your account"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium flex items-center gap-1'
                >
                  <Mail className='h-4 w-4 text-blue-600' /> Email
                </Label>
                <div className='relative group'>
                  <Input
                    id='email'
                    placeholder='name@example.com'
                    className='pl-4 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all'
                    {...formRegister("email")}
                  />
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-0'>
                    <Mail className='h-5 w-5 text-blue-600' />
                  </div>
                </div>
                {errors.email && (
                  <div className='flex items-center text-sm text-red-500 mt-1 animate-fade-in'>
                    <p>{errors.email.message}</p>
                  </div>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-sm font-medium flex items-center gap-1'
                >
                  <Lock className='h-4 w-4 text-blue-600' /> Password
                </Label>
                <div className='relative group'>
                  <Input
                    id='password'
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder='••••••••'
                    className='pl-4 pr-10 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all'
                    {...formRegister("password")}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-gray-400 hover:text-gray-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-gray-400 hover:text-gray-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className='flex items-center text-sm text-red-500 mt-1 animate-fade-in'>
                    <p>{errors.password.message}</p>
                  </div>
                )}
              </div>

              {type === "login" && (
                <div className='text-sm text-right'>
                  <Link
                    href='#'
                    className='text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : type === "login" ? (
                  <LogIn className='mr-2 h-4 w-4' />
                ) : (
                  <UserPlus className='mr-2 h-4 w-4' />
                )}
                {type === "login" ? "Sign in" : "Create account"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 pt-0'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center text-xs'>
                <span className='bg-white px-2 text-gray-500'>or</span>
              </div>
            </div>

            <div className='text-center text-sm'>
              {type === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href='/register'
                    className='font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                  >
                    Sign up <ArrowRight className='inline-block h-3 w-3 ml-1' />
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href='/login'
                    className='font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                  >
                    Sign in <ArrowRight className='inline-block h-3 w-3 ml-1' />
                  </Link>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
