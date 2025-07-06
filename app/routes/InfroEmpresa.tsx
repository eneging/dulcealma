import React from "react";
import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="bg-white/95 rounded-3xl p-6 md:p-10 shadow-lg border border-rose-100 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-xl"
  >
    <h2 className="text-3xl lg:text-4xl font-extrabold text-rose-600 mb-6 text-center tracking-tight leading-tight bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="text-gray-700 text-lg leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

export default function InformacionEmpresa() {
  return (
    <main className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 min-h-screen py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 space-y-12 lg:space-y-16 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-5xl lg:text-6xl font-black text-center text-rose-700 mb-12 drop-shadow-md leading-tight"
      >
        Conoce más sobre <span className="bg-gradient-to-r from-rose-700 to-pink-800 bg-clip-text text-transparent">Dulce Alma</span> 🍰
      </motion.h1>

      <Section title="Nuestra Historia">
        <p className="text-gray-800">
          Dulce Alma nació en el corazón de <span className="font-semibold text-rose-700">Ica</span> con una sola misión: endulzar los días de nuestros clientes. Fundada por apasionados de la pastelería, comenzamos en una pequeña cocina familiar en <span className="font-semibold text-rose-700">2020</span> y hoy nos hemos convertido en un referente de postres artesanales para <span className="font-semibold text-rose-700">jóvenes y estudiantes universitarios</span>.
        </p>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <Section title="Visión">
          <p className="text-gray-800">
            Ser la pastelería preferida por los jóvenes de Ica, ofreciendo momentos inolvidables a través de <span className="font-semibold text-rose-600">sabores únicos</span> y una <span className="font-semibold text-rose-600">experiencia dulce y moderna</span>.
          </p>
        </Section>

        <Section title="Misión">
          <p className="text-gray-800">
            Brindar postres artesanales de <span className="font-semibold text-rose-600">alta calidad</span>, hechos con amor, creatividad y un enfoque sostenible, conectando emocionalmente con nuestros clientes.
          </p>
        </Section>
      </div>

      <Section title="Valores">
        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <li className="flex items-start">
            <span className="bg-rose-100 text-rose-700 rounded-full p-2 mr-3 flex-shrink-0">🍰</span>
            <div>
              <span className="font-semibold text-rose-700">Pasión por la calidad:</span> Cada postre es una obra de arte.
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-rose-100 text-rose-700 rounded-full p-2 mr-3 flex-shrink-0">✨</span>
            <div>
              <span className="font-semibold text-rose-700">Creatividad en cada receta:</span> Innovamos constantemente para sorprenderte.
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-rose-100 text-rose-700 rounded-full p-2 mr-3 flex-shrink-0">💖</span>
            <div>
              <span className="font-semibold text-rose-700">Cercanía con el cliente:</span> Escuchamos tus deseos y celebramos contigo.
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-rose-100 text-rose-700 rounded-full p-2 mr-3 flex-shrink-0">🌱</span>
            <div>
              <span className="font-semibold text-rose-700">Responsabilidad ambiental:</span> Cuidamos nuestro planeta en cada paso.
            </div>
          </li>
          <li className="flex items-start md:col-span-2 justify-center">
            <span className="bg-rose-100 text-rose-700 rounded-full p-2 mr-3 flex-shrink-0">👥</span>
            <div>
              <span className="font-semibold text-rose-700">Trabajo en equipo:</span> La magia sucede cuando unimos talentos.
            </div>
          </li>
        </ul>
      </Section>

      <Section title="Análisis PESTEL">
        <ul className="space-y-4 text-gray-800">
          <li className="bg-rose-50 p-4 rounded-xl border-l-4 border-blue-500">
            <strong className="text-blue-600">Político:</strong> Regulaciones sanitarias estrictas favorecen la confianza en nuestros productos y nos impulsan a mantener los más altos estándares.
          </li>
          <li className="bg-rose-50 p-4 rounded-xl border-l-4 border-green-500">
            <strong className="text-green-600">Económico:</strong> Nuestros precios están estratégicamente pensados para la <span className="font-semibold text-rose-700">asequibilidad de estudiantes universitarios</span>, sin comprometer la calidad.
          </li>
          <li className="bg-rose-50 p-4 rounded-xl border-l-4 border-purple-500">
            <strong className="text-purple-600">Social:</strong> Hay un creciente interés por <span className="font-semibold text-rose-700">experiencias dulces y visualmente atractivas</span> que resuenan con nuestro público objetivo.
          </li>
          <li className="bg-rose-50 p-4 rounded-xl border-l-4 border-yellow-500">
            <strong className="text-yellow-600">Tecnológico:</strong> Aprovechamos el <span className="font-semibold text-rose-700">e-commerce, las redes sociales y los sistemas de pedidos online</span> para una mayor conveniencia y alcance.
          </li>
          <li className="bg-rose-50 p-4 rounded-xl border-l-4 border-teal-500">
            <strong className="text-teal-600">Ambiental:</strong> Nos comprometemos con el <span className="font-semibold text-rose-700">uso de empaques biodegradables y la reducción de desperdicios</span>, contribuyendo a un futuro más verde.
          </li>
          <li className="bg-rose-50 p-4 rounded-xl border-l-4 border-red-500">
            <strong className="text-red-600">Legal:</strong> Cumplimos rigurosamente con todas las <span className="font-semibold text-rose-700">licencias y certificaciones de alimentos</span> para garantizar la seguridad y legalidad de nuestras operaciones.
          </li>
        </ul>
      </Section>

      <Section title="Análisis FODA">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
              <span className="bg-green-200 text-green-800 rounded-full p-1 mr-2">💪</span> Fortalezas
            </h3>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Productos únicos y de alta calidad.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Diseño atractivo y diferenciador.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Fuerte presencia y engagement online.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Conexión emocional con el público joven.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
              <span className="bg-blue-200 text-blue-800 rounded-full p-1 mr-2">🌟</span> Oportunidades
            </h3>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✧</span>
                <span>Expansión a eventos y caterings universitarios.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✧</span>
                <span>Alianzas estratégicas con universidades y cafeterías.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✧</span>
                <span>Implementación de un servicio de delivery express.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✧</span>
                <span>Diversificación con productos para dietas especiales.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-2xl border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center">
              <span className="bg-yellow-200 text-yellow-800 rounded-full p-1 mr-2">😬</span> Debilidades
            </h3>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <span>Capacidad de producción limitada actualmente.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <span>Alta demanda y saturación en fechas pico.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <span>Dependencia inicial de la plataforma online.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
              <span className="bg-red-200 text-red-800 rounded-full p-1 mr-2">⚠️</span> Amenazas
            </h3>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span>Competencia creciente en el sector de pastelerías artesanales.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span>Aumento en los costos de insumos y materias primas.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✕</span>
                <span>Cambios en las tendencias de consumo.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <Section title="Nuestro Equipo">
          <p className="text-gray-800">
            Somos un equipo joven, dinámico y creativo compuesto por <span className="font-semibold text-rose-700">reposteros apasionados, diseñadores innovadores y especialistas en marketing digital</span>. Cada integrante aporta una chispa especial a la magia de Dulce Alma, trabajando juntos para llevarte la mejor experiencia.
          </p>
        </Section>

        <Section title="Sostenibilidad">
          <p className="text-gray-800">
            Apostamos por <span className="font-semibold text-rose-700">ingredientes locales</span>, <span className="font-semibold text-rose-700">empaques compostables</span>, la <span className="font-semibold text-rose-700">reducción de desperdicios</span> y el uso responsable de energía. Nuestro compromiso va más allá del sabor: también cuidamos el planeta, bocado a bocado.
          </p>
        </Section>
      </div>

      <Section title="Objetivos Estratégicos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-rose-700 mb-2">Expansión física</h4>
            <p className="text-gray-800">
              <span className="font-semibold">Abrir un local físico emblemático</span> en el centro de Ica antes de finales de 2026 para expandir nuestra presencia.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-rose-700 mb-2">Innovación en productos</h4>
            <p className="text-gray-800">
              <span className="font-semibold">Lanzar una innovadora línea saludable</span> (sin azúcar, sin gluten) para atender a un mercado más amplio.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-rose-700 mb-2">Crecimiento digital</h4>
            <p className="text-gray-800">
              <span className="font-semibold">Triplicar las ventas online</span> en los próximos 12 meses a través de campañas de marketing digital.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-rose-700 mb-2">Alianzas estratégicas</h4>
            <p className="text-gray-800">
              Establecer alianzas estratégicas con al menos <span className="font-semibold">3 universidades locales</span> para eventos exclusivos.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Testimonios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200">
            <p className="italic text-gray-800 mb-4 relative pl-8  before:absolute before:left-0 before:top-0 before:text-4xl before:font-serif before:text-rose-400">
              "¡Los mejores cupcakes que he probado! Perfectos para mis celebraciones. Siempre frescos y deliciosos."
            </p>
            <p className="font-semibold text-rose-700 text-right">- Andrea M., Estudiante</p>
          </div>
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200">
            <p className="italic text-gray-800 mb-4 relative pl-8 before:absolute before:left-0 before:top-0 before:text-4xl before:font-serif before:text-rose-400">
              "Me encanta pedir desde la universidad, la entrega es rápida y siempre llegan frescos y deliciosos."
            </p>
            <p className="font-semibold text-rose-700 text-right">- Luis G., Universitario</p>
          </div>
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200">
            <p className="italic text-gray-800 mb-4 relative pl-8  before:absolute before:left-0 before:top-0 before:text-4xl before:font-serif before:text-rose-400">
              "Una experiencia pastelera con alma, como su nombre. Los amo, son mi escape dulce favorito."
            </p>
            <p className="font-semibold text-rose-700 text-right">- Camila T., Joven profesional</p>
          </div>
        </div>
      </Section>

      <Section title="Información Legal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-rose-700 mb-4">Datos de la empresa</h3>
            <ul className="space-y-3 text-gray-800">
              <li className="flex justify-between border-b border-rose-100 pb-2">
                <span className="font-medium">RUC:</span>
                <span className="text-rose-700">20481234567</span>
              </li>
              <li className="flex justify-between border-b border-rose-100 pb-2">
                <span className="font-medium">Nombre comercial:</span>
                <span className="text-rose-700">Dulce Alma</span>
              </li>
              <li className="flex justify-between border-b border-rose-100 pb-2">
                <span className="font-medium">Representante legal:</span>
                <span className="text-rose-700">Mariana Rodríguez</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-rose-700 mb-4">Información adicional</h3>
            <ul className="space-y-3 text-gray-800">
              <li className="flex justify-between border-b border-rose-100 pb-2">
                <span className="font-medium">Dirección fiscal:</span>
                <span className="text-rose-700">Jr. Azucenas 123, Ica, Perú</span>
              </li>
              <li className="flex justify-between border-b border-rose-100 pb-2">
                <span className="font-medium">Licencia sanitaria N°:</span>
                <span className="text-rose-700">987654 (Vigente hasta 2026)</span>
              </li>
              <li className="flex justify-between border-b border-rose-100 pb-2">
                <span className="font-medium">Año de fundación:</span>
                <span className="text-rose-700">2020</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <div className="text-center text-gray-600 mt-8">
        <p>© {new Date().getFullYear()} Dulce Alma. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">Endulzando momentos especiales en Ica</p>
      </div>
    </main>
  );
}