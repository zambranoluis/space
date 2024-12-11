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
      name: "The Process",
      path: "/the-process",
    },
    {
      id: 2,
      name: "Pricing",
      path: "/pricing",
    }
    ,
    {
      id: 3,
      name: "FAQ's",
      path: "/faqs",
    },
    {
      id: 4,
      name: "Reviews",
      path: "/reviews",
    },
    {
      id: 5,
      name: "Login",
      path: "/login",
    }
  ];


  const { theme, toggleTheme } = useTheme();
  const currentPath = window.location.pathname.toLowerCase();
  const currentPathProducts = (window.location.pathname.toLowerCase().includes("products")) ? true : false;


  
  return (

    <>


      <nav id="navbar" className={` absolute max-md:flex-col  z-[100] h-[130px] md:h-[100px] bggreen-200 flex   max-lg:w-full  maxlg:bg-white ${(currentPathProducts) ? "md:w-full md:px-16 md:gap-8" : "lg:w-[45dvw]"} `}>
        <div id="logoNavbar" className={`flex bgred-200 max-md:pl-4 max-md:h-[100px]  justify-start md:justify-center  items-center  `}>
          <Image className={`max-md:w-[80%] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
            alt=""
          />
        </div>
        <div className={`flex   text-sm  bgred-300 w-full max-md:h-[30px] bggreen-600 max-md:py2  md:pl-4 lg:pl-0 ${(currentPathProducts) ? " bgred-400": ""}`}>
          <div className={` w-full flex max-md:justify-around md:justify-start md:gap-8      items-center ${(currentPathProducts) ? "text-lg ": "lg:justify-around lg:px-2"} `}>
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