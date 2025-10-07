// app/admin/layout.jsx
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-pink-50 md:flex-row md:h-dvh">
      <Sidebar />
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>

  );
}
