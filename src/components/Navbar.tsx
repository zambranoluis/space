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

  const navOptionsGeneral = [
    {
      id: 1,
      name: "Home",
      path: "/home",
    },
    {
      id: 2,
      name: "The Process",
      path: "/the-process",
    }
    ,
    {
      id: 3,
      name: "FAQ's",
      path: "/faqs",
    },
    {
      id: 4,
      name: "Pricing",
      path: "/pricing",
    },
    {
      id: 5,
      name: "Reviews",
      path: "/reviews",
    }
  ];


  const { theme, toggleTheme } = useTheme();

  
  return (

    <>


      <nav id="navbar" className=" absolute max-lg:flex-col  z-[100] h-[180px] lg:h-[100px] flex w-[55dvw] bgred-300 max-lg:w-full maxlg:bg-white lg:gap-8  ">
        <div id="logoNavbar" className="flex justify-start  w-full   items-center bgblue-300">
          <Image className=" p-4 w-[300px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
            src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
            alt=""
          />
        </div>
        <div className="flex bggreen-300 text-sm gap-6 px-2 bggreen-300 w-full max-lg:h-full ">
          <div className="w-full flex justify-around">
            {
              navOptionsGeneral.map((option) => (
                <div className="flex justify-center items-center text-[#6b776d] " key={option.id}>
                  <Link className=" whitespace-nowrap" href={option.path}>{option.name}</Link>   
                </div>
              ))
            }
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;