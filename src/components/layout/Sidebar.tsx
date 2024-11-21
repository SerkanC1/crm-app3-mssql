// src/components/Sidebar.tsx

import Link from "next/link";
import NavLinks from "../navigation/NavLinks";
import { PowerIcon } from "@heroicons/react/24/outline"; // PowerIcon'u içe aktarıyoruz

export default function SideNav() {
  return (
    <div className="flex flex-col h-full fixed top-0 left-0 z-10 space-y-1">
      <Link
        className="flex h-20 items-end justify-start bg-blue-600 p-4 md:h-16"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* <Logo /> */}
          {/* Daha sonra logo konulacak */}
          Logo
        </div>
      </Link>

      {/* Sidebar butonları */}
      <div className="space-y-1">
        <NavLinks />
        <form
          action={async () => {
            "use server";
            // daha sonra signout işlemi yapılacak
            // await signOut();
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-900 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
