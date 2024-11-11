"use client"

import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from "react";
import SignUp from "./signup/page";


import Link from "next/link";

export default function Home() {

 

  const [showSignUp, setShowSignUp] = useState(false);

  const handleClose = () => {
    
    setShowSignUp(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  return (

    <main className="">
      
    <div>
      <nav className=" flex-col md:flex-row flex justify-between p-3 items-center border-b-2">
        <div>
          <img src="https://www.skillcapital.ai/images/logo.png" alt="logo" className="h-14 mx-auto md:ml-12"/>
        </div>
        <div className="gap-x-4 mt-5 md:mt-0 w-full md:w-1/4 flex justify-center md:justify-end">
          <Link href={'/login'}><button className="w-20 md:w-28 p-1 md:p-2 rounded  border-2 hover:bg-[#E4244B] hover:text-white">Login</button></Link>
          <button className="w-20 md:w-28 p-1 md:p-2 rounded border-2 bg-[#E4244B] text-white hover:bg-white hover:text-[#E4244B] hover:border-[#E4244B]" onClick={e => setShowSignUp(true)}>SignUp</button>

        </div>
      </nav>
      <section>
        <div className="home w-full h-[88vh]">
          <div className="caption w-4/5 h-full mx-auto">
            <h1 className="text-2xl md:text-4xl font-semibold text-center pt-14">India's #1 Training Institute</h1>
            <h1 className="text-5xl md:text-8xl text-center font-bold pt-5">Get <span className="text-green-500">Skilled</span> to <span className="text-red-400">Reach</span> <br /> Your <span>Goal</span></h1>
            <h1 className="text-md md:text-xl pt-5 text-center ">Skill Capital is a Classroom & Online Learning Platform that helps students <br/>
            gain the skills they need to reach their goals</h1>
            <div className="flex w-[90%] md:w-2/5 mx-auto mt-5 justify-between gap-x-2 md:gap-x-4">
              <button className="w-52 md:w-60 p-1 md:p-2 text-sm md:text-md rounded border-2 text-white font-semibold bg-[#E4244B] hover:text-[#E4244B] hover:bg-white hover:border-[#E4244B] " onClick={e => setShowSignUp(true)}><span><FontAwesomeIcon icon={faUser} /></span> Talk To Skill Advisor</button>
              <button className="w-52  md:w-60 p-0 md:p-2 text-sm md:text-md rounded border-2 border-[#E4244B] font-semibold hover:bg-[#E4244B] text-[#E4244B] hover:text-white  " onClick={e => setShowSignUp(true)}><FontAwesomeIcon icon={faEarthAsia} /> Book Your Free Demo</button>
            </div>
          </div>
        </div>
      </section>
      {
          showSignUp && <SignUp handleClose={handleClose} setShowSignUp={setShowSignUp} />
      }
      </div>
    </main>

  );
}
