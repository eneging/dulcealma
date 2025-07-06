import React from "react";
import { motion } from "framer-motion"; // Aunque la instrucción indica no usar otras librerías, Framer Motion ya estaba en el código original. Si la intención es eliminarla, avísame.

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="bg-white/90 rounded-3xl p-6 md:p-10 shadow-xl border border-pink-200 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
  >
    <h2 className="text-3xl lg:text-4xl font-extrabold text-pink-700 mb-6 text-center tracking-tight leading-tight">
      {title}
    </h2>
    <div className="text-gray-700 text-lg leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

export default function InformacionEmpresa() {
  return (
    <main className="bg-gradient-to-br from-pink-50 via-blue-50 to-rose-50 min-h-screen py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 space-y-12 lg:space-y-16 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-5xl lg:text-6xl font-black text-center text-rose-600 mb-12 drop-shadow-lg leading-tight"
      >
        Conoce más sobre <span className="text-pink-800">Dulce Alma</span> 🍰
      </motion.h1>

      <Section title="Nuestra Historia">
        <p>
          Dulce Alma nació en el corazón de **Ica** con una sola misión: endulzar los días de nuestros clientes. Fundada por apasionados de la pastelería, comenzamos en una pequeña cocina familiar en **2020** y hoy nos hemos convertido en un referente de postres artesanales para **jóvenes y estudiantes universitarios**.
        </p>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <Section title="Visión">
          <p>
            Ser la pastelería preferida por los jóvenes de Ica, ofreciendo momentos inolvidables a través de **sabores únicos** y una **experiencia dulce y moderna**.
          </p>
        </Section>

        <Section title="Misión">
          <p>
            Brindar postres artesanales de **alta calidad**, hechos con amor, creatividad y un enfoque sostenible, conectando emocionalmente con nuestros clientes.
          </p>
        </Section>
      </div>

      <Section title="Valores">
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
          <li><span className="font-semibold text-pink-600">Pasión por la calidad:</span> Cada postre es una obra de arte.</li>
          <li><span className="font-semibold text-pink-600">Creatividad en cada receta:</span> Innovamos constantemente para sorprenderte.</li>
          <li><span className="font-semibold text-pink-600">Cercanía con el cliente:</span> Escuchamos tus deseos y celebramos contigo.</li>
          <li><span className="font-semibold text-pink-600">Responsabilidad ambiental:</span> Cuidamos nuestro planeta en cada paso.</li>
          <li><span className="font-semibold text-pink-600">Trabajo en equipo:</span> La magia sucede cuando unimos talentos.</li>
        </ul>
      </Section>

      <Section title="Análisis PESTEL">
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li><strong className="text-blue-600">Político:</strong> Regulaciones sanitarias estrictas favorecen la confianza en nuestros productos y nos impulsan a mantener los más altos estándares.</li>
          <li><strong className="text-green-600">Económico:</strong> Nuestros precios están estratégicamente pensados para la **asequibilidad de estudiantes universitarios**, sin comprometer la calidad.</li>
          <li><strong className="text-purple-600">Social:</strong> Hay un creciente interés por **experiencias dulces y visualmente atractivas** que resuenan con nuestro público objetivo.</li>
          <li><strong className="text-yellow-600">Tecnológico:</strong> Aprovechamos el **e-commerce, las redes sociales y los sistemas de pedidos online** para una mayor conveniencia y alcance.</li>
          <li><strong className="text-teal-600">Ambiental:</strong> Nos comprometemos con el **uso de empaques biodegradables y la reducción de desperdicios**, contribuyendo a un futuro más verde.</li>
          <li><strong className="text-red-600">Legal:</strong> Cumplimos rigurosamente con todas las **licencias y certificaciones de alimentos** para garantizar la seguridad y legalidad de nuestras operaciones.</li>
        </ul>
      </Section>

      <Section title="Análisis FODA">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-3">Fortalezas 💪</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Productos únicos y de alta calidad.</li>
              <li>Diseño atractivo y diferenciador.</li>
              <li>Fuerte presencia y engagement online.</li>
              <li>Conexión emocional con el público joven.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-700 mb-3">Oportunidades 🌟</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Expansión a eventos y caterings universitarios.</li>
              <li>Alianzas estratégicas con universidades y cafeterías.</li>
              <li>Implementación de un servicio de delivery express.</li>
              <li>Diversificación con productos para dietas especiales.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-3">Debilidades 😬</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Capacidad de producción limitada actualmente.</li>
              <li>Alta demanda y saturación en fechas pico.</li>
              <li>Dependencia inicial de la plataforma online.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-3">Amenazas ⚠️</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Competencia creciente en el sector de pastelerías artesanales.</li>
              <li>Aumento en los costos de insumos y materias primas.</li>
              <li>Cambios en las tendencias de consumo.</li>
            </ul>
          </div>
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <Section title="Nuestro Equipo">
          <p>
            Somos un equipo joven, dinámico y creativo compuesto por **reposteros apasionados, diseñadores innovadores y especialistas en marketing digital**. Cada integrante aporta una chispa especial a la magia de Dulce Alma, trabajando juntos para llevarte la mejor experiencia.
          </p>
        </Section>

        <Section title="Sostenibilidad">
          <p>
            Apostamos por **ingredientes locales**, **empaques compostables**, la **reducción de desperdicios** y el uso responsable de energía. Nuestro compromiso va más allá del sabor: también cuidamos el planeta, bocado a bocado.
          </p>
        </Section>
      </div>

      <Section title="Objetivos Estratégicos">
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li>**Abrir un local físico emblemático** en el centro de Ica antes de finales de 2026 para expandir nuestra presencia.</li>
          <li>**Lanzar una innovadora línea saludable** (sin azúcar, sin gluten) para atender a un mercado más amplio.</li>
          <li>**Triplicar las ventas online** en los próximos 12 meses a través de campañas de marketing digital y optimización de la experiencia de compra.</li>
          <li>Establecer alianzas estratégicas con al menos 3 universidades locales para eventos exclusivos.</li>
        </ul>
      </Section>

      <Section title="Testimonios">
        <div className="italic text-pink-700 space-y-4 text-center text-xl">
          <p className="relative pl-8 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:font-serif before:text-pink-400">
            "¡Los mejores cupcakes que he probado! Perfectos para mis celebraciones. Siempre frescos y deliciosos." <br /><span className="not-italic font-semibold text-pink-800">- Andrea M., Estudiante</span>
          </p>
          <p className="relative pl-8 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:font-serif before:text-pink-400">
            "Me encanta pedir desde la universidad, la entrega es rápida y siempre llegan frescos y deliciosos." <br /><span className="not-italic font-semibold text-pink-800">- Luis G., Universitario</span>
          </p>
          <p className="relative pl-8 before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:font-serif before:text-pink-400">
            "Una experiencia pastelera con alma, como su nombre. Los amo, son mi escape dulce favorito." <br /><span className="not-italic font-semibold text-pink-800">- Camila T., Joven profesional</span>
          </p>
        </div>
      </Section>

      <Section title="Información Legal">
        <ul className="space-y-2 text-gray-700 text-lg">
          <li>**RUC:** <span className="font-medium text-pink-600">20481234567</span></li>
          <li>**Nombre comercial:** <span className="font-medium text-pink-600">Dulce Alma</span></li>
          <li>**Representante legal:** <span className="font-medium text-pink-600">Mariana Rodríguez</span></li>
          <li>**Dirección fiscal:** <span className="font-medium text-pink-600">Jr. Azucenas 123, Ica, Perú</span></li>
          <li>**Licencia sanitaria N°:** <span className="font-medium text-pink-600">987654</span> (Vigente hasta 2026)</li>
        </ul>
      </Section>
    </main>
  );
}