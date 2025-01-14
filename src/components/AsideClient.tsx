'use client';

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Importar desde "next/navigation" en apps con appDir
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

import { FaPersonCircleQuestion } from "react-icons/fa6";

import { FaClipboardList } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";



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
  { name: "Notification", path: "/notifications", icon: <IoMdNotifications className="text-xl" /> },
  { name: "Message", path: "/message", icon: <FaEnvelope className="text-xl" /> },
  
];

const Aside: React.FunctionComponent<AsideProps> = ({ toggleAside, isAsideOpen }) => {
  const [asideSelectedOption, setAsideSelectedOption] = useState<string | null>(null);
  const { theme } = useTheme();
  // const router = useRouter(); // Hook de Next.js para acceder al pathname
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Marcar como montado en el cliente

    if (!isMounted) return;

    const currentPath = window.location.pathname.toLowerCase();

    // Verificar si el pathname incluye alguna de las palabras clave
    const matchedOption = asideOptions.find((option) =>
      currentPath.includes(option.name.toLowerCase())
    );

    // Actualizar el estado si se encuentra una coincidencia
    if (matchedOption) {
      setAsideSelectedOption(matchedOption.name);
    }
  }, [isMounted]); // Ejecutar después del montaje

  return (
    <aside
      className={` select-none noScrollBar  bg-black/50 w-[210px] z-[2000] max-[900px]:h-[310px] overflow-auto    flex flex-col   rounded-r-3xl justify-between gap-6 py-6  text-[#8e7842]`}
    >
      <div id="asideTop" className="flex flex-col   w-full  bgrose-300 ">
        {asideOptions.map((option) => (
          <Link className={` flex  hover:bg-black w-full px-3 py-4 ${
              asideSelectedOption === option.name
                ? ""
                : ""
            } w-full items-center  cursor-pointer transition-colors duration-300 `}
            key={option.name}
            id={`link-${option.name}`}
            href={option.path}
            onClick={() => setAsideSelectedOption(option.name)}
          >
            <div className="flex justify-center items-center gap-4 px-4">
              <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200">
                {option.icon}
              </p>
              <label
                className="cursor-pointer text-sm font-medium bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
                htmlFor={`link-${option.name}`}
              >
                {option.name}
              </label>
            </div>
          </Link>
        ))}
      </div>
      <div id="asideMid" className="flex  flex-col w-full bgpurple-300">
        <Link className={` flex  hover:bg-black w-full px-3 py-4 ${
            asideSelectedOption === "settings"
              ? ""
              : ""
          } w-full items-center  cursor-pointer transition-colors duration-300 `}
          
          id={`link-settings`}
          href={"/settings"}
          onClick={() => setAsideSelectedOption("settings")}
        >
          <div className="flex justify-center items-center gap-4 px-4">
            <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200">
              <IoSettingsSharp className="text-xl" />
            </p>
            <label
              className="cursor-pointer text-sm font-medium bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
              htmlFor={`link-settings`}
            >
              Settings
            </label>
          </div>
        </Link>
      </div>
      <div id="asideBottom" className="flex  flex-col w-full bgpurple-300">
        <Link className={` flex  hover:bg-black w-full px-3 py-4 ${
            asideSelectedOption === "help-and-support"
              ? ""
              : ""
          } w-full items-center  cursor-pointer transition-colors duration-300 `}
          
          id={`link-help-and-support`}
          href={"/help-and-support"}
          onClick={() => setAsideSelectedOption("help-and-support")}
        >
          <div className="flex justify-center items-center gap-4 px-4">
            <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200">
              <FaPersonCircleQuestion className="text-xl" />
            </p>
            <label
              className="cursor-pointer text-sm font-medium bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
              htmlFor={`link-settings`}
            >
              Help & Support
            </label>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;