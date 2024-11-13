import { Navigation } from "../Components/Navigation";
import Sidebar from "../Components/Sidebar";
import jarvi from "../assets/IA.svg";

const Plans = () => {
  return (
    <>
      <div className="ml-60">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex-1 p-24">
          <h1 className="text-white font-bold text-center text-5xl">
            Mis planes
          </h1>
          <div className="justify-center flex">
            <img src={jarvi} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
