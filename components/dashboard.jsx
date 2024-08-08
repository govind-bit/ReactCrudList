// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import {img2_dash,img1_dash,img3_dash,news_img,img4_dash} from "../assets/img";
// import CountUp from "react-countup";
// import "./dashboard.css"

// function Dashboard() {
//     const navigate = useNavigate();
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [currentNews,setCurrentNews] = useState(0);
//     const [currentAnnounce,setCurrentAnnounce] = useState(0);
//     const [currentAnnouncementContent, setCurrentAnnouncementContent] = useState(0);
//     const [currentNewsContent, setCurrentNewsContent] = useState(0);
//     const [currentNewsLink, setCurrentNewsLink] = useState(0);
//    const [isHovered, setIsHovered] = useState(false);

//     const images = [
//          'https://www.theigc.org/sites/default/files/styles/max_1640x922/public/2021/09/4968223306_a16c05a7c3_k.webp?h=a1e1a043&itok=s4oeNEEi',
//          img2_dash// "C:/Users/USMAN/Downloads/cdc-voVYCm6xoQo-unsplash (2).jpg",// img2_dash,
//     ];

//     const news = [
//         'Immunization coverage',
//         'Vaccination FAQs and when kids need each shot',

//     ];
//     const news_content = [
//         'The number of children missing out on any vaccination – so-called zero-dose children – improved from 18.1 million in 2021 to 14.3 million in...',
//         'Getting an immunization is never fun, but those few, quick seconds of discomfort are the best ways to protect your body from some truly...',
//     ];
//     const newsLink =[
//         "https://www.who.int/news-room/fact-sheets/detail/immunization-coverage",
//         "https://news.sanfordhealth.org/childrens/immunization-myths-and-timeline/",
//     ];
//     const announcements = [
//         'Announcement 1',
//         'Announcement 2',
//     ];
//     const announcements_content =[
//         "Announcement content goes here...",
//         "Announcement content goes here...",
//     ]

//     useEffect(() => {
//         const slideTimer = setInterval(() => {
//             setCurrentSlide((currentSlide + 1) % images.length);
//         }, 3000);

//         const announceTimer = setInterval(() => {
//             setCurrentAnnounce((currentAnnounce + 1) % announcements.length);
//         }, 3000);

//         const newsTimer = setInterval(() => {
//             setCurrentNews((currentNews + 1) % news.length);
//         }, 3000);
//         const newsContentTimer = setInterval(()=>{
//             setCurrentNewsContent((currentNewsContent +1)%news_content.length);
//         },3000);
//         const newsLinkTime = setInterval(()=>{
//             setCurrentNewsLink((currentNewsLink + 1)%newsLink.length);
//         },3000);
//         const announcementContentTimer = setInterval(()=>{
//             setCurrentAnnouncementContent((currentAnnouncementContent + 1) % announcements_content.length);
//         },3000);
//         return () => {
//             //clearInterval(slideTimer);
//             clearInterval(announceTimer);
//             clearInterval(newsTimer);
//             clearInterval(newsContentTimer);
//             clearInterval(newsLinkTime)
//             clearInterval(announcementContentTimer);
//         };
//     }, //[currentSlide, images.length,
//         [currentAnnounce, announcements.length, currentNews, news.length,currentNewsContent,news_content.length,currentNewsLink,newsLink.length, currentAnnouncementContent,announcements_content.length]);

//     const handleClick1 = () => {
//         navigate("/Login");
//     }


//     return (
//         <div className="flex flex-col min-h-screen bg-gray-100 font-roboto h-16">
//             <header className="fixed top-0 left-0 z-10 w-full p-4 bg-[#333333] text-white flex justify-between items-center shadow-lg ">
//                    <h1 className="font-bold text-4xl gradient-text1">
//                         VFC
//                     </h1>
//                 <button onClick={handleClick1} className="mr-4 border-2 border-Gray-500 rounded-lg px-2 py-1 transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">Log In/Sign Up</button>
//             </header>
//             <main className="flex-grow p-4 flex items-center justify-center pt-24">
//                 <div className="w-full max-w-12xl bg-white rounded-lg shadow-lg overflow-hidden mx-4 pt-12 pb-8">
//                     <div className="w-full flex flex-row items-center">
//                         <div className="w-1/2 flex flex-col justify-center items-start text-left p-4 space-y-4">
//                             <h2 className="mb-2 text-2xl text-blue-700 font-semibold leading-none font-poppins ">Stay one step ahead<br/>with timely vaccinations<br/>for your child</h2>
//                             <p className="mb-4 text-lg text-gray-500 leading-none font-poppins ">Join VFC's vaccination program today and ensure your child's health and safety.</p>
//                             <button className="mt-auto bg-blue-50 hover:bg-blue-200 text-black font-semibold py-2 px-4 rounded transform hover:-translate-y-1 motion-reduce:transform-none font-roboto">
//                                 Sign up today!
//                             </button>
//                         </div>
//                         <div className="w-1/2 h-48">
//                             <img src="https://webstockreview.net/images/disease-clipart-vaccination-9.png" alt="Child Vaccination" className="object-contain h-full w-full" />
//                             <div className="bg-gray-300 p-4 ml-20 rounded-tl-full">
//                                 <h6 className="text-black font-semibold leading-none font-roboto ml-10">Personalized appointment system that adapts to your schedule</h6>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <div className="w-full overflow-hidden text-center bg-blue-500 h-20 text-white flex items-center justify-center pb-10 pt-10">
//                 <h1 className="text-2xl font-semibold leading-none font-poppins">India's most trusted child vaccination appointment app by Parents</h1>
//             </div>

//             <main className="flex-grow p-4 flex bg-blue-100">
//                 <div className="w-1/2">
//                     <div className="mr-24 flex h-max max-w-fit">
//                     <div className="relative mr-10 overflow-hidden shadow-lg flex-grow h-full w-full">
//                         <img src={img2_dash} alt="Child Vaccination" className="rounded-lg shadow-lg w-full h-full object-scale-down " />
//                     </div>
//                     </div>
//                 </div>
//                 <div className="w-1/2 flex flex-col space-y-4 ">
//                     <div className="border p-4 overflow-auto h-48 rounded-lg shadow-lg bg-blue-300 text-black">
//                         <h3 className="font-bold mb-2 text-lg shadow-text font-poppins"><span className="flex items-center"><img src={news_img} className={"h-5 w-5 mr-2"} alt=" "/> News</span></h3>
//                         <a href={newsLink[currentNewsLink]} target={"_blank"}>
//                         <div className="p-2 m-2 bg-white rounded shadow transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
//                             <h4 className="font-bold text-lg shadow-text font-poppins">{news[currentNews]}</h4>
//                             <p className="shadow-text">{news_content[currentNewsContent]}</p>
//                         </div>
//                         </a>
//                     </div>
//                     <div className="border p-4 overflow-auto h-48 rounded-lg shadow-lg bg-blue-300 text-black">
//                         <h3 className="font-bold mb-2 text-lg shadow-text font-poppins">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 inline-block align-middle">
//                                 <path fill="#000000" d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V300.4c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4V32zm-64 76.7V240 371.3C357.2 317.8 280.5 288 200.7 288H192V192h8.7c79.8 0 156.5-29.8 215.3-83.3z"/>
//                             </svg>
//                             <span className="align-middle">  Announcements</span>
//                         </h3>

//                         <div className="p-2 m-2 bg-white rounded shadow transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105">
//                             <h4 className="font-bold text-lg shadow-text font-poppins">{announcements[currentAnnounce]}</h4>
//                             <p className="shadow-text">{announcements_content[currentAnnouncementContent]}</p>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <main className="flex-grow p-4 flex items-center justify-center pt-6 bg-zinc-100">
//                 <div className="w-full max-w-12xl bg-white rounded-lg shadow-lg overflow-hidden mx-4 pt-12 pb-8">
//                     <div className="w-full flex flex-row items-center">
//                         <div className="w-1/2 flex flex-col justify-center items-start text-left p-4 space-y-4">
//                             <h2 className="mb-2 text-2xl text-blue-700 font-semibold leading-none font-poppins ">Timeliness in immunisations for children for BCG Vaccine</h2>
//                             <div className="text-lg text-gray-700 leading-none font-poppins">
//                                 <p className= "mb-4">We study how quickly children under five get their vaccines using NFHS-4 (2015-16) data. We map out the timing of BCG and DPT-3/Pentavalent-3 vaccines across districts, showing the geographic distribution of vaccine timing.</p>
//                                 <p className= "mb-4">The chart shows the percentage of infants who got their vaccine on schedule. A vaccine is considered on time if given within a week of its due date. This information is crucial for understanding and improving vaccination programs.</p>
//                             </div>
//                             <button
//                                 className="mt-auto bg-blue-50 hover:bg-blue-200 text-black font-semibold py-2 px-4 rounded transform hover:-translate-y-1 motion-reduce:transform-none font-roboto"
//                                 onClick={() => window.location.href="https://www.theigc.org/blogs/timeliness-and-coverage-child-vaccinations-across-india#:~:text=2013%2C%20Mathew%202012).-,Timeliness%20in%20immunisations%20for%20children,-We%20use%20NFHS"}>
//                                 Learn More
//                             </button>
//                         </div>
//                         <div className="w-1/2 h-64">
//                             <img src={img1_dash} alt="Image of BCg data" className="object-contain h-full w-full" />
//                             <figure className="text-center text-gray-500 mt-2">Figure: District-wise timely administration of BCG vaccine</figure>
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             <main className="flex-grow p-4 flex items-center justify-center pt-4">
//                 <div className="w-full max-w-12xl bg-blue-100 rounded-lg shadow-lg overflow-hidden mx-4 pt-12 pb-8">
//                     <div className="w-full flex flex-row items-center">
//                         <div className="w-1/2 h-64">
//                             <img src={img3_dash} alt="Table Image" className="object-contain h-full w-full" />
//                             <figure className="text-center text-gray-700 mt-2">Figure: NFHS-3 and NFHS-4 Vaccination Data</figure>
//                         </div>
//                         <div className="w-1/2 flex flex-col justify-center items-start text-left p-4 space-y-4">
//                             <h2 className="mb-2 text-2xl text-black font-semibold leading-none font-poppins">Vaccine coverage and timeliness</h2>
//                             <p className="mb-4 text-lg text-gray-700 leading-none font-poppins">
//                                 As expected, the figures show that BCG, administered at birth, is more often delivered on time than DPT-3, which is to be administered 14 weeks after birth. Besides, there is substantial geographic variation in the timeliness of the delivery of these vaccines, with some districts in Bihar, Madhya Pradesh, Maharashtra, Uttar Pradesh, and parts of Northeast India underperforming.
//                             </p>
//                             <p className="mb-4 text-lg text-gray-700 leading-none font-poppins">
//                                 To understand the change over time in immunisation of children below five years of age in India, we report coverage and timeliness in administering several vaccines from two subsequent rounds of the NFHS (NFHS-3 (2005-2006) and NFHS-4 (2015-2016)) in the table.
//                             </p>
//                             <button className="mt-auto bg-blue-50 hover:bg-white text-black font-semibold py-2 px-4 rounded transform hover:-translate-y-1 motion-reduce:transform-none font-roboto"
//                             onClick={()=>window.location.href="https://www.theigc.org/blogs/timeliness-and-coverage-child-vaccinations-across-india#:~:text=Table%202.-,Vaccine%20coverage%20and%20timeliness,-Source%3A%20NFHS%2D3"}
//                             >
//                                 Learn More
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <main className="flex-grow p-4 flex items-center justify-center pt-6 bg-zinc-100 ">
//                 <div className="w-full max-w-12xl bg-white rounded-lg shadow-lg overflow-hidden mx-4 pt-12 pb-8">
//                     <div className="w-full flex flex-row items-center">
//                         <div className="w-1/2 flex flex-col justify-center items-start text-left p-4 space-y-4">
//                             <h2 className="mb-2 text-2xl text-blue-700 font-semibold leading-none font-poppins ">Timeliness in immunisations for children for DPT-3 vaccine</h2>
//                             <div className="text-lg text-gray-700 leading-none font-poppins">
//                                 <p className="mb-4">The chart provides a district-wise breakdown of the timely administration of DPT-3/Pentavalent vaccines for infants under five years of age. Timely administration is crucial as it ensures the effectiveness of the vaccine and reduces the risk of the child contracting the diseases these vaccines are designed to prevent.</p>
//                                 <p className="mb-4">The variation in the timeliness of vaccine administration across districts can be attributed to several factors. These include the availability of healthcare facilities, awareness levels about the importance of timely vaccination, and logistical challenges in certain areas. It's important to address these disparities to ensure that every child, regardless of where they live, has access to timely vaccination. This is a key step towards improving overall child health outcomes in the country.</p>
//                             </div>
//                             <button
//                                 className="mt-auto bg-blue-50 hover:bg-blue-200 text-black font-semibold py-2 px-4 rounded transform hover:-translate-y-1 motion-reduce:transform-none font-roboto"
//                                 onClick={() => window.location.href="https://www.theigc.org/blogs/timeliness-and-coverage-child-vaccinations-across-india#:~:text=District%2Dwise%20timely%20administration%20of%20DPT%2D3/Pentavalent%20vaccines"}>
//                                 Learn More
//                             </button>
//                         </div>
//                         <div className="w-1/2 h-64">
//                             <img src={img4_dash} alt="Image of BCg data" className="object-contain h-full w-full" />
//                             <figure className="text-center text-gray-500 mt-2">Figure: District-wise timely administration of DPT-3/Pentavalent vaccine</figure>
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             <footer className="p-4 bg-[#333333] text-white flex justify-between">
//                 <div>
//                 <p className="shadow-text">Contact Information: childvaccinationsupport@gmail.com</p>
//                 <p className="shadow-text">Copyright © 2024 VFC-Child Vaccination All Rights Reserved</p>
//                 </div>
//                 <div>
//                     <p className="shadow-text">Website Visitors: <CountUp end={5000} duration={5} /></p>
//                     <p className="shadow-text">Registered Users: <CountUp end={1000} duration={5} /></p>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default Dashboard;
