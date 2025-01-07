'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

import {Switch} from "@nextui-org/switch";






function ShoppingCart() {

  

  return (
    <main className="w-full bgrose-400 flex flex-col gap-12">
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
          {/* <Image className="rounded-none bg-center bg-cover bg-no-repeat" src="/questionnaire/questionnaireBGTop.webp"  alt=""/> */}
        </div>
      </section>
      <section id="generalQuestions" className="flex flex-col w-full bg-red-200 min-h-[500px]">
        <div>
          <div>
            <div>
              <h1>Tell us the area you want to design</h1>
            </div>
          </div>
          <div>
            <div>
              <p>▪ Backyard</p>
              <input type="checkbox" />
            </div>
            <div>
              <p>▪ Frontyard</p>
              <input type="checkbox" />
            </div>
            <div>
              <p>▪ Both</p>
              <input type="checkbox" />
            </div>
            <div>
              <p>▪ Side Yard</p>
              <input type="checkbox" />
            </div>
            
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1>What style are you looking for your space?</h1>
            </div>
            <div>
              <div>
                <div>
                  <Image src="" alt=""/>
                </div>
              </div>
              <div className="flex gap-2">
                <p>Other: </p>
                <div className="border border-b-black">
                  <input className="outline-none bg-white" placeholder="" type="text" />
                </div>
              </div>
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
