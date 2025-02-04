"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Reviews {
  children: ReactNode;
}

export default function ReviewsLayout({ children }: Reviews) {
  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex flex-col bgpurple-500 p2 w-full">
          <Navbar />
          <div className="w-full flex max-md:mt[130px] md:mt[100px]  ">
            {children}
          </div>
          <Footer />
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}