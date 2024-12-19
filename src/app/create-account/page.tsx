'use client'

import { Image } from "@nextui-org/image";
import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";
import { GrSkype } from "react-icons/gr";

import { DatePicker } from "@nextui-org/date-picker";

const CreateAccount = () => {
  return (
    <main className="flex w-full min-h-screen bgred-500">
      <div className="flex w-full max-lg:relative">
        <div
          className="w-[40%] max-lg:w-full max-lg:absolute h-full bgblue-400 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/opt/createAccountBG.webp')" }}
        ></div>
        <div className="w-[60%] h-full bggreen-400 max-lg:w-full z-[100]">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col h-full lg:bg-white">
              <div className="w-full h-[15%] flex justify-center items-center bgred-500">
                <Link href="/">
                  <Image
                    src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
                    alt="logo"
                    className="h-full"
                  />
                </Link>
              </div>
              <div className="flex  overflow-y-auto bgred-400">
                <form
                  className="flex flex-col w-full h-full bgorange-300"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = "#";
                  }}
                >
                  <div id="fields" className="flex flex-col w-[80%] h-full  place-self-center"
                  >
                    <div id="name-lastname" className="flex w-full bgblue-500">
                      <div id="name" className="flex w-full p-2 bgrose-400">
                        <input
                          className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div id="lastname" className="flex w-full p-2 bgpurple-500">
                        <input
                          className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div id="email" className="flex w-full p-2">
                      <input
                        className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                    <div id="password" className="flex flex-col w-full">
                      <div id="createPassword" className="flex w-full p-2">
                        <input
                          className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="Create Password"
                        />
                      </div>
                      <div id="confirmPassword" className="flex w-full p-2">
                        <input
                          className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                    <div id="phone" className="flex w-full p-2 gap-2">
                      <div className="flex items-center justify-center w-[150px] gap-1 p-1 text-[#828282] border border-[#828282] rounded-full cursor-pointer max-lg:bg-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">
                        <p>+1</p>
                        <Image className="w-[35px] rounded-md" src="/us.png" alt="" />
                        <IoMdArrowDropdown className="text-xl" />
                      </div>
                      <input
                        className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="text"
                        placeholder="Phone"
                      />
                    </div>
                    <div id="skype" className="flex w-full p-2">
                      <div className="flex w-full p-2 bgred-300 rounded-full border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] max-lg:bg-white max-w-[350px]">
                        <div className="flex items-center justify-center w-[70px]">
                          <GrSkype className="text-3xl text-[#08b2f0]" />
                        </div>
                        <div className="flex w-full">
                          <input
                            className="w-full h-full outline-none"
                            type="text"
                            placeholder="Skype"
                          />
                        </div>
                      </div>
                    </div>
                    <div id="address" className="flex w-full p-2">
                      <input
                        className="w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                    <div id="birthdate" className="flex w-[60%] p-2 max-w-[300px]">
                      <DatePicker
                        className="max-w-sm max-lg:bg-white rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        label={"Birth date"}
                        radius="full"
                        variant="bordered"
                        showMonthAndYearPickers
                      />
                    </div>
                  </div>
                  <div
                    id="submit"
                    className="flex items-center justify-center w-full mt-2 p-2 bgrose-400"
                  >
                    <button className="px-12 py-2 font-bold text-white bg-[#5ea789] rounded-bl-2xl rounded-tr-2xl hover:bg-green-800 max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-center w-full bg-red-300 lg:h-[10%] lg:bg-[#353535]">
              <p className="text-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">
                Already Registered?{" "}
                <Link href="/login" className="font-bold">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAccount;
