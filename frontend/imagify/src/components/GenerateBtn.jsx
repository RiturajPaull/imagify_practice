import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const GenerateBtn = () => {
  const { user, setShowLoginPage } = useAppContext();
  const navigate = useNavigate();
  const handleNavigate = () => {
    user ? navigate("/result") : setShowLoginPage(true);
  };
  return (
    <div className="text-center pb-12">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-7">
        See the Magic. Try now
      </h1>
      <Link to="/result">
        <button
          onClick={handleNavigate}
          className="flex m-auto gap-2 px-8 py-3 rounded-full bg-black text-white cursor-pointer hover:scale-[1.02] transition-all duration-700"
        >
          <p>Generate Images</p>
          <img src={assets.star_group} className="h-6" />
        </button>
      </Link>
    </div>
  );
};

export default GenerateBtn;
