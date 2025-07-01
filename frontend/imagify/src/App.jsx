import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { showLoginPage } = useAppContext();
  return (
    <div className="px-4 sm:px-10  md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <div>
        <Navbar />
        {showLoginPage && <Login />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
