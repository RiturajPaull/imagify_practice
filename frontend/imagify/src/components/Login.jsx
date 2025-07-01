import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import API from "../axios/axois";
import { SummaryAPI } from "../Api/SummaryApi";
import toast from "react-hot-toast";

const Login = () => {
  const {
    setShowLoginPage,
    data,
    setData,
    login,
    setLogin,
    token,
    setToken,
    userData,
    setUserData,
    setUser,
  } = useAppContext();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        //login
        const response = await API({
          ...SummaryAPI.login,
          data: {
            email: data.email,
            password: data.password,
          },

          withCredentials: true,
        });
        console.log("Logged in", response);
        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);
          setToken(responseData.token);
          localStorage.setItem("token", responseData.token);
          setUserData({
            ...responseData.user,
          });
          setShowLoginPage(false);
          setUser(true);
        } else {
          toast.error(responseData.message);
        }
      } else {
        //register
        const response = await API({
          ...SummaryAPI.register,
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        });
        console.log("Register", response);
        const { data: responseData } = response;
        if (responseData.error) {
          toast.error(responseData.message);
        }
        if (responseData.success) {
          toast.success(responseData.message);
          setLogin(true);
          localStorage.setItem("token", responseData.token);
          setData({
            name: "",
            email: "",
            password: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center items-baseline">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <img
          src={assets.cross_icon}
          className="cursor-pointer"
          onClick={() => setShowLoginPage(false)}
        />
        <h1 className="text-center text-3xl text-neutral-700 font-medium">
          {login ? "Login" : "Sign up"}
        </h1>
        <p className="text-sm text-center mt-5">Welcome back!!</p>
        {!login && (
          <div>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.profile_icon} width={25} />
              <input
                className="outline-none text-sm "
                type="text"
                name="name"
                value={data.name}
                onChange={handleInput}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
        )}

        <div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.email_icon} />
            <input
              className="outline-none text-sm "
              type="email"
              name="email"
              value={data.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.lock_icon} />
            <input
              className="outline-none text-sm "
              type="password"
              name="password"
              value={data.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <p className="text-sm text-blue-500 my-4 cursor-pointer">
          Forgot Password??
        </p>
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-3 rounded-full hover:bg-blue-800"
        >
          {login ? "Login" : " Create Account"}
        </button>
        {login ? (
          <div>
            <p className="mt-5 text-sm">
              Don't have an Account?
              <span
                className="text-red-600 cursor-pointer"
                onClick={() => setLogin(false)}
              >
                {" "}
                Sign up
              </span>
            </p>
          </div>
        ) : (
          <div>
            <p className="mt-5 text-sm">
              Already have an Account?{" "}
              <span
                className="text-red-600 cursor-pointer"
                onClick={() => setLogin(true)}
              >
                {" "}
                Login
              </span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
