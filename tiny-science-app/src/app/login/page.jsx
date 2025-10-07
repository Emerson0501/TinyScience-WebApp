'use client';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        }); 

        if (response.ok) {
            router.push('/admin'); // Redirect after successful login
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sección izquierda - Login */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col justify-center w-full md:w-1/2 p-10 bg-white"
            >
                <div className="max-w-md w-full mx-auto ">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Bienvenid@</h2>
                    <div className="flex justify-center items-center my-6">
                        <motion.img
                            src={'/LogoTinyScience.png'}
                            alt="Logo Tiny Science"
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Correo electrónico
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                                placeholder="usuario@correo.com"
                                className="w-full px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF70F0] transition"
                            />
                        </div>
                           <div className="relative">
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF70F0] transition"
                            />
                            <span
                                className="absolute right-3 top-9 cursor-pointer text-sm text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash/> : <FaEye/> }
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-[#FF69B4] via-[#FF867C] to-[#FF70F0] hover:scale-105 transition-transform shadow-md"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Sección derecha */}
            <div className="hidden md:block md:w-1/2 relative bg-[#FF70F0]">
                <ParticlesBackground />
            </div>
        </div>
    );
}

