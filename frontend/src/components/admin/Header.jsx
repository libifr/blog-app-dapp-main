import React, { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import * as authService from "../../services/authServices";
import useProfile from "../../hooks/useProfile";

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { toggleSidebar } = useContext(AppContext);
  const profile = useProfile();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <div className="bg-white text-gray-600 h-14 w-full p-4 shadow-md relative">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between lg:w-[18%]">
          <h2>Admin Panel</h2>
          <BiMenu
            size={24}
            className="cursor-pointer"
            onClick={() => toggleSidebar()}
          />
        </div>
        <div>
          <img
            src={profile?.avatar}
            alt=""
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          />
          {isProfileOpen && (
            <div className="z-[1000000] absolute top-14 right-10 bg-white flex flex-col pb-3 shadow-lg">
              <Link
                to="/"
                target="_blank"
                className="px-8 py-1 mx-2 hover:bg-gray-600 hover:text-white rounded-md"
              >
                View Site
              </Link>
              <Link
                to="/profile"
                className="px-8 py-1 mx-2 mt-1 hover:bg-gray-600 hover:text-white rounded-md"
              >
                Profile
              </Link>
              <Link
                className="px-8 py-1 mx-2 mt-1 hover:bg-gray-600 hover:text-white rounded-md"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
