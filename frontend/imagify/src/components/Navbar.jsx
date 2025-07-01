import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Login from "./Login";

const Navbar = () => {
  const { logout, setShowLoginPage, user, userData, credit } =
    useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {/* after the user is logged out */}
        {user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="flex gap-2 sm:gap-4 bg-blue-200 px-5 sm:px-7 py-3 rounded-full text-sm hover:scale-105 transition-all duration-700">
              <img src={assets.credit_star} className="w-5" />
              <p className="text-xs sm:text-sm text-gray-600">
                {credit && `Credit : ${credit}`}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden">
              Hi, {userData.name} here
            </p>
            <div className="relative group">
              <img src={assets.profile_icon} className="w-7" />
              <div
                onClick={logout}
                className="absolute p-2 text-sm bg-white text-black group-hover:block hidden cursor-pointer"
              >
                <p>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-5 lg:gap-8 items-center">
            <p
              className="cursor-pointer text-sm"
              onClick={() => navigate("/buy")}
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLoginPage(true)}
              className="bg-neutral-900 text-white px-8 py-2 rounded-full cursor-pointer text-sm"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
