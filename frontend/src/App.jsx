import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./views/dashboard/dashboardLayout";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
