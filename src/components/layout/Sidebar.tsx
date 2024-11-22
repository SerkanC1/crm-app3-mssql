// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import {
  PowerIcon,
  UserGroupIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Ana Sayfa", href: "/dashboard", icon: HomeIcon },
  { name: "Kullanıcılar", href: "/dashboard/users", icon: UsersIcon },
  { name: "Cari Hesaplar", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col h-full fixed top-0 left-0 z-10 space-y-1 transition-all duration-1000 overflow-hidden ${
        isOpen ? "w-64" : "w-12"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Logo alanı */}
      <Link
        className="flex h-20 items-center justify-start bg-gray-50 dark:bg-gray-800 px-2.5 md:h-16"
        href="/"
      >
        <div className="w-32 text-gray-900 dark:text-white md:w-40 text-sm font-medium flex items-center gap-2">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={32}
            height={32}
            className="min-w-[32px]"
          />
          <div className="w-[150px] overflow-hidden">
            <span
              className={`transition-all duration-300 whitespace-nowrap inline-block ${
                isOpen ? "clip-path-slide-right" : "clip-path-slide-left"
              }`}
            >
              STE-V0.1
            </span>
          </div>
        </div>
      </Link>

      {/* Sidebar butonları */}
      <div className="space-y-1">
        <div className="flex flex-col space-y-1">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex h-[48px] items-center justify-start gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-sky-100 text-blue-600 dark:bg-gray-700 dark:text-sky-400"
                    : "text-gray-900 dark:text-white hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-sky-400"
                }`}
              >
                <LinkIcon className="h-6 w-6 min-w-[24px]" />
                <div className="w-[150px] overflow-hidden">
                  <span
                    className={`transition-all duration-300 whitespace-nowrap inline-block ${
                      isOpen ? "clip-path-slide-right" : "clip-path-slide-left"
                    }`}
                  >
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <form>
          <button className="flex h-[48px] w-full items-center justify-start gap-2 rounded-md bg-gray-50 dark:bg-gray-900 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 transition-all duration-300">
            <PowerIcon className="h-6 w-6 min-w-[24px]" />
            <div className="w-[150px] overflow-hidden text-left">
              <span
                className={`transition-all duration-300 whitespace-nowrap inline-block ${
                  isOpen ? "clip-path-slide-right" : "clip-path-slide-left"
                }`}
              >
                Çıkış
              </span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
