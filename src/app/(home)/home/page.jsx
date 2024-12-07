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


      <section className="flex mt-[20px]  ">
        <div className="w-full bg-[#848d5c] h-[300px]">
          <p></p>
          <p></p>
          <div></div>
        </div>
      </section>
    </main>
  )
}

export default HomePage;