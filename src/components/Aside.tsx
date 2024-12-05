'use client';

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Importar desde "next/navigation" en apps con appDir
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaUsers, FaCalendarAlt, FaPowerOff } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";

interface AsideProps {
  toggleAside: () => void;
  isAsideOpen: boolean;
}

interface Option {
  name: string;
  path: string;
  icon: JSX.Element;
}

const asideOptions: Option[] = [
  { name: "PROFILE", path: "/dashboard/profile", icon: <FaUser className="text-2xl" /> },
  { name: "CLIENTS", path: "/dashboard/clients", icon: <FaUsers className="text-2xl" /> },
  { name: "CALENDAR", path: "/dashboard/calendar", icon: <FaCalendarAlt className="text-2xl" /> },
  { name: "PAYMENTS", path: "/dashboard/payments", icon: <SiCashapp className="text-2xl" /> },
];

const Aside: React.FC<AsideProps> = ({ toggleAside, isAsideOpen }) => {
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
      className={`${
        isAsideOpen ? "visible" : "hidden"
      } select-none h-full z-[2000] absolute w-[80%] max-w-[400px]  items-center bggreen-300 flex flex-col  border-r border-[--color-border] bg-[--color-background] justify-between py-4 `}
    >
      <div
        id="asideHead"
        className="flex select-none bgpurple-400 w-full justify-between items-center px-3 py-3"
      >
        <div className="flex bgred-300 justify-start px-4 items-center w-[70%] py-3">
          <Image
            height={50}
            width={70}
            className={`w-full max-w-[100px] h-full drop-shadowanimate ${
              theme === "light"
                ? "dropshadow-[1px_1px_1px_black]"
                : "dropshadow-[1px_1px_1px_white]"
            }`}
            src={`https://github.com/BPM94/TTMD/raw/main/timeitLogoBlue.png`}
            alt=""
          />
        </div>
        <div className="flex bggreen-300 justify-center items-center w-[30%] py-3">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer transition-colors duration-300 hover:text-[--color-text-hover]"
            onClick={(e) => {
              e.preventDefault();
              toggleAside();
            }}
          />
        </div>
      </div>

      <div id="asideTop" className="flex flex-col gap-4 p-3 w-full h-full bgrose-300">
        {asideOptions.map((option) => (
          <Link
            className={` flex px-4 py-3 gap-3 ${
              asideSelectedOption === option.name
                ? "bg-[--color-button-hover] text-[--color-button-text-hover]"
                : ""
            } w-full items-center hover:bg-[--color-button-hover] cursor-pointer hover:text-[--color-button-text-hover] transition-colors duration-300 rounded-full`}
            key={option.name}
            id={`link-${option.name}`}
            href={option.path}
            onClick={() => setAsideSelectedOption(option.name)}
          >
            <div className="flex justify-center items-center">{option.icon}</div>
            <label
              className="cursor-pointer text-sm font-bold"
              htmlFor={`link-${option.name}`}
            >
              {option.name}
            </label>
          </Link>
        ))}
      </div>

      <div
        id="asideBottom"
        className="flex flex-col px-6 text-[--color-text]"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
      >
        <div
          id="logout"
          className="flex items-center bgred-300 justify-center p-4 gap-3 hover:text-[--color-text-hover] cursor-pointer"
        >
          <FaPowerOff className="text-xl cursor-pointer" />
          <label className="text-sm cursor-pointer font-bold">LOGOUT</label>
        </div>
      </div>
      <div
        id="copyright"
        className="flex w-full pb-4 bgrose-400 justify-center items-center"
      >
        <p className="text-sm text-center">Titan Tech, Copyright 2024.</p>
      </div>
    </aside>
  );
};

export default Aside;