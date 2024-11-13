import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export function Navigation() {

  const navigate = useNavigate();
  const { isAuthenticated, signout } = useAuth();

  const handleSignout = async () => {
    await signout();
    navigate('/'); // Navegar a la página de inicio después de cerrar sesión
  };

  return (
    <div className="fixed right-0 w-full flex justify-between items-center py-6 ml-14 top-0 bg-[#000013] z-50 shadow-lg">
      <Link to="/dashboard">
        <h1 className="ml-16 font-bold text-5xl text-white">FinanceIA</h1>
      </Link>
      {!isAuthenticated ? (
      <div className="flex space-x-8 ml-auto mr-20">
        <button className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/login">Iniciar sesión</Link>
        </button>
        <button className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/register">Registrarme</Link>
        </button>
      </div>
      ) : ( 
        <div className="flex space-x-8 ml-auto mr-36">
          <button onClick={handleSignout} className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
