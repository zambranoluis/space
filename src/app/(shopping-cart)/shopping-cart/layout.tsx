"use client";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ShoppingCartLayoutProps {
  children: ReactNode;
}

export default function ShoppingCartLayout({ children }: ShoppingCartLayoutProps) {


  return (
    <SessionProvider>
      <ThemeProvider>
        <DataProvider>
          <section className="flex flex-col bgpurple-500 p2 w-full relative">
            <Navbar  />
            <div className="w-full flex max-md:mt-[130px] md:mt-[100px] bgred-400">
              {children}
            </div>
            <Footer />
          </section>
        </DataProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
