'use client'

import { useState } from "react";

import {Image} from "@nextui-org/image";

import Link from "next/link";

import { FaCheck } from "react-icons/fa";
import { div } from "framer-motion/client";


const pictures = [
  {
    id: 1,
    image: "https://github.com/BPM94/SCCTMD/raw/main/HomeSlider1-min.jpg",
  },
  { 
    id: 2,
    image: "https://github.com/BPM94/SCCTMD/raw/main/HomeSlider2-min.jpg",
  },
  { 
    id: 3,
    image: "https://github.com/BPM94/SCCTMD/raw/main/HomeSlider3-min.jpg",
  },
  { 
    id: 4,
    image: "https://github.com/BPM94/SCCTMD/raw/main/HomeSlider4-min.jpg",
  },
  { 
    id: 5,
    image: "https://github.com/BPM94/SCCTMD/raw/main/HomeSlider5-min.jpg",
  },
  { 
    id: 6,
    image: "https://github.com/BPM94/SCCTMD/raw/main/HomeSlider6-min.jpg",
  }
]

const steps = [
  {
    id: 1,
    image: "https://github.com/BPM94/SCCTMD/raw/main/step1.jpg",
    title: "Step 1",
    content: ["● Select your package", "● Talk to the experts about your budget", "● Take photos of your property", "● Tell us about your ideal space"]
  },
  {
    id: 2,
    image: "https://github.com/BPM94/SCCTMD/raw/main/step2.jpg",
    title: "Step 2",
    content: ["A landscape designer will work on your space to create a design according to your budget and style."]
  },
  {
    id: 3,
    image: "https://github.com/BPM94/SCCTMD/raw/main/step3.jpg",
    title: "Step 3",
    content: ["You will receive a file with images of your new space, 3d floor plan and the additional plans you have requested."]
  }
]

const packagesDetails = [
  {
    id: 1,
    text: "WHAT'S INCLUDED",
  },
  {
    id: 2,
    text: "Work with a professional designer"
  },
  {
    id: 3,
    text: "Video/phone call with a project manager"
  },
  {
    id: 4,
    text: "Revisions"
  },
  {
    id: 5,
    text: "Estimated delivery time"
  },
  {
    id: 6,
    text: "Plant selection specific for your property"
  },
  {
    id: 7,
    text: "List of materials selected for your project"
  },
  {
    id: 8,
    text: "360° virtual tour of design"
  },
  {
    id: 9,
    text: "Lighting plan"
  },
  {
    id: 10,
    text: "Irrigation Plan"
  },
  {
    id: 11,
    text: "Prices"
  }
]

const packagesProducts = [
  [
    {
      id: 1,
      text: "1 Area Basic",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "30 min"
    },
    {
      id: 4,
      text: "1 round of revisions"
    },
    {
      id: 5,
      text: <FaCheck />
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: ""
    },
    {
      id: 9,
      text: ""
    },
    {
      id: 10,
      text: ""
    },
    {
      id: 11,
      text: "$175"
    }
  ],
  [
    {
      id: 1,
      text: "1 Area Pro",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "45 min"
    },
    {
      id: 4,
      text: "Unlimited rounds of revisions for 30 days"
    },
    {
      id: 5,
      text: "1-2 week to design delivery"
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: <FaCheck />
    },
    {
      id: 9,
      text: <FaCheck />
    },
    {
      id: 10,
      text: ""
    },
    {
      id: 11,
      text: "$265"
    }
  ],
  [
    {
      id: 1,
      text: "Both",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "1 hr"
    },
    {
      id: 4,
      text: "2 rounds of revisions"
    },
    {
      id: 5,
      text: <FaCheck />
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: ""
    },
    {
      id: 9,
      text: ""
    },
    {
      id: 10,
      text: ""
    },
    {
      id: 11,
      text: "$195"
    }
  ],
  [
    {
      id: 1,
      text: "Both Pro",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "1 hr"
    },
    {
      id: 4,
      text: "Unlimited rounds of revisions for 30 days"
    },
    {
      id: 5,
      text: "1-2 week to design delivery"
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: <FaCheck />
    },
    {
      id: 9,
      text: <FaCheck />
    },
    {
      id: 10,
      text: <FaCheck />
    },
    {
      id: 11,
      text: "$395"
    }
  ],
]


function HomePage() {


  const [currentPicture, setCurrentPicture] = useState(0);

  const handleCurrentPicture = (index) => {
    setCurrentPicture(index);
  };



  return (
    <main className='w-full  bgrose-400 text-black '  >

      <section id="CTA" className="flex bgpurple-400  sm:h-[70vh] lg:h-[85vh] max-sm:flex-col w-full">
        <div className="flex w-full text-[#6b776d] flex-col max-sm:h-[45vh] justify-center max-[350px]:gap-4 gap-10   items-center sm:w-[40vw] lg:w-[45vw] bgred-300 h-full sm:px-4 lg:px-0">
          <div className="flex flex-col justify-center items-center gap-4 w-full ">
            <Link className="bgred-200 w-full max-w-[300px] justify-center items-center flex border-2 border-[#6b776d] py-6" href="/products">
              EXPLORE DESIGN PACKAGES
            </Link>
            <button className="bgred-200 w-full max-w-[300px]  bg-gray-200 py-6">
              VISIT OUR PORTFOLIO
            </button>
          </div>
          <div className="w-full flex flex-col justify-center items-center ">
            <p>
              Dream with us ● Design with us
            </p>
            <p>Create your Account <Link className="text-[#6b776d] underline" href="/create-account" target="_blank">here.</Link></p>
          </div>
        </div>
        <div className="flex flex-col  w-full bgred-600   sm:w-[60vw] lg:w-[55vw]">
          <div className="flex  w-full h-full bgpurple-300 no-border-radius">
            <Image className="w-full  h-full object-cover object-center no-border-radius rounded-none" src={pictures[currentPicture].image}
            loading="lazy"
            alt="" />
          </div>
          <div className="flex bgblue-300 w-full justify-center items-center gap-2 py-4">
            {
              pictures.map((picture, index) => (
                <div onClick={() => handleCurrentPicture(index)} className={` ${currentPicture === index ? "bg-[#6b776d]" : "bg-gray-400"} h-[20px] w-[20px] rounded-full cursor-pointer`} key={index}></div>
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
          <div className="w-[50%] max-md:w-full max-md:h-[50vh] h-full bggreen-300 bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/subsCard.jpg')" }}>
          </div>
          <div className="w-[50%] max-md:w-full max-md:h-[50vh] h-full bgpurple-300 flex flex-col justify-center items-center  ">
            <div className="w-[75%] h-[80%] flex flex-col gap-4 bgred-300 justify-center items-start text-[#6b776d]">
              <p className="text-3xl"> Beautify your inbox!</p>
              <div className="w-[85%]">
                <p className="text-lg"> Landscape design and gardening advice delivered to your inbox. We&apos;ll send you deals, tips and style tips.</p>
              </div>
              <button className="bg-[#848d5c] text-white px-4 py-2 rounded-xl">
                Formulario de subscripcion
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage;