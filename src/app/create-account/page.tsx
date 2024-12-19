'use client'

import { Image } from "@nextui-org/image";
import Link from "next/link";

import {DatePicker} from "@nextui-org/date-picker";

const CreateAccount = () => {
  return (
    <main className="flex bgred-500 w-full h-screen">
      <div className="flex w-full max-lg:relative">
        <div className="w-[40%] max-lg:w-full max-lg:absolute h-full bgblue-400 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/createAccountBG.jpg')"}}>
        </div>
        <div className="w-[60%] h-full bggreen-400 max-lg:w-full z-[100]">
          <div className="w-full  flex flex-col h-full place-self-center">
            <div className="h-[90%] w-full flex flex-col lg:bg-white">
              <div className="w-full bgred-500 h-[20%] flex justify-center items-center">
                <Image
                  src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
                  alt="logo"
                  className="h-full "
                />
              </div>
              <div className="flex h-[80%]">
                <form className="w-full h-full bgorange-300 flex flex-col bggreen-400" onSubmit={(e) => {e.preventDefault(); window.location.href = '#'; }}>
                  <div id="fields" className="flex flex-col h-[80%] w-[80%] place-self-center">
                  <div id="name-lastname" className="flex bgblue-500 w-full">
                    <div id="name" className="p-2 w-full bgrose-400 flex">
                      <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="First Name" />
                    </div>
                    <div id="lastname" className="p-2 w-full bgpurple-500 flex">
                      <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="Last Name" />
                    </div>
                  </div>
                  <div id="email" className="p-2 w-full flex">
                    <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="Email" />
                  </div>
                  <div id="password" className="flex w-full flex-col ">
                    <div id="createPassword" className="p-2 flex w-full">
                      <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="Create Password" />
                    </div>
                    <div id="confirmPassword" className="p-2 flex w-full">
                      <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="Confirm Password" />
                    </div>
                  </div>
                  <div id="phone" className="flex w-[80%] p-2 ">
                    <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="Phone" />
                  </div>
                  <div id="address" className="flex w-full p-2 ">
                    <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="text" placeholder="Address" />
                  </div>
                  <div id="birthdate" className="flex w-[60%] p-2 max-w-[300px] ">
                    <input className="border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] text-[#828282] rounded-full p-3  w-full" type="date" placeholder="Birthdate" />
                  </div>

                  </div>
                  <div id="submit" className="p-2 h-[20%] bgrose-400 flex w-full justify-center items-center">
                  <button className="px-12 py-2 bg-[#5ea789] text-white hover:bg-green-800 font-bold rounded-bl-2xl rounded-tr-2xl max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]" >
                  Create Account
                </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="h-[10%] w-full flex lg:bg-[#353535] justify-center items-center">
              <p className="text-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">Already Registered? <Link href="/login" className="font-bold">Login here.</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CreateAccount;