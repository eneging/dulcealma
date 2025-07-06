import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useStoreData } from '../../src/hooks/useStoreData';
import { useCart } from '../../src/context/CartContext';
import OfferProducts from './ofertas';
import Carrusel from '~/src/componets/carrusel';

// Slugify para nombres de archivos
const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// Cargar todas las imágenes de assets usando import.meta.glob (Vite)
const imageModules = import.meta.glob('../../src/assets/*/*.png', { eager: true });

// Obtener la ruta de imagen con fallback
const getImagePath = (categoryId: number, name: string) => {
  const slug = slugify(name);
  const path = `../../src/assets/${categoryId}/${slug}.png`;
  const mod = imageModules[path] as { default: string } | undefined;
  return mod?.default || '/fallback.png'; // fallback en public/
};

export function Store() {
  const { products, categories, loading, error } = useStoreData();
  const { addToCart } = useCart();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const toggleCategory = useCallback((id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setSelectedCategories([]);
  }, []);

  const filteredProducts = useMemo(() => {
    const lower = debouncedSearch.toLowerCase();
    return products.filter(p => {
      const matchSearch =
        (p.name?.toLowerCase()?.includes(lower) ?? false) ||
        (p.description?.toLowerCase()?.includes(lower) ?? false);

      const matchCat =
        selectedCategories.length === 0 ||
        selectedCategories.includes(Number(p.product_category_id));

      return matchSearch && matchCat;
    });
  }, [products, debouncedSearch, selectedCategories]);

  return (
    <>
      <div className="py-6 lg:py-0 bg-amber-50 flex justify-center ">
        <OfferProducts />
      </div>

      <main className="bg-gray-950 min-h-screen text-white lg:py-[7vh] py-[5vh] px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-1/4 w-full bg-gray-900 rounded-xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold text-amber-500 mb-4">Filtrar</h2>
            <input
              className="w-full mb-4 px-3 py-2 bg-gray-900 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    selectedCategories.includes(cat.id)
                      ? 'bg-amber-500 text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {(search || selectedCategories.length > 0) && (
              <button
                onClick={clearFilters}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
              >
                Limpiar filtros
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <section className="md:w-3/4 w-full">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-gray-900 rounded-xl p-4 animate-pulse h-72" />
                ))}
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                No se encontraron productos.
                <button
                  onClick={clearFilters}
                  className="block mt-4 text-amber-500 hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={`/assets/${product.product_category_id}/${product.name}.png`}
                      alt={product.name}
                      className="w-full h-48 lg:h-55 object-cover"
                      onError={(e) => (e.currentTarget.src = '/fallback.png')}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{product.description}</p>
                      <p className="text-xl font-bold text-amber-400">S/ {product.price}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Store;
