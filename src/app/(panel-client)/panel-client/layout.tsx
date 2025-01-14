"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
// import { Image } from "@nextui-org/image";

import Navbar from "@/components/NavbarClient";

import Aside from "@/components/AsideClient";

import ChatModal from "@/components/ChatModal";

interface WorkerPanelLayout {
  children: ReactNode; // Define el tipo para las props de children
}

export default function DashboardLayout({ children }: WorkerPanelLayout) {
  
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
          <div className=" w-full h-full relative">
            <section className="w-full h-full">{children}</section>
            <div className="flex absolute bottom-[10px] right-[10px] z-[2000]">
              <ChatModal />
            </div>
          </div>
        </div>
        <footer></footer>
      </ThemeProvider>
    </DataProvider>
  );
}