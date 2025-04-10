"use client";

import React from "react";

import { PiPowerFill } from "react-icons/pi";

import { FaFolder } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { BiSolidPurchaseTag } from "react-icons/bi";

import { FaUserCircle } from "react-icons/fa";

import { TiArrowSortedDown } from "react-icons/ti";

import { signOut } from "next-auth/react";

interface AsideProps {
  toggleAside: () => void;
  isAsideOpen: boolean;
  toggleSiteContainer: (tag: string) => void;
  asideSelectedOption: string;
}

interface Option {
  name: string;
  tag: string;
  path: string;
  icon: React.ReactNode;
}

const asideOptions: Option[] = [
  {
    name: "My Profile",
    tag: "myprofile",
    path: "/my-profile",
    icon: <FaUserCircle className="text-xl" />,
  },
  {
    name: "Projects",
    tag: "projects",
    path: "/projects",
    icon: <FaFolder className="text-xl" />,
  },
  {
    name: "Cart",
    tag: "cart",
    path: "/shopping-cart",
    icon: <TiShoppingCart className="text-xl" />,
  },
  {
    name: "Purchases",
    tag: "purchases",
    path: "/purchases",
    icon: <BiSolidPurchaseTag className="text-xl" />,
  },
];

const Aside: React.FunctionComponent<AsideProps> = ({
  toggleAside,
  isAsideOpen,
  toggleSiteContainer,
  asideSelectedOption,
}) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Error al cerrar sesión en el backend");

      // Eliminar cookies específicas de NextAuth
      document.cookie =
        "next-auth.callback-url=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "next-auth.csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
        "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      localStorage.clear();
      sessionStorage.clear();

      // Opcionalmente limpiar caches
      if ("caches" in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      }

      await signOut({ callbackUrl: "/" }); // NextAuth maneja las cookies

      console.log("✅ Sesión cerrada, cookies y caché limpiados");
    } catch (error) {
      console.log("❌ Error al cerrar sesión:", error);
    }
  };

  return (
    <aside
      className={`mt-[20px] ${
        isAsideOpen ? "w-[170px]" : "w-[70px]"
      } transitionall duration300 select-none noScrollBar  bg-black/50  z-[3000]  overflow-auto    flex   rounded-r-3xl justify-around py-6  text-white text[#6b776d] 2`}
    >
      <div
        id="asideOptions"
        className="flex flex-col gap-3  w-full  bgrose-300 "
      >
        <div className="flex flex-col">
          {asideOptions.map((option) => (
            <div
              className={` flex  hover:bg-white/20 ${
                asideSelectedOption === option.tag ? "bg-white/20" : ""
              } transition-all duration-300 w-full  pt-3 pb-4 ${
                asideSelectedOption === option.name ? "" : ""
              } w-full items-center  cursor-pointer transition-colors duration-300 `}
              key={option.name}
              id={`link-${option.name}`}
              onClick={() => {
                if (option.tag !== "cart") {
                  toggleSiteContainer(option.tag);
                }
                if (option.tag === "cart")
                  window.location.href = "/shopping-cart";
              }}
            >
              <div className={`flex justify-center items-center gap-3 px-2`}>
                <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200 text[#b4aa1d] text[#686754]">
                  {option.icon}
                </p>
                <label
                  className={`${
                    isAsideOpen ? "" : "hidden "
                  } text[#b4aa1d] text[#abaa97] bgblue-300 cursor-pointer text-sm bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] text-nowrap`}
                  htmlFor={`link-${option.name}`}
                >
                  {option.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <div
            className={` flex  hover:bg-white/20 w-full  pt-3 pb-4 ${
              asideSelectedOption === "logout" ? "" : ""
            } w-full items-center  cursor-pointer transition-colors duration-300  `}
            id={`link-logout`}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <div className={`flex justify-center items-center gap-3 px-2 `}>
              <p className="drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)] bgred-200 text[#686754]">
                <PiPowerFill className="text-xl" />
              </p>
              <button
                className={` ${
                  isAsideOpen ? "" : "hidden "
                } bgblue-300 cursor-pointer text-sm  text[#abaa97] bgblue-200 drop-shadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]  text-nowrap`}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bgred-300 flex justify-center items-center p2">
        <div
          className={`${
            isAsideOpen ? "border-l border-l-white" : "border-r border-r-white "
          } bgblue-300  py-2 cursor-pointer text[#b4aa1d]`}
          onClick={() => {
            toggleAside();
          }}
        >
          <TiArrowSortedDown
            className={`${isAsideOpen ? "rotate-90" : "-rotate-90"} text-3xl`}
          />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
