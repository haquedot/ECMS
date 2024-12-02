import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import userProfileImg from "../../assets/images/profile-img.png";
import { Switch } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Calendar } from "../../components/ui/calendar";
import { SyncLoader } from "react-spinners";
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [contractLength, setContractLength] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
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
              {row?.name}
            </p>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row?.phoneNumber || "phoneNumber",
      cell: (row) => (
        <p className="text-base font-medium">
          {row?.phoneNumber || "24-02-2004"}
        </p>
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
          <FaRegEye
            className="text-xl text-[#10A37F] hover:text-[#10A37F] cursor-pointer"
            onClick={() => handleViewUser(row)}
          />
          <FaEdit
            className="text-xl text-[#969DA6] hover:text-[#10A37F] cursor-pointer"
            onClick={() => handleEditUserModal(row)}
          />
          <MdDelete
            className="text-xl text-red-400 hover:text-[#10A37F] cursor-pointer"
            onClick={() => handleDelete(row?._id)}
          />
        </div>
      ),
      button: true,
    },
  ];

  const AddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          name,
          email,
          phoneNumber,
          joiningDate,
          designation,
          contractLength,
          category,
          salary,
          workMode,
          address,
          city,
          state,
          pinCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      if (response.status === 201) {
        setLoading(false);
        toast.success("Add Employee Successfully!!");
        handleOpen();
        handleGetUsers();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to Add employee");
    }
  };

  const UpdateEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/employees/${currentEditUser}`,
        {
          name,
          email,
          phoneNumber,
          joiningDate,
          designation,
          contractLength,
          category,
          salary,
          workMode,
          address,
          city,
          state,
          pinCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        toast.success("Update Employee Data Successfully!!");
        handleOpen();
        handleGetUsers();
        setIsEdit(false);
        setCurrentEditUser("");
        setName("");
        setEmail("");
        setPhoneNumber("");
        setJoiningDate("");
        setDesignation("");
        setContractLength("");
        setCategory("");
        setSalary("");
        setWorkMode("");
        setAddress("");
        setState("");
        setCity("");
        setPinCode("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to Add employee");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Delete Employee Successfully!!");
        handleGetUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  const handleGetUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees`,
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

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(!isUserDetailsModalOpen);
  };

  //handle the edit
  const handleEditUserModal = (user) => {
    setIsEdit(true);
    setCurrentEditUser(user?._id);
    setName(user?.name);
    setEmail(user?.email);
    setPhoneNumber(user?.phoneNumber);
    setJoiningDate(user?.joiningDate);
    setDesignation(user?.designation);
    setContractLength(user?.contractLength);
    setCategory(user?.category);
    setSalary(user?.salary);
    setWorkMode(user?.workMode);
    setAddress(user?.address);
    setState(user?.state);
    setCity(user?.city);
    setPinCode(user?.pinCode);
    setOpen(true);
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <div
      className="w-full flex flex-col h-[100vh] overflow-y-scroll px-8"
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="text-3xl text-[#616161] font-semibold my-4">
        Employees Lists
      </h1>

      <div className="flex justify-end">
        <div
          className="rounded-lg border border-[#92613A] text-[#92613A] cursor-pointer hover:bg-[#92613A] hover:text-white transition-all duration-300 hover:shadow-xl shadow-sm px-4 py-2 flex items-center gap-[5px]"
          onClick={handleOpen}
        >
          <FaPlus />
          <p>Add Employee</p>
        </div>
      </div>
      <div className="shadow-md bg-white rounded-3xl overflow-hidden my-6">
        <DataTable
          title=""
          columns={columns}
          data={userArr}
          customStyles={customStyles}
        />
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        className="max-h-[90vh] overflow-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <DialogHeader>Add Employee Detail</DialogHeader>
        <DialogBody>
          <form
            className="w-full flex flex-col gap-y-[10px]"
            onSubmit={(e) => AddEmployee(e)}
          >
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="name" className="text-base text-gray-800">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Employee Name"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="email" className="text-base text-gray-800">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="phoneNumber" className="text-base text-gray-800">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                placeholder="Enter Phone Number"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="joiningDate" className="text-base text-gray-800">
                Joining Date
              </label>
              <input
                id="joiningDate"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                type="date"
                placeholder="Enter Phone Number"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="designation" className="text-base text-gray-800">
                Designation/ Position
              </label>
              <input
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                type="text"
                placeholder="Enter Designation or Position"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label
                htmlFor="contractLength"
                className="text-base text-gray-800"
              >
                Contract Length <span className="text-sm">(In Months)</span>
              </label>
              <input
                id="contractLength"
                value={contractLength}
                onChange={(e) => setContractLength(e.target.value)}
                type="number"
                placeholder="Enter Contract Length"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="category" className="text-base text-gray-800">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              >
                <option value="">Choose Category</option>
                <option value="GEN" key="">
                  Gen
                </option>
                <option value="OBC" key="">
                  OBC
                </option>
                <option value="Sc/ST" key="">
                  Sc/ ST
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="salary" className="text-base text-gray-800">
                Salary <span className="text-sm">(In INR)</span>
              </label>
              <input
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                type="number"
                placeholder="Enter Salary"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="workMode" className="text-base text-gray-800">
                Work Mode
              </label>
              <select
                id="workMode"
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              >
                <option value="">Choose Work Mode</option>
                <option value="Remote" key="">
                  Remote
                </option>
                <option value="Hybrid" key="">
                  Hybrid
                </option>
                <option value="onSite" key="">
                  On Site
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="address" className="text-base text-gray-800">
                Address
              </label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter Address"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="state" className="text-base text-gray-800">
                State
              </label>
              <input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                placeholder="Enter state"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="city" className="text-base text-gray-800">
                city
              </label>
              <input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Enter city"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
            <div className="flex flex-col gap-y-[5px]">
              <label htmlFor="pinCode" className="text-base text-gray-800">
                Pin Code
              </label>
              <input
                id="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                type="text"
                placeholder="Enter Pin Code"
                className="border rounded-lg py-2 px-3 focus:outline-none focus:border-[#92613A] placeholder:text-[#747474] text-black"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {loading ? (
            <Button variant="gradient" color="#92613A">
              <SyncLoader color="#FCE2CE" />
            </Button>
          ) : (
            <Button
              variant="gradient"
              color="#92613A"
              onClick={(e) => (isEdit ? UpdateEmployee(e) : AddEmployee(e))}
            >
              <span>Confirm</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      <Dialog
        open={isUserDetailsModalOpen}
        handler={handleViewUser}
        className="max-h-[90vh] overflow-scroll bg-white rounded-lg shadow-xl p-4 md:p-6"
        style={{ scrollbarWidth: "none" }}
      >
        <DialogHeader className="text-2xl font-semibold text-gray-900">
          User Details
        </DialogHeader>
        <DialogBody>
          {selectedUser ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-x-4 gap-y-2 ">
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">Name</h4>
                  <p className="text-gray-600">{selectedUser?.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">Email</h4>
                  <p className="text-gray-600">{selectedUser?.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Phone Number
                  </h4>
                  <p className="text-gray-600">{selectedUser?.phoneNumber}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Joining Date
                  </h4>
                  <p className="text-gray-600">{selectedUser?.joiningDate}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Designation
                  </h4>
                  <p className="text-gray-600">{selectedUser?.designation}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Contract Length
                  </h4>
                  <p className="text-gray-600">
                    {selectedUser?.contractLength} Months
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Category
                  </h4>
                  <p className="text-gray-600">{selectedUser?.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Salary
                  </h4>
                  <p className="text-gray-600">{selectedUser?.salary} INR</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Work Mode
                  </h4>
                  <p className="text-gray-600">{selectedUser?.workMode}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700 text-wrap">
                    Address
                  </h4>
                  <p className="text-gray-600">{selectedUser?.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">City</h4>
                  <p className="text-gray-600">{selectedUser?.city}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">State</h4>
                  <p className="text-gray-600">{selectedUser?.state}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Pin Code
                  </h4>
                  <p className="text-gray-600">{selectedUser?.pinCode}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-700">
                    Status
                  </h4>
                  <p
                    className={`text-lg ${
                      selectedUser?.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {selectedUser?.status ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No user selected</p>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-end">
          <Button
            color="red"
            onClick={handleViewUser}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UserList;
