import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";
import UserList from "./userList";
import Sidebar from "../../components/sidebar";
import Notifications from "./notifications";
import Settings from "./settings";

const DashboardLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex gap-[10px] bg-[#FEF6EF]">
      <div className="md:w-2/12 md:bg-white">
        <Sidebar />
      </div>
      <div className="md:w-10/12 w-full ">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
