import React, { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { AppContext } from "../../context/appContext";

function Layout({ children }) {
  const { isSidebarOpen } = useContext(AppContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 overflow-hidden">
      <Header />
      <div className="flex flex-row">
        {isSidebarOpen && <Sidebar />}
        <div className="flex-1 min-h-screen md:m-4 p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
