// src/components/Header.tsx
"use client"

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/users":
        return "Users";
      case "/dashboard/customers":
        return "Customers";
      default:
        return "Dashboard";
    }
  }


  return (
    <header className="flex h-20 md:h-16 items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 text-gray-900 dark:text-white">
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>
      <div className="w-32 md:w-40 text-right">
        {/* Kullanıcı bilgileri */}
        <span>User Name</span>
      </div>
    </header>
  );
}