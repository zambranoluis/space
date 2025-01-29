"use client"

import { useEffect, useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";

import NavbarWorker from "@/components/NavbarWorker";

import AsideWorker from "@/components/AsideWorker";

import ChatModal from "@/components/ChatModal";

const ProjectDevelopment: React.FC = () => {
  return (
    <main className="flex flex-col h-full w-full">
      <NavbarWorker />
      <section id="developmentContainer" className="h-full bg-blue-300">
        
      </section>
      <div className="flex bgred-200 absolute bottom-[10px] items-end  right-[10px] z-[3000]">
        <ChatModal />
      </div>
    </main>
  );
}

export default ProjectDevelopment;