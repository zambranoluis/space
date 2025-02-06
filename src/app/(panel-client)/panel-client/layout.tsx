"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";



interface ClientPanelLayout {
  children: ReactNode; // Define el tipo para las props de children
}

export default function PanelClientLayout({ children }: ClientPanelLayout) {
  

  return (
    <SessionProvider>
      <DataProvider>
        <ThemeProvider>
          <section className='flex w-full bg-blue300  h-screen'>{children}</section>
        </ThemeProvider>
      </DataProvider>
    </SessionProvider>
  );
}
