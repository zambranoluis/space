"use client";

import { useState, useEffect, use } from "react";
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

const handleScrollToSection = (sectionId: string) => {
  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth", // Hace que el scroll sea suave
      block: "start", // Alinea el elemento al inicio de la pantalla
    });
  }
};
const Navbar: React.FC<NavbarProps> = ( { toggleAside } ) => {


  const navOptionsGeneral = [
    {
      id: 1,
      name: "The Process",
      path: "/the-process",
      onClick: () => handleScrollToSection("steps"),
    },
    {
      id: 2,
      name: "Pricing",
      path: "/pricing",
      onClick: () => handleScrollToSection("packages"),
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

    const [currentPath, setCurrentPath] = useState("");
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true); // Marcar como montado en el cliente
  
      if (!isMounted) return;
  
      setCurrentPath(window.location.pathname.toLowerCase())
  
  
    }, [isMounted]);


  const { theme, toggleTheme } = useTheme();

  const currentPathHome = (currentPath.includes("/")? true : false);
  const currentPathProducts = (currentPath.includes("/shopping-cart")? true : false);
  const currentPathFaqs = (currentPath.includes("/faqs")? true : false);
  const currentPathReviews = (currentPath.includes("/reviews")? true : false);
  

  
  return (

    <>


      <nav id="navbar" className={`  max-md:flex-col  z-[100] h-[130px] md:h-[100px] bggreen-200 flex   max-lg:w-full  maxlg:bg-white bggreen-300 ${(currentPathProducts || currentPathFaqs || currentPathReviews) ? "md:w-full md:px-16 md:gap-8 sticky top-0 bg-white" : "lg:w-[45dvw] absolute"} `}>
        <Link id="logoNavbar" className={`flex bgred-200 max-md:pl-4 max-md:h-[100px]  justify-start md:justify-center  items-center  `} href="/">
          <Image className={`max-md:w-[80%] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
            alt=""
          />
        </Link>
        <div className={`flex   text-sm  bgred-300 w-full max-md:h-[30px] bggreen-600 max-md:py2  md:pl-4 lg:pl-0 ${(currentPathProducts || currentPathFaqs || currentPathReviews) ? " bgred-400": ""}`}>
          <div className={` w-full flex max-md:justify-around md:justify-start md:gap-8      items-center ${(currentPathProducts || currentPathFaqs || currentPathReviews) ? "text-lg ": "lg:justify-around lg:px-2 "} `}>
            {
              navOptionsGeneral.map((option) => (
                ((option.name.toLowerCase().includes("process")) || (option.name.toLowerCase().includes("pricing"))) 
                ? <button className={`${( currentPathProducts || currentPathFaqs || currentPathReviews) ? "hidden" : ""} flex justify-center items-center text-[#6b776d] whitespace-nowrap text-xs`} key={option.id} onClick={option.onClick} >
                  {option.name}
                </button>
                : <div className="flex justify-center items-center text-[#6b776d] " key={option.id}>
                <Link className=" whitespace-nowrap text-xs" href={option.path} >{option.name}</Link>   
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