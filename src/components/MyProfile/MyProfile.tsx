"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

import {Customer} from "@/utils/dataInterfaces"

interface MyProfileProps {
  customer: Customer;
}

const MyProfile: React.FC<MyProfileProps> = ({ customer }) => {
  return (
    <section className="flex flex-col w-full bgred-500 max-w-[500px] justify-center items-center w-[80%] place-self-center py-4 gap-6">
      <div className="text-center text-[#6d786f] bg-white w-full sticky top-0 z-[2000]">
        <div className="flex justify-center items-center">
          <FaUserCircle className="text-[100px]" />
        </div>
        {customer ? (
          <div>
            <h1 className="font-bold">{customer.email}</h1>
            <h2 className="">{customer.name} {customer.lastname}</h2>
            <p className="">Client</p>
          </div>
        ) : (
          <div>
            <p>No user data available right now.</p>
          </div>
        )}
      </div>

      {customer && (
        <div className="flex flex-col gap-6 py-6 bgred-200 w-full">
          <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4 p-8">
            <div className="flex w-full" id="firstName">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder={customer.name}
              />
            </div>
            <div className="flex w-full" id="lastName">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder={customer.lastname}
              />
            </div>
            <div className="flex w-full" id="email">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder={customer.email}
              />
            </div>
            <div className="flex max-md:flex-col w-full gap-2" id="phone">
              <div>
                {/* <AreaCodeSelector  /> */}
              </div>
              <div id="number" className="w-full md:w-[calc(100%-120px)] flex">
                <input
                  className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                  type="text"
                  placeholder={`${customer.phone.areaCode} ${customer.phone.number}`}
                />
              </div>
            </div>
            <div className="flex w-full" id="address">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder={customer.address}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => {}}
                className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>

          <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4 p-8">
            <div className="flex w-full" id="currentPassword">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder="Current Password"
              />
            </div>
            <div className="flex w-full" id="newPassword">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder="New Password"
              />
            </div>
            <div className="flex w-full" id="confirmPassword">
              <input
                className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full"
                type="text"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => {}}
                className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default MyProfile;