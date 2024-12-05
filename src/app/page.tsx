'use client';

import { ThemeProvider } from "@/context/ThemeContext";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import Image from "next/image";

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
      <section className="w-full h-full bg-[--color-background] text-[--color-text] flex flex-col justify-center items-center relative">
      <video className="w-full h-full object-cover absolute z-[1]"
        autoPlay
        loop
        muted
      >
        
        <source src="https://github.com/BPM94/TTMD/raw/main/videoLogin.mp4" type="video/webm" />
      </video>
      <div className="w[60%] maxw-[350px] flex flex-col py-8 px-16 gap-4 h[500px] bg-[--color-background]/1 backdrop-blurmd z-[2] justify-center items-center rounded-md">
        <div className=" flex justify-center items-center">
        </div>
        <div className="w-full  bgred-300 flex justify-center items-center ">
          <form className=" flex flex-col p-2 gap-4 ">
            <div className="flex flex-col p-2 rounded-md gap-2 ">
              <label
                className="font-bold text-white"
                htmlFor="email"
                
              >Email:</label>
              <input
                className="p-2 rounded-md "
                id="email"
                type="text"
                placeholder="Email"
                required
                
              />
            </div>
            <div className="flex flex-col p-2 rounded-md gap-2 ">
              <label
                className="font-bold text-white"
                htmlFor="password"
              >Password:</label>
              <div className="flex relative ">
                <input 
                  className="p-2  rounded-md" 
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
            <div className="flex justify-center items-center">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-800 font-bold rounded-md" onClick={() => {handleLogin()}}>
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
