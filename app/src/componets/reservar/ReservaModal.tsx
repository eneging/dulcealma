import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onReservar: (fecha: Date) => void;
}

export default function ReservaModal({ onClose, onReservar }: Props) {
  const [fecha, setFecha] = useState<Date | null>(new Date());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setFecha(newDate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Reservar el local
        </h2>

        <label className="block text-sm text-gray-600 mb-1">
          Selecciona fecha y hora:
        </label>
        <input
          type="datetime-local"
          value={fecha ? fecha.toISOString().slice(0, 16) : ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => fecha && onReservar(fecha)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full transition"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
