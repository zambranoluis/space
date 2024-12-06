'use client';

import { ThemeProvider } from "@/context/ThemeContext";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Home() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    router.push('/home'); 
  };

  return (
    <ThemeProvider>
      <section className="w-full h-full bg-white text-[--color-text] flex flex-row-reverse max-md:flex-col justify-center items-center max-md:relative">
      <div className="max-md:absolute h-full">
        <video className="  h-full w-full object-cover   z-[1]"
          autoPlay
          loop
          muted
        >
          <source src="https://github.com/BPM94/SCCTMD/raw/main/videoLogin.mp4" type="video/webm" />
        </video>
      </div>
      <div className="w-full max-w-[400px] bg-white h-full flex flex-col py-8 px-16 gap4 max-md:h-[500px]  z-[2] justify-center items-center rounded-md">
        <div className=" flex justify-center items-center  px-2 rounded-lg bgred-200 w-full">
          <Image className="w-[250px] drop-shadow[0_1.8px_1.8px_rgba(0,0,0,0.8)]  "
            width={786}
            height={318}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
            alt=""
          />
        </div>
        <div className="max-w-[400px]  bgred-300 flex justify-center items-center mt-6">
          <form className=" flex flex-col justify-center items-center p-2 gap4 text-white md:text-white w-full">
            <div className="w-full  bggreen-300 flex justify-center items-center ">
              <h1 className="text-lg font-black text-white text-center drop-shadow-[0_0px_0px_rgba(255,255,255,1)]">Sign in to continue.</h1>
            </div>
            <div className="mt-4 flex flex-col p-2 rounded-md gap-2 w-full max-w-[350px] ">
              <label
                className="font-medium  "
                htmlFor="email"
                
              >Email:</label>
              <input
                className="p-2 outline-none w-full  text-black bg-white rounded-2xl border md:border-black "
                id="email"
                type="text"
                placeholder="Email"
                required
                
              />
            </div>
            <div className="flex flex-col p-2 rounded-md gap-2 w-full max-w-[350px]">
              <label
                className="font-medium  "
                htmlFor="password"
              >Password:</label>
              <div className="flex relative ">
                <input 
                  className="p-2 outline-none w-full  text-black bg-white  rounded-2xl border md:border-black" 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                {showPassword ? (
                  <FaEye
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer text-black'
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEyeSlash
                    className='absolute right-[15px] top-[25%] text-xl cursor-pointer text-black'
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <button className="px-12 py-2 bg-[#5ea789] text-white hover:bg-green-800 font-bold rounded-bl-2xl rounded-tr-2xl" onClick={() => {handleLogin()}}>
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </ThemeProvider>
  );
}
