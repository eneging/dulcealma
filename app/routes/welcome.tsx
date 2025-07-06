import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Asumiendo que estas rutas son correctas y se han actualizado
import PrincipalVista from "~/src/componets/principalVista"; 
import Alistas from "../src/assets/icons/alistasicon.png"; // Icono de piqueos
import Bebida from "../src/assets/icons/bebidaicon.png"; // Icono de bebidas
import ReservaModal from '../src/componets/reservar/ReservaModal';

// Asegúrate de que las rutas de tus imágenes son correctas
import LocalPrincipal from "../../public/assets/images/mockups/local.png"; // Imagen de fondo principal
import ChicaPlatos from "../../public/assets/images/mockups/chica1.webp"; // Una imagen que quizás uses como icono o para una sección
import ChicaPastelHero from "../../public/assets/images/mockups/chicapastel3.png"; // Imagen para el hero
import ChicaPastelFilosofia from "../../public/assets/images/mockups/chicapastel4.png"; // Imagen para la sección Filosofía


import Ofertas from './store/ofertas'; // Renombrado a OfferProducts si es el mismo componente
import Categorias from './store/categorias';
// import OfferProducts from './store/ofertas'; // Duplicado, usar solo uno
import WhatsAppButton from '~/src/componets/SocialMedia';
import AboutUs from './about/about';


interface WelcomeProps {
    // message?: string;
}

interface CategoryItem {
    src: string;
    label: string;
    alt: string; 
}

interface FeaturedProduct {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
}

export const Welcome: React.FC<WelcomeProps> = () => {
    const categorias: CategoryItem[] = [
        { src: Bebida, label: "Licores", alt: "Icono de Licores" },
        { src: Alistas, label: "Piqueos", alt: "Icono de Piqueos/Alitas" },
        { src: ChicaPlatos, label: "Platos", alt: "Icono de Platos Principales" }, // Usando una de tus imágenes como icono si aplica
        { src: '/path/to/wine-icon.png', label: 'Vinos', alt: 'Icono de Vinos' },
        { src: '/path/to/beer-icon.png', label: 'Cervezas', alt: 'Icono de Cervezas' },
    ];

    const [showReserveModal, setShowReserveModal] = useState(false);

    const handleReservar = (fecha: Date) => {
        const fechaStr = fecha.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Formato local
        const horaStr = fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
        const mensaje = `¡Hola! Me gustaría reservar el local para el día ${fechaStr} a las ${horaStr}.`;
        const whatsappNumber = '51933739769'; // Asegúrate de que este número es el correcto
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
        setShowReserveModal(false);
    };

    // Framer Motion variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9, // Ligeramente más lento para más elegancia
                ease: "easeOut",
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 }, // Menos desplazamiento
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8, // Ligeramente más lento
                ease: "easeOut",
                staggerChildren: 0.15, // Mayor stagger para un efecto más pronunciado
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.85 }, // Ligeramente menos escalado
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.9, // Ligeramente más lento
                ease: "easeOut",
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 30 }, // Mayor desplazamiento vertical
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                staggerChildren: 0.2, // Stagger entre botones
            },
        },
    };

    return (
        <main className="bg-rose-50 text-gray-800 flex flex-col items-center overflow-hidden font-sans">

            {/* Hero Principal - Dulce Alma */}
            <section
                className="relative w-full min-h-screen flex items-center justify-center py-20 lg:py-0
                 bg-cover bg-center bg-no-repeat 
                 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-white/50 after:to-transparent lg:after:bg-white/20 after:backdrop-blur-sm"
                style={{ backgroundImage: `url('${LocalPrincipal}')` }}
            >
                <div className="relative z-10 w-full max-w-7xl lg:grid lg:grid-cols-2 lg:gap-12 h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6">
                    {/* Texto del Hero */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl 
                                   flex flex-col gap-6 items-center lg:items-start max-w-xl 
                                   border border-rose-100 transform transition-transform duration-300 hover:scale-[1.01]"
                    >
                        <motion.h1
                            variants={textVariants}
                            className="text-5xl lg:text-7xl font-serif text-rose-600 leading-tight drop-shadow-md"
                        >
                            <span className="block mb-2">Endulza tu día</span>
                            <span className="text-pink-800">con Dulce Alma</span>
                        </motion.h1>
                        <motion.p
                            variants={textVariants}
                            className="text-lg lg:text-xl text-gray-700 leading-relaxed font-light"
                        >
                            Explora nuestros **postres artesanales**, bebidas encantadoras y momentos para compartir. ¡Tu rincón dulce favorito en Ica te espera!
                        </motion.p>
                        <motion.div variants={buttonVariants} className="mt-8 flex flex-col sm:flex-row gap-5">
                            <motion.a
                                variants={buttonVariants}
                                href="/store"
                                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg 
                                           transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Ver Tienda <span className="text-xl">🍰</span>
                            </motion.a>
                            <motion.button
                                variants={buttonVariants}
                                onClick={() => setShowReserveModal(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg 
                                           transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Reservar Lugar <span className="text-xl">☕</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Imagen Hero - Chica con pastel */}
                    <div className="hidden lg:flex justify-center items-center p-8">
                        <motion.img
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            src={ChicaPastelHero} // Asegúrate de que esta ruta sea correcta
                            alt="Joven disfrutando un pastel en Dulce Alma"
                            className="w-full max-w-xl object-contain rounded-3xl shadow-2xl transform transition-transform duration-500 hover:rotate-2 hover:scale-105"
                        />
                    </div>
                </div>
            </section>

            {/* Sección de filosofía - Momentos Dulces */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // Aumentado el amount
                className="w-full bg-gradient-to-b from-rose-50 to-pink-100 py-24 px-6 flex flex-col lg:flex-row items-center justify-center gap-16"
            >
                <div className="lg:w-1/2 flex justify-center">
                    <motion.img
                        variants={imageVariants}
                        src={ChicaPastelFilosofia} // Asegúrate de que esta ruta sea correcta
                        alt="Persona disfrutando de postres en Dulce Alma"
                        className="w-full max-w-md object-contain rounded-[40%] shadow-xl border border-rose-200 
                                   transform hover:scale-105 transition-transform duration-500 ease-out"
                    />
                </div>
                <div className="lg:w-1/2 max-w-lg text-center lg:text-left">
                    <motion.h2 variants={textVariants} className="text-4xl lg:text-5xl font-serif text-pink-700 mb-6 leading-tight">
                        Momentos dulces<br /><span className="text-blue-700">con sabor y alma</span>
                    </motion.h2>
                    <motion.p variants={textVariants} className="text-gray-700 text-lg leading-relaxed mb-6 font-light">
                        En **Dulce Alma** celebramos cada instante con postres hechos con cariño, perfectos para compartir con amigos o disfrutar en soledad. Cada bocado es una experiencia inolvidable.
                    </motion.p>
                    <motion.p variants={textVariants} className="text-gray-500 text-xl italic font-serif">
                        “Donde cada bocado es una caricia para el alma.”
                    </motion.p>
                </div>
            </motion.section>

            {/* Componente de Categorías (se asume que ya tiene los estilos base) */}
            <Categorias />

            {/* Componente AboutUs (se asume que ya tiene los estilos base) */}
            <AboutUs />

            {/* CTA Final */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full py-24 px-6 bg-rose-50 text-center border-t border-rose-100"
            >
                <h2 className="text-4xl lg:text-5xl font-serif text-pink-700 mb-8 leading-tight">
                    ¿Lista para el momento más dulce del día?
                </h2>
                <p className="text-gray-600 text-xl mb-12 max-w-3xl mx-auto font-light">
                    De brownies suaves a frappés cremosos, Dulce Alma es tu espacio para endulzar cada día. Descubre tu postre favorito.
                </p>
                <a
                    href="/store"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full shadow-xl 
                               transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-2xl 
                               flex items-center justify-center gap-3 mx-auto max-w-fit"
                >
                    Explorar Postres <span className="text-3xl">🎂</span>
                </a>
            </motion.section>

            {/* Botón de WhatsApp + Modal */}
            <WhatsAppButton />
            {showReserveModal && (
                <ReservaModal
                    onClose={() => setShowReserveModal(false)}
                    onReservar={handleReservar}
                />
            )}
        </main>
    );
};