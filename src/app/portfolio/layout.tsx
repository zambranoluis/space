"use client";
import { ReactNode } from "react";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";

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