'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { TiArrowSortedDown } from "react-icons/ti";

import {Switch} from "@nextui-org/switch";






function ShoppingCart() {

  

  return (
    <main className="w-full bgrose-400 flex flex-col">
      <section id="qHome" className="flex max-md:flex-col w-full md:h-[500px]">
        <div className="flex flex-col w-full md:w-[50%] bgred-200 p-2 justify-center md:gap-16  ">
          <div className="flex bggreen-300 p-2 min-lg:pl-12 justify-center items-center">
            <Image className={`w-full bgblue-300 max-w-[250px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
              src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
              alt=""
            />
          </div>
          <div className=" flex flex-col  gap-2 p-2 min-lg:pl-20 justify-center items-center bgrose-500">
            <div className="flex flex-col">
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
    </main>
  );
}

export default ShoppingCart;
