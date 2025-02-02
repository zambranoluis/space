"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";
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
    <SessionProvider>
      <DataProvider>
        <ThemeProvider>
          <section className='flex w-full bgred-300  h-screen'>{children}</section>
        </ThemeProvider>
      </DataProvider>
    </SessionProvider>
  );
}
