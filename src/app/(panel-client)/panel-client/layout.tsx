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

export default function PanelClientLayout({ children }: WorkerPanelLayout) {
  
  



  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex w-full bg-red-300  h-screen">
          {children}
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}