"use client";

import React, { useState } from "react";

import {Tabs, Tab} from "@nextui-org/tabs";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

import {Tooltip} from "@nextui-org/tooltip";

import {Image} from "@nextui-org/image";


import { FaUserCheck } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";




const typeClients = [
  {
    name: "All Users",
    icon: <FaUserCheck className="text-2xl"/>
  },
  {
    name: "Active",
    icon: <FaUserClock className="text-2xl"/>
  },
  {
    name: "Inactive",
    icon: <FaUserTimes className="text-2xl"/>
  },
  {
    name: "Banned",
    icon: <FaUserAltSlash className="text-2xl"/>
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

const Clients = () => {
  const [currentClients, setCurrentClients] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-[90%] place-self-center mt-5 gap-4 ">
      <div className="flex flex-col  place-self-center  ">
        <Tabs className="flex w-full  " color="white">
          {
            typeClients.map((client, index) => (

              <Tab className="p-8 tabsColor w-full bg-[--color-background]" key={client.name}  title={
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "8px" }}>
                  {client.icon}
                  <p>{client.name}</p>
                </div>
              } />



              // <div className={`select-none font-bold ${index === 0 ? "rounded-l-md border-r-0" : index === typeClients.length - 1 ? "rounded-r-md" : ""} ${index === typeClients.length - 1 ? "border-r" : ""} flex flex-col items-center justify-center bgpink-500 w-full h-[80px] cursor-pointer border-t border-l border-b border-[--color-border] ${currentClients === client.name ? "bg-[--color-background-selected] text-[--color-button-text-hover]" : ""} text-base `}
              //   key={client.name}
              //   onClick={() => setCurrentClients(client.name)}
              // >
              //   {client.icon}
              //   {client.name}
              // </div>
            ))
          }

        </Tabs>
      </div>

      <div className="flex flex-col relative  max-h-[500px] w-full bgblue-400 place-self-center rounded-md border border-[--color-border] overflow-y-auto p-2 pt-0 px-0">
        <div className="w-full  sticky top-0 z-[100] bg-[--color-background] bgpurple-400 flex justify-center p-2 py-6 items-center  border-b border-b-[--color-border] bgblue-400">
          <div className="flex  w-full max-w-[400px] bggreen-400rounded-md ">
            <div className="flex w-full ">
              <input type="text" className="w-full pl-2 bgred-400 bg-[--color-background]  text-[--color-text] p-1 outline-none rounded-l-md border border-[--color-input-border] border-r-0" />
            </div>
            <div className="flex h-full p-2 justify-center  items-center bgpink-600 hover:text-[--color-text-hover] rounded-r-md cursor-pointer border border-[--color-input-border] ">
              <FaSearch className="text-2xl " />
            </div>
          </div>
        </div>
        <div className="grid place-content-center place-items-center md:grid-cols-2 xl:grid-cols-3  p-2 py-16 gap-6 w-full h-full bgred-300">
          {
            clientsTest.map((client) => (
              <Card className='w-full max-w-[350px] h-[320px] p-4 bg-[--color-background] border border-[--color-border]' key={client.id}>
                <CardHeader className='flex gap-4  justify-center  rounded-md p-4 bgred-300'>
                  <div>
                    <Avatar src="https://github.com/BPM94/TTMD/raw/main/avatarAang.jpg" className="w-20 h-20 " />
                  </div>
                  <div className='flex flex-col w-full font-bold   text-[--color-text-primary]'>
                    <h1>{client.name}</h1>
                    <h2>{client.email}</h2>
                    <h2>{client.phone}</h2>
                  </div>
                </CardHeader>
                <CardBody className='text-[--color-text-secondary]'>
                  <h3>Subscription: {client.suscription}</h3>
                  <h3>Plans: {client.plan}</h3>
                  <h3>Schedules: {client.schedules}</h3>
                </CardBody>
                <CardFooter className='flex justify-end  bgblue-400 gap-2  '>
                  <Tooltip content="View Assistance Calendar">
                    <div className='flex hover:text-[--color-button-text-hover]  text-[--color-button-text]  bggreen-400 cursor-pointer bg-[--color-button] hover:bg-[--color-button-hover] p-2 rounded-md border border-[--color-border]'>
                      <RiCalendarScheduleFill className="text-lg " />
                    </div>
                  </Tooltip>
                  <Tooltip content="Edit Client">
                    <div className='flex hover:text-[--color-button-text-hover]  text-[--color-button-text] bggreen-400 cursor-pointer bg-[--color-button] hover:bg-[--color-button-hover] p-2 rounded-md border border-[--color-border]'>
                      <FaUserPen className="text-lg " />
                    </div>
                  </Tooltip>
                  <Tooltip content="Ban Client">
                    <div className='flex hover:text-[--color-button-text-hover] text-[--color-button-text]  bggreen-400 cursor-pointer bg-[--color-button] hover:bg-[--color-button-hover] p-2 rounded-md border border-[--color-border]'>
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

export default Clients