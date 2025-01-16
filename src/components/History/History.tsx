"use client";

import React, { useState } from "react";

import {Tabs, Tab} from "@nextui-org/tabs";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

import {Tooltip} from "@nextui-org/tooltip";

import {Image} from "@nextui-org/image";

import { IoPersonAdd } from "react-icons/io5";


import { FaUserCheck } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { LuFolderCheck } from "react-icons/lu";
import { LuFolderClock } from "react-icons/lu";
import { LuFolderSync } from "react-icons/lu";
import { LuFolderSymlink } from "react-icons/lu";
import { LuFolderX } from "react-icons/lu";




import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import { div } from "framer-motion/client";




const typeClients = [
  {
    name: "Completed",
    icon: <LuFolderCheck className=""/>
  },
  {
    name: "Pending",
    icon: <LuFolderClock className=""/>
  },
  {
    name: "Corrected",
    icon: <LuFolderSync className=""/>
  },
  {
    name: "Approved",
    icon: <LuFolderSymlink className=""/>
  },
  {
    name: "Canceled",
    icon: <LuFolderX className=""/>
  },
]


const clientsTest = [
  {
    id: 0,
    name: "John Doe",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 1,
    name: "Capi Tanazo",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 2,
    name: "Cabiz Bajo",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 3,
    name: "Elza Pato",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 4,
    name: "Cabe Zota",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 5,
    name: "Pedro Perez",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 6,
    name: "Pacha Mama",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 7,
    name: "Presta Mista",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 8,
    name: "Membre Sia",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: true,
    banned: false,
  },
  {
    id: 9,
    name: "Cala Vera",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: false,
    banned:false
  },
  {
    id: 10,
    name: "Maizpi Lao",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: false,
    banned:false
  },
  {
    id: 11,
    name: "Cris Tofer",
    email: "y7h5y@example.com",
    phone: "+58 412 3456 789",
    avatar: "https://github.com/BPM94/TTMD/raw/main/AvatarTimeit.webp",
    status: "Active",
    lastLogin: "2023-06-01T12:34:56Z",
    role: "User",
    suscription: "Personal Trainning",
    plan: "Monthly",
    schedules: "Mon-Fri 3pm-5pm",
    active: false,
    banned:true
  },

]


const History = () => {
  const [currentClients, setCurrentClients] = useState<string | null>("All Clients");

  return (
    <div className="flex flex-col w-[90%] h-full place-self-center bgred-200  gap-2 ">
      <div className="flex  place-self-center border-[#6b776d] border-2 text-[#6b776d] rounded-md p2 w-[90%] max-w-[378px] overflow-x-scroll scrollbar-hide">
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

        <div className="grid overflow-y-scroll  h-[90%]  sm:grid-cols-2 lg:grid-cols-3  p-2 py-4 gap-6 w-full   bgred-600">
          {
            clientsTest.map((client) => (
              <Card className='w-full max-w-[350px] h-[250px] p-4 bg-white border border-[#6b776d]' key={client.id}>
                <CardHeader className='flex gap-4  justify-center  rounded-md p-4 bgred-300'>
                  <div>
                    <Avatar src="https://github.com/BPM94/TTMD/raw/main/avatarAang.jpg" className="w-20 h-20 " />
                  </div>
                  <div className='flex flex-col w-full font-bold   text-[#6b776d]'>
                    <h1>{client.name}</h1>
                    <h2>{client.email}</h2>
                    <h2>{client.phone}</h2>
                  </div>
                </CardHeader>
                <CardBody className='text-[#6b776d]'>
                  <h3>Subscription: {client.suscription}</h3>
                  <h3>Plans: {client.plan}</h3>
                  <h3>Schedules: {client.schedules}</h3>
                </CardBody>
                <CardFooter className='flex justify-end  bgblue-400 gap-2  '>
                  <Tooltip content="View Assistance Calendar">
                    <div className='flex hover:text-white  text-[#6b776d]  bggreen-400 cursor-pointer bg[--color-button] hover:bgbg[--color-button-hover] p-2 rounded-md border hover:bg-[#6b776d] border-[#6b776d]'>
                      <RiCalendarScheduleFill className="text-lg " />
                    </div>
                  </Tooltip>
                  <Tooltip content="Edit Client">
                    <div className='flex hover:text-white  text-[#6b776d] bggreen-400 cursor-pointer bg[--color-button] hover:bgbg[--color-button-hover] p-2 rounded-md border hover:bg-[#6b776d] border-[#6b776d]'>
                      <FaUserPen className="text-lg " />
                    </div>
                  </Tooltip>
                  <Tooltip content="Ban Client">
                    <div className='flex hover:text-white text-[#6b776d]  bggreen-400 cursor-pointer bg[--color-button] hover:bgbg[--color-button-hover] p-2 rounded-md border hover:bg-[#6b776d] border-[#6b776d]'>
                      <FaBan className="text-lg " />
                    </div>
                  </Tooltip>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default History;