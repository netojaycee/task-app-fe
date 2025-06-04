"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/api";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

interface LogoutButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof Button>, "onClick"> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  showIcon?: boolean;
}

export default function LogoutButton({
  variant = "secondary",
  showIcon = true,
  className = "",
  ...props
}: LogoutButtonProps) {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      className={`transition-all duration-300 hover:shadow-md ${className}`}
      {...props}
    >
      {showIcon && (
        <LogOut className='mr-2 h-4 w-4 transition-transform group-hover:rotate-12' />
      )}
      Log Out
    </Button>
  );
}
