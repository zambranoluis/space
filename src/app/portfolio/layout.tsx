"use client";
import { useState, ReactNode } from "react";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
// import Portfolio from './page';

interface Portfolio {
  children: ReactNode; // Define el tipo para las props de children
}

export default function PortfolioLayout({ children }: Portfolio) {
  return (
    <DataProvider>
      <ThemeProvider>
        <main className="flex ">
        {children}
        </main>
      </ThemeProvider>
    </DataProvider>
  );
}