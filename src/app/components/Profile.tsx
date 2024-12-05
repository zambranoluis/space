"use client";

import React from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";



import Link from "next/link";


import {Image} from "@nextui-org/image";


const ProfileClient = () => {


  return (
    <div className="relative w-full h-[calc(100dvh-70px)] flex justify-center items-center">
      <div id="videoContainer" className="absolute w-full h-full z-[100] flex justify-center items-center">
        <video autoPlay loop muted className="w-full max-w-[1000px] h-full  object-cover" >
          <source src="https://github.com/BPM94/TTMD/raw/main/fitclub.mp4"  type="video/mp4" />
        </video>
      </div>
      <div id="socials" className="absolute z-[150] flex  top-[20px] right-[20px] bgred-300 gap-4">
        <Link href="#" className={`  p-3 bg-[--color-background] border border-[--color-border] text-[--color-text]  rounded-xl flex`}><SlSocialFacebook className="text-2xl"/></Link>
        <Link href="https://www.instagram.com/thefitclubmcbo/" target="_blank" className={` p-3 bg-[--color-background] border border-[--color-border] text-[--color-text]  rounded-xl flex`}><SlSocialInstagram className="text-2xl"/></Link>
        <Link href="#" className={` p-3 bg-[--color-background] border border-[--color-border] text-[--color-text]  rounded-xl flex`}><SlSocialYoutube className="text-2xl"/></Link>
      </div>
      <div id="userInfo" className=" bgred-300 bottom-[20px] absolute z-[150] flex flex-col justify-center items-center  bg-[--color-background] text-[--color-text] gap-4 p-4 rounded-xl border border-[--color-border]">
        <div id="avatarContainer">
          <Image src="https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp" className="rounded-full max-w-[150px]" alt="" />
        </div>
        <div id="detailsContainer" className="flex flex-col z-[150] bottom-[20px] justify-center items-center p-4 gap-1">
          <p className="text-3xl font-bold">Seras Victoria</p>
          <p className="text-xl fontbold">zambranomnk@gmail.com</p>
          <p className="text-xl fontbold">+58 412 3456 789</p>
        </div>
        <div id="buttonsContainer" className="flex gap-2">
          <button className="bg-[--color-button] text-[--color-button-text] px-2 py-1 rounded-md hover:bg-[--color-button-hover] hover:text-[--color-button-text-hover] border border-[--color-border]">View Suscriptions</button>
          {/* <button className="bg-[--color-button] text-[--color-background] px-2 py-1 rounded-md hover:bg-[--color-button-hover]">Suscribe</button> */}
        </div>
      </div>
      
    </div>
  );
}

export default ProfileClient;