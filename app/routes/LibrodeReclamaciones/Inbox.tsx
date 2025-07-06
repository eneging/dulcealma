import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productoServicio: string;
  tipo: 'Reclamo' | 'Queja';
  detalle: string;
}

function LibroReclamaciones() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    productoServicio: '',
    tipo: 'Reclamo',
    detalle: '',
  });
  const [acuerdo, setAcuerdo] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fullMessage = `
Libro de Reclamaciones

Nombre: ${formData.firstName} ${formData.lastName}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Producto o servicio: ${formData.productoServicio}
Tipo: ${formData.tipo}
Detalle del reclamo/queja:
${formData.detalle}
    `;

    try {
      await fetch('/api/libro-reclamaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error al enviar reclamo:', error);
    }

    setMensajeEnviado(true);

    const numero = '51932563713';
    const mensaje = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 text-black ">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Libro de Reclamaciones
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Llena el siguiente formulario para registrar tu reclamo o queja formal.
        </p>
      </div>

      {mensajeEnviado && (
        <div className="mx-auto mt-10 max-w-xl rounded-md bg-green-100 px-4 py-3 text-center text-green-800 shadow">
          ✅ Tu reclamo fue enviado con éxito. Serás redirigido al inicio...
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          <div>
            <label className="text-sm font-medium text-gray-800">Nombre</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-800">Apellido</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-800">Correo electrónico</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-800">Teléfono</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-800">Producto o servicio</label>
            <input
              name="productoServicio"
              type="text"
              value={formData.productoServicio}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-800">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="Reclamo">Reclamo</option>
              <option value="Queja">Queja</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-800">Detalle</label>
            <textarea
              name="detalle"
              rows={5}
              value={formData.detalle}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="sm:col-span-2 text-sm text-gray-600">
            Conforme a lo dispuesto en el Código de Protección y Defensa del Consumidor, este establecimiento cuenta con un Libro de Reclamaciones virtual.
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={acuerdo}
              onChange={() => setAcuerdo(!acuerdo)}
              required
              className="h-4 w-4"
            />
            <label className="text-sm text-gray-600">
              Acepto la{' '}
              <a href="#" className="text-orange-600 font-semibold hover:underline">
                política de privacidad
              </a>
              .
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-600 px-4 py-2.5 text-white font-semibold shadow-md hover:bg-indigo-500 transition"
          >
            Enviar Reclamo
          </button>
        </div>
      </form>
    </div>
  );
}

export default LibroReclamaciones;
