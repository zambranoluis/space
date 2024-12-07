'use client'

import {Image} from "@nextui-org/image";

function HomePage() {
  return (
    <main className='w-full  bgrose-400 text-black'  >
      <section className="flex h-[60dvh] lg:h-[85dvh] max-sm:flex-col w-full">
        <div className="flex w-full flex-col justify-center gap-8 py-16 px-6 items-center sm:w-[40dvw] lg:w-[55dvw]">
          <button className="bgred-200 w-full max-w-[300px] h-[65px] border-2 border-gray-500">
            EXPLORE DESIGN PACKAGES
          </button>
          <button className="bgred-200 w-full max-w-[300px] h-[65px] bg-gray-200">
            PORTFOLIO
          </button>
        </div>
        <div className="flex flex-col w-full h-full sm:w-[60dvw] lg:w-[45dvw]">
          <div className="flex  w-full h-full">
            <Image className="w-full h-full object-cover rounded-none" src="https://github.com/BPM94/SCCTMD/raw/main/HomeSlider1.jpg" alt="" />
          </div>
          <div className="flex w-full justify-center items-center gap-2 py-4">
            <div className="bg-[#6b776d] h-[20px] w-[20px] rounded-full"></div>
            <div className="bg-gray-400 h-[20px] w-[20px] rounded-full"></div>
            <div className="bg-gray-400 h-[20px] w-[20px] rounded-full"></div>
            <div className="bg-gray-400 h-[20px] w-[20px] rounded-full"></div>
            <div className="bg-gray-400 h-[20px] w-[20px] rounded-full"></div>
          </div>
        </div>
      </section>


      <section>
        
      </section>
    </main>
  )
}

export default HomePage;