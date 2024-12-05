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
    <nav className="flex sticky top-0 w-full z-[1500] h-[100px] bgred-300 justify-between items-center px-6 md:px-12 border-b border-[--color-border] bg-[--color-background] ">
      <div className="flex bgred-200  ">
        <Image className="w-full"
          // width={200}
          // height={70}
          src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
          alt=""
        />
      </div>
      <div className="flex select-none bggreen-300">
        <h1 className="text-[#69664c] text-2xl font-bold">Projects</h1>
      </div>
      <div className="flex gap-3 sm:gap-6 bgblue-300">
        <input className="outline-none border-2 pl-6 py-2 px-2" type="text" placeholder="Project search..." />
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <Badge className="bg-[#fe2f2f] border-0" content="" >
          <div className="w-[30px] bgred-300 h-[30px] flex justify-center items-center" >
            <FaCommentAlt className="text-xl text-[#6c6c6c]" />
          </div>
        </Badge>
        <Badge className="bg-[#fe2f2f] border-0" content="" >
          <div className="w-[30px] bgred-300 h-[30px] flex justify-center items-center" >
            <IoMdNotifications className="text-4xl text-[#6c6c6c]" />
          </div>
        </Badge>
      </div>
      <div className="flex justify-center items-center gap-2">
        <IoMdArrowDropdown className="text-2xl" />
        <div className="flex flex-col justify-center items-center">
        <p>Seras Victoria</p>
        <p>Designer</p>
        </div>
        <div>
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="h-full text-large" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;