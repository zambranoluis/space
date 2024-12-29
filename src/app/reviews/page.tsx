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

import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";





import { FaqsContactUsEmail, FaqsContactUsSkype, FaqsContactUsWhatsapp } from "@/components/faqsContactUs";
import { b } from "framer-motion/client";

const reviews = [
  {
    id: 1,
    date: "24 nov 2024",
    name: "Carlos Ramírez",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    background: "https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg1.png",
    text: 'Incredible work! They completely transformed my garden. It’s now my favorite place to relax. Super professional and creative. I highly recommend them!"'
  },
  {
    id: 2,
    date: "13 jun 2022",
    name: "Sebastian Lara",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    background: "https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg2.png",
    text: 'From the first consultation to the final detail, the team was impeccable. They listened to all my ideas and improved them with solutions I could never have imagined. My garden looks beautiful and functional. Thank you so much!"'
  },
  {
    id: 3,
    date: "24 dec 2021",
    name: "Rosse More",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    background: "https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg3.png",
    text: 'We hired their services to redesign our entire outdoor area, and the result was stunning!The balance between aesthetics and functionality is perfect. Our home looks so much more welcoming and elegant. Excellent value"'
  },
  {
    id: 4,
    date: "20 jan 2022",
    name: "Estefania Marin",
    rating: 5,
    avatar: "https://t4.ftcdn.net/jpg/07/61/35/67/360_F_761356733_9CS91hVomGiiwYBOJavKTsVYHciVezT8.jpg",
    background: "https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg4.jpg",
    text: 'Before, my backyard was just a lifeless space. Now, thanks to this team of landscaping experts, I have an oasis full of color and harmony. It feels like having a little paradise at home. Highly recommended!"'
  },
  {
    id: 5,
    date: "24 dec 2021",
    name: "Iris Diaz",
    rating: 4,
    avatar: "https://img.freepik.com/premium-vector/business-woman-character-vector-illustration_1133257-2432.jpg?semt=ais_hybrid",
    background: "https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg5.png",
    text: 'What I loved the most was how they combined my ideas with their expertise to achieve something spectacular. They guided me through everything: from plant selection to lighting. The result is a modern and natural design that looks'
  },
  {
    id: 6,
    date: "20 jan 2022",
    name: "Ana Torres",
    rating: 5,
    avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/f5b9613e-7853-4170-84fd-2015606585bf/9d3e2b98-8524-4fcb-bf17-74fa6fb78274.png",
    background: "https://github.com/BPM94/SCCTMD/raw/main/opt/reviewBg3.png",
    text: 'The landscaping they designed in my garden perfectly complements the modern style of my home. They understood my needs and created a functional, green, and beautiful space. I’m thrilled with the result!"'
  },
]



const CreateAccount = () => {
  const [selectedReview1, setSelectedReview1] = useState(reviews[0]);
  const [selectedReview2, setSelectedReview2] = useState(reviews[1]);

  const handleSelectReview = (direction: string) => {
    const currentIndex1 = reviews.findIndex(review => review.id === selectedReview1.id);
    const currentIndex2 = reviews.findIndex(review => review.id === selectedReview2.id);
  
    switch (direction) {
      case "next": {
        const nextIndex1 = (currentIndex1 + 2) % reviews.length;
        const nextIndex2 = (currentIndex2 + 2) % reviews.length;
  
        setSelectedReview1(reviews[nextIndex1]);
        setSelectedReview2(reviews[nextIndex2 < reviews.length ? nextIndex2 : 0]);
        break;
      }
  
      case "prev": {
        const prevIndex1 = (currentIndex1 - 2 + reviews.length) % reviews.length;
        const prevIndex2 = (currentIndex2 - 2 + reviews.length) % reviews.length;
  
        setSelectedReview1(reviews[prevIndex1]);
        setSelectedReview2(reviews[prevIndex2 >= 0 ? prevIndex2 : reviews.length - 1]);
        break;
      }
  
      default:
        break;
    }
  };




  return (
    
    <main className="flex w-full bg-white pb-12 flex-col">
      <section className="flex flex-col w-full   bg-[#302626]">
        <div id="title" className="bgred-200 pl-16 py-8 w-full">
          <h1 className="text-5xl font-bold text-white">Reviews</h1>
        </div>
        <div id="reviewsContainer" className="max-md:flex-col flex bgblue-300 h-full gap-8">
          <div className="max-sm:h-[60vh] sm:h-[80vh] flex bgpink-400 w-full pl-12 pb-12  justify-start items-end h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("${selectedReview1.background}")`}}>
            <Card className="w-[70%] h[250px] max-w-[350px] bg-[#dcd6c8] px-8">
              <CardBody className="flex flex-col border-b-1 border-black gap-2">
                <div className="flex">
                  <Image className="h-[70px]" src="/quotes.png" alt="" />
                </div>
                <div className="flex h-[80px] bgred-300 overflow-hidden ">
                  <p className="text-sm">
                    {selectedReview1.text}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <SlArrowDown />
                </div>
              </CardBody>
              <CardFooter className="flex justify-center items-center ">
                <div className="flex justify-center items-center gap-4">
                  <div className="flex">
                    <Image className="rounded-full w-[60px]" src={selectedReview1.avatar} alt="" />
                  </div>
                  <div className="flex flex-col text-[#6b776d]">
                    <div className="flex"><h1 className="font-semibold">{selectedReview1.name}</h1></div>
                    <div className="flex p-1 gap-2">
                      {
                        Array.from({ length: 5 }, (_, index) =>
                          index < selectedReview1.rating ? (
                            <FaStar key={index} className="" />
                          ) : (
                            <FaRegStar key={index} className="" />
                          )
                        )
                      }
                    </div>
                    <div className="flex">
                      <p className="text-xs">{selectedReview1.date}</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="max-sm:h-[60vh] sm:h-[80vh] flex bgpurple-400 w-full pl-12 pb-12 justify-start items-end h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url("${selectedReview2.background}")`}}>
          <Card className="w-[70%] h[250px] max-w-[350px] bg-[#dcd6c8] px-8">
              <CardBody className="flex flex-col border-b-1 border-black gap-2">
                <div className="flex">
                  <Image className="h-[70px]" src="/quotes.png" alt="" />
                </div>
                <div className="flex">
                  <p className="text-sm h-[80px] bgred-300 overflow-hidden">
                    {selectedReview2.text}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <SlArrowDown />
                </div>
              </CardBody>
              <CardFooter className="flex justify-center items-center ">
                <div className="flex justify-center items-center gap-4">
                  <div className="flex">
                    <Image className="rounded-full w-[60px]" src={selectedReview2.avatar} alt="" />
                  </div>
                  <div className="flex flex-col text-[#6b776d]">
                    <div className="flex"><h1 className="font-semibold">{selectedReview2.name}</h1></div>
                    <div className="flex p-1 gap-2">
                      {
                        Array.from({ length: 5 }, (_, index) =>
                          index < selectedReview2.rating ? (
                            <FaStar key={index} className="" />
                          ) : (
                            <FaRegStar key={index} className="" />
                          )
                        )
                      }
                    </div>
                    <div className="flex">
                      <p className="text-xs">{selectedReview2.date}</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div id="arrowsContainer" className="flex p-4 gap-4 place-self-center mt-6">
          <div className="flex p-1 border-white rounded-full border-1 cursor-pointer">
            <TiArrowSortedDown className="text-3xl text-white rotate-90" onClick={() => {handleSelectReview("prev")}} />
          </div>
          <div className="flex p-1 border-white rounded-full border-1 cursor-pointer">
            <TiArrowSortedDown className="text-3xl text-white -rotate-90" onClick={() => {handleSelectReview("next")}}/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateAccount;
