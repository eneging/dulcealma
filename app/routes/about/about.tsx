import React from 'react';
import { motion } from 'framer-motion';
import Chicapostre from "../../../public/assets/imgdulcealma/8.png"; // Asegúrate de la ruta correcta
import Chicapostre2 from "../../../public/assets/imgdulcealma/3.png"

function AboutUs() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Aumentado para un efecto más suave
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 }, // Mayor desplazamiento vertical
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 80, // Menos rigidez para una animación más fluida
                damping: 12,  // Mayor amortiguación
            },
        },
    };

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0, rotate: -5 }, // Añadido pequeña rotación inicial
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: 'spring', // Cambiado a spring para un efecto más natural
                stiffness: 70,
                damping: 10,
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    return (
        <main className="min-h-screen flex flex-col items-center px-4 py-16 md:py-24 bg-rose-50 text-gray-800 font-sans">
            {/* Hero Section - Nuestra Dulce Historia */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // Usar whileInView para que se active al hacer scroll
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-16 max-w-5xl"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl lg:text-7xl font-serif text-rose-600 drop-shadow-md mb-6 leading-tight"
                >
                    Nuestra Dulce Historia <span className="text-pink-400">🍰</span>
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light"
                >
                    En <strong className="text-rose-500">Dulce Alma</strong> horneamos más que postres: creamos momentos dulces para estudiantes, amigos y soñadores en la encantadora ciudad de Ica.
                </motion.p>
            </motion.div>

            {/* Sección Historia - Horneado con Amor */}
            <section className="w-full max-w-6xl mb-20 px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="bg-white rounded-3xl p-8 md:p-16 shadow-xl flex flex-col md:flex-row items-center gap-10 md:gap-20 border border-rose-100 transform transition-transform duration-500 hover:scale-[1.01]"
                >
                    <motion.div variants={imageVariants} className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={Chicapostre}
                            alt="Fundadora de Dulce Alma creando postres con pasión"
                            className="rounded-[40%] w-full max-w-sm object-cover shadow-lg border border-rose-200 transform hover:rotate-3 hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-serif text-rose-700 mb-6 leading-tight">
                            Horneado con Amor <span className="text-pink-400">❤️</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-gray-700 text-lg leading-relaxed mb-4 font-light">
                            <strong className="text-rose-500">Dulce Alma</strong> nació en Ica como un pequeño sueño para compartir felicidad en forma de postres. Desde el primer bizcocho, supimos que queríamos **conectar con quienes aman lo dulce**.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-gray-700 text-lg leading-relaxed font-light">
                            Con recetas caseras, ingredientes frescos seleccionados cuidadosamente y una pizca de ternura en cada preparación, creamos una experiencia que no solo se disfruta con el paladar, sino **con el corazón**.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Sección Filosofía - Más que Postres, Experiencias */}
            <section className="w-full max-w-6xl mb-20 px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="bg-white rounded-3xl p-8 md:p-16 shadow-xl flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20 border border-blue-100 transform transition-transform duration-500 hover:scale-[1.01]"
                >
                    <motion.div variants={imageVariants} className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={Chicapostre2}
                            alt="Equipo de Dulce Alma compartiendo un momento dulce"
                            className="rounded-[40%] w-full max-w-sm object-cover shadow-lg border border-blue-200 transform hover:-rotate-3 hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-serif text-blue-700 mb-6 leading-tight">
                            Más que Postres, Experiencias <span className="text-blue-400">✨</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-gray-700 text-lg leading-relaxed mb-4 font-light">
                            Nuestro equipo comparte una misión: endulzar tu día, sin importar si estás en clases, en casa o celebrando algo especial. **Cada visita es una celebración**.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-gray-700 text-lg leading-relaxed font-light">
                            Con un sistema de pedidos online **fácil, rápido y seguro**, llevarte un momento dulce a casa nunca fue tan simple. ¡Haz tu pedido desde donde estés y recibe una boleta electrónica al instante!
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Sección Qué Ofrecemos */}
            <section className="w-full max-w-6xl mb-20 px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-cyan-100 transform transition-transform duration-500 hover:scale-[1.01]"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-serif text-cyan-700 mb-12 text-center leading-tight">
                        ¿Qué Te Ofrecemos en Dulce Alma?
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-center">
                        <motion.div variants={itemVariants} className="p-8 bg-rose-50 rounded-2xl shadow-md border border-rose-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-6xl mb-5">🧁</div>
                            <h3 className="text-2xl font-semibold text-rose-600 mb-3 font-serif">Postres Hechos a Mano</h3>
                            <p className="text-gray-700 font-light">
                                Brownies, cupcakes, cheesecakes y más, preparados artesanalmente cada día con los ingredientes más frescos.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="p-8 bg-blue-50 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-6xl mb-5">📱</div>
                            <h3 className="text-2xl font-semibold text-blue-600 mb-3 font-serif">Compra Online Fácil</h3>
                            <p className="text-gray-700 font-light">
                                Pide tus favoritos desde tu celular o laptop con nuestro sistema intuitivo y recibe tu boleta electrónica al instante.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="p-8 bg-cyan-50 rounded-2xl shadow-md border border-cyan-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                            <div className="text-6xl mb-5">🎓</div>
                            <h3 className="text-2xl font-semibold text-cyan-600 mb-3 font-serif">Momentos para Estudiantes</h3>
                            <p className="text-gray-700 font-light">
                                Descubre promociones especiales y combos perfectos para recargar energía, estudiar o simplemente relajarte entre clases.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* CTA Final */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-center mt-12 px-4"
            >
                <p className="text-2xl mb-8 text-pink-700 font-light max-w-2xl mx-auto">
                    ¿Listo para probar la magia de <strong className="text-rose-600">Dulce Alma</strong> y hacer tu día más dulce?
                </p>
                <a
                    href="/store" 
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-12 rounded-full shadow-lg 
                               transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-xl inline-flex items-center gap-3"
                >
                    Ver Nuestro Menú <span className="text-3xl">🍩</span>
                </a>
            </motion.div>
        </main>
    );
}

export default AboutUs;