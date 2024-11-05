import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const { signin, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false); // Estado para el círculo de carga
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/financesurvey");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia el círculo de carga

    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await signin(credentials);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Correo electrónico o contraseña incorrectos.");
    } finally {
      setLoading(false); // Detiene el círculo de carga
    }
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-24 sm:px-6 lg:px-8">
      <h1
        className="text-white font-bold flex-col text-5xl mb-10"
        onClick={() => navigate(`/`)}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-500"
          >
            Correo electrónico
          </label>
          <div className="mt-1">
            <input
              type="email"
              autoComplete="email"
              name="email"
              {...register("email", {
                required: "El correo electrónico es requerido",
              })}
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-500"
          >
            Contraseña
          </label>
          <div className="mt-1">
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              {...register("password", { required: "Este campo es requerido" })}
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Mensaje de error */}
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </p>
        )}

        <div className="flex space-x-8 ml-auto justify-center items-center">
          {loading ? (
            <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          ) : (
            <button
              type="submit"
              className="text-white font-semibold py-3 px-11 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </form>

      <p className="mt-5 text-gray-500">
        ¿No tienes una cuenta?{" "}
        <span
          className="text-custom-blue cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => navigate("/register")}
        >
          Regístrate
        </span>
      </p>
    </div>
  );
};

export default Login;
