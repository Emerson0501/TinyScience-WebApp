// app/admin/layout.jsx
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex sm:min-h-screen lg:h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>

  );
}
