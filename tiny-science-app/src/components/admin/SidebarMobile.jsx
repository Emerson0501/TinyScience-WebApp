"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Home,
    User,
    Bell,
    AppWindow,
    ShoppingBag,
    LogOut,
    Mail,
    Calendar,
    ChevronDown,
    Menu,
} from "lucide-react";

export default function SidebarMobile({ onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [pinesOpen, setPinesOpen] = useState(false);
    const [categoriasOpen, setCategoriasOpen] = useState(false);

    return (
        <header className="md:hidden  top-0 left-0 w-full z-50">
            <nav className="bg-pink-300 text-white flex items-center justify-between px-5 py-3 shadow-md">
                <Link
                    href="/admin"
                    className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                >
                    <h1 className="text-lg font-bold tracking-wide">Tiny Science</h1>
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1 border border-white/70 rounded-md text-sm hover:bg-pink-400 transition"
                >
                    <Menu size={20} className="flex-shrink-0 min-w-[20px]" />

                </button>
            </nav>

            <div
                className={`bg-pink-200 text-pink-900 w-full transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="flex flex-col px-6 py-3 space-y-2 border-t border-pink-300">
                    {/* Home */}
                    <li>
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                        >
                            <div className="flex items-center gap-2">
                                <Home size={18} />
                                <span>Home</span>
                            </div>
                        </Link>
                    </li>

                    {/* Cuenta */}
                    <li>
                        <Link
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                        >
                            <div className="flex items-center gap-2">
                                <User size={18} />
                                <span>Cuenta</span>
                            </div>
                        </Link>
                    </li>

                    {/* Categorías */}
                    <li>
                        <button
                            onClick={() => setCategoriasOpen(!categoriasOpen)}
                            className="flex items-center justify-between w-full px-2 py-2 hover:bg-pink-300 rounded-md transition"
                        >
                            <div className="flex items-center gap-2">
                                <Bell size={18} />
                                <span>Categorías</span>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${categoriasOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${categoriasOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <ul className="ml-6 mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/admin/categorias"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} />
                                            <span>Administrar</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/categorias/visualizar"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>Visualizar</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Pines */}
                    <li>
                        <button
                            onClick={() => setPinesOpen(!pinesOpen)}
                            className="flex items-center justify-between w-full px-2 py-2 hover:bg-pink-300 rounded-md transition"
                        >
                            <div className="flex items-center gap-2">
                                <AppWindow size={18} />
                                <span>Pines</span>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`transition-transform ${pinesOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${pinesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <ul className="ml-6 mt-2 space-y-2">
                                <li>
                                    <Link
                                        href="/admin/pines"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} />
                                            <span>Administrar</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/pines/visualizar"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>Visualizar</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Product */}
                    <li>
                        <Link
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="block px-2 py-2 hover:bg-pink-300 rounded-md transition"
                        >
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={18} />
                                <span>Product</span>
                            </div>
                        </Link>
                    </li>

                    {/* Sign Out */}
                    <li className="border-t border-pink-300 pt-3">
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-2 py-2 w-full rounded-md hover:bg-red-500 hover:text-white transition"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}
