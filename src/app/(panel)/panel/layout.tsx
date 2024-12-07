"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
// import { Image } from "@nextui-org/image";

import Navbar from "@/components/NavbarWorker";

import Aside from "@/components/AsideWorker";

interface DashboardLayoutProps {
  children: ReactNode; // Define el tipo para las props de children
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);





  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };



  return (
    <DataProvider>
      <ThemeProvider>
        <div className="relative w-full h-full">
          <div className="absolute w-full h-full gap-8 flex flex-col">
            <Navbar toggleAside={toggleAside} />
            <Aside toggleAside={toggleAside} isAsideOpen={isAsideOpen} />
          </div>
          <div className=" w-full h-full ">
            <section className="w-full h-full">{children}</section>
          </div>
        </div>
        <footer></footer>
      </ThemeProvider>
    </DataProvider>
  );
}