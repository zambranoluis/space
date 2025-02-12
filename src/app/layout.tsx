"use client";
import { SessionProvider } from "next-auth/react";

import "./globals.css";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Space Creation - v1.0.1</title>
        <meta name='description' content='' />
        <link rel='icon' href='https://github.com/BPM94/SCCTMD/raw/main/logos/faviconSC.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      
        <body
          className={`antialiased min-h-[100vh] .noScrollBar bg-white`}
        >
          <SessionProvider>
            {children}
          </SessionProvider>
        </body>
      
    </html>
  );
}
