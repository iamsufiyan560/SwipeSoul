import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Loader, X, MessageCircle } from "lucide-react";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  useEffect(() => {
    getMyMatches();
  }, [getMyMatches]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64  bg-fuchsia-100 border-r-4 shadow-lg transform  border-white
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:w-1/4
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b-4 border-white flex justify-between items-center">
          <h2 className="text-xl font-bold text-pink-600">Matches</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="overflow-y-auto h-full p-4">
          {isLoadingMyMatches ? (
            <LoadingState />
          ) : matches.length === 0 ? (
            <NoMatchesFound />
          ) : (
            matches.map((match) => (
              <Link
                key={match._id}
                to={`/chat/${match._id}`}
                onClick={() => setIsSidebarOpen(false)}
                className="block mb-4"
              >
                <div className="flex items-center p-2 hover:bg-pink-50 rounded-lg transition-colors duration-200">
                  <img
                    src={match.image || "/avatar.png"}
                    alt={`${match.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-pink-300"
                  />
                  <span className="font-semibold text-gray-800">
                    {match.name}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 left-4 z-40 p-3 bg-pink-500 text-white rounded-full shadow-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-pink-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Matches
    </h3>
    <p className="text-gray-500 max-w-xs">
      We're finding your perfect matches. This might take a moment...
    </p>
  </div>
);

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Heart className="text-pink-400 mb-4" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Matches Yet</h3>
    <p className="text-gray-500 max-w-xs">
      Don't worry! Your perfect match is just around the corner. Keep swiping!
    </p>
  </div>
);

export default Sidebar;
