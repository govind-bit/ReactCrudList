import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  MdLocalHospital,
  MdPeopleAlt,
  MdAdminPanelSettings,
  IoMdPersonAdd,
} from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "../parentModule/childrenData.css";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { notifyError, notifySuccess } from "../../services/alertService";

function AdminChildrenData() {
  const navigate = useNavigate();
  const lsmail =  localStorage.getItem("mail");  
  const [showForm, setShowForm] = useState(false);
  const [isEditChildData, setIsEditChildData] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [childData, setChildData] = useState({});
  const [addNewChildData,setAddNewChildData] = useState({
    "p_mail":lsmail
  });
  const [editChildData,setEditChildData] = useState({
    "p_mail":lsmail
  });
  const [loadChildDataList,setLoadChildDataList] = useState(true);
  const [childID,setChildID] = useState(0);
  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "Other",
      label: "other",
    },
  ];
  const bloodGroupOptions = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
    },
  ];

  useEffect(() => {
    getChildDataService();
  }, []);
  
  const handleAddChild = () => {
    setShowForm(true);
  };

  const setField = (field, value) => {
    if(isEditChildData){
      setEditChildData({
        ...editChildData,
        [field]: value,
      });
    }
    else{
      setAddNewChildData({
        ...addNewChildData,
        [field]: value,
      });
    }
  };

  const handleGenderChange = (e) => {
    if(isEditChildData){
      if (e) {
        setEditChildData({
          ...editChildData,
          ["new_gender"]: e.value,
        });
      } else {
        setEditChildData({
          ...editChildData,
          ["new_gender"]: "",
        });
      }
    }
    else{
    if (e) {
      setAddNewChildData({
        ...addNewChildData,
        ["gender"]: e.value,
      });
    } else {
      setAddNewChildData({
        ...addNewChildData,
        ["gender"]: "",
      });
    }}
  };

  const handleBloodTypeChange = (e) => {
    if(isEditChildData){
      if (e) {
        setEditChildData({
          ...editChildData,
          ["new_blood_type"]: e.value,
        });
      } else {
        setEditChildData({
          ...editChildData,
          ["new_blood_type"]: "",
        });
      }
    }
    else{
      if (e) {
        setAddNewChildData({
          ...addNewChildData,
          ["blood_type"]: e.value,
        });
      } else {
        setAddNewChildData({
          ...addNewChildData,
          ["blood_type"]: "",
        });
      }

    }
  };

  const handleEditchild = (id) => {
    getChildDataByIDService(id);
    setIsEditChildData(true);
    setShowForm(true);
  };

  const handleDeleteChild = (id) => {
    setShowDeleteModal(false);
    deleteChildDataService(id);
  };

  const handleAddAndEditChild = (e) => {
    e.preventDefault();
    setShowForm(false);
    isEditChildData ? editChildDataService(childID) : addChildDataService();
  }

  const getChildDataService = () => {
    try {
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/parent/get_child/b@gmail.com`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        setChildData(response.data.children);
        setLoadChildDataList(false);
      });
    } catch (err) {
      notifyError("Something Went Wrong","top-right");
    }
  }

  const getChildDataByIDService = (id) => {
    try {
      axios({
        method: "GET",
        url: `http://127.0.0.1:5000/parent/get_child_details/${id}`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        setEditChildData({
          "new_child_name" : response.data.child_details.c_name,
          "new_age" : response.data.child_details.age,
          "new_dob" : response.data.child_details.dob,
          "new_gender" : response.data.child_details.gender,
          "new_blood_type" : response.data.child_details.blood_type        
        });
      });
    } catch (err) {
      notifyError("Something Went Wrong","top-right");
    }
  }

  const addChildDataService = () => {
    try {
      axios({
        method: "POST",
        data: addNewChildData,
        url: `http://127.0.0.1:5000/parent/add_child/b@gmail.com`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        notifySuccess("Child Added Successfully","top-right");
        getChildDataService();
        setAddNewChildData({});
      });
    } catch (err) {
      notifyError("Something went wrong","top-right");
      setAddNewChildData({});
    }
  };

  const editChildDataService = (id) => {
    var temp=editChildData.new_dob;
    var updatedDOB = temp.replace(/-/g, "-");
    editChildData.new_dob = updatedDOB;
    try {
      axios({
        method: "POST",
        data: editChildData,
        url: `http://127.0.0.1:5000/parent/update_child/b@gmail.com/${id}`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        console.log(response);
        notifySuccess("Child Updated Successfully","top-right");
        getChildDataService();
        setEditChildData({});
      });
    } catch (err) {
      console.log(err);
      notifyError("Something went wrong","top-right");
      setEditChildData({});
    }
  };

  const deleteChildDataService = () => {
    try {
      axios({
        method: "DELETE",
        url: `http://127.0.0.1:5000/parent/delete_child/${childID}`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        notifySuccess("Child Deleted Successfully","top-right");
        getChildDataService();
      });
    } catch (err) {
      notifySuccess("Something went wrong","top-right");
    }
  }

  return (
    <>
      <div class="bg-white rounded-md w-full">
        <div class=" px-10 flex items-center  justify-between bg-[#333333] text-[#FFFFFF]">
          <div class=" mx-5 mt-3">
            <h1
              onClick={() => {
                navigate("/homeAdmin");
              }}
              class="font-bold text-4xl gradient-text1"
            >
              CHILD DATA
            </h1>
          </div>
          <div class="flex">
            {/* <div class="flex items-center p-2 rounded-md">
            <h2 class=" font-bold text-lg">Children Data</h2>
            </div> */}
            {/* {showForm ? (
              <></>
            ) : (
              <div class="lg:ml-40 mx-5 mt-3 AddChildBtnDiv">
                <button class=" flex align-middle justify-center gap-2 px-4 py-2 rounded-md text-white hover:text-[#AEFFDE] font-semibold tracking-wide cursor-pointer">
                  <IoMdPersonAdd className=" font-bold text-xl mt-1" />
                  <p className=" font-bold text-xl" onClick={handleAddChild}>
                    Add Child
                  </p>
                </button>
              </div>
            )} */}
          </div>
        </div>
        {showForm ? (
          <div>
            <div className=" p-5 flex justify-center bg-childData">
              <form class=" flex flex-col gap-2 bg-900 p-10 w-1/2 align-middle justify-center rounded-md" onSubmit={handleAddAndEditChild}>
                {isEditChildData ? (
                  <h2 className="  font-bold text-xl text-center text-[#AEFFDE]">
                    Edit Child Data
                  </h2>
                ) : (
                  <h2 className="  font-bold text-xl text-center text-[#AEFFDE]">
                    Add Child Data
                  </h2>
                )}
                <div>
                  <label class="block text-gray-100">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                    onChange={(e) => {isEditChildData ? setField("new_child_name", e.target.value) : setField("c_name", e.target.value)}}
                    value={isEditChildData ? editChildData?.new_child_name : addNewChildData?.c_name}
                  />
                </div>

                <div>
                  <label class="block text-gray-100">Age</label>
                  <input
                    type="number"
                    placeholder="Enter Age"
                    class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                    onChange={(e) => {isEditChildData ? setField("new_age", e.target.value) : setField("age", e.target.value)}}
                    value={isEditChildData ? editChildData?.new_age : addNewChildData?.age}
                  />
                </div>

                <div>
                  <label class="block text-gray-100">Date Of Birth</label>
                  <input
                    type="date"
                    placeholder="Select Age"
                    class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                    onChange={(e) => isEditChildData ? setField("new_dob", e.target.value) : setField("dob", e.target.value)}
                    value={isEditChildData ? editChildData?.new_dob : addNewChildData?.dob}
                  />
                </div>

                <div>
                  <label class="block text-gray-100">Gender</label>
                  <Select
                    autofocus
                    className="w-full rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    options={genderOptions}
                    onChange={handleGenderChange}
                    placeholder="Select Gender"
                    value=
                      {isEditChildData ? (editChildData?.new_gender
                        ? genderOptions.find(
                            (item) => item.value === editChildData?.new_gender
                          )
                        : "") : (addNewChildData?.gender
                          ? genderOptions.find(
                              (item) => item.value === addNewChildData?.gender
                            )
                          : "")}
                    isClearable
                    required
                  />
                </div>

                <div>
                  <label class="block text-gray-100 font-sans">
                    Blood Group
                  </label>
                  <Select
                    autofocus
                    className="w-full rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    options={bloodGroupOptions}
                    onChange={handleBloodTypeChange}
                    placeholder="Select Blood Group"
                    value=
                      {isEditChildData ? (editChildData?.new_blood_type
                        ? bloodGroupOptions.find(
                            (item) => item.value === editChildData?.new_blood_type
                          )
                        : "") : (addNewChildData?.blood_type
                          ? bloodGroupOptions.find(
                              (item) => item.value === addNewChildData?.blood_type
                            )
                          : "")} 
                    
                    isClearable
                    required
                  />
                </div>

                <div>
                  <label class="block text-gray-100 font-sans">
                    Parent Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autofocus
                    autocomplete
                    required
                    readOnly
                    value={lsmail}
                  />
                </div>

                <div className=" flex">
                  <button
                    type="button"
                    class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-1 mt-6"
                    onClick={() => {
                      setShowForm(false);
                      setIsEditChildData(false);
                    }}
                  >
                    Back
                  </button>

                  {isEditChildData ? (
                    <button
                      type="submit"
                      class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-1 mt-6"
                    >
                      Edit Child
                    </button>
                  ) : (
                    <button
                      type="submit"
                      class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-1 mt-6"
                    >
                      Add Child
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div class="flex">
              <ToastContainer />
              <div class="flex w-full rounded-lg overflow-hidden py-10 px-10">
                <table class="min-w-full font-inter leading-normal border-2 border-blue-500/20 rounded-md shadow-2xl shadow-blue-500/20">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Age
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        DOB
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Gender
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Parent Mail
                      </th>
                      {/* <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  {!loadChildDataList && (
                    <tbody>
                    {Object.keys(childData).length>0 && childData?.map((child, i) => (
                      <tr key={i}>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">{child.child_id}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            {/* <div class="flex-shrink-0 w-10 h-10">
                              <img
                                class="w-full h-full rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1629783509182-68c8c190e952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2lkfGVufDB8fDB8fHww"
                                alt=""
                              />
                            </div> */}
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {child.c_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">{child.age}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {child.dob}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            {child.gender==="male" ? (
                              <div>
                                <span
                              aria-hidden
                              class="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">{child.gender}</span>
                              </div>
                            ) : (
                              <div>
                                <span
                              aria-hidden
                              class="absolute inset-0 bg-pink-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">{child.gender}</span>
                              </div>
                            )}
                          </span>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">{child.blood_type}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            b@gmail.com
                          </p>  
                        </td>
                        {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex gap-5 text-2xl">
                            <button
                              class=" text-blue-400 hover:text-blue-800"
                              onClick={() => {
                                handleEditchild(child.child_id);
                                setChildID(child.child_id);
                              }}
                            >
                              <MdEdit />
                            </button>
                            <button
                              class=" text-red-400 hover:text-red-800"
                              onClick={() => {              
                                setChildID(child.child_id);
                                setShowDeleteModal(true);
                              }}
                            >
                              <MdDelete />
                            </button>

                            {showDeleteModal && (
                              <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
                                <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                                  <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                                  <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                                    <div class="md:flex items-center">
                                      <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                        <i class="bx bx-error text-3xl">
                                          &#9888;
                                        </i>
                                      </div>
                                      <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                        <p class="font-bold">Warning!</p>
                                        <p class="text-sm text-gray-700 mt-1">
                                          You will lose child data by deleting
                                          this. This action cannot be undone.
                                        </p>
                                      </div>
                                    </div>
                                    <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                                      <button
                                        onClick={handleDeleteChild}
                                        id="confirm-delete-btn"
                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                                      >
                                        Delete
                                      </button>
                                      <button
                                        onClick={() => {
                                          setShowDeleteModal(false);
                                        }}
                                        id="confirm-cancel-btn"
                                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminChildrenData;
