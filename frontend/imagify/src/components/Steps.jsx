import React from "react";
import { stepsData } from "../assets/assets";

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32">
      <p className="text-4xl sm:text-5xl font-semibold">How it works</p>
      <p className="text-sm mt-5 text-gray-500">
        Transform Words Into Stunning Images
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => {
          const { title, description, icon } = item;
          return (
            <div
              className="flex m-5 rounded items-center gap-4 p-5 px-10 bg-white shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300"
              key={index}
            >
              <img src={icon} className="" />
              <div>
                <h2 className="text-xl font-medium text-gray-700">{title}</h2>
                <p className="text-gray-500">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
