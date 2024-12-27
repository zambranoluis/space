'use client'
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { useState } from "react";

import { Image } from "@nextui-org/image";
import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { SlArrowDown } from "react-icons/sl";

import { MdEmail } from "react-icons/md";
import { GrSkype } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";




import { FaqsContactUsEmail, FaqsContactUsSkype, FaqsContactUsWhatsapp } from "@/components/faqsContactUs";




const CreateAccount = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const toggleAnswer = (id: number) => {
    const container = document.getElementById(`answerContainer${id}`);
    const answer = document.getElementById(`answer${id}`);
    const arrow = document.getElementById(`arrow${id}`);

    if (answer?.classList.contains("hidden")) {
      answer?.classList.remove("hidden");
      arrow?.classList.add("rotate-180");
    } else {
      answer?.classList.add("hidden");
      arrow?.classList.remove("rotate-180");
    }
}



  return (
    
    <main className="flex w-full h-[90vh] bg-white p2 flex-col">
      
      <section className="flex flex-col w-full h-[80vh]  bg-[#302626]">
        <div className="bg-red-200 pl-16 py-8 w-full">
          <h1 className="text-5xl font-bold">Reviews</h1>
        </div>
        <div className="flex bg-blue-300 h-full gap-8">
          <div className="flex bg-pink-400 w-full h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg1.png")`}}>

          </div>
          <div className="flex bg-purple-400 w-full h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg2.png")`}}>

          </div>
        </div>
      </section>
      
    </main>
  );
};

export default CreateAccount;
