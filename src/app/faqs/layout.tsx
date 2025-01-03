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
          <div className="   z-[10] sticky bottom-0 left-[100%] justifycenter itemscenter flex ">
            <div className="flex w-full bgred-300 justify-end" >
              <FaqsContactUsEmail />
            </div>
          </div>
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}