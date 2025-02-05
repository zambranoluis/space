"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";

interface QuestionnaireProps {
  children: ReactNode;
}

export default function QuestionnaireLayout({ children }: QuestionnaireProps) {


  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex flex-col bgpurple-500 p2 w-full relative">
          <div className="w-full flex max-md:mt[130px] md:mt[100px] bgred-400  ">
            {children}
          </div>
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}