"use client";



import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GeolocationProvider } from "@/context/GeolocationContext";
import { ReactNode } from "react";


interface LoginLayout {
  children: ReactNode;
}



export default function LoginLayout({ children }: LoginLayout) {
  return (
    <DataProvider>
      <ThemeProvider>
        <GeolocationProvider>
        <section className="flex w-full bgred-300  h-screen">
          {children}
        </section>
        </GeolocationProvider>
      </ThemeProvider>
    </DataProvider>
  );
}
