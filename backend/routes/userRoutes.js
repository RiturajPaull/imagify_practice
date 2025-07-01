import express from "express";
import {
  loginUserController,
  paymentRazorpay,
  registerUserController,
  userCredit,
  userTokenValidate,
  verifyRazorpayPayment,
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/credits", userAuth, userCredit);
userRouter.get("/validate", userAuth, userTokenValidate);
userRouter.post("/pay", userAuth, paymentRazorpay);
userRouter.post("/verify", verifyRazorpayPayment);

export default userRouter;
