import React from "react";
import dashboardImg from "../../assets/images/dashboard-img.png";
const Dashboard = () => {
  return (
    <div className="w-full flex flex-col items-center p-5">
      <h1 className="w-full text-2xl font-semibold text-[#616161]">
        Dashboard
      </h1>
      <div className="relative rounded-3xl shadow-sm bg-white w-full p-5 flex justify-between items-center my-6 mt-[60px] h-[200px]">
        <div className="">
          <h1 className="text-2xl font-semibold text-[#616161]">
            Good Morning, <span className="  text-[#92613A]">{localStorage.getItem("username")}</span>
          </h1>
          <p className="text-[#616161]">Have a nice day at work</p>
        </div>
        <img src={dashboardImg} alt="" className="h-[300px] absolute right-[100px] top-[-100px]" />
      </div>
    </div>
  );
};

export default Dashboard;
