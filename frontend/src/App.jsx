import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./views/dashboard/dashboard";

const App = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
