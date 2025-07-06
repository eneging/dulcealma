import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chica1 from "../../src/assets/images/mockups/chicaconplatos.png"


const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = (email: string) => {
    // Regex para una validación básica de email
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      return false;
    } else if (!re.test(email)) {
      setEmailError("Formato de correo electrónico inválido.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Limpiar errores generales antes de un nuevo intento

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return; // Detener el envío si la validación falla en el cliente
    }

    setLoading(true); // Indicar que la carga ha comenzado
    try {
      const res = await axios.post("https://michimarketing.com/api/login", {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        // Asumiendo que el backend envía un mensaje de error en err.response.data.detail
        setError(err.response.data.detail || "Correo o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false); // Indicar que la carga ha terminado, sea éxito o error
    }
  };

  return (<>    
    <div className="flex flex-col items-center z-30 justify-center min-h-screen bg-gray-950 p-4">
  
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Panel de Administrador</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-sm border border-gray-200"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setEmailError(""); // Limpiar error al escribir
            }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e.target.value)} // Validar al perder el foco
            className={`shadow appearance-none border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
            placeholder="tu_email@ejemplo.com"
            aria-describedby="email-error"
            autoComplete="email"
            required
          />
          {emailError && (
            <p id="email-error" className="text-red-500 text-xs italic mt-2">
              {emailError}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              setPasswordError(""); // Limpiar error al escribir
            }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)} // Validar al perder el foco
            className={`shadow appearance-none border ${
              passwordError ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
            placeholder="********"
            aria-describedby="password-error"
            autoComplete="current-password"
            required
          />
          {passwordError && (
            <p id="password-error" className="text-red-500 text-xs italic">
              {passwordError}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full ${
            loading ? "bg-red-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out`}
          disabled={loading} // Deshabilitar el botón durante la carga
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Ingresando...
            </div>
          ) : (
            "Ingresar"
          )}
        </button>
      </form>
    </div></>
  );
};

export default Login;