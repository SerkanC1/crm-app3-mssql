// src/app/dashboard/layout.tsx

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full ml-0">
        <Header />
        <main className="flex flex-col flex-grow p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          {children}
        </main>
      </div>
    </div>
  );
}