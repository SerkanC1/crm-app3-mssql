// src/components/Header.tsx
"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Ana Sayfa";
      case "/dashboard/users":
        return "Kullanıcılar"; 
      case "/dashboard/customers":
        return "Cari Hesaplar";
      default:
        return "Ana Sayfa";
    }
  };

  return (
    <header className="flex h-20 md:h-16 items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 text-gray-900 dark:text-white">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-lg text-center font-semibold absolute left-1/2 transform -translate-x-1/2">
          {getPageTitle()}
        </h1>
      </div>
      <div className="w-32 md:w-40 text-right text-sm font-medium">
        <span>User Name</span>
      </div>
    </header>
  );
}
