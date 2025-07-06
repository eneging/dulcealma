// src/api.ts
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://michimarketing.com/api";

const apiClient = axios.create({
  baseURL: API,
});

// Interceptor para incluir automáticamente el token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener productos
export const getProducts = async () => {
  const res = await axios.get(`${API}/products`);
  return res.data;
};
// Obtener categorías
export const getCategories = async () => {
  const res = await apiClient.get("/product-categories");
  return res.data;
};

// Crear producto
export const createProduct = async (formData: FormData) => {
  const res = await apiClient.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id: number, formData: FormData) => {
  const res = await apiClient.post(`/products/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


// Eliminar producto
export const deleteProduct = async (id: number) => {
  const res = await apiClient.delete(`/products/${id}`);
  return res.data;
};




// Obtener usuarios
export const getUsers = async () => {
  const res = await apiClient.get(`${API}/users`);
  return res.data;
};

// Crear usuario
export const createUsers = async (formData: FormData) => {
  const res = await apiClient.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateUsers = async (id: number, formData: FormData) => {
  const res = await apiClient.post(`/users/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


// Eliminar usuario
export const deleteUsers = async (id: number) => {
  const res = await apiClient.delete(`/users/${id}`);
  return res.data;
};


// -----------------------------
// DATA GLOBALS (Datos empresa)
// -----------------------------

const axiosPublic = axios.create({
  baseURL: API,
});

export const getDataGlobals = async () => {
  const res = await axiosPublic.get("/data-global");
  return res.data;
};

export const getDataGlobalByName = async (name: string) => {
  const res = await axiosPublic.get(`/data-global/${name}`);
  return res.data;
};

export const updateDataGlobal = async (id: number, value: string) => {
  const res = await apiClient.put(`/data-global/${id}`, {
    value,
  });
  return res.data;
};


export const createDataGlobal = async (data: { name: string; value: string; description?: string }) => {
  const res = await apiClient.post("/data-global", data);
  return res.data;
};

export const deleteDataGlobal = async (id: number) => {
  const res = await apiClient.delete(`/data-global/${id}`);
  return res.data;
};