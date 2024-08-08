import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  // MdLocalHospital,
  MdPeopleAlt,
  // MdAdminPanelSettings,
} from "react-icons/md";
import { loginformImg } from "../assets/img";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { notifySuccess,notifyError } from "../services/alertService";

function Login() {
  const [asParent, setAsParent] = useState(true);
  // const [asHospital, setAsHospital] = useState(false);
  //const [asAdmin, setAsAdmin] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    role: "parent",
  });

  const [changePassData, setChangePassData] = useState({
    mail: "",
    security_question: "",
    security_answer: "",
    new_password: "",
  });

  const securityQuestionOptions = [
    {
      value: "In what city were you born?",
      label: "In what city were you born?",
    },
    {
      value: "What is the name of your favorite pet?",
      label: "What is the name of your favorite pet?",
    },
    {
      value: "What was the name of your elementary school?",
      label: "What was the name of your elementary school?",
    },
    {
      value: "What was your favorite food?",
      label: "What was your favorite food?",
    },
  ];

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        navigate("/redirect");
      }
  },[])

  const setField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const setFieldChangePass = (field, value) => {
    setChangePassData({
      ...changePassData,
      [field]: value,
    });
  };

  const handleSecurityQuestionChange = (e) => {
    if (e) {
      console.log(e);
      setChangePassData({
        ...changePassData,
        ["security_question"]: e.value,
      });
    } else {
      setChangePassData({
        ...changePassData,
        ["security_question"]: "",
      });
    }
  };

  // const loginAsAdmin = () => {
  //   setAsParent(false);
  //   setAsAdmin(true);
  //   // setAsHospital(false);
  //   setFormData({
  //     ...formData,
  //     ["role"]: "admin",
  //   });
  // };
  const loginAsParent = () => {
    setAsParent(true);
    //setAsAdmin(false);
    //setAsHospital(false);
    setFormData({
      ...formData,
      ["role"]: "parent",
    });
  };
  // const loginAsHospital = () => {
  //   setAsParent(false);
  //   setAsAdmin(false);
  //   setAsHospital(true);
  //   setFormData({
  //     ...formData,
  //     ["role"]: "hospital",
  //   });
  // };

  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/Signup", { state: { role: formData.role } });
  };

  const handleForgotPasswordClick = () => {
    setIsChangePass(true);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginAndChangePassService();
    //navigate("/Home");
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    console.log("Change Pass");
    loginAndChangePassService();
  };

  const loginAndChangePassService = async () => {
    try {
      await axios({
        method: "post",
        data: !isChangePass ? formData : changePassData,
        // withCredentials:true,
        url: !isChangePass
          ? `http://127.0.0.1:5000/login`
          : `http://127.0.0.1:5000/forgotpassword`,
        headers: {
          "Content-role": "application/json",
        },
      }).then((response) => {
        if (isChangePass) {
          console.log(response);
          notifySuccess("Password Changed","top-right");
        setIsChangePass(false);
        } else {
          console.log(response, response.data.token);
          notifySuccess("Login Successful","top-right");
          setTimeout(() => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("mail",formData.mail);
            localStorage.setItem("role",formData.role);
            console.log(formData);
            navigate("/redirect",{state:{role: formData.role}});
          }, 1000);
        }
      });
    } catch (err) {
      console.log(err);
      notifyError("Invalid Credentials","top-right");
      setChangePassData({});
    }
  };

  return (
    <>
      <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src={loginformImg} alt="" class="w-full h-full object-cover" />
        </div>

        <div
          class=" bg-slate-900 w-full md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div class="w-full h-100 py-2">
            <div class="font-bold text-center text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">
              VW Service Center{" "}
              {/* <span class="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                <ul class="block animate-text-slide-5 text-left leading-tight [&_li]:block">
                  <li>Polio</li>
                  <li>Covid-19</li>
                  <li>Hepatitis</li>
                  <li>Influenza</li>
                  <li>Dengue</li>
                  <li aria-hidden="true">Rotavirus</li>
                </ul>
              </span> */}
            </div>

            {isChangePass ? (
              <div>
                <h1 class="text-xl md:text-2xl font-bold leading-tight my-5 text-gray-100 text-center">
                  Change Password
                </h1>
                <ToastContainer />
                <form
                  class="mt-6 flex flex-col gap-2"
                  onSubmit={handleChangePass}
                >
                  <div>
                    <label class="block text-gray-100 font-sans">Email</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      onChange={(e) =>
                        setFieldChangePass("mail", e.target.value)
                      }
                      placeholder="Enter Email"
                      class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus
                      autocomplete
                      required
                      value={changePassData.mail ? changePassData.mail : ''}
                    />
                  </div>

                  <div>
                    <label class="block text-gray-100 font-sans">
                      Security Question
                    </label>
                    <Select
                      autofocus
                      className="w-full rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      options={securityQuestionOptions}
                      onChange={handleSecurityQuestionChange}
                      placeholder="Select Question"
                      value={
                        changePassData?.security_question
                          ? securityQuestionOptions.find(
                              (item) =>
                                item.value === changePassData?.security_question
                            )
                          : ""
                      }
                      defaultValue={""}
                      isClearable
                    />
                  </div>

                  <div>
                    <label class="block text-gray-100 font-sans">
                      Security Answer
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFieldChangePass("security_answer", e.target.value)
                      }
                      placeholder="Enter Answer"
                      class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus
                      autocomplete
                      required
                      value={changePassData.security_answer ? changePassData.security_answer : ''}
                    />
                  </div>

                  <div class="mt-2">
                    <label class="block text-gray-100 font-sans">
                      New Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) =>
                        setFieldChangePass("new_password", e.target.value)
                      }
                      placeholder="Enter Password"
                      minlength="6"
                      class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                      required
                      value={changePassData.new_password ? changePassData.new_password : ''}
                    />
                  </div>

                  <div className=" flex">
                    <button
                      type="button"
                      onClick={() => {
                        setChangePassData({});
                        setIsChangePass(false);
                      }}
                      class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
                    >
                      Return To Login
                    </button>
                    <button
                      type="submit"
                      class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <h1 class="text-xl md:text-2xl font-bold leading-tight my-5 text-gray-100 text-center">
                  Admin Login
                </h1>

                <div className=" flex justify-around text-gray-100 my-2">
                  <button
                    className={
                      asParent
                        ? " border-2 p-2 rounded-md bg-white text-blue-400"
                        : " border-2 p-2 rounded-md"
                    }
                    title="Login as Parent"
                    onClick={loginAsParent}
                  >
                    <MdPeopleAlt />
                  </button>
                  {/* <button
                    className={
                      asHospital
                        ? " border-2 p-2 rounded-md bg-white text-blue-400"
                        : " border-2 p-2 rounded-md"
                    }
                    title="Login as Hospital"
                    onClick={loginAsHospital}
                  >
                    <MdLocalHospital />
                  </button> */}
                  {/* <button
                    onClick={loginAsAdmin}
                    className={
                      asAdmin
                        ? " border-2 p-2 rounded-md bg-white text-blue-400"
                        : " border-2 p-2 rounded-md"
                    }
                    title="Login as Admin"
                  >
                    <MdAdminPanelSettings />
                  </button> */}
                </div>

                <ToastContainer />
                <form class="mt-6" onSubmit={handleLoginFormSubmit}>
                  <div>
                    <label class="block text-gray-100 font-sans">Email</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => setField("mail", e.target.value)}
                      placeholder="Enter Email"
                      class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus
                      autocomplete
                      required
                    />
                  </div>

                  <div class="mt-2">
                    <label class="block text-gray-100 font-sans">
                      Password
                    </label>
                    <input
                      type="password"
                      name=""
                      id=""
                      onChange={(e) => setField("password", e.target.value)}
                      placeholder="Enter Password"
                      minlength="6"
                      class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  
                    <div class="text-right mt-2">
                      <button
                        onClick={handleForgotPasswordClick}
                        type="button"
                        class="text-sm font-semibold text-gray-100 hover:text-blue-700 focus:text-blue-700"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  

                  <button
                    type="submit"
                    class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
                  >
                    Log In
                  </button>
                </form>

                <hr class="my-6 border-gray-100 w-full" />

                {/* <button role="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
          <div class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
          <span class="ml-4">
          Log in
          with
          Google</span>
          </div>
        </button> */}
                  <></>
            
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;