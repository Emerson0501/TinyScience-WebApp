"use client";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import { toast } from "react-toastify";
import { useLogout } from "@/utils/useLogout";

export default function Sidebar() {
  const { handleLogout } = useLogout();
  return (
    <>
      <SidebarMobile onLogout={handleLogout} />
      <SidebarDesktop onLogout={handleLogout} />
    </>
  );
}
