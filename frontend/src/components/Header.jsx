import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";

export const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // #FFD4D2
  // #FFF2F1
  return (
    <header className=" shadow-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center ">
          <div className="flex ml-12 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="logo" className="size-28" />
              <span className="text-2xl font-bold text-pink-400 hidden sm:inline">
                SwipeSoul
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={authUser.image || "/avatar.png"}
                    className="h-10 w-10 object-cover rounded-full border-2 border-white"
                    alt="User image"
                  />
                  <span className="text-pink-400 text-xl font-bold">
                    {authUser.name}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="mr-2" size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-white hover:text-pink-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="bg-white text-pink-600 px-4 py-2 rounded-full font-medium
                   hover:bg-pink-100 transition duration-150 ease-in-out"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-pink-500 focus:otline-none"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden  ">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
            {authUser ? (
              <>
                <hr className="h-1  bg-pink-500   " />
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-pink-500 hover:text-white hover:bg-pink-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <hr className="h-1  bg-pink-500  " />

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block hover:text-white  w-full text-left px-3 py-2 rounded-md text-base font-medium text-pink-500 hover:bg-pink-700"
                >
                  Logout
                </button>
                <hr className="h-1  bg-pink-500  " />
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="block hover:text-white  px-3 py-2 rounded-md text-base font-medium text-pink-500 hover:bg-pink-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="block hover:text-white  px-3 py-2 rounded-md text-base font-medium text-pink-500  hover:bg-pink-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
