"use client";
import { useTheme } from "../context/ThemeContext";
import { Image } from "@nextui-org/image";
// import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { TiWeatherSunny, TiWeatherNight, TiArrowSortedDown } from "react-icons/ti";
import { IoMdNotifications } from "react-icons/io";

interface NavbarProps {
  toggleAside: () => void; // Una función que no recibe argumentos y no retorna nada
}

const Navbar: React.FC<NavbarProps> = ( { toggleAside } ) => {




  const { theme, toggleTheme } = useTheme();

  
  return (
    <nav className="flex sticky top-0 w-full z-[1500] h-[70px] bgred-300 justify-between items-center px-6 md:px-12 border-b border-[--color-border] bg-[--color-background] ">
      <div className="flex bgred-200  ">
        <GiHamburgerMenu className="text-2xl cursor-pointer transition-colors duration-300 hover:text-[--color-text-hover]" onClick={(e) => { e.preventDefault(); toggleAside(); }} />
      </div>
      <div className="flex select-none bggreen-300">
        <Image className={`h-[65px] drop-shadowanimate `} src={`${theme === "light"  ? "https://github.com/BPM94/TTMD/raw/main/fitLogoLight.png" : "https://github.com/BPM94/TTMD/raw/main/fitLogoDark.png"}`} alt="" />
      </div>
      <div className="flex gap-3 sm:gap-6 bgblue-300">
        <div className="flex    justify-center items-center cursor-pointer transition-colors duration-300 ">
          <p className="select-none text-xs">ES</p>
          <Image className="h-[15px] w-[18px] select-none ml-1 " src="https://github.com/BPM94/TTMD/raw/main/flags/es.png" alt="" />
          <TiArrowSortedDown className="text-xl bgred-300 hover:text-[--color-text-hover] " />
        </div>
        {theme === "light"
          ? <TiWeatherNight className="text-2xl cursor-pointer transition-colors duration-300 hover:text-[--color-text-hover]" onClick={(e) => { e.preventDefault(); toggleTheme(); }} />
          : <TiWeatherSunny className="text-2xl cursor-pointer transition-colors duration-300 hover:text-[--color-text-hover]" onClick={(e) => { e.preventDefault(); toggleTheme(); }} />
        }
        <IoMdNotifications className="text-2xl cursor-pointer transition-colors duration-300 hover:text-[--color-text-hover]" />
        {/* <IoSettingsSharp className="text-4xl cursor-pointer transition-colors duration-300 hover:text-[--color-background-hover]" /> */}
      </div>
    </nav>
  );
}

export default Navbar;