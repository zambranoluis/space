"use client";

import { Image } from "@heroui/image";

import { IoCloseOutline } from "react-icons/io5";

import { SlPicture } from "react-icons/sl";
import { CiFolderOn } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";

const handleShowChat = () => {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer?.classList.toggle("max-h-0");
};

// const handleCloseChat = () => {

// }

const ChatModal = () => {
  return (
    <div className="flex flex-col gap-2">
      <div
        id="chatContainer"
        className="h[450px] w-[250px] max-h-0 overflow-hidden transition-all duration-300 bg-white bgred-300 rounded-3xl shadow-md shadow-black flex  flex-col gap-2"
      >
        <div className="flex justify-between px-8 py-2">
          <div className="flex justify-center items-center gap-2">
            <Image
              className="w-[30px] aspect-square rounded-none"
              src="https://github.com/BPM94/SCCTMD/raw/main/logos/RedezignitFavIcon.png"
              alt=""
            />
            <h1 className="font-bold text-[#858e5b]">Internal Chat</h1>
          </div>
          <div
            className="flex justify-center items-center cursor-pointer bgred-300"
            onClick={() => {
              handleShowChat();
            }}
          >
            <IoCloseOutline className="text-2xl text-[#ebebeb]" />
          </div>
        </div>
        <div className="w-[90%] bg-[#f3f3f3] h-[70%] flex flex-col gap-4 place-self-center rounded-3xl p-4 overflow-y-scroll">
          <div className="text-xs text-[#c3c3c3] gap-2 h[30%] bggreen-300">
            <p> Office Hours (Monday - Friday) (8AM to 5PM PST).</p>
            <p>
              One of our project managers will get back to you. Thank you for
              your patience.
            </p>
          </div>
          <div className="h[70%] bgblue-300 text-black ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam quam
            animi dolor, assumenda vitae eos facilis molestiae fuga libero
            reiciendis debitis porro, officiis impedit, recusandae corporis
            accusamus. Magnam, quo eum?
          </div>
        </div>
        <div className="flex bgred-300 w-[90%] place-self-center ">
          <div className="flex relative w[80%] bggreen-300 w-full p-1">
            <div className="flex w-full">
              <input
                className="bg-white w-full  text-black text-sm outline-none border-black border px-2 py-6 rounded-xl"
                type="text"
              />
            </div>
            <div className="flex absolute right-[10px] bottom-[8px] gap-1">
              <SlPicture className="text-[#c3c3c3] text-xl cursor-pointer" />
              <CiFolderOn className="text-[#c3c3c3] text-xl cursor-pointer" />
              <CiFaceSmile className="text-[#c3c3c3] text-xl cursor-pointer" />
            </div>
          </div>
          <div className="flex w[20%] bgblue-200 justify-center items-center p-2">
            <IoMdSend className="text-[#c3c3c3] text-4xl cursor-pointer" />
          </div>
        </div>
      </div>
      <div
        id="chatButton"
        className="bgwhite bg[#6c786e] select-none p-2 rounded-full cursor-pointer flex place-self-end drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,1)]"
        onClick={() => {
          handleShowChat();
        }}
      >
        <Image
          className="w-[80px] aspect-square"
          src="https://github.com/BPM94/SCCTMD/raw/main/logos/logoChatRDZWhite.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default ChatModal;
