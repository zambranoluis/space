"use client";

import { FaUserCircle } from "react-icons/fa";

const MyProfile = () => {
  return (
    <section className="flex flex-col wfull  bgred-300 max-w-[500px] justify-center items-center w-[80%] place-self-center py-4 gap-6">
      <div className="text-center text-[#6d786f]">
        <div className="flex justify-center items-center">
          < FaUserCircle className="text-[100px] " />
        </div>
        <div>
          <h1 className="font-bold">arkweb@gmail.com</h1>
          <h2 className="">Claudia Alves</h2>
          <p className="">Client</p>
        </div>
      </div>

      <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4  p-8">
        <div className="flex w-full" id="firstName">
          <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="First Name"/>
        </div>
        <div className="flex w-full" id="lastName">
          <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Last Name" />
        </div>
        <div className="flex w-full" id="email">
          <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Email" />
        </div>
        <div className="flex max-md:flex-col w-full gap-2" id="phone">
          <div id="areaCode" className="bgred-300 rounded-full border border-[#6d786f] w-[100px] h-[50px]">
            
          </div>
          <div id="number" className="w-full md:w-[calc(100%-100px)] flex">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Phone Number" />
          </div>
        </div>
        <div className="flex w-full" id="adress">
          <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Adress" />
        </div>
        <div className="flex justify-center items-center">
          <button onClick={(e) => {e.preventDefault();}} className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2">
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
          <button onClick={(e) => {e.preventDefault();}} className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default MyProfile;