"use client";

import Link from "next/link";

import { ThemeProvider } from "@/context/ThemeContext";

import { RiArrowGoBackFill } from "react-icons/ri";

import { useRouter } from "next/router";


export default function NotFound() {

  setTimeout(() => {
    window.location.href = "/";
  }, 3000);


  return (
    <ThemeProvider>
      <div className='relative flex h-screen w-screen items-center justify-center  bg-[--color-background] text-[--color-text]'>
      <div className='w-full h-full   absolute z-10'>
        <video autoPlay loop muted className='w-full h-full object-cover'>
          <source src='https://github.com/BPM94/SCCTMD/raw/main/opt/spaceNotFound.webm' type='video/webm' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='z-[20] w-[90%] lg:w-[50%] flex flex-col text-white   text-center p-8   rounded-md backdrop-blur-md '>
        <div className='flex flex-col gap-4 '>
          <h1 className='text-3xl font-bold drop-shadow-md  '>404 - Page Not Found</h1>
          <p className='text-base  drop-shadow-md '>
            The Page you are looking for does not exist or has been moved. Please check
            the URL and try again.
          </p>
          <p className='text-base  drop-shadow-md '>
            Click down below if you are not redirected to Home automatically
            in 3 seconds
          </p>
          <Link
            className='flex place-self-center justify-center items-center px-4 py-2  text-center  text-4xl text-[#ca0000]  cursor-pointer gap-2 '
            href='/'>
            <RiArrowGoBackFill className='font-black place-self-center ' />
            <p className='   '>Go Back to Home</p>
          </Link>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
