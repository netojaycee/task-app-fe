"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { verifyToken } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyToken();
        setUser(response.data);
      } catch (error) {
        console.error("Token verification failed:", error);
        setUser(null);
      }
    };
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
