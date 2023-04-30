import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import useProfile from "../hooks/useProfile";
import * as authServices from "../services/authServices";

const LinkItem = ({ to, children, onClick, className }) => (
  <Link
    to={to}
    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${className}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Dropdown = ({
  profile,
  handleLogout,
  showToolTips,
  setShowToolTips,
  className
}) => {
  return (
    <div className={`relative inline-block text-left ${className}`}>
      <img
        src={profile.avatar}
        alt="avatar"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => setShowToolTips(!showToolTips)}
      />

      {showToolTips && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {/* ternary operator for role admin, author */}

            {profile.role === "Admin" ? (
              <LinkItem
                to="/admin/dashboard"
                className="block text-gray-600"
                role="menuitem"
                onClick={() => setShowToolTips(!showToolTips)}
              >
                Admin Panel
              </LinkItem>
            ) : profile.role === "Author" ? (
              <LinkItem
                to="/admin/dashboard"
                className="block text-gray-600"
                role="menuitem"
                onClick={() => setShowToolTips(!showToolTips)}
              >
                Dashboard
              </LinkItem>
            ) : (
              <LinkItem
                to="/profile"
                className="block text-gray-600"
                role="menuitem"
                onClick={() => setShowToolTips(!showToolTips)}
              >
                Profile
              </LinkItem>
            )}
            <p
              className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              role="menuitem"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showToolTips, setShowToolTips] = useState(false);
  const profile = useProfile();

  const handleLogout = () => {
    authServices.logout();
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-[100]">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {showSidebar ? (
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setShowSidebar(false)}
              >
                <IoCloseOutline className="block h-6 w-6" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setShowSidebar(true)}
              >
                <BiMenu className="block h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center sm:justify-between">
            <Link to="/" className="text-white font-bold text-xl">
              My Blog
            </Link>

            <div className="hidden ml-auto sm:block sm:ml-6">
              <div className="flex space-x-4">
                <LinkItem to="/">Home</LinkItem>
                {profile ? (
                  <Dropdown
                    profile={profile}
                    handleLogout={handleLogout}
                    showToolTips={showToolTips}
                    setShowToolTips={setShowToolTips}
                    className="hidden sm:block"
                  />
                ) : (
                  <>
                    <LinkItem to="/login">Login</LinkItem>
                    <LinkItem to="/registration">Sign Up</LinkItem>
                  </>
                )}
              </div>
            </div>
          </div>

          {profile && (
            <Dropdown
              profile={profile}
              handleLogout={handleLogout}
              showToolTips={showToolTips}
              setShowToolTips={setShowToolTips}
              className="sm:hidden"
            />
          )}
        </div>
      </div>
      {/* Sidebar drawer for links */}
      {showSidebar && (
        <div className="sm:hidden fixed left-0 top-16 w-52 h-full bg-gray-900/90 z-50">
          <div className="mx-4 my-4">
            <LinkItem to="/" className="block">
              Home
            </LinkItem>
            <LinkItem to="/login" className="block">
              Login
            </LinkItem>
            <LinkItem to="/registration" className="block">
              Sign Up
            </LinkItem>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
