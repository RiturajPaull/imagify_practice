import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import dotenv from "dotenv";
import TransactionModel from "../models/transactionModel.js";
dotenv.config();

export const registerUserController = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    if (!name || !email || !password) {
      return resp.status(400).json({
        message: "All the fields are mandatory",
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    console.log(`User is ${user}`);
    if (user) {
      return resp.status(400).json({
        message: "User already registered",
        error: true,
      });
    }
    const salt = await bcrypt.genSalt(10);
    console.log(`salt ${salt}`);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(`hashpassword ${hashPassword}`);

    const newUserData = {
      name,
      email,
      password: hashPassword,
    };

    const token = jwt.sign({ id: newUserData._id }, process.env.JWT_TOKEN);
    const userCreated = await UserModel.create(newUserData);

    return resp.status(200).json({
      message: "User created!!",
      success: true,
      user: userCreated,
      token,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const loginUserController = async (req, resp) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return resp.status(400).json({
        message: "All the fields are required",
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return resp.status(400).json({
        message: "User not found",
        error: true,
      });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return resp.status(400).json({
        message: "Password is incorrect",
        error: true,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    return resp.status(200).json({
      message: "Logged in successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const userCredit = async (req, resp) => {
  try {
    const { userId } = req;
    console.log("Img Contrl", userId);
    const user = await UserModel.findById(userId);
    if (!user) {
      return resp.status(400).json({
        message: "User not found",
        error: true,
      });
    }

    return resp.status(200).json({
      message: "Success",
      data: {
        credits: user.creditBalance,
        name: user.name,
      },
      success: true,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const userTokenValidate = async (req, resp) => {
  try {
    const { userId } = req;

    const user = await UserModel.findById(userId);
    if (!user) {
      return resp.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    return resp.status(200).json({
      message: "Token is valid",
      success: true,
      user,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, resp) => {
  try {
    const { userId } = req;
    const { planId } = req.body;
    const user = await UserModel.findById(userId);

    if (!userId || !planId) {
      return resp.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        (plan = "Basic"), (credits = 100), (amount = 10);
        break;
      case "Advanced":
        (plan = "Advanced"), (credits = 500), (amount = 50);
        break;
      case "Business":
        (plan = "Business"), (credits = 5000), (amount = 250);
        break;
      default:
        return resp.json({
          success: false,
          message: "Plan not found",
        });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await TransactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.currency,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return resp.status(400).json({
          message: error,
          success: false,
        });
      }
      return resp.status(200).json({
        success: true,
        order: order,
      });
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verifyRazorpayPayment = async (req, resp) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await TransactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return resp.json({
          sucess: false,
          message: "Payment failed",
        });
      }

      const userData = await UserModel.findById(transactionData.userId);

      const creditBalance = userData.creditBalance + transactionData.credits;
      await UserModel.findByIdAndUpdate(userData._id, {
        creditBalance,
      });
      await TransactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      return resp.status(200).json({
        message: "Credits Added",
        success: true,
      });
    } else {
      return resp.status(400).json({
        message: "Payment failed",
        success: false,
      });
    }
  } catch (error) {
    return resp.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
