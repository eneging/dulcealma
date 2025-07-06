import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Plus, X } from 'lucide-react'; // Using lucide-react for Plus/X icons
import InstallPWAButton from './descargarWeb';

const SocialFloatingButtons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "51933739769"; // Your actual WhatsApp number
  const whatsappMessage = encodeURIComponent("Hola, me gustaría obtener más información.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  const instagramLink = "https://www.instagram.com/puertoricorestobar.ica"; // Replace with your Instagram profile URL
  const facebookLink = "https://www.facebook.com/RestobarPuertoricoICA";     // Replace with your Facebook page URL

  const commonButtonClasses = "w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110";
  const labelClasses = "absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none";

  return (
    <div className="fixed lg:bottom-5 bottom-20 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <>
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-green-500 hover:bg-green-600 ${commonButtonClasses} ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: isOpen ? '150ms' : '0ms' }} // Staggered animation
            title="Chatea por WhatsApp"
          >
            <FaWhatsapp size={24} />
            <span className={labelClasses}>WhatsApp</span>
          </a>

          <a>
            <InstallPWAButton></InstallPWAButton>
            
          </a>

          {/* Instagram Button */}
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-purple-600 hover:bg-purple-700 ${commonButtonClasses} ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: isOpen ? '100ms' : '50ms' }} // Staggered animation
            title="Síguenos en Instagram"
          >
            <FaInstagram size={24} />
            <span className={labelClasses}>Instagram</span>
          </a>

          {/* Facebook Button */}
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-blue-600 hover:bg-blue-700 ${commonButtonClasses} ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: isOpen ? '50ms' : '100ms' }} // Staggered animation
            title="Visítanos en Facebook"
          >
            <FaFacebookF size={24} />
            <span className={labelClasses}>Facebook</span>
          </a>
        </>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-rose-600 hover:bg-orange-600 ${commonButtonClasses} ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        title={isOpen ? "Cerrar" : "Abrir redes sociales"}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
};

export default SocialFloatingButtons;