import { Navigate, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { hostLocal } from "../api/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el círculo de carga

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    console.log(data);
    if (data.password !== data.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
      fetch(`http://${hostLocal}/Register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            toast.error(data.message);
            setLoading(false);
          } else {
            console.log("Success:", data);
            toast.success("¡Registro exitoso, Inicia sesión!", {
              position: "top-center",
              style: {
                background: "black",
                color: "white",
              },
            });
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error al registrar el usuario");
          setLoading(false);
        });
    }
  });

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-3 px-2 sm:px-6 lg:px-8">
      <h1
        className="text-white font-bold flex-col text-5xl mb-5"
        onClick={() => navigate(`/`)}
      >
        FinanceIA
      </h1>
      <div>
        <p className="mt-2 text-sm text-gray-600 mb-3">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="Name"
            className="block text-sm font-medium text-gray-500"
          >
            Nombre (s)
          </label>
          <div className="mt-1">
            <input
              placeholder="Name"
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de usuario
          </label>
          <div className="mt-1">
            <input
              placeholder="Username"
              type="text"
              {...register("username", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message:
                    "El nombre de usuario solo puede contener letras y números",
                },
              })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <div className="mt-1">
            <input
              placeholder="Email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Correo electrónico no válido",
                },
              })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
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
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <div className="mt-1">
            <input
              type="password"
              {...register("password", { required: "Este campo es requerido" })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmar contraseña
          </label>
          <div className="mt-1">
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Este campo es requerido",
              })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-blue-2 focus:border-custom-blue-2 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>
        <div className="flex space-x-8 ml-auto justify-center items-center">
          {loading ? (
            <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          ) : (
            <button
              type="submit"
              className="text-white font-semibold py-2 px-12 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Registrarse
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
