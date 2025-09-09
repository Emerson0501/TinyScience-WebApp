"use client";
import { motion } from "framer-motion";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <motion.header
        className="flex justify-between items-center px-8 py-4 shadow-sm bg-gradient-to-r from-[#FF69B4] via-[#FF867C] to-[#FF70F0] text-white"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <nav className="flex space-x-6">
          <h1 className="text-xl font-bold">🌸 Tiny Science</h1>
          <a href="#inicio" className="hover:opacity-80">Inicio</a>
          <a href="#tienda" className="hover:opacity-80">Tienda</a>
          <a href="#sobre" className="hover:opacity-80">Sobre</a>
          <a href="#contacto" className="hover:opacity-80">Contacto</a>
        </nav>
        <div className="flex space-x-4 items-center">
          <a href="#" className="hover:opacity-80">Entrar</a>
          <button className="relative">🛒
            <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs rounded-full px-1">0</span>
          </button>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section
        id="inicio"
        className="h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#FF69B4] via-[#FF867C] to-[#FF70F0] text-white"
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={fadeUp}
        >
          Pines únicos de ciences médicas
        </motion.h2>
        <motion.button
          className="px-6 py-3 bg-white text-pink-700 rounded-lg font-semibold shadow-md hover:scale-105 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Comprar ahora
        </motion.button>
      </motion.section>

      {/* Más vendidos */}
      <motion.section
        id="tienda"
        className="px-8 py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-2xl font-bold mb-8 text-pink-800">Más vendidos</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="rounded-xl p-4 bg-gradient-to-b from-pink-200 to-purple-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              variants={fadeUp}
            >
              <div className="h-48 bg-gradient-to-tr from-[#FF70F0] to-[#FF867C] rounded-lg mb-4"></div>
              <h4 className="font-semibold text-pink-900">Producto {i}</h4>
              <p className="text-gray-700">$20.00</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Marcas */}
      <motion.section
        className="px-8 py-12 border-t border-b text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-lg font-semibold mb-6 text-pink-800">Marcas</h3>
        <div className="flex justify-center gap-12 flex-wrap">
          {["Logo", "Logo", "Logo", "Logo"].map((logo, i) => (
            <motion.span
              key={i}
              className="text-xl font-bold opacity-70"
              whileHover={{ scale: 1.1, color: "#FF69B4" }}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Acerca de */}
      <motion.section
        id="sobre"
        className="grid md:grid-cols-2 gap-8 px-8 py-16 items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.div
          className="h-64 bg-gradient-to-b from-[#FF867C] to-[#FF70F0] rounded-lg"
          whileHover={{ scale: 1.05 }}
        ></motion.div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-pink-800">Acerca de</h3>
          <p className="mb-6 text-gray-700">
            Aquí puedes agregar más información sobre el negocio: quién lo fundó, qué ofrece
            este sitio y lo que lo hace único frente a la competencia.
          </p>
          <motion.button
            className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:scale-105 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Leer más
          </motion.button>
        </div>
      </motion.section>

      {/* Beneficios */}
      <motion.section
        className="px-8 py-16 text-center bg-pink-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-2xl font-bold mb-12 text-pink-800">Beneficios</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF69B4] to-[#FF867C] rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-pink-900 mb-2">Beneficio {i}</h4>
              <p className="text-sm text-gray-700">
                Promociona aquí tu negocio, junto a sus productos y servicios.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Productos */}
      <motion.section
        className="grid md:grid-cols-2 gap-8 px-8 py-16 items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.div
          className="h-72 bg-gradient-to-b from-[#FF69B4] to-[#FF867C] rounded-lg"
          whileHover={{ scale: 1.05 }}
        ></motion.div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-pink-800">Productos</h3>
          <p className="mb-6 text-gray-700">
            Promociona aquí tu negocio, junto a sus productos y servicios.
          </p>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-[#FF70F0] to-[#FF69B4] text-white rounded-lg shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explorar
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        id="contacto"
        className="bg-gradient-to-r from-[#FF867C] via-[#FF70F0] to-[#FF69B4] text-white px-8 py-12 grid md:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div>
          <h4 className="font-bold mb-4">🌸 MyPins</h4>
          <p>Av. Principal #123<br />San José, Costa Rica</p>
          <p>info@misitio.com</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Menú</h4>
          <ul className="space-y-2">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#tienda">Tienda</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Redes sociales</h4>
          <ul className="space-y-2">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">X</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <input
            type="email"
            placeholder="Tu email"
            className="w-full p-2 rounded-md mb-2 text-gray-700"
          />
          <motion.button
            className="w-full px-4 py-2 bg-white text-pink-700 font-semibold rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            Suscribirse
          </motion.button>
        </div>
      </motion.footer>
    </div>
  );
}
