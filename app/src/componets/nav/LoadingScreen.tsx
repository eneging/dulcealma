// src/components/LoadingScreen.tsx
import React from "react";
import Logo from "../../assets/favicon.ico"

export default function Cargando() {
  return (
     <div className="fixed inset-0 z-50 bg-rose-500 bg-opacity-90 flex flex-col items-center justify-center">
      {/* Logo animado */}
      <img
        src={Logo}
        alt="Puerto Rico Restobar"
        className="w-70 h-auto animate-pulse transition-all duration-1000"
      />
    </div>
  );
}
