"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";

import Navbar from "@/components/Navbar";

import Aside from "@/components/Aside";
import Footer from "@/components/Footer";

import { FaqsContactUsEmail, FaqsContactUsSkype, FaqsContactUsWhatsapp } from "@/components/faqsContactUs";

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
        <section className="flex flex-col bgpurple-500 p2 w-full">
          <Navbar toggleAside={toggleAside} />
          <div className="w-full flex max-md:mt[130px] md:mt[100px]  ">
            {children}
          </div>
          <Footer />
          <div className="bg-[#6b776d]/70 p-4 text-white w-[180px]  h-[180px] z-[100] sticky bottom-0 left-[100%] justifycenter itemscenter flex flex-col">
            <div className="flex w-full" >
              <FaqsContactUsEmail />
            </div>
          </div>
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}