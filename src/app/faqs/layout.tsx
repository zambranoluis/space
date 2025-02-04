"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { FaqsContactUsEmail } from "@/components/faqsContactUs";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex flex-col bgpurple-500 p2 w-full ">
          <Navbar />
          <div className="flex flex-col">
            <div className="w-full flex max-md:mt[130px]  md:mt[100px]">
              {children}
            </div>
          <Footer />
          </div>
          <div className="fixed bottom-4 right-4">
            <FaqsContactUsEmail />  
          </div>
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}