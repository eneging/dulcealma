// src/components/OfferProducts.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../src/hooks/useStoreData';
import { useCart } from '../../src/context/CartContext';

const OfferProducts: React.FC = () => {
  const { products, categories, loading, error } = useStoreData();
  const { addToCart } = useCart();

  if (loading) return <div className="text-white p-4">Cargando productos...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const offerProducts = products.filter((p) => p.is_offer);

  return (
    <section className="w-[85vw] py-12  text-white">
      <h2 className="lg:text-3xl  text-2xl md:text-4xl font-bold text-orange-500 mb-8 text-center">
        ¡No te Pierdas Nuestras Ofertas! 🏷️
      </h2>

      {/* Carrusel de tarjetas */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex space-x-4 snap-x snap-mandatory overflow-x-auto pb-4">
          {offerProducts.map((product) => {
            const category = categories.find((cat) => cat.id === product.product_category_id);

            return (
              <motion.div
                key={product.id}
                className="snap-center flex-shrink-0 w-72  sm:w-80 bg-gray-800 rounded-2xl shadow-md border border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="p-5 flex flex-col  items-center text-center">
                  <img
                    src={`/assets/${product.product_category_id}/${product.name}.png`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">{product.name}</h3>
                  <p className="text-orange-400 text-base font-bold line-through">S/ {product.price}</p>
                  <p className="text-green-400 text-lg font-bold mb-2">S/ {product.offer_price}</p>
                  <p className="text-sm text-gray-400 mb-4">{category?.name}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfferProducts;
