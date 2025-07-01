import { createContext, useContext, useEffect, useState } from "react";
import { AxiosToastError } from "../utils/AxiosToError";
import API from "../axios/axois";
import { SummaryAPI } from "../Api/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  const [showLoginPage, setShowLoginPage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    creditBalance: "",
  });

  const tokenValidate = async () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const response = await API({
          ...SummaryAPI.validate,
          headers: {
            token,
          },
        });
        console.log(response);
        const { data: responseData } = response;
        if (responseData.success) {
          setUser(true);
          setShowLoginPage(false);
          setUserData({ ...responseData.user });
        }
      } catch (error) {
        AxiosToastError(error);
      }
    }
  };

  const userCredit = async () => {
    try {
      const response = await API({
        ...SummaryAPI.credit,
        headers: {
          token,
        },
      });
      console.log("User credit", response);
      const { data: responseData } = response;
      if (responseData.success) {
        setCredit(responseData.data.credits);
      } else {
        setCredit(0);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token", "");
    setToken("");
    setUser(false);
    setLogin(false);
    setUserData({
      id: "",
      name: "",
      email: "",
      password: "",
      creditBalance: "",
    });
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    tokenValidate();
  }, []);
  useEffect(() => {
    if (token) {
      userCredit();
    }
  }, [token]);

  const generateImage = async (prompt) => {
    try {
      const response = await API({
        ...SummaryAPI.generateImage,
        data: {
          prompt,
        },
        headers: {
          token,
        },
      });
      console.log("Image Generated", response);
      if (response.data.success) {
        toast.success(response.data.message);
        userCredit();
        return response.data.resultImage;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      userCredit();
      if (error.response.data.balance === 0) {
        navigate("/buy");
      }
    }
  };
  const value = {
    user,
    setUser,
    login,
    setLogin,
    showLoginPage,
    setShowLoginPage,
    token,
    setToken,
    credit,
    setCredit,
    data,
    setData,
    userData,
    setUserData,
    logout,
    input,
    setInput,
    generateImage,
    userCredit,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
export const useAppContext = () => useContext(AppContext);
