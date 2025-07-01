import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user, setShowLoginPage } = useAppContext();
  const navigate = useNavigate();

  const handleNavigation = () => {
    user ? navigate("/result") : setShowLoginPage(true);
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 text-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className=" border flex items-center gap-2 text-sm rounded-full justify-center py-3 px-5 bg-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 2 }}
      >
        <p className="text-gray-600">Best text to image generator</p>
        <img src={assets.star_icon} />
      </motion.div>
      <h1 className=" text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590] mx-auto mt-10 text-center">
        Turn text to
        <span className="text-blue-500"> image</span>, in seconds
      </h1>
      <p className="text-center mt-5 max-w-xl mx-auto">
        Create stunning images from text in seconds. Turn your imaginaiton into
        a virual art in seconds-just type and watch the magic happen
      </p>
      <button
        onClick={handleNavigation}
        className="flex sm:text-lg bg-neutral-900 text-white mt-8 border py-2.5 px-12 gap-2 rounded-full hover:scale-105 transition-all duration-800"
      >
        <p>Generate Images</p>
        <img src={assets.star_group} className="h-6" />
      </button>

      <div className="flex flex-wrap mt-16 gap-2 items-center justify-center">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              src={index % 2 == 0 ? assets.sample_img_1 : assets.sample_img_2}
              key={index}
              className=" rounded hover:scale-105 h-15 transition-all duration-100 cursor-pointer"
            />
          ))}
      </div>
      <p className="text-sm mt-3 text-gray-600">Generate Images from imagify</p>
    </motion.div>
  );
};

export default Header;
