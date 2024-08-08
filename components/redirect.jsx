import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import {
//   MdLocalHospital,
//   MdPeopleAlt,
//   MdAdminPanelSettings,
// } from "react-icons/md";
// import { loginformImg } from "../assets/img";

function Redirect() {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log('before token')
    if (token) {
      console.log('after token')
      if (role === "parent") {
        console.log('after parent token')
          navigate("/homeParent");
          
      } else {
          navigate("/");
      }
  } else {
      navigate("/");
  }  
  },[])

  return (
    <>
      <p>Loading... </p>
    </>
  );
}

export default Redirect;

