import UserModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";

export const generateImage = async (req, resp) => {
  try {
    const { userId } = req;
    const { prompt } = req.body;

    console.log(userId);
    console.log(prompt);
    const user = await UserModel.findById(userId);

    if (!user || !prompt) {
      return resp.status(400).json({
        message: "Details missing",
        error: true,
      });
    }

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return resp.status(400).json({
        message: "Not enough credit Balance",
        error: true,
        balance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await UserModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    return resp.status(200).json({
      message: "Image generated !!",
      success: true,
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
