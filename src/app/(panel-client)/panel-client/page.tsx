"use client";

import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState, ReactNode } from "react";
// import { Image } from "@nextui-org/image";

import Navbar from "@/components/NavbarClient";

import Aside from "@/components/AsideClient";

import ChatModal from "@/components/ChatModal";

function PanelClient() {

  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  
  
  
  
  
    const toggleAside = () => {
      setIsAsideOpen((prev) => !prev);
    };

  return (

    <main className="flex flex-col w-full">
      <section className='w-full min-h-[100dvh] bg-cover bg-no-repeat bg-center ' style={{ backgroundImage: "url('/panel-clientBg.jpg')"}} >
      <div className="relative w-full h-full">
          <div className="absolute w-full h-full gap-8 flex flex-col">
            <Navbar toggleAside={toggleAside} />
            <Aside toggleAside={toggleAside} isAsideOpen={isAsideOpen} />
          </div>
          <div className=" w-full h-full relative">
            <div className="flex absolute bottom-[10px] right-[10px] z-[2000]">
              <ChatModal />
            </div>
          </div>
        </div>
      </section>

      <section className='w-[90%] py-12 flex flex-col min-h-[60dvh] bgred-300 px-2 gap-8 sm:w-[80%] place-self-center' >
        <div className="flex flex-col justify-center items-center text-[#6b776d]">
          <h1 className="font-black text-center">Hello, Claudia Alves!</h1>
          <p className="text-center text-sm">Welcome to your Space Creations account, here you can share photos 
          of yourspace, your inspiration and the measurements of your home.</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex p-4">
            <h1 className="font-bold text-[#6b776d] text-center">Let's start designing together!</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center">
            <button className="py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base">Click here to schedule a call</button>
            <button className="py-3 px-4 rounded-2xl bg-[#848d5a] text-xs md:text-base">Click here to complete the questionnaire</button>
          </div>
          <div className="flex flex-col py-6 gap-8 text-[#6c6c6c]">
            <div className="flex flex-col">
              <div className="flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]">
                <h1>CONSULTATION CALL</h1>
              </div>
              <div className="flex bgblue-300 p-2 text-smin-[350px]sm:text-base">
                <p>You have a call on <span className="font-bold">December 15, 2023</span> at <span className="font-bold">10:30am</span> pst time with one of our project managers.</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex p-2 font-bold bggreen-300 border-b border-b-[#6c6c6c] min-[350px]:w-[80%]">
                <h1>DESIGN PACKAGE</h1>
              </div>
              <div className="flex bgblue-300 p-2 text-sm sm:text-base">
                <p>You currently have an active package to design both areas of your home (Front yard & BackYard).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>

    
  )
}

export default PanelClient;