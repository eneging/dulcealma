import React from 'react';
import { motion } from 'framer-motion';

const eventos = [
  {
    titulo: "Noche de Karaoke",
    descripcion: "¡Saca el artista que llevas dentro todos los viernes desde las 9 PM! Disfruta de premios, sorpresas y un ambiente inigualable.",
    imagen: "/assets/eventos/karaoke.png",
  },
  {
    titulo: "Cumpleaños Inolvidables",
    descripcion: "Celebra tu día especial con decoración personalizada, tu música favorita y un postre de cortesía.",
    imagen: "/assets/eventos/cumpleanos.png",
  },
  {
    titulo: "Fiestas Temáticas",
    descripcion: "Desde noches ochenteras hasta celebraciones peruanas con sabor criollo. ¡No te pierdas ninguna!",
    imagen: "/assets/eventos/fiestatematica.png",
  },
  {
    titulo: "Eventos Corporativos",
    descripcion: "Perfecto para integraciones y reuniones con un toque dulce. Ambientes privados y atención dedicada.",
    imagen: "/assets/eventos/corporativo.png",
  },
  {
    titulo: "Reuniones Familiares",
    descripcion: "Comparte con tus seres queridos una experiencia única con postres y platos hechos con amor.",
    imagen: "/assets/eventos/reuniofamilia.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const whatsappMessage = encodeURIComponent("¡Hola! Me gustaría más información sobre los eventos en Dulce Alma. ¿Podrían ayudarme?");
const whatsappLink = `https://wa.me/51932563713?text=${whatsappMessage}`;

const Eventos: React.FC = () => {
  return (
    <div className="w-full bg-pink-50 py-16 px-4 sm:px-6 lg:px-16 font-body text-gray-800">
      <h1 className="text-4xl sm:text-5xl font-heading font-bold text-center text-pink-500 mb-6 tracking-wide uppercase">
        Eventos Dulces y Especiales
      </h1>
      <p className="text-lg sm:text-xl text-blue-500 text-center mb-12 max-w-2xl mx-auto">
        En Dulce Alma, cada ocasión es una oportunidad para celebrar con sabor, alegría y estilo.
      </p>

      <motion.div
        className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {eventos.map((evento, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl shadow-lg overflow-hidden
                       hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2
                       border border-pink-200"
            variants={itemVariants}
          >
            <img
              src={evento.imagen}
              alt={`Imagen del evento: ${evento.titulo}`}
              className="w-full h-60 object-cover object-center border-b-4 border-pink-300"
            />
            <div className="p-6">
              <h2 className="text-2xl font-heading font-bold text-pink-500 mb-3 uppercase">
                {evento.titulo}
              </h2>
              <p className="text-blue-600 text-base leading-relaxed">
                {evento.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-20 text-center">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-pink-500 mb-4">
          ¿Quieres celebrar con nosotros?
        </h3>
        <p className="text-lg text-blue-600 mb-6">
          Escríbenos para reservar un evento
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-pink-400 text-white font-heading text-lg rounded-full shadow-md
                     hover:bg-white hover:text-pink-500 hover:border hover:border-pink-400
                     transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          📲 Contáctanos por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Eventos;

