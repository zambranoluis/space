"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";

import NavbarWorker from "@/components/NavbarWorker";

// import AsideWorker from "@/components/AsideWorker";
// import ChatModal from "@/components/ChatModal";


interface WorkerPanelLayout {
  children: ReactNode;
}

export default function ProyectDevelopmentLayout({ children }: WorkerPanelLayout) {  



  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex w-full bgred-300 relative flex-col ">
        <NavbarWorker />
          {children}
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}