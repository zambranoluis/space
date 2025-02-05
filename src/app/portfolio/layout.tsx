"use client";
import { ReactNode } from "react";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

interface Portfolio {
  children: ReactNode;
}

export default function PortfolioLayout({ children }: Portfolio) {
  return (
    <DataProvider>
      <ThemeProvider>
        <main className="flex flex-col w-full">
          <Navbar />
          <div className="w-full flex mt-[130px] md:mt-[100px] bg-red-400">
            {children}
          </div>
          <Footer />
        </main>
      </ThemeProvider>
    </DataProvider>
  );
}