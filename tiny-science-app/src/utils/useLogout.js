'use client';
import { toast } from "react-toastify";

export function useLogout() {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Sesión cerrada exitosamente");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error("Error al cerrar sesión");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    }
  };

  return { handleLogout };
}
