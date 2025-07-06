import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Field, Label, Switch } from '@headlessui/react';

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [acuerdo, setAcuerdo] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fullMessage = `
Nombre: ${formData.firstName} ${formData.lastName}
Empresa: ${formData.company}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Mensaje: ${formData.message}
    `;

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }

    setMensajeEnviado(true);

    const numero = '51932563713'; // Cambia este número real
    const mensaje = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-1/2 w-[72rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 opacity-20 sm:w-[115rem]"
          style={{
            clipPath:
              'polygon(74% 44%, 100% 61%, 97% 27%, 86% 0%, 81% 2%, 73% 33%, 60% 62%, 52% 68%, 47% 58%, 45% 34%, 27% 77%, 0% 65%, 18% 100%, 28% 77%, 76% 98%, 74% 44%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Contáctanos
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          ¿Tienes dudas o deseas reservar? Completa el formulario y te responderemos pronto.
        </p>
      </div>

      {mensajeEnviado && (
        <div className="mx-auto mt-10 max-w-xl rounded-md bg-green-100 px-4 py-3 text-center text-green-800 shadow">
          ✅ Tu mensaje fue enviado con éxito. Serás redirigido al inicio...
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-gray-800">Nombre</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-gray-800">Apellido</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="text-sm font-medium text-gray-800">Empresa</label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-800">Teléfono</label>
            <div className="mt-2 flex rounded-lg border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-l-lg bg-gray-100 px-3 text-gray-700 focus:outline-none"
                >
                  <option>PE</option>
                  <option>CL</option>
                  <option>AR</option>
                  <option>MX</option>
                </select>
                <ChevronDownIcon className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="912 345 678"
                required
                className="w-full rounded-r-lg px-4 py-2 text-gray-900 focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-800">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Field className="sm:col-span-2 flex gap-x-3 items-center">
            <Switch
              checked={acuerdo}
              onChange={setAcuerdo}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                acuerdo ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span className="sr-only">Aceptar política</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  acuerdo ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </Switch>
            <Label className="text-sm text-gray-600">
              Acepto la{' '}
              <a href="#" className="font-semibold text-orange-600 hover:underline">
                política de privacidad
              </a>.
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-600 px-4 py-2.5 text-white font-semibold shadow-md hover:bg-indigo-500 transition"
          >
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contacto;
