//src/components/NavLinks.tsx
"use client";

import {
  UserGroupIcon,
  HomeIcon,
  //DocumentDuplicateIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UsersIcon, //DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-1">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        const baseClasses =
          "flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium md:justify-start md:p-2 md:px-3";
        const activeClasses = "bg-sky-100 text-blue-600 dark:bg-gray-700 dark:text-sky-400";
        const inactiveClasses =
          "text-gray-900 dark:text-white hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-sky-400";

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${baseClasses} ${
              isActive ? activeClasses : inactiveClasses
            }`}
          >
            <LinkIcon className="h-6 w-6" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
