'use client'

import {Image} from "@nextui-org/image";

function HomePage() {
  return (
    <main className='w-full  bgrose-400 text-black'  >
      <section className="flex h-[60dvh] lg:h-[75dvh]">
        <div className="flex flex-col justify-center w-[40dvw] lg:w-[55dvw]">
          <button>
            button 1
          </button>
          <button>
            button 2
          </button>
        </div>
        <div className="flex h-full w-[60dvw] lg:w-[45dvw]">
          <Image className="w-full h-full object-cover rounded-none" src="https://github.com/BPM94/SCCTMD/raw/main/HomeSlider1.jpg" alt="" />
        </div>
      </section>


      <section>
        
      </section>
    </main>
  )
}

export default HomePage;