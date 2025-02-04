"use client"

import { Card, CardBody, CardFooter } from "@nextui-org/card";


import { Image } from "@nextui-org/image";

import { TiArrowSortedDown } from "react-icons/ti";

import { SlArrowDown } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import React from "react";

interface Review {
  id: number,
  date: string,
  name: string,
  rating: number,
  avatar: string,
  background: string,
  text: string
};

interface ReviewsProps {
  selectedReview1: Review;
  selectedReview2: Review;
  handleSelectedReview: (direction: string) => void;
}

const Section: React.FC<ReviewsProps> = ({selectedReview1, selectedReview2, handleSelectedReview}) => {
  return (
    <main className="flex w-full bg-white flex-col">
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
                  <p className="text-sm text-black">
                    {selectedReview1.text}
                  </p>
                </div>
                <div className="flex justify-end mt-4 text-black">
                  <SlArrowDown className="cursor-pointer" />
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
                  <p className="text-sm h-[80px] bgred-300 overflow-hidden text-black">
                    {selectedReview2.text}
                  </p>
                </div>
                <div className="flex justify-end mt-4 text-black">
                  <SlArrowDown className="cursor-pointer" />
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
            <TiArrowSortedDown className="text-3xl text-white rotate-90" onClick={() => {handleSelectedReview("prev")}} />
          </div>
          <div className="flex p-1 border-white rounded-full border-1 cursor-pointer">
            <TiArrowSortedDown className="text-3xl text-white -rotate-90" onClick={() => {handleSelectedReview("next")}}/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Section;