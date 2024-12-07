'use client'

import { useState } from "react";

import {Image} from "@nextui-org/image";

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


function HomePage() {


  const [currentPicture, setCurrentPicture] = useState(0);

  const handleCurrentPicture = (index) => {
    setCurrentPicture(index);
  };



  return (
    <main className='w-full  bgrose-400 text-black '  >
      <section className="flex bgpurple-400  sm:h-[70dvh] lg:h-[85dvh] max-sm:flex-col w-full">
        <div className="flex w-full  flex-col max-sm:h-[35vh] justify-center max-[350px]:gap-4 gap-8   items-center sm:w-[40dvw] lg:w-[45dvw] bgred-300 h-full sm:px-4 lg:px-0">
          <button className="bgred-200 w-full max-w-[300px]  border-2 border-gray-500 py-6">
            EXPLORE DESIGN PACKAGES
          </button>
          <button className="bgred-200 w-full max-w-[300px]  bg-gray-200 py-6">
            VISIT OUR PORTFOLIO
          </button>
        </div>
        <div className="flex flex-col  w-full bgred-600   sm:w-[60dvw] lg:w-[55dvw]">
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


      <section className="flex mt-[20px] flex-col ">
        <div id="banner" className="w-full bg-[#848d5c] text-white  relative py-6 md:pl-16">
          <div className="bgblue-200 max-w-[750px]  z-[100] flex flex-col px-6 gap-2">
            <p className="text-5xl font-black ">
              Bring your vision to life in three simple steps
            </p>
            <p className="text-lg">
              Professional landscape design, always for a low flat fee
            </p>
          </div>
          <div className="h-[100px] w-[100px] bg-[#848d5c] z-[-1] absolute bottom-[-50px] left-[10%] rotate-45"></div>
        </div>
        <div id="stepsContainer" className="w-full  bgrose-400 p-2">
          {
            steps.map((step, index) => (
              <div id={"step" + step.id} className={`${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} max-md:flex-col flex w-full bgblue-300 md:h-[50dvh] `}  key={index}>
                <div id="stepTitle" className="flex max-md:h-[50dvh]  md:w-[50dvw] flex-col justify-center items-center">
                  <div>
                    <h1>{step.title}</h1>
                  </div>
                  <div>
                  {
                    step.content.map((content, index) => (
                      <p key={index}>{content}</p> 
                    ))
                  }
                  </div>
                </div>
                <div id="stepImage" className="flex max-md:h-[50dvh]  bg-yellow-300 md:w-[50dvw] justify-center items-center">
                  <Image className="rounded-none w- h-[50dvh] md:w-[50dvw] " src={step.image} alt="" />
                </div>
              </div>
              
            ))

          }
        </div>
      </section>
    </main>
  )
}

export default HomePage;