'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { TiArrowSortedDown } from "react-icons/ti";

import {Switch} from "@nextui-org/switch";






function ShoppingCart() {

  

  return (
    <main className="w-full bgrose-400 flex flex-col">
      <section id="qHome">
        <div>
        <Image className={`max-w-[250px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
          src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
          alt=""
        />
        </div>
        <div className="text-black">
          <h1>Questionnaire</h1>
          <p>Answer the following questions to help us
          design your dream space</p>
        </div>
      </section>
    </main>
  );
}

export default ShoppingCart;
