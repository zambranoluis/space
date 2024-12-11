'use client'

import { useState } from "react";

import {Image} from "@nextui-org/image";

import Link from "next/link";

import { FaCheck } from "react-icons/fa";




function HomePage() {


  const [currentPicture, setCurrentPicture] = useState(0);

  const handleCurrentPicture = (index) => {
    setCurrentPicture(index);
  };



  return (
    <main className='w-full  bgrose-400 flex flex-col bg-red-400 '  >
      <section className=" bgpurple-500 flex flex-col w-full">
        <div className="flex max-lg:flex-col max-lg:gap-2 max-lg:justify-center items-center w-full px-16 py-8 lg:gap-6">
          <div className="w[40%] bgblue-300 flex justify-center items-center max-lg:w-full p-2">
            <p className="text-5xl font-black whitespace-nowrap text-center text-[#6b776d]">SHOPPING CART</p>
          </div>
          <div className="w[60%]">
            <p className="text-xs text-[#83826e]">
              At Space Creations we will make your idea come true in 3 simple steps, a specialized designer will work on the perfect space for your property. After 
              sharing your ideas with us along with photos and videos of your property you will schedule a call with one of our project managers to discuss your ideas 
              and the designer can begin creating your new space.
            </p>
          </div>
        </div>
        <div className="flex w-full bgred-500 p2">
          <div className="w-full h-[75vh] bg-cover bg-no-repeat relative" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/carrito1.jpg')" }}>
            <div className="bg-white/50 w-[50%] absolute bottom-0 flex justify-center items-center py-4">
              <div className="w-[50%]">
                <h2 className="font-black">Includes:</h2>
                <p>● 30-minute phone call with a project manager</p>
                <p>● One round of design revisions</p>
                <p>● 2-3 week to design delivery</p>
                <p>● Plant selection specific for your property</p>
                <p>● List of materials selected for your project</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

    </main>
  )
}

export default HomePage;