import React from "react";
import { useLocation } from "react-router-dom";

function PrincipalNav() {
  const { pathname } = useLocation();

  const links = [
    { href: "/", label: "INICIO", icon: "home" },
    { href: "/store", label: "TIENDA", icon: "shopping-bag" },
    { href: "/checkout", label: "COMPRAR", icon: "credit-card" }, // Cambiado a "COMPRAR"
    { href: "/ubicacion", label: "UBÍCANOS", icon: "map-pin" }, // Acento en "UBÍCANOS"
    { href: "/contacto", label: "CONTACTO", icon: "message-circle" },
  ];

  const iconMap = {
    "home": (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06L12.53 2.78a2.25 2.25 0 0 0-3.18 0L.72 11.47a.75.75 0 1 0 1.06 1.06l8.69-8.69Z"/><path d="M12 5.43 20.16 13.6v6.2a1.875 1.875 0 0 1-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 1-.75.75H5.63A1.875 1.875 0 0 1 3.75 19.8v-6.2L12 5.43Z"/></svg>
    ),
    "shopping-bag": (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5.22 2.25a1.88 1.88 0 0 0-1.32.55l-1.3 1.3A3.75 3.75 0 0 0 7.5 9.75c.63.47 1.41.75 2.25.75s1.62-.28 2.25-.75c.63.47 1.41.75 2.25.75s1.62-.28 2.25-.75a3.75 3.75 0 0 0 4.9-5.65l-1.3-1.3a1.88 1.88 0 0 0-1.32-.55H5.22Z"/><path d="M3 20.25v-8.76c1.42.67 3.08.67 4.5 0a5.23 5.23 0 0 0 2.25.51c.8 0 1.57-.18 2.25-.51a5.23 5.23 0 0 0 2.25.51c.8 0 1.57-.18 2.25-.51 1.42.67 3.08.68 4.5.001v8.76h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Z"/></svg>
    ),
    "credit-card": (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25V6H3v-.75Zm0 3.75h18v9.75A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V9Z" /></svg>
    ),
    "map-pin": (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a8.25 8.25 0 0 0-8.25 8.25c0 3.85 2.02 6.84 3.96 8.83a19.58 19.58 0 0 0 2.68 2.28c.38.25.76.5 1.15.74.24.14.51.14.73 0 .39-.23.77-.49 1.15-.74a19.58 19.58 0 0 0 2.68-2.28c1.94-1.99 3.96-4.98 3.96-8.83A8.25 8.25 0 0 0 12 2.25Zm0 10.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"/></svg>
    ),
    "message-circle": (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12c0 4.97-4.48 9-10 9a10.9 10.9 0 0 1-4.25-.84l-4.53 1.28a.75.75 0 0 1-.92-.93l1.28-4.53A9.87 9.87 0 0 1 3 12c0-4.97 4.48-9 10-9s10 4.03 10 9Z"/></svg>
    )
  };

  return (
    // La barra de navegación ahora tiene un fondo suave, bordes redondeados y una sombra delicada
    <nav className="fixed lg:hidden bottom-0 w-full bg-pink-50 border-t border-rose-200 shadow-lg py-3 z-50 rounded-t-3xl">
      <div className="flex justify-around items-center">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 font-sans font-medium transition-all duration-300 transform ${
                isActive
                  ? "text-pink-600 scale-105" // Color rosa vibrante y un ligero aumento de tamaño para activo
                  : "text-gray-600 hover:text-pink-400" // Gris suave para inactivo, rosa pastel al pasar el mouse
              } text-center`} // Asegura que el texto se centre si hay más de una línea
            >
              {/* Icono */}
              <span className={`transition-colors duration-300 ${isActive ? "text-pink-600" : "text-gray-500 group-hover:text-pink-400"}`}>
                {iconMap[link.icon]}
              </span>
              {/* Etiqueta */}
              <span className="text-xs sm:text-sm whitespace-nowrap">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default PrincipalNav;