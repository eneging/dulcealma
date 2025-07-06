import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Make sure this is imported somewhere globally or here

import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../src/api"; // Asegúrate de que la ruta sea correcta


interface Product {
  id: number;
  product_category_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_offer: boolean;
  offer_price?: number;
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

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // State for search filter
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Form state
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image_url: "",
    product_category_id: categories.length > 0 ? categories[0].id : 1,
  is_offer: false,
  offer_price: 0,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Clear any previous global errors before loading
        setError("");

        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);

        if (categoriesData.length > 0) {
          // Set initial category to the first one available, or keep default if 1 is valid
          setForm((prev) => ({
            ...prev,
            product_category_id: prev.product_category_id === 1 && categoriesData.find((c:Category) => c.id === 1)
              ? 1 // if category 1 exists, keep it
              : categoriesData[0].id // otherwise, use the first category
          }));
        }
      } catch (err: any) {
        console.error("Error cargando datos:", err);
        const errorMessage = `Error al cargar productos o categorías: ${err.message || 'Error desconocido'}`;
        setError(errorMessage);
        toast.error(errorMessage); // Show toast for initial load error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to reload products after an action
  const reloadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      console.error("Error recargando productos:", err);
      const errorMessage = `Error al recargar productos: ${err.message || 'Error desconocido'}`;
      setError(errorMessage); // Keep global error for persistent display if needed
      toast.error(errorMessage);
    }
  };

  // Handles input changes for the form
  const handleChange = (
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
  };

  // Handles file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, image_url: e.target.files![0] }));
    }
  };

  // Resets the form to its initial state
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image_url: "",
     product_category_id: categories.length > 0 ? categories[0].id : 1,
       is_offer: false,
  offer_price: 0,
    });
    setEditingId(null);
    // No need to clear formError state explicitly if Toastify is used for feedback
  };

  // Submits the form for creating or updating a product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.name || 
      !form.description 
      || form.price <= 0 
      || form.stock < 0 
      || form.product_category_id === null 
      || isNaN(Number(form.product_category_id))) {
      toast.error("Por favor, completa todos los campos requeridos y asegúrate que el precio y stock sean válidos.");
      
      setIsSubmitting(false);


      return;
    }

if (
  form.is_offer &&
  (!form.offer_price || form.offer_price <= 0 || form.offer_price >= form.price)
) {
  toast.error("El precio de oferta debe ser menor al precio normal.");
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
      formData.append("is_offer", form.is_offer ? "1" : "0");

        if (form.is_offer && form.offer_price) {
      formData.append("offer_price", form.offer_price.toString());
    }
 

      if (form.image_url instanceof File) {
        formData.append("image", form.image_url);
      } else if (typeof form.image_url === 'string' && form.image_url !== '') {
        // If your API expects the URL to be explicitly sent for existing images when no new file is uploaded
        // formData.append("image_url", form.image_url);
      }

if (form.image_url instanceof File) {
  formData.append("image", form.image_url);
} else if (typeof form.image_url === "string" && form.image_url !== "") {
  formData.append("image_url", form.image_url); // Esto es opcional, depende del backend
}

          // 👉 AQUI AGREGA LOS LOGS
    console.log("EDITANDO ID:", editingId);
    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
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
      setShowFormModal(false); // Close the modal on success
    } catch (err: any) {
      console.error("Error al guardar:", err);
      const errorMessage = `Error al guardar producto: ${err.response?.data?.message || err.message || 'Error desconocido'}`;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Opens the modal for creating a new product
  const handleCreateNew = () => {
    resetForm();
    setShowFormModal(true);
  };

  // Opens the modal for editing an existing product
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    // No need to clear formError/successMessage if Toastify is used
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
      product_category_id: product.product_category_id,
       is_offer: product.is_offer,
  offer_price: product.offer_price ?? 0,
    });
    setShowFormModal(true);
  };

  // Closes the product form modal and resets the form
  const handleCancelForm = () => {
    resetForm();
    setShowFormModal(false);
  };

  // Initiates the delete confirmation process
  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setShowDeleteConfirmModal(true);
  };

  // Confirms and executes the product deletion
  const confirmDelete = async () => {
    if (productToDelete === null) return;

    setDeletingId(productToDelete);
 

    try {
      await deleteProduct(productToDelete);
      toast.success("Producto eliminado con éxito!");
      await reloadProducts();
      setProductToDelete(null);
      setShowDeleteConfirmModal(false);
    } catch (err: any) {
      console.error("Error al eliminar:", err);
      const errorMessage = `Error al eliminar el producto: ${err.response?.data?.message || err.message || 'Error desconocido'}`;
      toast.error(errorMessage);
      setError(errorMessage); // Keep global error for persistent display if needed
    } finally {
      setDeletingId(null);
    }
  };

  // Cancels the delete operation
  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteConfirmModal(false);
  };

  // Filtered products based on search term
 const filteredProducts = products.filter((product) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const nameMatch = product.name?.toLowerCase().includes(lowerCaseSearchTerm) ?? false;
  const descMatch = product.description?.toLowerCase().includes(lowerCaseSearchTerm) ?? false;
  const categoryName = categories.find((cat) => cat.id === product.product_category_id)?.name;
  const categoryMatch = categoryName?.toLowerCase().includes(lowerCaseSearchTerm) ?? false;

  return nameMatch || descMatch || categoryMatch;
});

  if (loading)
    return <div className="p-4 text-white text-center">Cargando productos y categorías...</div>;
 
  if (error)
     return <div className="p-4 text-red-500 text-center">Ha ocurrido un error: {error}. Por favor, recarga la página.</div>;

const offerProducts = products.filter(p => p.is_offer);

  return (
    <div className="p-4 sm:ml-64">
      {/* ToastContainer is essential for displaying toasts */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

   

      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {/* Top Grid for Dashboard Stats (Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col  items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
           
            <h1 className="text-orange-400">Numero de productos</h1>
            <p>{products.length}</p>


          </div>
          <div className="flex flex-col items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
           
 
            <h1 className="text-orange-400">Numero de Categorias</h1>
            <p>{categories.length}</p>

          </div>
          <div className="flex flex-col  items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
           
              <h1 className="text-orange-400">Numero de Ofertas</h1>
            <p>{offerProducts.length}</p>


          </div>
        </div>

        {/* Product Management Section */}
        <div className="h-auto mb-4 rounded-sm bg-gray-50 dark:bg-gray-800 p-4">
          <div className="max-w-6xl mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Gestión de Productos</h3>
              <button
                onClick={handleCreateNew}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 transition duration-200"
              >
                Crear Nuevo Producto
              </button>
            </div>

            {/* Search Input Field */}
            <div className="mb-4">
              <label htmlFor="product-search" className="sr-only">Buscar productos</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  id="product-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Buscar por nombre, descripción o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Product List Table (Responsive) */}
            <div className="overflow-x-auto rounded-lg shadow-md bg-gray-900">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-gray-300 text-left text-sm">
                    <th className="p-3 border-b border-gray-700">Nombre</th>
                    <th className="p-3 border-b border-gray-700 hidden md:table-cell">Descripción</th>
                    <th className="p-3 border-b border-gray-700">Precio</th>
                    <th className="p-3 border-b border-gray-700 hidden sm:table-cell">Stock</th>
                    <th className="p-3 border-b border-gray-700 hidden md:table-cell">Imagen</th>
                    <th className="p-3 border-b border-gray-700 hidden lg:table-cell">Categoría</th>
                      <th className="p-3 border-b border-gray-700 hidden lg:table-cell">oferta</th>
                      <th className="p-3 hidden lg:table-cell">Precio Oferta</th>
                    <th className="p-3 border-b border-gray-700 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-100 text-sm">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-4 text-gray-400">No hay productos que coincidan con tu búsqueda.</td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-700 transition duration-150">
                        <td className="p-3 font-medium">{p.name}</td>
                        <td className="p-3 text-xs max-w-xs overflow-hidden text-ellipsis whitespace-nowrap hidden md:table-cell">{p.description}</td>
                        <td className="p-3">S/ {p.price.toFixed(2)}</td>
                        <td className="p-3 hidden sm:table-cell">{p.stock}</td>
                        <td className="p-3 hidden md:table-cell">
                          
                            <img src={`/public/assets/${p.product_category_id}/${p.name}.png`} alt={p.name} className="w-12 h-12 object-cover rounded-md shadow" />
                      
                        </td>
                        <td className="p-3 hidden lg:table-cell">
                          {categories.find((c) => c.id === p.product_category_id)?.name || "Sin categoría"}
                        </td>
                        <td className="p-3 hidden lg:table-cell">
{p.is_offer && p.offer_price != null && p.offer_price < p.price ? (
  <div>
    <p className="text-green-400 font-semibold text-sm">Sí</p>
    <p className="text-yellow-300 text-xs">S/ {p.offer_price.toFixed(2)}</p>
  </div>
) : (
  <span className="text-gray-400 text-sm">No</span>
)}
</td>
<td className="p-3">
  {p.is_offer && p.offer_price != null && p.offer_price < p.price ? (
    <div>
      <span className="line-through text-red-400 mr-1">S/ {p.price.toFixed(2)}</span>
      <span className="text-green-400 font-semibold">S/ {p.offer_price.toFixed(2)}</span>
    </div>
  ) : (
    <span>S/ {p.price.toFixed(2)}</span>
  )}
</td>

                        <td className="p-3 space-x-2 text-right">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-400 hover:text-blue-300 font-medium transition duration-150 text-xs md:text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id)}
                            className="text-red-400 hover:text-red-300 font-medium transition duration-150 text-xs md:text-sm"
                            disabled={deletingId === p.id}
                          >
                            {deletingId === p.id ? "Eliminando..." : "Eliminar"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Grid for Other Dashboard Elements (Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
           
           
        
          </div>
          <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28 dark:bg-gray-800">
            

          
          </div>
        </div>
      
       
      </div>

      {/* --- Modals --- */}

      {/* Product Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 text-white rounded-lg shadow-xl p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {editingId ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            {/* formError is removed as toastify handles it */}
            {/* {formError && (
              <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
                {formError}
              </div>
            )} */}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4 grid gap-3">

                  <img src={`../../../app/src/assets/${form.product_category_id}/${form.name}.png`} ></img>
                  
                </div>
                <div className="mb-4 grid gap-4 ">

                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre:</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Precio:</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    step="0.01"
                    className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />

                       <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Descripción detallada del producto"
                  rows={3}
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
                
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock:</label>
                  <input
                    id="stock"
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock disponible"
                    className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="product_category_id" className="block text-sm font-medium text-gray-300 mb-1">Categoría:</label>
                  <select
                    id="product_category_id"
                    name="product_category_id"
                    value={form.product_category_id}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Seleccionar categoría
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {categories.length === 0 && !loading && !error && (
                    <p className="text-yellow-400 text-sm mt-2">No hay categorías cargadas.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="mb-4">
    <label htmlFor="is_offer" className="block text-sm font-medium text-gray-300 mb-1">¿En oferta?</label>
    <select
      id="is_offer"
      name="is_offer"
      value={form.is_offer ? "1" : "0"}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          is_offer: e.target.value === "1",
        }))
      }
      className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="0">No</option>
      <option value="1">Sí</option>
    </select>
  </div>

  <div className="mb-4">
    <label htmlFor="offer_price" className="block text-sm font-medium text-gray-300 mb-1">Precio de oferta:</label>
    <input
      id="offer_price"
      type="number"
      name="offer_price"
      value={form.offer_price ?? ""}
      onChange={handleChange}
      placeholder="Precio con descuento"
      step="0.01"
      className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
      disabled={!form.is_offer}
    />
  </div>
</div>

              <div className="mb-6 ">
                <label htmlFor="image_upload" className="block text-sm font-medium text-gray-300 mb-1">Imagen:</label>
                <input
                  type="file"
                  id="image_upload"
                  name="image_upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2 bg-gray-700 border border-gray-600 text-sm rounded-lg block w-full p-2.5 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                 {form.image_url && typeof form.image_url === 'string' && (
                    <p className="text-gray-400 text-xs mt-1">Imagen actual: <a href={form.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ver</a></p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : editingId ? "Actualizar Producto" : "Crear Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 text-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-center">Confirmar Eliminación</h3>
            <p className="text-gray-300 mb-6 text-center">¿Estás seguro de que quieres eliminar este producto?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelDelete}
                className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                disabled={deletingId === productToDelete}
              >
                {deletingId === productToDelete ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsAdmin;