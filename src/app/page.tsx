'use client'


import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect, useState, useRef, use } from "react";
import EmailSubscription from "@/components/EmailSubscription";



import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {Image} from "@nextui-org/image";

import Link from "next/link";

import{
  pictures,
  steps,
  packagesDetails,
  packagesProducts
} from "./resources"






function HomePage() {
  const scrollContainerRef = useRef(null);

  const [currentPictureButton, setCurrentPictureButton] = useState(0);

  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const handleCurrentPictureButton = (sectionId: number) => {
    const targetSection = document.getElementById(`${sectionId}`);
    setCurrentPictureButton(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="flex flex-col relative ">
          <Navbar />
          <main className='w-full bgrose-400 text-black max-md:mt-[130px] md:mt-[100px] lg:mt-0 ' >
            <section id="CTA" className="flex bgpurple-400  sm:h-[70vh] lg:h-[85vh] max-sm:flex-col w-full">
              <div className="flex w-full text-[#6b776d] flex-col max-sm:h-[45vh] justify-center max-[350px]:gap-4 gap-10   items-center sm:w-[40vw] lg:w-[45vw] bgred-300 h-full sm:px-4 lg:px-0">
                <div className="flex flex-col justify-center items-center gap-4 w-full ">
                  <Link className="bgred-200 w-full max-w-[300px] justify-center items-center flex border-2 border-[#6b776d] py-6" href="/shopping-cart">
                    EXPLORE DESIGN PACKAGES
                  </Link>
                  <Link className="bgred-200 flex justify-center items-center w-full max-w-[300px]  bg-gray-200 py-6" href="/portfolio">
                    VISIT OUR PORTFOLIO
                  </Link>
                </div>
                <div className="w-full flex flex-col justify-center items-center ">
                  <p>
                    Dream with us ● Design with us
                  </p>
                  <p>Create your Account <Link className="text-[#6b776d] underline" href="/create-account" >here.</Link></p>
                </div>
              </div>
              <div className="flex flex-col  w-full max-sm:h-[50vh]   sm:w-[60vw] lg:w-[55vw] bgblue-400 ">
                <div className="flex w-full bgred-400 h-full overflow-x-auto noScrollBar" ref={scrollContainerRef}>
                  {
                    pictures.map((picture, index) => (
                      <div className="bgpurple-400 flex-shrink-0 h-full w-full flex" key={index} id={`${index}`} >
                        <Image className="w-full  h-full object-cover object-center no-border-radius rounded-none" src={picture.image}
                        loading="lazy"
                        alt="" />
                      </div>
                    ))
                  }
                </div>
                <div className="flex bgblue-300 w-full justify-center items-center gap-2 py-4">
                  {
                    pictures.map((picture, index) => (
                      <div className={` ${currentPictureButton === index ? "bg-[#6b776d]" : "bg-gray-400"}  h-[20px] w-[20px] rounded-full cursor-pointer`} key={index} id={`${index}`} onClick={() => {handleCurrentPictureButton(index);}}>
                      </div>
                    ))
                  }
                </div>
              </div>
            </section>
            <section id="steps" className="flex mt-[20px] flex-col  justify-center items-center bgred-300">
              <div id="banner" className="w-full bg-[#848d5c] text-white  relative py-12 md:pl-16">
                <div className="bgblue-200 max-w-[750px]  z-[100] flex flex-col px-6 gap-2">
                  <p className="text-5xl font-black ">
                    Bring your vision to life in three simple steps
                  </p>
                  <p className="text-lg">
                    Professional landscape design, always for a low flat fee
                  </p>
                </div>
                <div className="max-[400px]:h-[60px] h-[100px] max-[400px]:w-[60px] w-[100px] bg-[#848d5c] z-[-1] absolute max-[400px]:bottom-[-25px] bottom-[-50px] left-[10%] rotate-45"></div>
              </div>
              <div id="stepsContainer" className="w-full   bgrose-400">
                {
                  steps.map((step, index) => (
                    <div id={"step" + step.id} className={`lg:p-2 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} max-lg:flex-col flex bgred-300 w-full `} key={index}>
                      <div id="stepTitle" className={`max-lg:h-[50vh] ${index % 2 === 0 ? "text-[#6b776d]" : "bg-[#848d5c] text-white"} flex flex-col justify-center items-center bgblue-300 lg:w-[50%]`}>
                        <div id="title" className=" flex w-[70%] flex-col gap-4 ">
                          <div id="titleTop" className="text-4xl  bgpurple-400">
                            <h1>{step.title}</h1>
                          </div>
                          <div id="titleBottom" className="text-base">
                            {
                              step.content.map((content, index) => (
                                <p key={index}>{content}</p>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                      <div id="stepImage" className=" flex  justify-center items-center lg:w-[50%]">
                        <Image className="rounded-none object-cover   " src={step.image} alt="" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </section>


            <section id="packages" className="bg-[#f0f0ef] flex flex-col justify-center items-center py-24 w-full">
              <h1 className="text-5xl text-[#6b776d] mb-16 max-md:text-center">Landscape Design Packages</h1>
              
              <div className="flex w-[70%] ">
                <div id="packagesDetails" className=" flex flex-col max-md:w-[40%] md:w-[40%] lg:w-[25%]  bgpurple-300 ">
                  {
                    packagesDetails.map((pack, index) => (
                      <div className={`flex w-full  max-md:h-[150px] h-[100px] bggreen-300 px-6 justify-center items-center ${index < packagesDetails.length - 1 ? "border-b-2 border-black" : "border-transparent"} font-bold`} key={index}>
                        <h1 className="text-center">{pack.text}</h1>
                      </div>
                    ))
                  }
                </div>
                <div id="packagesContainer" className="flex max-md:max-w-[60%] md:max-w-[60%] lg:max-w-[75%] overflow-x-auto text-sm  ">
                  {
                    packagesProducts.map((pack, index) => (
                      <div className={`${index === 1 ? "bg-[#6b776d] text-white rounded-xl font-bold" : ""} ${index === 3 ? "bg-[#848d5a] text-white rounded-xl font-bold" : ""}  bgrose-300 max-lg:w-full lg:w-[25%]`} key={index}>
                        {
                          pack.map((prod, index) => (
                            <div className={`flex w-full  px-6 max-md:h-[150px] h-[100px]  justify-center items-center  ${index < pack.length - 1 ? "border-b-2 border-black" : "border-transparent"} ${index === pack.length - 1 ? "font-bold" : ""} `} key={index} >
                              <h1 className="text-center">{prod.text}</h1>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </section>

            <section id="subsForm" className="h-[80vh] bg-[#f0f0ef] w-full bgblue-300 flex justify-center items-center bgpink-400 ">
              <div className="w-[65%] h-[70%] max-md:h-full bgred-300  flex max-md:flex-col max-md:w-full bgred-300 shadow-[5px_5px_20px_rgba(0,0,0,0.5)]">
                <div className="w-[50%] max-md:w-full max-md:h-[50vh] h-full bggreen-300 bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/opt/subsCard.webp')" }}>
                </div>
                <div className="w-[50%] max-md:w-full max-md:h-[50vh] h-full bgpurple-300 flex flex-col justify-center items-center  ">
                  <div className="w-[75%] h-[80%] flex flex-col gap-4 bgred-300 justify-center items-start text-[#6b776d]">
                    <p className="text-3xl"> Beautify your inbox!</p>
                    <div className="w-[85%]">
                      <p className="text-lg"> Landscape design and gardening advice delivered to your inbox. We&apos;ll send you deals, tips and style tips.</p>
                    </div>
                    <EmailSubscription />
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </ThemeProvider>
  )
}

export default HomePage;