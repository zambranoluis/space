"use client";
import React, { useEffect, useState, useRef } from "react";
import { area, option } from "framer-motion/client";
import { FaUserCircle } from "react-icons/fa";
import { Image } from "@nextui-org/image";
import { IoMdArrowDropdown } from "react-icons/io";

import AreaCodeSelector from "../AreaCodeSelector";

interface Customer {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
}

const MyProfile = (customer: any) => {

  const [customerData, setCustomerData] = useState<Customer>(customer.customer);
  
  const [selectedCode, setSelectedCode] = useState<number>(26);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);


  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node) &&
          listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsListVisible(false); // Cerrar la lista si se hace clic fuera
      }
    };

    // Agregar el event listener al hacer clic fuera
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowCodesList = () => {
    setIsListVisible(!isListVisible);
  }

  const handleSelectCode = (id: number) => {
    setSelectedCode(id);
    setIsListVisible(false);  // Cerrar la lista después de seleccionar
  }
  
  
  return (
    <section className="flex flex-col wfull  bgred-500 max-w-[500px] justify-center items-center w-[80%] place-self-center py4 gap6">
      <div className="text-center text-[#6d786f]  bg-white w-full sticky top-0 z-[2000]">
        <div className="flex justify-center items-center">
          < FaUserCircle className="text-[100px] " />
        </div>
        {(customerData) 
          ? <div>
              <h1 className="font-bold">{customerData.email}</h1>
              <h2 className="">{customerData.name} {customerData.lastname}</h2>
              <p className="">Client</p>
            </div> 
          : <div>
              <p>No user data available right now.</p> 
            </div>
        }
      </div>

      {
        (customerData) && <div className="flex flex-col gap-6 py-6 bgred-200 w-full">
        <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4  p-8">
          <div className="flex w-full" id="firstName">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder={customer.customer.name}/>
          </div>
          <div className="flex w-full" id="lastName">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder={customer.customer.lastname} />
          </div>
          <div className="flex w-full" id="email">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder={customer.customer.email} />
          </div>
          <div className="flex max-md:flex-col w-full gap-2" id="phone">
            <div>
              {/* <AreaCodeSelector  /> */}
            </div>
            <div id="number" className="w-full md:w-[calc(100%-120px)] flex">
              <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder={customer.customer.phone[0].number} />
            </div>
          </div>
          <div className="flex w-full" id="address">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder={customer.customer.address} />
          </div>
          <div className="flex justify-center items-center">
            <button onClick={() => {}} className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2">
              Save Changes
            </button>
          </div>
        </form>

        <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4  p-8">
          <div className="flex w-full" id="currentPassword">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Current Password" />
          </div>
          <div className="flex w-full" id="newPassword">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="New Password" />
          </div>
          <div className="flex w-full" id="confirmPassword">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Confirm Password" />
          </div>
          <div className="flex justify-center items-center">
            <button onClick={() => {}} className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      }
    </section>
  );
}

export default MyProfile;