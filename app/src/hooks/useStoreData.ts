import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../api'; // ajusta la ruta según tu estructura

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  product_category_id: number;
  image?: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

const CACHE_KEY_PRODUCTS = 'cachedProducts';
const CACHE_KEY_CATEGORIES = 'cachedCategories';
const CACHE_KEY_TIMESTAMP = 'cacheTimestamp';
const CACHE_TTL = 3600 * 1000;

export function useStoreData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const now = Date.now();
      const cachedTimestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);

      let cachedProds: Product[] | null = null;
      let cachedCats: Category[] | null = null;

      if (cachedTimestamp && now - parseInt(cachedTimestamp, 10) < CACHE_TTL) {
        try {
          cachedProds = JSON.parse(localStorage.getItem(CACHE_KEY_PRODUCTS) || 'null');
          cachedCats = JSON.parse(localStorage.getItem(CACHE_KEY_CATEGORIES) || 'null');

          if (cachedProds && cachedCats) {
            setProducts(cachedProds);
            setCategories(cachedCats);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Error al leer caché", e);
        }
      }

      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        setProducts(prods);
        setCategories(cats);
        localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(prods));
        localStorage.setItem(CACHE_KEY_CATEGORIES, JSON.stringify(cats));
        localStorage.setItem(CACHE_KEY_TIMESTAMP, now.toString());
      } catch (err) {
        setError('Error al cargar los productos.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { products, categories, loading, error };
}
