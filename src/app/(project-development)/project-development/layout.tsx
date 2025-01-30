"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";

interface WorkerPanelLayout {
  children: ReactNode;
}

export default function ProyectDevelopmentLayout({ children }: WorkerPanelLayout) {  



  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex w-full bgred-300 ">
          {children}
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}