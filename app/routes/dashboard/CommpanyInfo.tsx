import { useEffect, useState } from "react";
import {
  getDataGlobals,
  createDataGlobal,
  updateDataGlobal,
  deleteDataGlobal,
} from "../../src/api";

interface DataGlobal {
  id: number;
  name: string;
  value: string;
  description?: string;
}

export default function DataGlobalAdmin() {
  const [dataGlobals, setDataGlobals] = useState<DataGlobal[]>([]);
  const [newData, setNewData] = useState({ name: "", value: "", description: "" });
  const [editing, setEditing] = useState<DataGlobal | null>(null);

  const fetchData = async () => {
    const res = await getDataGlobals();
    setDataGlobals(res);
  };

  const handleCreate = async () => {
    if (!newData.name || !newData.value) return alert("Campos requeridos");
    try {
      const res = await createDataGlobal(newData);
      setDataGlobals((prev) => [...prev, res]);
      setNewData({ name: "", value: "", description: "" });
    } catch (e) {
      alert("Error al crear");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    try {
      const res = await updateDataGlobal(editing.id, editing.value);
      setDataGlobals((prev) =>
        prev.map((d) => (d.id === editing.id ? { ...d, value: editing.value } : d))
      );
      setEditing(null);
    } catch (e) {
      alert("Error al actualizar");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este dato?")) return;
    try {
      await deleteDataGlobal(id);
      setDataGlobals((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      alert("Error al eliminar");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-red-700 mb-6">Gestión de Datos Globales</h1>

      {/* CREAR NUEVO */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 space-y-2">
        <h2 className="text-lg font-semibold">Agregar nuevo dato</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Nombre (ej: whatsapp)"
            value={newData.name}
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            placeholder="Valor (ej: +51 933...)"
            value={newData.value}
            onChange={(e) => setNewData({ ...newData, value: e.target.value })}
            className="border px-2 py-1 rounded"
          />
          <input
            placeholder="Descripción (opcional)"
            value={newData.description}
            onChange={(e) => setNewData({ ...newData, description: e.target.value })}
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleCreate}
        >
          Crear
        </button>
      </div>

      {/* LISTADO */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full table-auto bg-white dark:bg-gray-900">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Valor</th>
              <th className="text-left p-2">Descripción</th>
              <th className="text-center p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataGlobals.map((item) => (
              <tr key={item.id} className="border-t dark:border-gray-700">
                <td className="p-2 font-medium">{item.name}</td>
                <td className="p-2">
                  {editing?.id === item.id ? (
                    <input
                      value={editing.value}
                      onChange={(e) =>
                        setEditing({ ...editing, value: e.target.value })
                      }
                      className="w-full border px-2 py-1 rounded"
                    />
                  ) : (
                    item.value
                  )}
                </td>
                <td className="p-2">{item.description || "-"}</td>
                <td className="p-2 text-center space-x-2">
                  {editing?.id === item.id ? (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={handleUpdate}
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => setEditing(item)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {dataGlobals.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No hay datos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
