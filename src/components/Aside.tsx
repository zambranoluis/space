'use client';

import { useState, useEffect } from "react";
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
  icon: JSX.Element;
}

const asideOptions: Option[] = [
  { name: "Projects", path: "/projects", icon: < FaClipboardList className="text-xl" /> },
  { name: "Projects History", path: "/projects-history", icon: <FaFolder className="text-xl" /> },
  { name: "Work Calendar", path: "/work-calendar", icon: <FaRegCalendarDays className="text-xl" /> },
  { name: "Notification", path: "/notifications", icon: <IoMdNotifications className="text-xl" /> },
  { name: "Message", path: "/message", icon: <FaEnvelope className="text-xl" /> },
  { name: "My Profile", path: "/my-profile", icon: <FaUserCircle className="text-xl" /> },
  { name: "Settings", path: "/settings", icon: <IoSettingsSharp className="text-xl" /> },
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
      className={` select-none  bg-black/50 w-[210px] z-[2000]  h-[520px]  flex flex-col   rounded-r-3xl justify-between  py-6  text-[#8e7842]`}
    >
      

      <div id="asideTop" className="flex flex-col   w-full h-full bgrose-300 ">
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
              <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]">
                {option.icon}
              </p>
              <label
                className="cursor-pointer text-sm font-medium drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]"
                htmlFor={`link-${option.name}`}
              >
                {option.name}
              </label>
            </div>
          </Link>
        ))}
      </div>

      <div id="asideBottom" className="flex  hover:bg-black w-full  cursor-pointer">
        <div className="flex   w-full   items-center  transition-colors duration-300">
          <div className="flex justify-center items-center gap-4  cursor-pointer   hover:bg-black w-full px-3 py-4">
            <FaPersonCircleQuestion className="text-xl" />
            <p>Help & Support</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Aside;