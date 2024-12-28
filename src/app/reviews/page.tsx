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

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";


import { Image } from "@nextui-org/image";

import { TiArrowSortedDown } from "react-icons/ti";

import { SlArrowDown } from "react-icons/sl";

import { useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


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
    
    <main className="flex w-full bg-white pb-12 flex-col">
      <section className="flex flex-col w-full   bg-[#302626]">
        <div id="title" className="bgred-200 pl-16 py-8 w-full">
          <h1 className="text-5xl font-bold text-white">Reviews</h1>
        </div>
        <div id="reviewsContainer" className="max-md:flex-col flex bgblue-300 h-full gap-8">
          <div className="max-sm:h-[50vh] sm:h-[60vh] flex bgpink-400 w-full pl-12 pb-12  justify-start items-end h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg1.png")`}}>
            <Card className="w-[70%] h-[250px] max-w-[350px] bg-[#dcd6c8]">
              <CardBody>
                <div className="flex">
                  <Image className="h-[90px]" src="/quotes.png" alt="" />
                </div>
                <div className="flex">
                  <p>
                  Incredible work! They completely 
transformed my garden. It’s now my 
favorite place to relax. Super 
professional and creative. I highly 
recommend them!&quot;
                  </p>
                </div>
                <div></div>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </div>
          <div className="max-sm:h-[50vh] sm:h-[60vh] flex bgpurple-400 w-full pl-12 pb-12 justify-start items-end h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg2.png")`}}>
            <Card className="w-[70%] h-[250px] max-w-[350px] bg-[#dcd6c8]">
              <CardHeader></CardHeader>
              <CardBody></CardBody>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
        <div id="arrowsContainer" className="flex p-4 gap-4 place-self-center mt-6">
          <div className="flex p-1 border-white rounded-full border-1 cursor-pointer">
            <TiArrowSortedDown className="text-3xl text-white rotate-90"/>
          </div>
          <div className="flex p-1 border-white rounded-full border-1 cursor-pointer">
            <TiArrowSortedDown className="text-3xl text-white -rotate-90"/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateAccount;
