import React from 'react';

// Importa los iconos de redes sociales de React Icons si los tienes instalados
// Si no los tienes, puedes instalarlos con: npm install react-icons
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // O los iconos que prefieras

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Tienda', href: '/store' },
        { name: 'Eventos', href: '/eventos' },
        { name: 'Contáctanos', href: '/ubicacion' }, // Cambiado a /ubicacion para coherencia
    ];

    const phoneNumber = "51933739769";
    const whatsappMessage = encodeURIComponent("Hola, me gustaría obtener más información sobre sus postres y servicios de Dulce Alma.");

    const socialLinks = [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/RestobarPuertoricoICA', // Asegúrate de que esta URL sea la de Dulce Alma
            icon: <FaFacebookF className="w-6 h-6" />, // Icono de Facebook
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/puertoricorestobar.ica', // Asegúrate de que esta URL sea la de Dulce Alma
            icon: <FaInstagram className="w-6 h-6" />, // Icono de Instagram
        },
        {
            name: 'WhatsApp',
            href: `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
            icon: <FaWhatsapp className="w-6 h-6" />, // Icono de WhatsApp
        }
    ];

    return (
        <footer className="bg-gradient-to-t from-pink-200 to-rose-100 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-rose-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                {/* Información de Dulce Alma */}
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-serif text-pink-700 mb-4">Dulce Alma</h3>
                    <p className="text-gray-700 text-base leading-relaxed font-light">
                        Postres artesanales, frappés y momentos dulces en el corazón de Ica.
                        Vive una experiencia encantadora en cada bocado, hecha con pasión y los ingredientes más frescos.
                    </p>
                </div>

                {/* Enlaces de Navegación */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-serif text-blue-700 mb-5">Navegación</h3>
                    <ul className="space-y-3">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-gray-700 hover:text-pink-600 font-light transition-colors duration-300 text-base inline-block transform hover:translate-x-1"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div className="text-center md:text-right">
                    <h3 className="text-xl font-serif text-blue-700 mb-5">Síguenos</h3>
                    <div className="flex justify-center md:justify-end space-x-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
                                aria-label={link.name}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="border-pink-300 my-10" />

            {/* Derechos de autor */}
            <div className="text-center text-gray-600 text-sm font-light">
                &copy; {currentYear} Dulce Alma. Todos los derechos reservados.
                <p className="mt-1">Hecho con 💖 en Ica, Perú.</p>
            </div>
        </footer>
    );
}