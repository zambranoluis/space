"use client";

import React, { useState } from "react";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import {Avatar} from "@nextui-org/avatar";

import {Tooltip} from "@nextui-org/tooltip";

import { FaSearch } from "react-icons/fa";

import { MdOutlineFolderCopy } from "react-icons/md";
import { LuFolderCheck } from "react-icons/lu";
import { LuFolderClock } from "react-icons/lu";
import { LuFolderSync } from "react-icons/lu";
import { LuFolderSymlink } from "react-icons/lu";





import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";

import { projects } from "../../app/(panel-client)/panel-client/steps";


const typeClients = [
  {
    name: "All Projects",
    icon: <MdOutlineFolderCopy className=""/>
  },
  {
    name: "Pending",
    icon: <LuFolderCheck className=""/>
  },
  {
    name: "Development",
    icon: <LuFolderClock className=""/>
  },
  {
    name: "Completed",
    icon: <LuFolderSync className=""/>
  },
  {
    name: "Canceled",
    icon: <LuFolderSymlink className=""/>
  },
]





const History = () => {
  const [currentClients, setCurrentClients] = useState<string | null>("All Clients");

  return (
    <div className="flex flex-col w-[90%] h-full place-self-center bgred-200  gap-2 ">
      <div className="flex  place-self-center border-[#6b776d] border-2 text-[#6b776d] rounded-md p2 w-[90%] max-w-[405px] overflow-x-scroll scrollbar-hide">
        {typeClients.map((client, index) => (
          <div className={`flex justify-center items-center p-1 `} key={index}>
            <p className={`${currentClients === client.name ? "bg-[#6b776d] text-white rounded-md" : ""} text-xs transition-all duration-300 select-none flex flex-col text-center justify-center items-center p-2 cursor-pointer whitespace-nowrap  `} onClick={() => { setCurrentClients(client.name) }} ><span className="text-lg">{client.icon}</span>{client.name}</p>
          </div>
        ))
        }
      </div>

      <div className="flex flex-col  h-[80%]  w-full bgblue-400 place-self-center rounded-md border border-[#6b776d] ">
        <div className="w-full flex justify-center p-2 py6 items-center  border-b border-b-[#6b776d] bgblue-400 gap-2">
          <div className="flex  w-full max-w-[400px] bggreen-400rounded-md ">
            <div className="flex w-full ">
              <input type="text" className="w-full border border-[#6b776d] bg-white pl-2 bgred-400 bg[--color-background] text-[#6b776d]  text[--color-text] p-1 outline-none rounded-l-md  border-r-0 max-[450px]:text-xs " />
            </div>
            <div className="flex h-full p-2 justify-center  items-center bgpink-600 text-[#6b776d] hover:text-white rounded-r-md cursor-pointer hover:bg-[#6b776d]   border border-[#6b776d] ">
              <FaSearch className="text-xl " />
            </div>
          </div>
        </div>

        <section className='flex flex-col w-full place-self-center bgblue-300 justify-center items-center pt-8 pb-4  '>
      <div className='flex flex-col bgred-200 w-[90%] p-4 rounded-3xl bg-[#f0f0ef] '>
        <div className='flex bggreen-200 gap4 text-[#69664c] bgred-300 text-xs sm:text-lg font-bold w-full'>
          <div className='w-full w[100px] px-6 py-4 bgpurple-300 flex justify-center items-center text-center'>
            ID
          </div>
          <div className='w-full w[150px] px-6 py-4 bgorange-300 flex justify-center items-center text-center'>
            Package name
          </div>
          <div className='w-full w[170px] px-6 py-4 bgyellow-200 flex justify-center items-center text-center'>
            Project Manager
          </div>
        </div>
        <div className='flex flex-col text-xs  overflow-y-auto noScrollBar h-[180px] bgred-200 sm:text-sm md:text-base w-full bgslate-400 gap-4 py-8 '>
          <div
            className='flex cursor-pointer bg-[#848d5a] rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg[#848d5a] text-black rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg-[#6b776d] rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg[#848d5a] text-black rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg-[#302626] rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg[#302626] text-black rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>

          <div className='flex cursor-pointer bg-[#3b543e]  rounded-3xl  w-full h-[90px]'>
            <div className='w-full w[100px]  flex justify-center items-center'>
              12345678
            </div>
            <div className='flex w-full overflow-y-auto noScrollBar max-h-[90px] w[150px]  flex-col justifycenter items-center gap-1'>
              <p>1 Area Pro</p>
              <p>BACKYARD</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
              <p>Lighting Plan</p>
            </div>
            <div className='flex w-full w[170px]  justify-center items-center'>
              Joao Da Silva
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
    </div>
  );
}

export default History;