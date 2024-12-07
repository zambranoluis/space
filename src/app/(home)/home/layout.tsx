"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";

import Navbar from "@/components/Navbar";

import Aside from "@/components/Aside";

interface DashboardLayoutProps {
  children: ReactNode; // Define el tipo para las props de children
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);





  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

{/* <div className=" w-full h-full ">
            <section className="w-full h-full">{children}</section>
          </div> */}

  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex flex-col bgpurple-500 p2 w-full">
          <Navbar toggleAside={toggleAside} />
          <div className="w-full flex max-md:mt-[139px] md:mt-[100px] lg:mt-[0px] ">
            {children}
          </div>
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}