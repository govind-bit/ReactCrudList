import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTwitter,FaFacebook,FaGithub,FaLinkedin } from "react-icons/fa";
import axios from "axios";
import "../parentModule/homeParent.css";


function HomeHospital() {
    const navigate = useNavigate();
    // const {state} = useLocation();
    // const token = localStorage.getItem("token");

    // useEffect(() => {
    //   if (!token) navigate("/redirect");
    // }, [token]);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("mail");
        logOutService();
        navigate("/redirect");
      };

      const logOutService = () => {
        try {
          axios({
            method:'POST',
            url: `http://127.0.0.1:5000/logout`,
            headers: {
              "Content-role": "application/json",
            },
          }).then((response) => {
            console.log(response);
            // setChildData(response.data.children);
            // setLoadChildDataList(false);
          });
        } catch (err) {
          console.log(err);
        }
      }

      const handleNavClick = (e) => {
        navigate(`/${e.target.id}`);
      };

    // console.log(state?.mail);

    return (
        <>
            <div>
                <body
                    class="text-gray-700 bg-white antialiased"
                    style={{ "font-family": "'Roboto', sans-serif" }}
                >
                <nav class="flex bg-[#333333]">
                    <div>
                        <h1 class="font-bold pl-6 pt-3 text-4xl gradient-text1">VFC</h1>
                    </div>

                    {/* <div class="block lg:hidden">
              <button
                id="nav-toggle"
                class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
              >
                <svg
                  class="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div> */}

                    <div
                        id="nav-content"
                        class="w-full flex-grow items-center lg:items-center lg:w-auto hidden lg:block lg:pt-0 md:text-right px-4 text-[#FFFFFF]"
                    >
                        <div class="text-sm font-medium mt-6 lg:flex-grow font-sans flex gap-10 justify-end">
                            {/* <div className="btnDiv cursor-pointer">
                  <a
                    href="#responsive-header"
                    class="block mt-1 lg:inline-block lg:mt-0 text-dark-200 hover:text-[#AEFFDE]"
                  >
                    Home
                  </a>
                </div> */}
                            <div className="btnDiv cursor-pointer">
                                <a
                                                        onClick={handleNavClick}
                                                        id="hospitalProfile"
                                    class="block mt-1 lg:inline-block lg:mt-0 text-dark-200 hover:text-[#AEFFDE]"
                                >
                                    My Profile
                                </a>
                            </div>
                            {/*<div className="btnDiv cursor-pointer">*/}
                            {/*    <a*/}
                            {/*        // onClick={handleNavClick}*/}
                            {/*        id="childrenData"*/}
                            {/*        class="block mt-1 lg:inline-block lg:mt-0 text-dark-200 hover:text-[#AEFFDE]"*/}
                            {/*    >*/}
                            {/*        */}
                            {/*    </a>*/}
                            {/*</div>*/}
                            <div className="btnDiv cursor-pointer">
                                <a
                                    href="#responsive-header"
                                    class="block mt-1 lg:inline-block lg:mt-0 text-dark-200 hover:text-[#AEFFDE]"
                                >
                                    All Appointments
                                </a>
                            </div>
                            <div>
                                <button class="relative mb-2 text-dark-2000 hover:text-[#AEFFDE]  focus:text-gray-600 rounded-full">
                                    <span class="sr-only">Notifications</span>
                                    <svg
                                        aria-hidden="true"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        class="h-6 w-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <button class=" text-dark-200 hover:text-[#AEFFDE] focus:text-gray-600 rounded-full" onClick={handleLogOut}>
                                    <span class="sr-only">Log out</span>
                                    <svg
                                        aria-hidden="true"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        class="h-6 w-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div
                    class="py-20 bg-cover bg-no-repeat bg-fixed"
                    style={{
                        "background-image":
                            "url('https://plus.unsplash.com/premium_photo-1667520057266-6c38152b1722?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWwlMjB2YWNjaW5lfGVufDB8fDB8fHww')",
                    }}
                >
                    <div class=" gradient-text container m-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center w-1/2 p-10 backdrop-blur-sm rounded-md bg-[#F1EAFF] backdrop-filter bg-opacity-10 font-Protest font-semibold border-2 border-gray-100">
                        <h2 class="text-4xl font-bold mb-2">
                            Vaccination For Every Child
                        </h2>
                        <h3 class="text-2xl mb-8">
                            Shielding your little ones from dangerous diseases
                        </h3>
                        <h4 className="text-xl mb-4">
                            Simplifying healthcare, one appointment at a time
                        </h4>
                        <button class="bg-gray-100 text-blue-500 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:text-blue-500 hover:bg-gray-800 transition-all">
                            Manage Appointments
                        </button>
                    </div>
                </div>
                <section class="container mx-auto px-6 p-10 font-Protest">
                    <h2 class="text-4xl font-bold text-center font-serif text-[#12365a] mb-8">
                        Diseases And Vaccines That Prevent Them
                    </h2>

                    <div class="flex items-center flex-wrap mb-10 font-sans justify-evenly border-2 border-green-500/20 rounded-md shadow-2xl shadow-green-500/20 p-5">
                        <div class="w-full md:w-1/2 pr-10">
                            <h4 class="text-3xl text-gray-800 font-bold my-3">
                                Chickenpox (Varivax)
                            </h4>
                            <p class="text-gray-600 mb-8">
                                Two doses of the chickenpox shot are recommended for children
                                by doctors as the best way to protect against chickenpox
                                (varicella). Older children or adolescents should also get two
                                doses of the chickenpox vaccine if they have never had
                                chickenpox or were never vaccinated. They should also get a
                                second shot if they have had only one chickenpox shot.
                            </p>

                            <div class=" flex gap-4">
                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          1st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                12-15 Months
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          2st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                4-6 Years
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 flex align-middle justify-center">
                            <img
                                class="rounded-lg"
                                src="https://www.cdc.gov/vaccines/parents/images/disease_banners_chickenbox_960_144.png?_=59772"
                                alt="Vortex"
                            />
                        </div>
                    </div>

                    <div class="flex items-center flex-wrap mb-10 font-sans justify-evenly border-2 border-yellow-500/20 rounded-md shadow-2xl shadow-yellow-500/20 p-5">
                        <div class="w-full md:w-1/2 flex align-middle justify-center">
                            <img
                                class="rounded-lg"
                                src="https://www.cdc.gov/vaccines/parents/images/disease_banners_Polio_960_144.png?_=59764"
                                alt="Vortex"
                            />
                        </div>
                        <div class="w-full md:w-1/2 pl-10">
                            <h4 class="text-3xl text-gray-800 font-bold mb-3">
                                Polio (IPV)
                            </h4>
                            <p class="text-gray-600 mb-8">
                                Four doses of the polio shot for children are recommended by
                                doctors as the best way to protect against polio. Polio, or
                                poliomyelitis, is a disabling and life-threatening disease
                                caused by the poliovirus. The virus can infect a person’s
                                spinal cord, causing paralysis (can’t move parts of the body).
                            </p>

                            <div class=" flex gap-4">
                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          1st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                2 Months
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          2st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                4 Months
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          3st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                6-18 Months
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          4st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                4-6 Years
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center flex-wrap mb-10 font-sans justify-evenly border-2 border-red-500/20 rounded-md shadow-2xl shadow-red-500/20 p-5">
                        <div class="w-full md:w-1/2 pr-10">
                            <h4 class="text-3xl text-gray-800 font-bold mb-3">
                                Hepatitis A (HepA)
                            </h4>
                            <p class="text-gray-600 mb-8">
                                Two doses of the hepatitis A vaccine are recommended for
                                children by doctors as the best way to protect against
                                hepatitis A. Hepatitis A is a serious liver disease caused by
                                the hepatitis A virus. Children with the virus often don’t
                                have symptoms, but they often pass the disease to others,
                                including their unvaccinated parents or caregivers. These
                                individuals can get very sick.
                            </p>

                            <div class=" flex gap-4">
                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          1st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                12-23 Months
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          2st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                3-4 Years
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 flex align-middle justify-center">
                            <img
                                class="rounded-lg"
                                src="https://www.cdc.gov/vaccines/parents/images/disease_banners_HepA_960_144.png?_=59776"
                                alt="Vortex"
                            />
                        </div>
                    </div>

                    <div class="flex items-center flex-wrap mb-10 font-sans justify-evenly border-2 border-blue-500/20 rounded-md shadow-2xl shadow-blue-500/20 p-5">
                        <div class="w-full md:w-1/2 flex align-middle justify-center">
                            <img
                                class="rounded-lg"
                                src="https://www.cdc.gov/vaccines/parents/images/disease_banners_measles_960_144.png?_=59756"
                                alt="Vortex"
                            />
                        </div>
                        <div class="w-full md:w-1/2 pl-10">
                            <h4 class="text-3xl text-gray-800 font-bold mb-3">
                                Measles (M-M-R)
                            </h4>
                            <p class="text-gray-600 mb-8">
                                Two doses of the MMR vaccine are recommended for children by
                                healthcare providers as the best way to protect against
                                measles, mumps, and rubella. The measles shot is very safe and
                                is effective at preventing measles. Vaccines, like any
                                medicine, can have side effects. These are usually mild and go
                                away on their own.
                            </p>

                            <div class=" flex gap-4">
                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          1st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                12-15 Months
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div class=" w-1/2 bg-gray-100 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                    <a href="#">
                                        <div class="px-4 py-3">
                        <span class="text-gray-400 mr-3 uppercase text-xs">
                          2st Dose
                        </span>
                                            <p class="text-lg font-bold text-black truncate block capitalize">
                                                4-6 Years
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="bg-gray-100">
                    <div class="container mx-auto px-6 py-10">
                        <h2 class="text-4xl font-bold text-center font-serif text-[#12365a] mb-8">
                            Why Vaccination?
                        </h2>

                        <div class="flex justify-between gap-10 p-2">
                            <div class="  p-1.5 mx-auto max-w-sm rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                                <div class=" bg-white rounded-xl flex flex-col justify-evenly align-middle w-full h-full">
                                    <div class="flex leading-none h-1/2 w-full border-b-2 border-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww"
                                            alt="pic"
                                            class="rounded-md shadow-2xl mt-4 transform -translate-y-10 hover:-translate-y-4 transition duration-700 object-cover"
                                        />
                                    </div>

                                    <div class="h-1/2 px-2 overflow-hidden">
                                        <div class=" flex flex-col text-center font-serif font-bold text-xl p-2">
                                            <p class="">Dr. John Doe</p>
                                        </div>
                                        <p class="text-md text-justify tracking-tighter text-gray-600 p-2 mt-10 font-sans">
                                            Vaccines save lives. Measles vaccines alone are
                                            estimated to have prevented over 21 million deaths
                                            between 2000 and 2017. Vaccines will help protect your
                                            child against diseases that can cause serious harm or
                                            death, especially in people with developing immune
                                            systems like infants. It’s important to vaccinate your
                                            child. If not, highly contagious diseases such as
                                            measles, diphtheria and polio, which were once wiped out
                                            in many countries, will come back.
                                        </p>
                                        <div class=" text-center border-2 bg-[#333333] text-[#AEFFDE] text-lg font-semibold p-4 rounded-md mt-2">
                                            <p>Paediatrician</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="  p-1.5 mx-auto max-w-sm rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                                <div class=" bg-white rounded-xl flex flex-col justify-evenly align-middle w-full h-full">
                                    <div class="flex leading-none h-1/2 w-full border-b-2 border-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxkb2N0b3J8ZW58MHx8MHx8fDA%3D"
                                            alt="pic"
                                            class="rounded-md shadow-2xl mt-4 transform -translate-y-10 hover:-translate-y-4 transition duration-700 object-cover w-full object-center"
                                        />
                                    </div>
                                    <div class="h-1/2 px-2 overflow-hidden">
                                        <div class=" flex flex-col text-center font-serif font-bold text-xl p-2">
                                            <p class="">Dr. Victoria Lee</p>
                                        </div>
                                        <p class="text-md text-justify tracking-tighter text-gray-600 p-2 mt-10 font-sans">
                                            Vaccines save lives. Measles vaccines alone are
                                            estimated to have prevented over 21 million deaths
                                            between 2000 and 2017. Vaccines will help protect your
                                            child against diseases that can cause serious harm or
                                            death, especially in people with developing immune
                                            systems like infants. It’s important to vaccinate your
                                            child. If not, highly contagious diseases such as
                                            measles, diphtheria and polio, which were once wiped out
                                            in many countries, will come back.
                                        </p>
                                        <div class=" text-center border-2 bg-[#333333] text-[#AEFFDE] text-lg font-semibold p-4 rounded-md mt-2">
                                            <p>Paediatrician</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="  p-1.5 mx-auto max-w-sm rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                                <div class=" bg-white rounded-xl flex flex-col justify-evenly align-middle w-full h-full">
                                    <div class="flex leading-none h-1/2 w-full border-b-2 border-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1622253694242-abeb37a33e97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUwfHxkb2N0b3J8ZW58MHx8MHx8fDA%3D"
                                            alt="pic"
                                            class="rounded-md shadow-2xl mt-4 transform -translate-y-10 hover:-translate-y-4 transition duration-700 object-cover w-full object-top"
                                        />
                                    </div>
                                    <div class="h-1/2 px-2 overflow-hidden">
                                        <div class=" flex flex-col text-center font-serif font-bold text-xl p-2">
                                            <p class="">Dr. Mark Will</p>
                                        </div>
                                        <p class="text-md text-justify tracking-tighter text-gray-600 p-2 mt-10 font-sans">
                                            Vaccines save lives. Measles vaccines alone are
                                            estimated to have prevented over 21 million deaths
                                            between 2000 and 2017. Vaccines will help protect your
                                            child against diseases that can cause serious harm or
                                            death, especially in people with developing immune
                                            systems like infants. It’s important to vaccinate your
                                            child. If not, highly contagious diseases such as
                                            measles, diphtheria and polio, which were once wiped out
                                            in many countries, will come back.
                                        </p>
                                        <div class=" text-center border-2 bg-[#333333] text-[#AEFFDE] text-lg font-semibold p-4 rounded-md mt-2">
                                            <p>Physician</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ "background-color": "#667eea" }}>
                    <div class="container mx-auto px-6 text-center py-20 font-Protest">
                        <h2 class="mb-5 text-4xl font-bold text-center text-white">
                            Vaccination Updates
                        </h2>

                        <h3 class="my-5 text-2xl text-white">Check Latest News</h3>
                        <a
                            href="https://www.who.int/news/item/18-07-2023-childhood-immunization-begins-recovery-after-covid-19-backslide"
                            class="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider hover:border-red hover:text-white hover:bg-red-600"
                        >
                            World Health Organization
                        </a>
                    </div>
                </section>

                <footer class="relative bg-blueGray-200 pt-8 pb-6">
                    <div class="container mx-auto px-4">
                        <div class="flex flex-wrap text-left lg:text-left">
                            <div class="w-full lg:w-6/12 px-4">
                                <h4 class="text-3xl fonat-semibold text-blueGray-700">
                                    Let's keep in touch!
                                </h4>
                                <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
                                    Find us on any of these platforms, we respond 1-2 business
                                    days.
                                </h5>
                                <div class="mt-6 lg:mb-0 mb-6 flex">
                                    <button
                                        class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 flex"
                                        type="button"
                                    >
                                        <FaTwitter />
                                    </button>
                                    <button
                                        class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 flex"
                                        type="button"
                                    >
                                        <FaLinkedin />
                                    </button>
                                    <button
                                        class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 flex"
                                        type="button"
                                    >
                                        <FaFacebook />
                                    </button>
                                    <button
                                        class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 flex"
                                        type="button"
                                    >
                                        <FaGithub/>
                                    </button>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="flex flex-wrap items-top mb-6">
                                    <div class="w-full lg:w-4/12 px-4 ml-auto">
                      <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                        Useful Links
                      </span>
                                        <ul class="list-unstyled">
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                                                >
                                                    About Us
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://blog.creative-tim.com?ref=njs-profile"
                                                >
                                                    Blog
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://www.github.com/creativetimofficial?ref=njs-profile"
                                                >
                                                    Github
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                                                >
                                                    Free Products
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="w-full lg:w-4/12 px-4">
                      <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                        Other Resources
                      </span>
                                        <ul class="list-unstyled">
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                                                >
                                                    MIT License
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://creative-tim.com/terms?ref=njs-profile"
                                                >
                                                    Terms &amp; Conditions
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://creative-tim.com/privacy?ref=njs-profile"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                    href="https://creative-tim.com/contact-us?ref=njs-profile"
                                                >
                                                    Contact Us
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-6 border-blueGray-300" />
                        <div class="flex flex-wrap items-center md:justify-between justify-center">
                            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                                <div class="text-sm text-blueGray-500 font-semibold py-1">
                                    Copyright © <span id="get-current-year">2024</span>
                                    <a
                                        class="text-blueGray-500 hover:text-gray-800"
                                        target="_blank"
                                    />{" "}
                                    Created By
                                    <a
                                        class="text-blueGray-500 hover:text-blueGray-800"
                                    >
                                        Team-2
                                    </a>
                                    .
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                </body>
            </div>
        </>
    );
}

export default HomeHospital;
