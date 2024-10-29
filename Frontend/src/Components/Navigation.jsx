import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between items-center py-10 ml-14">
      <Link to="/">
        <h1 className="font-bold text-5xl">FinanceIA</h1>
      </Link>
      <div className="flex space-x-8 ml-auto mr-16">
        <button className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-[0px_0px_10px_3px_rgba(0,115,153,0.7)] hover:shadow-[0px_0px_15px_5px_rgba(0,115,153,1)] transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/register">Iniciar sesión</Link>
        </button>
        <button className="text-white font-semibold py-2 px-4 rounded-lg border-2 border-[#007399] shadow-lg hover:shadow-[0px_0px_8px_2px_rgba(0,115,153,0.7)] transition duration-300 ease-in-out transform hover:scale-105">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}
