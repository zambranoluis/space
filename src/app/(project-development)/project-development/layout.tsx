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
        <section className="flex w-full bg-red-300  h-screen">
          {children}
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}