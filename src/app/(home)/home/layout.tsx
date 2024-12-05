"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
// import { Image } from "@nextui-org/image";

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



  return (
    <DataProvider>
      <ThemeProvider>
        <div>
          <Aside toggleAside={toggleAside} isAsideOpen={isAsideOpen} />
          <Navbar toggleAside={toggleAside} />
          <div className="relative flex">
            <section className="w-full h-full">{children}</section>
          </div>
        </div>
        <footer></footer>
      </ThemeProvider>
    </DataProvider>
  );
}