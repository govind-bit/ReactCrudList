import { React, useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { signupformImg } from "../assets/img";
import hospitalData from "../assets/hospitalData.json";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { notifySuccess,notifyError } from "../services/alertService";

function Signup() {
  
  const navigate = useNavigate();
  const {state} = useLocation(); 
  const [formData, setFormData] = useState({
    "role":state.role
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

  const setField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSecurityQuestionChange = (e) => {
    if (e) {
      console.log(e);
      setFormData({
        ...formData,
        ["security_question"]: e.value,
      });
    } else {
      setFormData({
        ...formData,
        ["security_question"]: "",
      });
    }
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleHospitalChange = (e) => {
    if(e){
      let mail = e.hospital_name.replace(/ /g,'')+"@gmail.com";
      setFormData({
        ...formData,
        ["hospital_name"]: e.hospital_name,
        ["phone_number"]: e.phone_number,
        ["city"]: e.city,
        ["address"]:e.address,
        ["mail"]:mail.toLowerCase()
      })
    }
    else{
      setFormData({
        ...formData,
        ["hospital_name"]: '',
        ["phone_number"]: '',
        ["city"]: '',
        ["address"]:'',
        ["mail"]:''
      })      
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  
    registerService();
  };

  const registerService = async () => {
    if(formData.password===formData.confirm_password){
      try {
        await axios({
          method: "post",
          data: formData,
          url: `http://127.0.0.1:5000/register`,
          headers: {
            "Content-role": "application/json",
          },
        }).then((response) => {
            console.log(response, response.data.token);
            notifySuccess("Registration Successful","top-right");
            setTimeout(() => {
              navigate("/login");
            }, 1000);
        });
      }
      catch (err) {
        console.log(err);
        notifyError("Something went wrong","top-right");
      }
    }
    else{
      notifyError("Something went wrong","top-right");
    }
  };

  return (
    <>
      <section class="flex flex-col md:flex-row items-center justify-center bg-signupform bg-opacity-50 p-2">
        {/* <div class="bg-blue-600 flex flex-col items-stretch lg:block w-full h-screen md:w-1/2 xl:w-2/3]">
          <img
            src={signupformImg}
            alt=""
            class="w-full h-screen object-cover"
          />
        </div> */}

        <div class=" bg-slate-900 flex items-center justify-center w-1/2 px-5 py-2 h-full rounded-md shadow-lg">
          <div class="w-full h-100 py-2">
            <div class="font-bold text-center text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">
              Child Vaccination From{" "}
              <span class="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                <ul class="block animate-text-slide-5 text-left leading-tight [&_li]:block">
                  <li>Polio</li>
                  <li>Covid-19</li>
                  <li>Hepatitis</li>
                  <li>Influenza</li>
                  <li>Dengue</li>
                  <li aria-hidden="true">Rotavirus</li>
                </ul>
              </span>
            </div>
        
            <h1 class="text-l md:text-xl font-bold leading-tight my-2 text-gray-100 text-center">
              Create New Account
            </h1>
            <ToastContainer/>
            {(state?.role==="parent") ? (
              <form class=" flex flex-col gap-2" onSubmit={handleSignUpSubmit}>
              
              <div>
                <label class="block text-gray-100">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("mail", e.target.value)}
                  value={formData?.mail}
                />
              </div>

              <div>
                <label class="block text-gray-100">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("p_name", e.target.value)}
                  value={formData?.p_name}
                />
              </div>

              <div>
                <label class="block text-gray-100">Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("phone_number", e.target.value)}
                  value={formData?.phone_number}
                />
              </div>

              <div>
                <label class="block text-gray-100">Address</label>
                <input
                  type="textarea"
                  placeholder="Enter address"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("address", e.target.value)}
                  value={formData?.address}
                />
              </div>

              <div>
                <label class="block text-gray-100">City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("city", e.target.value)}
                  value={formData?.city}
                />
              </div>

              <div>
                    <label class="block text-gray-100 font-sans">
                      Security Question
                    </label>
                    <Select
                      autofocus
                      className="w-full rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      options={securityQuestionOptions}
                      onChange={handleSecurityQuestionChange}
                      placeholder="Select Question"
                      value={
                        formData?.security_question
                          ? securityQuestionOptions.find(
                              (item) =>
                                item.value === formData?.security_question
                            )
                          : ""
                      }
                      defaultValue={""}
                      isClearable
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-gray-100 font-sans">
                      Security Answer
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setField("security_answer", e.target.value)
                      }
                      placeholder="Enter Answer"
                      class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus
                      autocomplete
                      required
                      value={formData.security_answer ? formData.security_answer : ''}
                    />
                  </div>

              <div class="mt-1">
                <label class="block text-gray-100">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setField("password", e.target.value)}
                  value={formData?.password}
                />
              </div>

              <div class="mt-1">
                <label class="block text-gray-100">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  minlength="6"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setField("confirm_password", e.target.value)}
                  value={formData?.confirm_password}
                />
              </div>

              <button
                type="submit"
                class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-1 mt-6"
              >
                Sign Up
              </button>
            </form>
            ) : (
              <form class=" flex flex-col gap-2" onSubmit={handleSignUpSubmit}>
              <div class="mt-1">
                <label class="block text-gray-100">Hospital</label>
                <Select
                  autofocus
                  className="w-full rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  options={hospitalData}
                  getOptionLabel={(option) => option.hospital_name}
                  getOptionValue={(option) => option.hospital_name}
                  onChange={handleHospitalChange}
                  placeholder="Select Hospital"
                  value={formData?.hospital_name ? hospitalData.find(item => item.value === formData?.hospital_name) : ''}
                  isClearable
                  required
                />
              </div>

              <div>
                <label class="block text-gray-100">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("mail", e.target.value)}
                  value={formData?.mail}
                />
              </div>

              <div>
                <label class="block text-gray-100">Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("phone_number", e.target.value)}
                  value={formData?.phone_number}
                />
              </div>

              <div>
                <label class="block text-gray-100">Address</label>
                <input
                  type="textarea"
                  placeholder="Enter Address"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("address", e.target.value)}
                  value={formData?.address}
                />
              </div>

              <div>
                <label class="block text-gray-100">City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autocomplete
                  required
                  onChange={(e) => setField("city", e.target.value)}
                  value={formData?.city}
                />
              </div>

              <div>
                    <label class="block text-gray-100 font-sans">
                      Security Question
                    </label>
                    <Select
                      autofocus
                      className="w-full rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      options={securityQuestionOptions}
                      onChange={handleSecurityQuestionChange}
                      placeholder="Select Security Question"
                      value={
                        formData?.security_question
                          ? securityQuestionOptions.find(
                              (item) =>
                                item.value === formData?.security_question
                            )
                          : ""
                      }
                      defaultValue={""}
                      isClearable
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-gray-100 font-sans">
                      Security Answer
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setField("security_answer", e.target.value)
                      }
                      placeholder="Enter Answer"
                      class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus
                      autocomplete
                      required
                      value={formData.security_answer ? formData.security_answer : ''}
                    />
                  </div>

              <div class="mt-1">
                <label class="block text-gray-100">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setField("password", e.target.value)}
                  value={formData?.password}
                />
              </div>

              <div class="mt-1">
                <label class="block text-gray-100">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  minlength="6"
                  class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setField("confirm_password", e.target.value)}
                  value={formData?.confirm_password}
                />
              </div>
              

              <button
                type="submit"
                class="w-full block bg-transparent hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-1 mt-6"
              >
                Sign Up
              </button>
            </form>
            )}
            

            <hr class="my-6 border-gray-100 w-full" />

            {/* <button type="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-1 border border-gray-300">
          <div class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
          <span class="ml-4">
          Log in
          with
          Google</span>
          </div>
        </button> */}
            <p class="mt-8 text-gray-100 text-center">
              Already have an account?{" "}
              <button
                onClick={handleLoginClick}
                class="text-gray-100 hover:text-blue-700 font-semibold"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
