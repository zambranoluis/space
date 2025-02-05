"use client";

import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";


// interface RootLayoutProps {
//   children: ReactNode;
// }



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
      
      <ThemeProvider>
        <body
          className={`antialiased min-h-[100vh] .noScrollBar bg-white`}
        >
          {children}
        </body>
      </ThemeProvider>

      
    </html>
  );
}
