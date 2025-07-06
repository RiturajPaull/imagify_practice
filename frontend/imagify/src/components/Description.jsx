import React from "react";
import { assets } from "../assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mx-32">
      <h1 className="text-center w-80 text-3xl font-semibold sm:text-4xl">
        Create AI Images
      </h1>
      <p className="text-sm text-gray-600">
        Turn your imagination into visuals
      </p>
      <div className="flex flex-col gap-5 sm:gap-14 md:flex-row items-center">
        <img src={assets.sample_img_1} className="w-80 xl:w-96 rounded-lg" />
        <div className="flex flex-wrap justify-center gap-6 max-w-[50rem]">
          <h2 className="text-gray-700 text-3xl font-medium mx-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Easily bring your ideas to life with out free AI image generator.
            Whether you need stunning visuals or unique imagery, out tools
            transforms your text into eye-catching images with just a feww
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </p>
          <p className="text-gray-600 hidden lg:block">
            Simply type in a text box prompt, and our cutting-edge AI will
            generate high-quality images in seconds. From product visulas to
            character designs and potraits, even conepts that don't yet exists
            can be visualized effortlessly. Powered by advanced AI technology,
            the creative possibilities are limitless.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
