import { useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api"; // Asegúrate de que la ruta sea correcta y que tus funciones de API estén definidas

interface Product {
  id: number;
  product_category_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface Category {
  id: number;
  name: string;
}

type ProductFormData = Omit<Product, "id" | "created_at" | "updated_at" | "image_url"> & {
  image_url: File | string;
};

interface UseProductsData {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string;
  isSubmitting: boolean;
  deletingId: number | null;
  form: ProductFormData;
  editingId: number | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setForm: React.Dispatch<React.SetStateAction<ProductFormData>>;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  reloadProducts: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleEdit: (product: Product) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useProductsData = (): UseProductsData => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [form, setForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image_url: "",
    product_category_id: 1, // Default or adjust based on categories
  });

  // Function to reload products after an action
  const reloadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setError(""); // Clear error if reload is successful
    } catch (err: any) {
      console.error("Error recargando productos:", err);
      const errorMessage = `Error al recargar productos: ${err.message || 'Error desconocido'}`;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);

        if (categoriesData.length > 0) {
          setForm((prev) => ({
            ...prev,
            product_category_id: prev.product_category_id === 1 && categoriesData.find(c => c.id === 1)
              ? 1
              : categoriesData[0].id
          }));
        }
      } catch (err: any) {
        console.error("Error cargando datos:", err);
        const errorMessage = `Error al cargar productos o categorías: ${err.message || 'Error desconocido'}`;
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadProducts]); // Depend on reloadProducts if it's external, or remove if it's defined inside and stable

  // Handles input changes for the form
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "product_category_id"
          ? Number(value)
          : value,
    }));
  }, []);

  // Handles file input change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, image_url: e.target.files![0] }));
    }
  }, []);

  // Resets the form to its initial state
  const resetForm = useCallback(() => {
    setForm({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image_url: "",
      product_category_id: categories.length > 0 ? categories[0].id : 1,
    });
    setEditingId(null);
  }, [categories]);

  // Submits the form for creating or updating a product
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.name || !form.description || form.price <= 0 || form.stock < 0 || form.product_category_id === null || isNaN(Number(form.product_category_id))) {
      toast.error("Por favor, completa todos los campos requeridos y asegúrate que el precio y stock sean válidos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price.toString());
      formData.append("stock", form.stock.toString());
      formData.append("product_category_id", form.product_category_id.toString());

      if (form.image_url instanceof File) {
        formData.append("image", form.image_url);
      } else if (typeof form.image_url === 'string' && form.image_url !== '') {
        // If your API expects the URL to be explicitly sent for existing images when no new file is uploaded
        // formData.append("image_url", form.image_url);
      }

      if (editingId) {
        await updateProduct(editingId, formData);
        toast.success("Producto actualizado con éxito!");
      } else {
        await createProduct(formData);
        toast.success("Producto creado con éxito!");
      }

      resetForm();
      await reloadProducts();
      // setShowFormModal(false); // This will be handled by the component
    } catch (err: any) {
      console.error("Error al guardar:", err);
      const errorMessage = `Error al guardar producto: ${err.response?.data?.message || err.message || 'Error desconocido'}`;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, editingId, reloadProducts, resetForm]);

  // Opens the modal for editing an existing product
  const handleEdit = useCallback((product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
      product_category_id: product.product_category_id,
    });
    // setShowFormModal(true); // This will be handled by the component
  }, []);

  // Confirms and executes the product deletion
  const handleDelete = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success("Producto eliminado con éxito!");
      await reloadProducts();
    } catch (err: any) {
      console.error("Error al eliminar:", err);
      const errorMessage = `Error al eliminar el producto: ${err.response?.data?.message || err.message || 'Error desconocido'}`;
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setDeletingId(null);
    }
  }, [reloadProducts]);

  return {
    products,
    categories,
    loading,
    error,
    isSubmitting,
    deletingId,
    form,
    editingId,
    searchTerm,
    setSearchTerm,
    setForm,
    setEditingId,
    reloadProducts,
    handleChange,
    handleFileChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};