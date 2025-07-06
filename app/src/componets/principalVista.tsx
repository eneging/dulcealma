import { Card, CardContent } from "../componets/ui/card";
import { motion } from "framer-motion";
import ChicaAlistas from "../assets/images/mockups/ChicaAlitas.png";
import ChicaBebidas from "../assets/images/mockups/ChicaTragos.png";
import LocalPrincipal from "../assets/images/mockups/localeventos.jpeg";

const cardsData = [
  {
    title: "Comida Criolla",
    img: ChicaAlistas,
    description: "Comida criolla, piqueos y tragos a solo un clic. Pide ahora o reserva tu evento.",
    color: "bg-red-500/10",
    href: "food", // Added href
  },
  {
    title: "Bebidas y Licores",
    img: ChicaBebidas,
    description: "Refresca tu noche con nuestras bebidas especiales.",
    color: "bg-indigo-500/10",
    href: "bar", // Added href
  },
  {
    title: "Eventos Corporativos",
    img: LocalPrincipal,
    description: "Reserva tu evento empresarial con atención exclusiva.",
    color: "bg-amber-500/10",
    href: "reservaciones", // Added href
  },
];

export default function PrincipalVista() {
  return (
    <div className=" text-black z-30 bg-orange-400  w-full lg:flex lg:justify-center ">
      {/* Hero */}

      {/* Tarjetas */}
      <section className="grid gap-6 p-6 sm:grid-cols-2  md:grid-cols-3 lg:gap-10 lg:w-[70vw] ">
        {cardsData.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
         
          
          >
            {/* Wrap the Card with an <a> tag */}
            <a href={card.href} className="block"> 
              <Card className={`overflow-hidden shadow-lg rounded-2xl  transition-all ${card.color}`}>
                <CardContent className="p-0">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-48 lg:h-[35vh] object-cover rounded-t-2xl"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21s-9-4.78-9-12c0-2.49 2.1-4.5 4.7-4.5 1.93 0 3.6 1.13 4.3 2.74 0.7-1.61 2.37-2.74 4.3-2.74 2.6 0 4.7 2.01 4.7 4.5 0 7.22-9 12-9 12z" />
                      </svg>
                      <h3 className="text-lg font-bold lg:text-sm  ">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-900 ">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </section>
    </div>
  );
}