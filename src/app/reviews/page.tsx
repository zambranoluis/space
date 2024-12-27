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
    
    <main className="flex w-full min-h-screen bg-purple-500 p2 flex-col">

      
    </main>
  );
};

export default CreateAccount;
