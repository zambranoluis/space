"use client";
import { useTheme } from "../context/ThemeContext";
import { Image } from "@nextui-org/image";
import Link from "next/link";

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
          <Link id="logoNavbar" className="flex bgred-200" href="/">
            <Image className="h-full max-w-[150px] min-[500px]:max-w-[250px] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
              src="https://github.com/BPM94/SCCTMD/raw/main/logoWhite.png"
              alt=""
            />
          </Link>
          <div id="profileNavbar" className="flex cursor-pointer justify-center items-center  gap-2 text-[#6b776d] h-full bgred-300">
            <IoMdArrowDropdown className="text-xl bgred-300 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" />
            <div className="flex flex-col max-[350px]:hidden justify-center items-end bggreen-300 ">
              <p className="textcenter text-xs min[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">arkweb@gmail.com</p>
              <p className="textcenter text-sm min-[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Claudia Alves</p>
              <p className="textcenter text-xs min[500px]:text-base drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Client</p>
            </div>
            <div className="flex justify-center items-center bggreen-300">
              <Avatar className="h-[60px] w-[60px] min-[350px]:w-[30px] min-[350px]:h-[30px] min-[400px]:w-[60px] min-[400px]:h-[60px]  text-large drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </div>
          </div>
        </div>
        <div id="navMid" className="flex select-none bggreen-300 py-4 px-4 bgred-200  w-full justify-center  items-center">
          <h1 className="text-[#6b776d] text-2xl font-bold drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">
            Projects
          </h1>
        </div>
        <div id="navBottom" className="flex justify-center gap-8 items-center w-full ">
          <div id="searchNavbar" className="flex gap-3 sm:gap-6 bgblue-300 w-full max-w-[500px] px-8">
            <input className="outline-none  pl-6 py-2 px-2 bg-[#6c6c6c] text-black rounded-2xl w-full" type="text" placeholder="Project search..." />
          </div>
        </div>
        
      </nav>


      <nav id="navbarLarge" className="max-[900px]:hidden flex top-0 bg-black/50 w-full z-[1500] h-[100px] bgred-300 justify-between items-center px-6  ">
        <Link id="logoNavbar" className="flex bgred-200" href="/">
          <Image className="h-full w-full max-w-[250px] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
            width={200}
            height={70}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
            alt=""
          />
        </Link>
        <div id="titleNavbar" className="flex select-none bggreen-300">
          <h1 className="text-[#6b776d] text-2xl font-bold drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">Projects</h1>
        </div>
        <div id="searchNavbar" className="flex gap-3 sm:gap-6 bgblue-300  max-w-[350px] lg:w-full">
          <input className="outline-none  pl-6 py-2 px-2 bg-[#6c6c6c] text-black rounded-2xl w-full" type="text" placeholder="Project search..." />
        </div>
        <div id="profileNavbar" className="flex justify-center items-center gap-2 text-[#6b776d] h-full bgred-300">
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