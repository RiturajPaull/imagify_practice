import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between px-12 mt-32">
      <div className="flex items-center gap-8">
        <img src={assets.logo} />
        <p className="hidden md:block border-l pl-8 text-gray-600">
          All right reserved.Copyright @imagify
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <img
          src={assets.facebook_icon}
          className="hover:scale-130 transition-all"
        />
        <img
          src={assets.twitter_icon}
          className="hover:scale-130 transition-all"
        />
        <img
          src={assets.instagram_icon}
          className="hover:scale-130 transition-all"
        />
      </div>
    </div>
  );
};

export default Footer;
