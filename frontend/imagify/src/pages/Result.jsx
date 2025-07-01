import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { AxiosToastError } from "../utils/AxiosToError";
const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(null);
  const [loading, setLoading] = useState(null);
  const { input, setInput, generateImage, userCredit } = useAppContext();

  console.log("Input", input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (input) {
        const generatedImage = await generateImage(input);
        if (generatedImage) {
          setIsImageLoaded(true);
          setImage(generatedImage);
          userCredit();
        }
      }
      setLoading(false);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <form
      className="flex flex-col items-center justify-center w-full min-h-[90vh] py-5"
      onSubmit={handleSubmit}
    >
      <div className="">
        <div className="relative">
          <img src={image} className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        {loading && <p>Loading.....</p>}
      </div>
      {!isImageLoaded ? (
        <div className="flex items-center justify-center w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            // value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
              setImage(assets.sample_img_2);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
