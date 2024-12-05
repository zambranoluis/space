"use client";

import Link from "next/link";

import { RiArrowGoBackFill } from "react-icons/ri";


export default function NotFound() {

  setTimeout(() => {
    window.location.href = "/home";
  }, 3000);


  return (
    <div className='relative flex h-screen w-screen items-center justify-center'>
      <div className='w-full h-full bg-slate300   absolute z-10'>
        <video autoPlay loop muted className='w-full h-full object-cover'>
          <source src='/notFoundVideo.webm' type='video/webm' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='z-[20] w-[90%] lg:w-[50%] flex flex-col text-white text-center p-8   rounded-md backdrop-blur-sm bg-white/3'>
        <div className='flex flex-col bgrose-600 gap-4'>
          <h1 className='text-3xl font-bold drop-shadow-md text-slate-150  '>404 - Page Not Found</h1>
          <p className='text-base text-slate-150 drop-shadow-md '>
            The Page you are looking for does not exist or has been moved. Please check
            the URL and try again.
          </p>
          <p className='text-base text-slate-150 drop-shadow-md '>
            Click down below if you are not redirected to Home automatically
            in 3 seconds
          </p>
          <Link
            className='flex place-self-center justify-center items-center px-4 py-2  text-center  text-2xl text-[#ca0000] underline cursor-pointer gap-2 hover:text-[white] '
            href='/home'>
            <RiArrowGoBackFill className='font-black  ' />
            <p className=' text-sm  '>Go Back To Home</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
