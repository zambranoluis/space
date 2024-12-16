'use client';

import { ThemeProvider } from "@/context/ThemeContext";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Home() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    router.push('/shopping-cart'); 
  };
  const handleVerPanel = () => {
    router.push('/panel'); 
  };


  return (
    <ThemeProvider>
      <section className="w-full h-[100dvh]   flex flex-row-reverse max-md:flex-col justify-center items-center max-md:relative">
      <div id="video" className="max-md:absolute h-full md:w-[60dvw]">
        <video className=" h-full w-full  object-cover   z-[1]"
          autoPlay
          loop
          muted
        >
          <source src="https://github.com/BPM94/SCCTMD/raw/main/videoLogin.mp4" type="video/webm" />
        </video>
      </div>
      <div className="w-full md:w-[40dvw] md:bg-white h-full flex flex-col max-md:py-8 max-md:px-16 gap4 max-md:h-[500px] max-md:text-white text-[#828282] z-[2] justify-between items-center rounded-md">
        <div className="flex flex-col bgred-300 md:w-full md:h-full justify-center items-center md:gap-8">
          <Link id="logo" className=" flex justify-center items-center  px-2 rounded-lg bgred-200 w-full" href="/">
            <Image className="w-[250px] max-md:drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,1)]  "
              width={786}
              height={318}
              src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
              alt=""
            />
          </Link>
          <div id="fields" className="md:max-w-[400px]  md:w-full  bggreen-300 flex flex-col justify-center items-center  ">
            <div id="title" className="w-full  bggreen-300 flex flex-col justify-center items-center ">
              <h1 className="text-4xl font-black  text-center max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">Login</h1>
              <h2 className="text-lg font-medium  text-center max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">Sign in to continue.</h2>
            </div>
            <form id="formLogin" className=" flex flex-col justify-center items-center p-2 gap4   w-full">
              
              <div className=" flex flex-col p-2 rounded-md gap-2 w-full max-w-[350px] ">
                <label
                  className="font-medium  max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                  htmlFor="email"
                >Email:</label>
                <input
                  className="p-2 outline-none w-full h-[60px]   bg-white text-black rounded-2xl border md:border-[#828282] max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                  id="email"
                  type="text"
                  placeholder="Email..."
                  required
                />
              </div>
              <div className="flex flex-col p-2 rounded-md gap-2 w-full max-w-[350px]">
                <label
                  className="font-medium max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] "
                  htmlFor="password"
                >Password:</label>
                <div className="flex relative text-black">
                  <input 
                    className="p-2 outline-none  w-full h-[60px]   bg-white   rounded-2xl border md:border-[#828282] max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]" 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Password..."
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      className='absolute right-[15px] top-[35%] text-xl cursor-pointer '
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className='absolute right-[15px] top-[35%] text-xl cursor-pointer '
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2 flex-col justify-center items-center">
                <button className="px-12 py-2 bg-[#5ea789] text-white hover:bg-green-800 font-bold rounded-bl-2xl rounded-tr-2xl max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]" onClick={() => {handleLogin()}}>
                  Log In
                </button>
                <button className="px-12 py-2 bg-[#5ea789] text-white hover:bg-green-800 font-bold rounded-bl-2xl rounded-tr-2xl max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]" onClick={() => {handleVerPanel()}}>
                  Ver Panel
                </button>
              </div> 
            </form>
          </div>
        </div>
        <div id="links" className="flex flex-col justify-center items-center h-[120px] md:bg-[#353535] w-full">
          <Link className=" text-center font-base text-[#9b9b9b] md:text-[#ababab] max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]" href="/forgot-password">Forgot Password?</Link>
          <p className=" text-white max-md:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">Don&apos;t have an account? <Link className="text-[#] text-center font-bold" href="/register">Sign Up.</Link></p>
        </div>
      </div>
    </section>
    </ThemeProvider>
  );
}

