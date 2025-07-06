// src/components/Menu/Menu.tsx
import React, { useMemo } from 'react';
import { useStoreData } from '../../src/hooks/useStoreData';
import CategorySection from './CategorySection';

const Menu = () => {
  const { products, categories, loading, error } = useStoreData();

  const groupedByCategory = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      items: products.filter((prod) => prod.product_category_id === cat.id),
    }));
  }, [products, categories]);

  if (loading) {
    return (
      <div className="text-center py-20 text-white">
        <span className="animate-pulse text-yellow-300">Cargando menú...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-center py-20">{error}</div>;
  }

  return (
    <section className="py-16 bg-gray-900 text-white font-serif">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-yellow-400">Nuestro Menú</h1>

        {groupedByCategory.map((category) =>
          category.items.length > 0 ? (
            <CategorySection key={category.id} category={category} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default Menu;
