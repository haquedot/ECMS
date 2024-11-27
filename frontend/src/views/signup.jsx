import React, { useEffect, useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SignupImg from "../assets/images/signup-img.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import { FiUser } from "react-icons/fi";
import { BsCake2 } from "react-icons/bs";
const Signup = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [loader, setLoader] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          email: email,
          password: password,
          username: username,
          dob: dob,
        }
      );
      if (response.status === 200) {
        toast.success("Login Successfully!");
        navigate("/login");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log("error in login:", error);
      toast.error(error?.response?.data?.data?.message || error?.response?.data?.message || "Failed to login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="w-full md:h-[100vh] overflow-x-hidden bg-[#FEF6EF] flex md:flex-row-reverse flex-col-reverse justify-center items-center">
      <div className="md:w-5/12 w-full flex flex-col justify-center items-center md:py-0 py-8">
        <h1 className="text-3xl font-semibold text-[#424242] md:block hidden">
          Create Account
        </h1>
        <form
          className="flex flex-col justify-center items-center md:w-8/12 w-11/12"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col w-full relative mb-3">
            <label
              htmlFor="name"
              className="text-[#616161] font-semibold bg-[#FEF6EF] w-min px-4 relative left-[50px] top-[10px]"
            >
              Name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="name"
              type="name"
              className="rounded-3xl  border-[1px] border-[#757575] py-3 w-full bg-transparent focus:outline-none outline-none ps-[50px] text-[#616161] placeholder:text-[#9E9E9E]"
              placeholder="Enter your name"
              required
            />
            <FiUser className="absolute text-2xl bottom-[13px] left-[20px] text-[#757575]" />
          </div>
          <div className="flex flex-col w-full relative mb-3">
            <label
              htmlFor="email"
              className="text-[#616161] font-semibold bg-[#FEF6EF] w-min px-4 relative left-[50px] top-[10px]"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="rounded-3xl  border-[1px] border-[#757575] py-3 w-full bg-transparent focus:outline-none outline-none ps-[50px] text-[#616161] placeholder:text-[#9E9E9E]"
              placeholder="Enter your email"
              required
            />
            <HiOutlineEnvelope className="absolute text-2xl bottom-[13px] left-[20px] text-[#757575]" />
          </div>
          <div className="flex flex-col w-full relative mb-3">
            <label
              htmlFor="dob"
              className="text-[#616161] font-semibold bg-[#FEF6EF] w-min px-4 relative left-[50px] top-[10px]"
            >
              DOB
            </label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              id="name"
              type="date"
              className="rounded-3xl  border-[1px] border-[#757575] py-3 w-full bg-transparent focus:outline-none outline-none ps-[50px] text-[#616161] placeholder:text-[#9E9E9E]"
              placeholder="Enter your Date of Birth"
              required
            />
            <BsCake2 className="absolute text-2xl bottom-[13px] left-[20px] text-[#757575]" />
          </div>
          <div className="flex flex-col w-full relative mb-3">
            <label
              htmlFor="password"
              className="text-[#616161] font-semibold bg-[#FEF6EF] w-min px-4 relative left-[50px] top-[10px]"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type={isShowPassword ? "text" : "password"}
              className="rounded-3xl  border-[1px] border-[#757575] py-3 w-full bg-transparent focus:outline-none outline-none ps-[50px] text-[#616161] placeholder:text-[#9E9E9E]"
              placeholder="Enter your password"
              required
            />
            <CiLock className="absolute text-2xl bottom-[13px] left-[20px] text-[#757575]" />
            {isShowPassword ? (
              <FiEye
                className="absolute right-[18px] cursor-pointer text-[#757575] text-xl bottom-[15px]"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            ) : (
              <FiEyeOff
                className="absolute right-[18px] cursor-pointer text-[#757575] text-xl bottom-[15px]"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            )}
          </div>
          <p className="w-full text-right font-semibold cursor-pointer text-[#616161] hover:text-[#92613A]">
            Forgot Password?
          </p>
          {loader ? (
            <button
              disabled
              className="mt-8 bg-[#FCE2CE] text-[#92613A] font-semibold w-full rounded-3xl py-3 text-xl hover:bg-[#92613A] hover:text-[#FCE2CE] transition-all duration-300"
            >
              <SyncLoader color="#FCE2CE" />
            </button>
          ) : (
            <button
              onClick={(e) => handleSubmit(e)}
              className="mt-8 bg-[#FCE2CE] text-[#92613A] font-semibold w-full rounded-3xl py-3 text-xl hover:bg-[#92613A] hover:text-[#FCE2CE] transition-all duration-300"
            >
              Create Account
            </button>
          )}

          <p className="text-[#616161] mt-4">
            Already have an account ?
            <span
              className="text-[#92613A] font-semibold cursor-pointer ps-1 hover:text-[#ef954b]"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
      <div className="md:w-5/12 w-full flex md:flex-row flex-col justify-center items-center">
        <h1 className="relative z-[3] text-3xl font-bold text-[#92613A] md:hidden block text-center mt-4">
          Signup!!
        </h1>
        <img
          src={SignupImg}
          alt=""
          className="md:h-[500px] h-[200px] relative z-[3] md:mt-0 mt-[50px]"
        />
        <div className=" md:h-[90vh] h-[250px] w-full md:w-[450px] absolute bg-[#FCE2CE] md:bottom-0 md:top-auto top-0 md:rounded-t-[250px] md:rounded-b-[0px] rounded-b-[250px]"></div>
      </div>
    </div>
  );
};

export default Signup;
