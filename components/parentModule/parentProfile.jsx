import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../services/alertService";
import { FaTwitter, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import "./homeParent.css";
import axios from "axios";

function ParentProfile() {
  const navigate = useNavigate();
  //   const {state} = useLocation();
  const token = localStorage.getItem("token");
  const p_mail = localStorage.getItem("mail");
  const [parentData, setParentData] = useState({});
  const [tokenVal, setTokenVal] = useState({
    token: token,
    parent_mail: p_mail,
  });

  //   useEffect(() => {
  //     if (!token) navigate("/redirect");
  //   }, [token]);

  //   const handleLogOut = () => {
  //     localStorage.removeItem("token");
  //     navigate("/redirect");
  //   };

  //   const handleNavClick = (e) => {
  //     navigate(`/${e.target.id}`,{state: state});
  //   }

  //   console.log(state?.mail);

  useEffect(() => {
    getParentDataService();
  }, []);

  const getParentDataService = () => {
    try {
      axios({
        method: "POST",
        data: tokenVal,
        url: `http://127.0.0.1:5000/parent/get_parent_details`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        // console.log(response);
        setParentData(response.data.parent_details);
      });
    } catch (err) {
      console.log(err);
      notifyError("Something Went Wrong", "top-right");
    }
  };

  return (
    <>
      <div class="bg-white rounded-md w-full">
        <div class=" px-10 flex items-center  justify-between bg-[#333333] text-[#FFFFFF]">
          <div class=" mx-5 mt-3 mb-1">
            <h1
              onClick={() => {
                navigate("/homeParent");
              }}
              class="font-bold text-4xl gradient-text1"
            >
              Parent Profile
            </h1>
          </div>
        </div>
        <div class="p-20 bg-orange-200 m-4 rounded-md">
          <div class="bg-white rounded-lg shadow-2xl md:flex">
            <img
              src="https://images.unsplash.com/photo-1506456331400-7088248a8db1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhcmVudHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Parent Profile Pic"
              class="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover"
            />
            <div class="p-6">
              <h2 class="font-bold text-xl font-poppins border-b-2 md:text-3xl mb-2 text-orange-700 ">
                INFORMATION
              </h2>
              <div class=" grid grid-cols-2 gap-2">
                <div>
                  <h2 class="font-bold text-xl font-poppins mt-5 text-black ">
                    Name
                  </h2>
                  <p class="font-bold text-lg mb-2 text-gray-400">
                    {parentData.p_name ?? "Gopal Das"}
                  </p>
                </div>
                <div>
                  <h2 class="font-bold text-xl font-poppins mt-5 text-black ">
                    Phone Number
                  </h2>
                  <p class="font-bold text-lg mb-2 text-gray-400">
                    {parentData.contact ?? "9876543210"}
                  </p>
                </div>
                <div>
                  <h2 class="font-bold text-xl font-poppins mt-5 text-black ">
                    Address
                  </h2>
                  <p class="font-bold text-lg mb-2 text-gray-400">
                    {parentData.address ?? "Hinjawadi Phase 3"}
                  </p>
                </div>
                <div>
                  <h2 class="font-bold text-xl font-poppins mt-5 text-black ">
                    City
                  </h2>
                  <p class="font-bold text-lg mb-2 text-gray-400">
                    {parentData.city ?? "Pune"}
                  </p>
                </div>
                <div>
                  <h2 class="font-bold text-xl font-poppins mt-5  text-black ">
                    Childrens
                  </h2>
                  <div class=" flex flex-col">
                    {Object.keys(parentData).length > 0 &&
                      Object.keys(parentData?.children).length > 0 &&
                      parentData.children?.map((child, i) => (
                        <p class="font-bold text-lg text-gray-400">
                          {i+1}. {child?.c_name ?? "Suhas"}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              {/* <p class="text-orange-700">Look at me go sideways!</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentProfile;
