import React from "react";
import { assets, plans } from "../assets/assets";
import AppContextProvider, { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { AxiosToastError } from "../utils/AxiosToError";
import API from "../axios/axois";
import { SummaryAPI } from "../Api/SummaryApi";
import toast from "react-hot-toast";

const Buy = () => {
  const { user, userCredit, token, setShowLoginPage } = useAppContext();
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const res = await API({
            ...SummaryAPI.verify,
            data: {
              razorpay_order_id: response.razorpay_order_id,
            },
            headers: {
              token,
            },
          });
          console.log("Verification", res);
          if (res.data.success) {
            userCredit();
            navigate("/");
            toast.success(res.data.message);
          }
        } catch (error) {
          AxiosToastError(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const paymentRazorPay = async (planId) => {
    try {
      const response = await API({
        ...SummaryAPI.pay,
        data: {
          planId,
        },
        headers: {
          token,
        },
      });
      console.log("Payment response", response);
      const { data: responseData } = response;

      if (responseData.success) {
        initPay(responseData.order);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10 mt-5">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose The plan
      </h1>
      <div className="flex flex-wrap items-center justify-center text-left gap-6 mt-5">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} width={40} />
            <p className="mt-3 mv-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorPay(item.id)}
              className="bg-zinc-900 text-sm font-semibold rounded-md w-full py-3 mt-5 text-gray-300 min-w-52"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
