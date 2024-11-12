// Sidebar.js
import React from "react";
import { FaHome, FaClipboardList, FaComments, FaHistory } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-[#000013] text-white flex flex-col border-slate-400">
      <div className="mt-32">
        <nav>
          <ul>
            <Link to="/dashboard">
              <li className="flex items-center p-4 hover:bg-gray-700  hover:rounded-full cursor-pointer">
                <FaHome className="mr-3 ml-14" />
                <span>Menú</span>
              </li>
            </Link>
            <Link to="/plans">
              <li className="flex items-center p-4 hover:bg-gray-700 hover:rounded-full cursor-pointer">
                <FaClipboardList className="mr-3 ml-14" />
                <span>Mis planes</span>
              </li>
            </Link>
            <Link to="/chat">
            <li className="flex items-center p-4 hover:bg-gray-700 hover:rounded-full cursor-pointer">
              <FaComments className="mr-3 ml-14" />
              <span>Chat</span>
            </li>
            </Link>
            <li className="flex items-center p-4 hover:bg-gray-700 hover:rounded-full cursor-pointer">
              <FaHistory className="mr-3 ml-14" />
              <span>History</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
