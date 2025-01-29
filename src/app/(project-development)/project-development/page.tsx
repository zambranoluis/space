"use client"

import { questionnaire } from "./questionnaire";

import { useEffect, useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";

import NavbarWorker from "@/components/NavbarWorker";

import AsideWorker from "@/components/AsideWorker";

import ChatModal from "@/components/ChatModal";

const ProjectDevelopment: React.FC = () => {
  return (
    <main className="flex flex-col w-full bg-green-400 ">
      <NavbarWorker />
      <section id="developmentContainer" className="min-h-[calc(100vh-100px)] bg-blue-300">
        <div id="customer" className="flex bg-red-200 w-full">
          <div className="flex flex-col w-full">
            <div id="projectInfo" className="bg-[#f2f2f1] h-[150px] gap-1 flex flex-col justify-center items-center">
              <h1 className="text-black font-bold md:text-3xl">Project 22133568</h1>
              <p className="text-[#868370] w-[60%] max-w-[500px] md:text-lg bgorange-300 text-center">Project 22133568 (3d Design Package - Front Yard, 30 Day
                Design Revisions, 2D Satellite Design, Oasis Lighting Plan)</p>
            </div>
            <div id="customerInfo" className="bg-purple-400 justify-center items-center flex flex-col py-8">
              <div className="flex flex-col">
                <div id="title" className="flex bg-rose-400 px-4 py-4">
                  <h1  className="text-2xl sm:text-4xl py-2 font-bold border-l-8 border-[#68664d] text-[#68664d] pl-4">Customer Information</h1>
                </div>
                <div id="details" className="flex flex-col p-8 text-black">
                  <p>Tim Sawyer</p>
                  <p>2916 Sunset Dr</p>
                  <p>Uniontown, OH 44685</p>
                </div>
                <div id="media" className="bg-red-300">
                  <div className="border-1 flex gap-2 p-6 max-sm:flex-col max-sm:h-[350px] h-[300px]">
                    <div className=" w-full bg-green-300 max-sm:h-full ">

                    </div>
                    <div className="flex max-sm:flex-row flex-col gap-2 bg-purple-800 justify-between">
                      <div className="w-[80px] h-[80px]  bg-blue-300"></div>
                      <div className="w-[80px] h-[80px]  bg-blue-300"></div>
                      <div className="w-[80px] h-[80px]  bg-blue-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="questionnaire">

          </div>
        </div>
        <div id="pm">

        </div>
        <div id="ds">

        </div>
        <div id="qa">

        </div>
      </section>
      <div className="flex bgred-200 absolute bottom-[10px] items-end  right-[10px] z-[3000]">
        <ChatModal />
      </div>
    </main>
  );
}

export default ProjectDevelopment;