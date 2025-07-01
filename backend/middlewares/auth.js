import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const userAuth = async (req, resp, next) => {
  try {
    const { token } = req.headers; // as i have not saved the token in the cookies so from the frontend i will send the token inside the header
    console.log("Token", token);
    if (!token) {
      return resp.status(400).json({
        message: "Not Authorized",
        error: true,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Decode", decode);
    if (!decode.id) {
      return resp.status(400).json({
        message: "Not Authorized",
      });
    }

    req.userId = decode.id;
    console.log("Req user id", req.userId);
    next();
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
