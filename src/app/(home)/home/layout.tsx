"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode, useEffect } from "react";
import { Image } from "@nextui-org/image";

import Navbar from "@/components/Navbar";

import Aside from "@/components/Aside";

interface DashboardLayoutProps {
  children: ReactNode; // Define el tipo para las props de children
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

  // Usar useEffect para manejar el setTimeout correctamente
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Limpiar el timeout al desmontar
  }, []);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  if (loading)
    return (
      <div className="w-full h-full bg-[--color-background] text-[--color-text] p-8 gap-8 text-4xl font-bold text-center flex flex-col justify-center items-center">
        <Image
          className="w-[90%] place-self-center "
          src="https://github.com/BPM94/TTMD/raw/main/loadingDashboard.webp"
          alt="Loading"
        />
        <p>Loading Dashboard...</p>
      </div>
    );

  return (
    <DataProvider>
      <ThemeProvider>
        <div>
          <Aside toggleAside={toggleAside} isAsideOpen={isAsideOpen} />
          <Navbar toggleAside={toggleAside} />
          <div className="relative flex">
            <section className="w-full h-full">{children}</section>
          </div>
        </div>
        <footer></footer>
      </ThemeProvider>
    </DataProvider>
  );
}