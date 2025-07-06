import React, { useState, useEffect } from 'react';
import { useCartDrawer } from "../CartDrawerContext";
import { useCart } from "../../context/CartContext";
import Logo from "../../assets/favicon.ico";
import { Button } from '../ui/button';
import { CalendarCheck, ShoppingCart, Menu, X, Mail, Phone } from 'lucide-react';
import ReservaModal from '../reservar/ReservaModal';
import { useGlobalData } from "../../hooks/useGlobalData";
import Cargando from './LoadingScreen';

function Header() {
    const { openDrawer } = useCartDrawer();
    const { cart } = useCart();
    const [showReserveModal, setShowReserveModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const { data, loading } = useGlobalData();
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname);
            const dismissed = localStorage.getItem('disclaimerDismissed');
            if (dismissed === 'true') {
                setShowDisclaimer(false);
            }
        }
    }, []);

    if (loading) return <Cargando />;

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleReservar = (fecha) => {
        const fechaStr = fecha.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const horaStr = fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
        const mensaje = `¡Hola! Me gustaría reservar el local para el día ${fechaStr} a las ${horaStr}.`;
        const url = `https://wa.me/51933739769?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
        setShowReserveModal(false);
    };

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Tienda', href: '/store' },
        { name: 'Eventos', href: '/eventos' },
        { name: 'Checkout', href: '/checkout' },
        { name: 'Ubícanos', href: '/ubicacion' },
        { name: 'Nosotros', href: '/about' }, // Cambiado "About us" por "Nosotros" para coherencia
    ];

    const dismissDisclaimer = () => {
        setShowDisclaimer(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem('disclaimerDismissed', 'true');
        }
    };

    return (
        <>
            {/* Top Bar de Contacto y Libro de Reclamaciones */}
            <div className='bg-rose-50 text-rose-800 flex flex-col lg:flex-row justify-center items-center py-1 lg:py-2 text-sm font-light'>
                <ul className='flex flex-wrap justify-center gap-x-4 lg:gap-x-6'>
                    <li className='flex items-center gap-1'>
                        <a href="mailto:dulcealmaredes@gmail.com" className="flex items-center gap-1 hover:text-rose-600 transition-colors">
                            <Mail className="size-4" />
                            <span>dulcealmaredes@gmail.com</span>
                        </a>
                    </li>
                    <li className='hidden lg:block text-rose-400'>|</li>
                    <li className='flex items-center gap-1'>
                        <a href="/inbox" className="flex items-center gap-1 hover:text-rose-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <span>Libro de reclamaciones</span>
                        </a>
                    </li>
                    <li className='hidden lg:block text-rose-400'>|</li>
                    <li className='flex items-center gap-1'>
                        <a href={`tel:${data.whatsapp}`} className="flex items-center gap-1 hover:text-rose-600 transition-colors">
                            <Phone className="size-4" />
                            <span>{data.whatsapp}</span>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Header */}
            <div className='flex justify-center sticky top-0 z-50 w-full'>
                <header className="w-full h-[10vh] min-h-[60px] lg:h-[8vh]  lg:min-h-[80px] bg-rose-500 text-white flex items-center px-4 lg:px-10 py-3 shadow-lg justify-between font-serif"> {/* Font family added here */}
                    <a href="/" className="flex items-center gap-2">
                        {/* El logo se ajusta para que el texto sea el foco en pantallas grandes */}
                        <img src={Logo} alt="Logo Dulce Alma" className="h-13 w-auto lg:h-15  " /> 
                      
                    </a>

                    {/* Navegación de escritorio */}
                    <nav className='hidden lg:flex gap-8 '>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-lg font-medium hover:text-rose-100 transition-colors tracking-wide
                                    ${currentPath === link.href ? 'font-bold text-rose-100 underline underline-offset-4 decoration-2 decoration-rose-100' : ''}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className=' flex justify-end'>

                    {/* Botones de acción (Reservar, Carrito) */}
                    <div className="flex items-center    relative px-1 lg:px-5">
                        <Button
                            onClick={() => setShowReserveModal(true)}
                            variant="outline"
                            className="bg-white  text-rose-600 border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors py-2 rounded-br-none rounded-e-none   shadow-sm"
                        >
                            <CalendarCheck className="w-5 h-5 mr-2" />
                            <span className="hidden sm:inline font-semibold">Reservar</span>
                        </Button>

                        <div className="relative">
                            <Button
                                onClick={openDrawer}
                                className="bg-rose-700 text-white hover:bg-rose-800 px-4 py-2 flex items-center gap-2 rounded-bl-none rounded-l-none transition-all relative group shadow-md"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pink-300 text-rose-900 text-xs rounded-full px-2 py-0.5 font-bold shadow-md animate-bounce-once">
                                        {totalQuantity}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Botón de menú móvil */}
                    <div className="lg:hidden flex items-center">
                        <Button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            variant="ghost"
                            className="text-white p-2 hover:bg-rose-600"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>

                    </div>
                </header>

                {/* Menú móvil */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 bg-rose-50 z-40 flex flex-col items-center justify-center text-rose-800 font-serif animate-fade-in">
                        <Button
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="ghost"
                            className="absolute top-4 right-4 text-rose-800 p-2 hover:bg-rose-100"
                        >
                            <X className="w-8 h-8" />
                        </Button>
                        <nav className="flex flex-col gap-6 text-3xl items-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-rose-800 hover:text-rose-600 transition-colors font-semibold
                                        ${currentPath === link.href ? 'text-rose-900 underline underline-offset-4 decoration-rose-900' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a href='/login' className='text-rose-800 hover:text-rose-600 transition-colors mt-6 flex items-center gap-2 text-2xl font-semibold'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                </svg>
                                <span>Login</span>
                            </a>
                        </nav>
                    </div>
                )}
            </div>

            {/* Disclaimer Bar */}
            {showDisclaimer && (
                <div className='bg-amber-100 text-amber-800 text-center py-1.5 text-sm font-medium tracking-wide flex items-center justify-center relative shadow-sm'>
                    <p className="px-10">Tomar bebidas alcohólicas en exceso es dañino. Solo para mayores de 18 años.</p>
                    <button
                        onClick={dismissDisclaimer}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-800 hover:text-amber-900 p-1 rounded-full transition-colors duration-200"
                        aria-label="Cerrar advertencia"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Modal de Reserva */}
            {showReserveModal && (
                <ReservaModal
                    onClose={() => setShowReserveModal(false)}
                    onReservar={handleReservar}
                />
            )}
        </>
    );
}

export default Header;