"use client";



import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";


interface LoginLayout {
  children: ReactNode;
}



export default function LoginLayout({ children }: LoginLayout) {
  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex w-full bgred-300  h-screen">
          {children}
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}
