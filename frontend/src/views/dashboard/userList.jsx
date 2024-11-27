import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import userProfileImg from "../../assets/images/profile-img.png";
import { Switch } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
// Custom styles for the DataTable
const customStyles = {
  tableWrapper: {
    style: {
      borderRadius: "20px",
      overflow: "hidden",
    },
  },
  header: {
    style: {
      backgroundColor: "#2A397E",
      color: "#FFF",
      fontSize: "18px",
      fontWeight: "bold",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderRadius: "12px 12px 0 0", // Rounded top corners for the header
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      margin: "4px 0",
      border: "none !important",
      paddingLeft: "5px",
      paddingRight: "10px",
    },
  },
  cells: {
    style: {
      paddingLeft: "10px",
      paddingRight: "10px",
      fontSize: "14px",
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#F1F5F9",
      padding: "10px",
      borderRadius: "0 0 12px 12px", // Rounded bottom corners for pagination
    },
    pageButtonsStyle: {
      color: "#10A37F",
      "&:hover": {
        backgroundColor: "#10A37F",
        color: "#FFF",
      },
    },
  },
};
const UserList = () => {
  const [userArr, setUserArr] = useState([]);
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.username || "Unknown",
      cell: (row) => {
        return (
          <div className="flex items-center gap-[10px] cursor-pointer">
            <div className="flex h-[30px] w-[30px] rounded-full overflow-hidden bg-[#FFDDDD]">
              <img src={userProfileImg} alt="" className="rounded-full" />
            </div>
            <p className="text-base font-medium  hover:text-gray-600">
              {row?.username}
            </p>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => row?.dob || "24-02-2004",
      cell: (row) => (
        <p className="text-base font-medium">{row?.dob || "24-02-2004"}</p>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email || "hibban@gmail.com",
      cell: (row) => (
        <p className="text-base font-medium">{row?.email || "xyz@gmail.com"}</p>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Switch
          id={`custom-switch-${row?._id}`}
          ripple={false}
          className="h-full w-full checked:bg-[#10A37F]"
          containerProps={{
            className: "w-11 h-6",
          }}
          circleProps={{
            className: "before:hidden left-0.5 border-none",
          }}
          checked={true}
          // onChange={() => handleToggleStatus(row)}
        />
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        // <button className="text-gray-600">
        //   <BsThreeDotsVertical className="text-xl text-[#969DA6]" />
        // </button>
        <div className="flex gap-[10px] items-center">
          <FaRegEye className="text-xl text-[#10A37F] hover:text-[#10A37F] cursor-pointer" />
          <FaEdit className="text-xl text-[#969DA6] hover:text-[#10A37F] cursor-pointer" />
          <MdDelete className="text-xl text-red-400 hover:text-[#10A37F] cursor-pointer" />
        </div>
      ),
      button: true,
    },
  ];

  const handleGetUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/view-all-user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUserArr(response?.data?.data);
      }
    } catch (error) {
      console.log("error in getting users:", error);
      toast.error(error?.response?.data?.message || "Failed to get Users");
    }
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <div
      className="w-full flex flex-col h-[100vh] overflow-y-scroll px-8"
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="text-3xl text-[#616161] font-semibold my-4">User Lists</h1>
      <div className="shadow-md bg-white rounded-3xl overflow-hidden my-6">
        <DataTable
          title=""
          columns={columns}
          data={userArr}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default UserList;
