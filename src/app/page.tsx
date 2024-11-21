// src/app/page.tsx

import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1>Welcome to My Next.js App</h1>
          <p>This is the home page.</p>
        </div>
      </main>
    </div>
  );
}