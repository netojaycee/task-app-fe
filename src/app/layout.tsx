import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management System | Organize Your Work Efficiently",
  description: "Professional task management system to boost productivity. Create, track, and manage tasks with ease. Features include real-time updates, team collaboration, and progress tracking.",
  keywords: "task management, project management, productivity tool, team collaboration, task tracking",
  openGraph: {
    title: "Task Management System | Organize Your Work Efficiently",
    description: "Professional task management system to boost productivity. Create, track, and manage tasks with ease.",
    type: "website",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};
// const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
