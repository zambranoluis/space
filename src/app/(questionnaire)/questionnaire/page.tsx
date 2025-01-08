'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

import {Switch} from "@nextui-org/switch";


import {
  questionnaire
} from "./questionnaire";



function ShoppingCart() {

  

  return (
    <main className="w-full bgrose-400 flex flex-col gap-12 items-center">
      <section id="Landing" className="flex max-md:flex-col w-full md:h-[500px]">
        <div className="flex flex-col w-full md:w-[50%] bgred-200 p-2 justify-center gap-4 md:gap-16  py-12">
          <Link className="flex bggreen-300 p-2 min-lg:pl-12 justify-center items-center" href={"/shopping-cart"}>
            <Image className={`w-full bgblue-300 max-w-[250px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
              src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
              alt=""
            />
          </Link>
          <div className=" flex flex-col  gap-2 p-6  justify-center items-center bgrose-500">
            <div className="flex flex-col md:pl-8 bggreen-400">
              <h1 className="font-black text-3xl text-[#6c786e] min-[400px]text-5xl bgorange-200">Questionnaire</h1>
              <p className="text-xs text-black min-[400px]text-lg bgorange-500">Answer the following questions to help us<br />
              design your dream space</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-md:h-[500px]  md:w-[50%] bg-center bg-cover bg-no-repeat" style={{backgroundImage: "url('/questionnaire/questionnaireBGTop.webp')",}}>
          
        </div>
      </section>
      <section id="generalQuestions" className="flex flex-col bgred-200 min-h-[500px] w-[90%] gap-12">
        <div id="gq1" className="flex flex-col bgred-300 rounded-t-3xl border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-2 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][0].title}</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 py-12 gap-2 text-black">
            {
              questionnaire["general"][0].options.map((option, index) => (
                <div className="flex bgblue-300 gap-2 w-full items-center justify-center " key={option.id}>
                  <div className="w-[60%] bggreen-300 justify-end items-end flex">
                    <p className="text-xs sm:text-base flex justify-center items-center gap-1"><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                  </div>
                  <div className="w-[15%] bgyellow-200">
                    <input className="text-[#ebebeb]" type="checkbox" />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div id="gq2" className="flex flex-col bgred-300 rounded-t-3xl border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-2 text-xl font-black rounded-t-3xl">
            <h1>What style are you looking for your space?</h1>
          </div>
          <div className="w-full bgblue-300">
            <div className="grid grid-cols-1  gap-2 py-6 min-[400px]:grid-cols-2 md:grid-cols-4 bggreen-300">
              {
                questionnaire["general"][1].options.map((option, index) => (
                  <div className="bgred-300 flex flex-col justify-center items-center p-4" key={option.id}>
                    <Image className="w-[90px] h-[90px] object-cover object-center rounded-full" src="/questionnaire/placeholder.webp" alt=""/>
                    <div className="flex justify-center items-center gap-2 p-2">
                      <p className="text-black flex justify-center items-center gap-1"><span className="text-xl text-[#68664d]">▪ </span>{option.name}</p>
                      <input type="checkbox" />
                    </div>
                  </div>
                ))
              }
            </div>
            <div id="gqOther" className="flex gap-2 w-full bgred-200 px-16 py-12 text-black">
              <p className="text-[#68664d]">Other: </p>
              <div className="border border-b-black border-b-2 w-full">
                <input className="outline-none bg-white w-full text-black  pl-2" placeholder="" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div id="gq3" className="flex flex-col bgred-300 rounded-t-3xl border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][2].title}</h1>
          </div>
          <div className="flex relative h-[120px]">
            <div className="flex justify-center items-center bgred-200 pl-2 min-[450px]:pl-8">
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                Yes/No
              </button>
            </div>
            <div className="bgred-300 h-full w-full absolute justify-end items-center flex pr-2 min-[450px]:pr-8 top-[-15px]">
              <Image className="w-[120px] h-[120px] rounded-full" src={questionnaire["general"][2].img} alt="" />
            </div>
          </div>
        </div>
        <div id="gq4" className="flex flex-col bgred-300 rounded-t-3xl border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][3].title}</h1>
          </div>
          <div className="flex relative h-[120px]">
            <div className="flex justify-center items-center bgred-200 pl-2 min-[450px]:pl-8">
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                Yes/No
              </button>
            </div>
            <div className="bgred-300 h-full w-full absolute justify-end items-center flex pr-2 min-[450px]:pr-8 top-[-15px]">
              <Image className="w-[120px] h-[120px] rounded-full" src={questionnaire["general"][3].img} alt="" />
            </div>
          </div>
        </div>
        <div id="gq5" className="flex flex-col bgred-300 rounded-t-3xl border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][4].title}</h1>
          </div>
          <div className="flex relative h-[120px]">
            <div className="flex justify-center items-center bgred-200 pl-2 min-[450px]:pl-8">
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                Yes/No
              </button>
            </div>
            <div className="bgred-300 h-full w-full absolute justify-end items-center flex pr-2 min-[450px]:pr-8 top-[-15px]">
              <Image className="w-[120px] h-[120px] rounded-full" src={questionnaire["general"][4].img} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="backyardQuestions"></section>
      <section id="frontyardQuestions"></section>
      <section id="customerUploads"></section>
    </main>
  );
}

export default ShoppingCart;
