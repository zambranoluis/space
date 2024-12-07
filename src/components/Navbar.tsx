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

  
  return (

    <>


      <nav id="navbar" className=" absolute max-md:flex-col  z-[100] h-[140px] md:h-[100px] bggreen-200 flex w-[50dvw]  max-lg:w-full maxlg:bg-white   ">
        <div id="logoNavbar" className="flex bgred-200 p-4 justify-start lg:justify-center  lg:w-[400px]   items-center bgblue-300">
          <Image className="  w-[250px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
            src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
            alt=""
          />
        </div>
        <div className="flex  text-sm  bgred-300 w-full max-md:h-[30px] bgred-300 max-md:py2 ">
          <div className="w-full flex max-md:justify-around md:justify-start md:gap-12 md:pl-6 lg:gap-0 lg:pl-0 lg:justify-around">
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