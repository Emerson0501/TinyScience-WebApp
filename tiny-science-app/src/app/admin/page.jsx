import Sidebar from "@/components/admin/Sidebar";

export default function AdminPage() {
  return (
    <div className="flex h-dvh"> {/* en vez de min-h-screen */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
      </main>
    </div>
  );
}
