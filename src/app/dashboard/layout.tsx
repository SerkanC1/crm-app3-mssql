// src/app/dashboard/layout.tsx

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full ml-0">
        <Header />
        <main className="flex flex-col flex-grow p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg ml-12 m-1">
          {children}
        </main>
      </div>
    </div>
  );
}