import type { Metadata } from "next";

// import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
        <link rel='icon' href='https://github.com/BPM94/SCCTMD/raw/main/faviconSC.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body
        className={`antialiased  w-[100dvw] min-h-[100dvh] .noScrollBar`}
      >
        {children}
      </body>
    </html>
  );
}
