import React from "react";
import { assets, testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-12">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {testimonialsData.map((item, index) => {
          const { image, name, role, stars, text } = item;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-12 w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
            >
              <div className="flex flex-col items-center">
                <img src={image} className="rounded-full w-14" />
                <h2 className="text-xl font-semibold mt-3">{name}</h2>
                <p className="text-gray-500 font-semibold mt-3">{role}</p>
                <div className="flex mb-4">
                  {Array(stars)
                    .fill()
                    .map((star, i) => (
                      <img src={assets.rating_star} key={i} />
                    ))}
                </div>
                <p className="text-center text-sm text-gray-600">{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
