"use client";
import { useTheme } from "../context/ThemeContext";
import { Image } from "@nextui-org/image";
// import Link from "next/link";

import { FaCommentAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


import {Badge} from "@nextui-org/badge";
import {Avatar} from "@nextui-org/avatar";



interface NavbarProps {
  toggleAside: () => void; // Una función que no recibe argumentos y no retorna nada
}

const Navbar: React.FC<NavbarProps> = ( { toggleAside } ) => {




  const { theme, toggleTheme } = useTheme();

  
  return (

    <>
      <nav id="navbarSmall" className="min-[900px]:hidden flex flex-col top-0 bg-black/50 w-full z-[1500] py-4 bgred-300 justify-between items-center  px-2 ">
        <div id="navTop" className="flex justify-between items-center w-full bggreen-300 gap-4">
          <div id="logoNavbar" className="flex bgred-200">
            <Image className="h-full max-w-[150px] min-[500px]:max-w-[250px] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
              
              src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
              alt=""
            />
          </div>
          <div id="profileNavbar" className="flex cursor-pointer justify-center items-center min-[450px]:gap-2 text-[#8e7842] h-full bgred-300">
            <IoMdArrowDropdown className="text-xl bgred-300 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
            <div className="flex flex-col justify-center items-center bggreen-300 ">
              <p className="text-center text-sm min-[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Seras Victoria</p>
              <p className="text-center text-sm min-[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Designer</p>
            </div>
            <div className="flex justify-center items-center bggreen-300">
              <Avatar className="h-[60px] w-[60px] text-large drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </div>
          </div>
        </div>
        <div id="navMid" className="flex select-none bggreen-300 py-4 px-4 bgred-200  w-full justify-between  items-center">
          <h1 className="text-[#69664c] text-2xl font-bold drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Projects</h1>
          <div id="notificationsNavbar" className="flex justify-center items-center gap-4  bgred-300">
          <div className="bgred-300 cursor-pointer">
            <Badge className="bg-[#fe2f2f] border-0 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" content="" >
              <div className="w-[30px] bgred-300 h-[30px] flex justify-center items-center" >
                <FaCommentAlt className="text-xl text-[#6c6c6c] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
              </div>
            </Badge>
          </div>
          <div className="bgred-300 cursor-pointer">
            <Badge className="bg-[#fe2f2f] border-0 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" content="" >
              <div className="w-[30px] bgred-300 h-[30px] flex justify-center items-center" >
                <IoMdNotifications className="text-4xl text-[#6c6c6c] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
              </div>
            </Badge>
          </div>
        </div>
        </div>
        <div id="navBottom" className="flex justify-center gap-8 items-center w-full ">
          <div id="searchNavbar" className="flex gap-3 sm:gap-6 bgblue-300 w-full max-w-[500px] px-8">
            <input className="outline-none  pl-6 py-2 px-2 bg-[#6c6c6c] text-black rounded-2xl w-full" type="text" placeholder="Project search..." />
          </div>
        </div>
        
      </nav>


      <nav id="navbarLarge" className="max-[900px]:hidden flex top-0 bg-black/15 w-full z-[1500] h-[100px] bgred-300 justify-between items-center px-6  ">
        <div id="logoNavbar" className="flex bgred-200">
          <Image className="h-full w-full max-w-[250px] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
            width={200}
            height={70}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
            alt=""
          />
        </div>
        <div id="titleNavbar" className="flex select-none bggreen-300">
          <h1 className="text-[#69664c] text-2xl font-bold drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Projects</h1>
        </div>
        <div id="searchNavbar" className="flex gap-3 sm:gap-6 bgblue-300  max-w-[350px] lg:w-full">
          <input className="outline-none  pl-6 py-2 px-2 bg-[#6c6c6c] text-black rounded-2xl w-full" type="text" placeholder="Project search..." />
        </div>
        <div id="notificationsNavbar" className="flex justify-center items-center gap-4  bgred-300">
          <div className="bgred-300 cursor-pointer">
            <Badge className="bg-[#fe2f2f] border-0 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" content="" >
              <div className="w-[30px] bgred-300 h-[30px] flex justify-center items-center" >
                <FaCommentAlt className="text-xl text-[#6c6c6c] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
              </div>
            </Badge>
          </div>
          <div className="bgred-300 cursor-pointer">
            <Badge className="bg-[#fe2f2f] border-0 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" content="" >
              <div className="w-[30px] bgred-300 h-[30px] flex justify-center items-center" >
                <IoMdNotifications className="text-4xl text-[#6c6c6c] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
              </div>
            </Badge>
          </div>
        </div>
        <div id="profileNavbar" className="flex justify-center items-center gap-2 text-[#8e7842] h-full bgred-300">
          <IoMdArrowDropdown className="text-2xl drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
          <div className="flex flex-col justify-center items-center ">
            <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Seras Victoria</p>
            <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Designer</p>
          </div>
          <div>
            <Avatar className="h-[70px] w-[70px] text-large drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;