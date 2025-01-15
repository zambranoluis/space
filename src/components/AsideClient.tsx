'use client';

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Importar desde "next/navigation" en apps con appDir
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

import { FaPersonCircleQuestion } from "react-icons/fa6";

import { PiPowerFill } from "react-icons/pi";


import { FaClipboardList } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { TiArrowSortedDown } from "react-icons/ti";


interface AsideProps {
  toggleAside: () => void;
  isAsideOpen: boolean;
}

interface Option {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const asideOptions: Option[] = [
  { name: "My Profile", path: "/my-profile", icon: < FaClipboardList className="text-xl" /> },
  { name: "Projects", path: "/projects", icon: <FaFolder className="text-xl" /> },
  { name: "Cart", path: "/shopping-cart", icon: <FaRegCalendarDays className="text-xl" /> },  
];

const Aside: React.FunctionComponent<AsideProps> = ({ toggleAside, isAsideOpen }) => {
  const [asideSelectedOption, setAsideSelectedOption] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <aside
      className={` ${isAsideOpen ? "w-[200px]" : "w-[110px]"} transition-all duration-300 select-none noScrollBar  bg-black/50  z-[2000]  overflow-auto    flex   rounded-r-3xl justify-around py-6 text-white  text[#6b776d] 2`}
    >
      <div id="asideOptions" className="flex flex-col   w-full  bgrose-300 ">
        {asideOptions.map((option) => (
          <Link className={` flex  hover:bg-white/20 w-full px-3 pt-3 pb-4 ${
              asideSelectedOption === option.name
                ? ""
                : ""
            } w-full items-center  cursor-pointer transition-colors duration-300 `}
            key={option.name}
            id={`link-${option.name}`}
            href={option.path}
            onClick={() => setAsideSelectedOption(option.name)}
          >
            <div className="flex justify-center items-center gap-3 px-4">
              <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200">
                {option.icon}
              </p>
              <label
                className={`${isAsideOpen ? "" : "hidden "} bgblue-300 cursor-pointer text-sm bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] text-nowrap`}
                htmlFor={`link-${option.name}`}
              >
                {option.name}
              </label>
            </div>
          </Link>
        ))}


        <Link className={` flex  hover:bg-white/20 w-full px-3 pt-3 pb-4 ${
            asideSelectedOption === "settings"
              ? ""
              : ""
          } w-full items-center  cursor-pointer transition-colors duration-300 `}
          
          id={`link-settings`}
          href={"/settings"}
          onClick={() => setAsideSelectedOption("settings")}
        >
          <div className="flex justify-center items-center gap-3 px-4">
            <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200">
              <PiPowerFill className="text-xl" />
            </p>
            <label
              className={` ${isAsideOpen ? "" : "hidden "} bgblue-300 cursor-pointer text-sm  bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]  text-nowrap`}
              htmlFor={`link-settings`}
            >
              Log Out
            </label>
          </div>
        </Link>
      </div>
      <div className="bgred-300 flex justify-center items-center">
        <div className="bgblue-300 border-l border-l-white py-2 cursor-pointer"
        onClick={() => { toggleAside();}}>
          <TiArrowSortedDown className="rotate-90 text-3xl" />
        </div>
      </div>
    </aside>
  );
};

export default Aside;