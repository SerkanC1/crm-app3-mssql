// src/components/Header.tsx

export default function Header() {
  return (
    <header className="flex h-20 md:h-16 items-center justify-between bg-blue-600 p-4 text-white">
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="w-32 md:w-40 text-right">
        {/* Kullanıcı bilgileri */}
        <span>User Name</span>
      </div>
    </header>
  );
}