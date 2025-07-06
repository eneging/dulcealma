import React from 'react';
import { motion } from 'framer-motion';

function Ubicacion() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }, // Aumentado para un efecto más pausado y elegante
        },
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 }, // Mayor desplazamiento vertical inicial
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 70, // Menos rigidez para una animación más suave
                damping: 12,   // Más amortiguación
            },
        },
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 text-gray-800 flex flex-col items-center px-4 py-16 md:py-24 font-sans">
            {/* Título y Subtítulo de la Sección */}
            <motion.div
                initial="hidden"
                whileInView="visible" // Usar whileInView para animar al hacer scroll
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="text-center mb-16 max-w-3xl"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-6xl lg:text-7xl font-serif text-pink-700 drop-shadow-md mb-6 leading-tight"
                >
                    ¡Visítanos en Dulce Alma! 📍
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light"
                >
                    Descubre el sabor dulce y el ambiente acogedor de nuestra pastelería. Te esperamos para endulzar tu día en Ica.
                </motion.p>
            </motion.div>

            {/* Mapa de Google */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 10 }} // Pequeña rotación inicial
                whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 50 }}
                viewport={{ once: true, amount: 0.4 }}
                className="w-full max-w-5xl mb-16 rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-200 transform transition-transform duration-500 hover:scale-[1.005]"
            >
                {/* Asegúrate de reemplazar "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.961453870131!2d-75.736396!3d-14.079452799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e36193f81dcf%3A0xdf81168b59de4c8d!2sPuerto%20Rico!5e0!3m2!1ses-419!2spe!4v1748888589635!5m2!1ses-419!2spe" con un enlace de Google Maps real */}
                {/* Por ejemplo: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.12345!2d-75.728123!3d-14.075678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92f72a4c12345678%3A0x123456789abcdef!2sTu%20Ubicaci%C3%B3n!5e0!3m2!1ses!2s!4v1678901234567!5m2!1ses!2s */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.078423293813!2d-75.7281234!3d-14.0673322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92f7311116c9058b%3A0x6b1e6e0d9b4c022!2sIca%2C%20Per%C3%BA!5e0!3m2!1ses!2s!4v1708453456789!5m2!1ses!2s" // URL de ejemplo, reemplaza con la ubicación exacta de Dulce Alma
                    width="100%"
                    height="500" // Un poco más alto para mejor visibilidad
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 w-full h-[500px] rounded-2xl" // Borde removido, redondez añadida
                    title="Ubicación de Dulce Alma en Ica"
                ></iframe>
            </motion.div>

            {/* Información de Contacto y Horarios */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mb-16"
            >
                {/* Contacto */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-10 shadow-xl border border-rose-100 transform transition-transform duration-300 hover:-translate-y-2">
                    <h2 className="text-4xl font-serif text-pink-700 mb-6 text-center leading-tight">Contáctanos</h2>
                    <ul className="space-y-6 text-center text-xl text-gray-700 font-light">
                        <li>
                            <p className="font-semibold text-rose-500 mb-2">Dirección:</p>
                            <a
                                href="https://maps.app.goo.gl/TUdireccionExactaEnGoogleMaps" // Reemplaza con el link real a Google Maps de tu dirección
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-pink-600 hover:underline transition-colors duration-200"
                            >
                                Divino Maestro H1, Ica, Perú
                            </a>
                        </li>
                        <li>
                            <p className="font-semibold text-rose-500 mb-2">Teléfono:</p>
                            📞 <a href="tel:+51933739769" className="text-pink-600 hover:text-pink-700 hover:underline transition-colors duration-200">+51 933 739 769</a>
                        </li>
                        <li>
                            <p className="font-semibold text-rose-500 mb-2">Email:</p>
                            📧 <a href="mailto:contactodulcealma@gmail.com" className="text-pink-600 hover:text-pink-700 hover:underline transition-colors duration-200">contactodulcealma@gmail.com</a> {/* Corregido el email de ejemplo */}
                        </li>
                    </ul>
                </motion.div>

                {/* Horarios */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-10 shadow-xl border border-blue-100 transform transition-transform duration-300 hover:-translate-y-2">
                    <h2 className="text-4xl font-serif text-blue-700 mb-6 text-center leading-tight">Horarios de Atención</h2>
                    <ul className="space-y-6 text-center text-xl text-gray-700 font-light">
                        <li>
                            <span className="font-semibold text-blue-500 block mb-1">Lunes a Jueves:</span>
                            12:00 PM - 10:00 PM
                        </li>
                        <li>
                            <span className="font-semibold text-blue-500 block mb-1">Viernes y Sábados:</span>
                            12:00 PM - 11:30 PM
                        </li>
                        <li>
                            <span className="font-semibold text-blue-500 block mb-1">Domingos:</span>
                            1:00 PM - 9:00 PM
                        </li>
                    </ul>
                </motion.div>
            </motion.div>

            {/* Botón de WhatsApp Flotante (si no lo tienes ya en el layout global) */}
            <motion.a
                href="https://wa.me/51933739769?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20la%20ubicaci%C3%B3n%20de%20Dulce%20Alma."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl flex items-center gap-3 mt-12 mb-8"
            >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.0007 2C6.4789 2 2.0007 6.4777 2.0007 12C2.0007 14.1956 2.694 16.2755 3.9317 18.0163L2.0125 22.0805L6.2084 20.8037C7.4578 21.5799 8.9056 22 10.4007 22H10.5007C15.9007 22 20.4007 17.5223 20.4007 12C20.4007 6.4777 15.9007 2 10.4007 2H12.0007ZM15.0007 16.0004L14.0007 14.0004C13.8007 13.6004 13.5007 13.2004 13.0007 13.0004L11.5007 11.5004C11.3007 11.3004 11.1007 11.2004 11.0007 11.2004C10.9007 11.2004 10.8007 11.2004 10.7007 11.2004L10.0007 11.0004C9.5007 10.9004 9.1007 11.0004 8.7007 11.4004C8.4007 11.7004 8.2007 12.0004 8.2007 12.5004C8.2007 12.6004 8.2007 12.7004 8.2007 12.8004L9.0007 13.5004C9.1007 13.6004 9.2007 13.7004 9.3007 13.8004L10.0007 14.5004C10.1007 14.6004 10.2007 14.7004 10.3007 14.8004C10.4007 14.9004 10.5007 15.0004 10.6007 15.0004C10.7007 15.0004 10.8007 15.0004 10.9007 15.0004L11.5007 15.0004C11.6007 15.0004 11.7007 15.0004 11.8007 15.0004L13.0007 16.0004L15.0007 16.0004Z" />
                </svg>
                ¡Háblanos por WhatsApp!
            </motion.a>
        </main>
    );
}

export default Ubicacion;