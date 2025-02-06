"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";

interface QuestionnaireProps {
  children: ReactNode;
}

export default function QuestionnaireLayout({ children }: QuestionnaireProps) {


  return (
    <DataProvider>
      <ThemeProvider>
        <section className="flex flex-col bgpurple-500 p2 w-full relative">
            {children}
        </section>
      </ThemeProvider>
    </DataProvider>
  );
}