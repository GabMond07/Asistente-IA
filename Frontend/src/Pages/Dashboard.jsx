import { Navigation } from "../Components/Navigation";
import Sidebar from "../Components/Sidebar";
import Nube from "../assets/Nube.svg";
import CloudNote from "../Components/cloudNote";

const Dashboard = () => {
  return (
    <>
      <div className="ml-60">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex-1 p-24">
          <h1 className="text-white font-bold text-center text-5xl">
            Dashboard
          </h1>

          <div className="justify-center flex w-1/4">
            <img src={Nube} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
