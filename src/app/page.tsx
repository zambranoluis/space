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
      <section className="w-full h-full  text-[--color-text] flex max-lg:flex-col justify-center items-center max-lg:relative">
      <video className="max-lg:w-full w-[60%] h-full object-cover background-center max-lg:absolute z-[1]"
        autoPlay
        loop
        muted
      >
        
        <source src="https://github.com/BPM94/SCCTMD/raw/main/videoLogin.mp4" type="video/webm" />
      </video>
      <div className="w-full h-full flex flex-col py-8 px-16 gap-4 h[500px] max-lg:bg-[white]/0 bg-[white] backdrop-blurmd z-[2] justify-center items-center rounded-md">
        <div className=" flex justify-center items-center">
          <Image className="w-[250px] drop-shadowanimate"
            width={786}
            height={318}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
            alt=""
          />
        </div>
        <div className="w-full  bgred-300 flex justify-center items-center ">
          <form className=" flex flex-col p-2 gap-4 ">
            <div>
              <h1 className="text-4xl font-black text-black text-center">Log In</h1>
            </div>
            <div className="flex flex-col p-2 rounded-md gap-2 ">
              <label
                className="font-light text-black "
                htmlFor="email"
                
              >Email:</label>
              <input
                className="p-2 outline-none rounded-md "
                id="email"
                type="text"
                placeholder="Email"
                required
                
              />
            </div>
            <div className="flex flex-col p-2 rounded-md gap-2 ">
              <label
                className="font-light text-black "
                htmlFor="password"
              >Password:</label>
              <div className="flex relative ">
                <input 
                  className="p-2 outline-none  rounded-md" 
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
              <button className="px-12 py-2 bg-green-600 hover:bg-green-800 font-bold rounded-bl-2xl rounded-tr-2xl" onClick={() => {handleLogin()}}>
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
