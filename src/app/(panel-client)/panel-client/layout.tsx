"use client";

import React from "react";
import { GeolocationProvider } from "@/context/GeolocationContext";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";

interface ClientPanelLayoutProps {
  children: React.ReactNode;
}

export default function PanelClientLayout({
  children,
}: ClientPanelLayoutProps) {
  return (
    <SessionProvider>
      <DataProvider>
        <ThemeProvider>
          <GeolocationProvider>
            <section className="flex w-full bg-blue300 h-screen">
              {children}
            </section>
          </GeolocationProvider>
        </ThemeProvider>
      </DataProvider>
    </SessionProvider>
  );
}
