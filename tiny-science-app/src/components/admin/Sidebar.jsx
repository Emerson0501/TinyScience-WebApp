"use client";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

export default function Sidebar() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <>
      <SidebarMobile onLogout={handleLogout} />
      <SidebarDesktop onLogout={handleLogout} />
    </>
  );
}
