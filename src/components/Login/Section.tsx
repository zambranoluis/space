"use client"

import React from 'react'
import {Image} from "@nextui-org/image"
import Link from 'next/link'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@heroui/react";

interface LoginProps {
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  handleVerPanel: () => void;
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  togglePasswordVisibility: () => void
  showPassword: boolean
  error: string
  loadingLogin: boolean
  geolocation: string | null
  setGeolocation: React.Dispatch<React.SetStateAction<string | null>>
  getGeolocation: () => Promise<string | null>
}

const Section: React.FC<LoginProps> = ({
  handleLogin,
  handleVerPanel,
  email,
  setEmail,
  password,
  setPassword,
  togglePasswordVisibility,
  showPassword,
  error,
  loadingLogin,
  geolocation,
  setGeolocation,
  getGeolocation }) => {
  return (
    <div className='w-full h-[100dvh] flex flex-row-reverse max-md:flex-col justify-center items-center max-md:relative'>
      <div id='video' className='max-md:absolute h-full md:w-[60dvw]'>
        <video className='h-full w-full object-cover z-[1]' autoPlay loop muted>
          <source
            src='https://github.com/BPM94/SCCTMD/raw/main/login/videoLogin.mp4'
            type='video/mp4'
          />
        </video>
      </div>
      <div className='w-full md:w-[40dvw] md:bg-white h-full flex flex-col max-md:py-8 max-md:px-16 gap4 max-md:h-[500px] max-md:text-white text-[#828282] z-[2] justify-between items-center rounded-md'>
        <div className='flex flex-col md:w-full md:h-full justify-center items-center md:gap-8'>
          <Link
            id='logo'
            href='/'
            className='flex justify-center items-center px-2 rounded-lg w-full'>
            <Image
              className='w-[250px] max-md:drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,1)]'
              src='https://github.com/BPM94/SCCTMD/raw/main/logos/logoSpaceCreations.png'
              alt='Logo'
            />
          </Link>
          <div
            id='fields'
            className='md:max-w-[400px] md:w-full flex flex-col justify-center items-center '>
            <div
              id='title'
              className='w-full flex flex-col justify-center items-center'>
              <h1 className='text-4xl font-black text-center'>Login</h1>
              <h2 className='text-lg font-medium text-center'>Sign in to continue.</h2>
            </div>
            <form
              id='formLogin'
              onSubmit={handleLogin}
              className='flex flex-col justify-center items-center p-2 gap4 w-full '>
              <div className='flex flex-col p-2 rounded-md gap-2 w-full max-w-[350px] '>
                <label className='font-medium' htmlFor='email'>
                  Email:
                </label>
                <input
                  className='p-2 outline-none w-full h-[60px] bg-white text-black rounded-2xl border md:border-[#828282]'
                  id='email'
                  type='email'
                  placeholder='Email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col p-2 rounded-md gap-2 w-full max-w-[350px]'>
                <label className='font-medium' htmlFor='password'>
                  Password:
                </label>
                <div className='flex relative text-black'>
                  <input
                    className='p-2 outline-none w-full h-[60px] bg-white rounded-2xl border md:border-[#828282]'
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      className='absolute right-[15px] top-[35%] text-xl cursor-pointer'
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className='absolute right-[15px] top-[35%] text-xl cursor-pointer'
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
              <div className='mt-4 flex gap-2 flex-col justify-center items-center'>
                <button
                  type='submit'
                  className='px-12 py-2 bg-[#5ea789] text-white hover:bg-green-800 font-bold rounded-bl-2xl rounded-tr-2xl w-[220px]'
                  disabled={loadingLogin}>
                  {loadingLogin ? <div className="flex gap-2"><Spinner color="warning" size="sm"/> Logging In</div> : "Log In"}
                </button>
                <p className="text-red-600">{error && `${error}` || " "}</p>
              </div>
            </form>
          </div>
        </div>
        <div
          id='links'
          className='flex flex-col justify-center items-center h-[120px] md:bg-[#353535] w-full'>
          <Link
            href='/forgot-password'
            className='text-center font-base text-[#9b9b9b]'>
            Forgot Password?
          </Link>
          <p className='text-white'>
            Don&apos;t have an account?{" "}
            <Link href='/create-account' className='font-bold'>
              Sign Up.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section;