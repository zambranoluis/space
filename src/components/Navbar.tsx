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


      <nav id="navbarLarge" className=" flex ">
        <div id="logoNavbar" className="flex justify-center items-center ">
          <Image className="h-full w-full max-w-[250px] drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
            width={200}
            height={70}
            src="https://github.com/BPM94/SCCTMD/raw/main/logoSpaceCreations.png"
            alt=""
          />
        </div>
        <div className="flex">
          {
            navOptionsGeneral.map((option) => (
              <div className="flex justify-center items-center" key={option.id}>
                <Link className="text-white" href={option.path}>{option.name}</Link>   
              </div>
            ))
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;