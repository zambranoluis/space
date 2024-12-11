'use client';

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { TiArrowSortedDown } from "react-icons/ti";



const packages = [
  {
    id: 1,
    title: "1 Area Basic",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/carrito2.jpg",
  },
  {
    id: 2,
    title: "1 Area Pro",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/carrito3.jpg",
  },
  {
    id: 3,
    title: "2 Areas Basic",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/carrito4.jpg",
  },
  {
    id: 4,
    title: "2 Areas PRO",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/carrito5.jpg",
  }
]

function HomePage() {
  const [currentPicture, setCurrentPicture] = useState(0);

  const handleCurrentPicture = (index) => {
    setCurrentPicture(index);
  };

  return (
    <main className="w-full bgrose-400 flex flex-col bgred-400">
      <section className="bgpurple-500 flex flex-col w-full">
        <div className="flex max-lg:flex-col max-lg:gap-2 max-lg:justify-center items-center w-full px-16 py-8 lg:gap-6">
          <div className="lg:w-[40%] bgblue-300 flex justify-center items-center max-lg:w-full p-2">
            <p className="text-5xl font-black whitespace-nowrap text-center text-[#6b776d]">
              SHOPPING CART
            </p>
          </div>
          <div className="lg:w-[60%]">
            <p className="text-xs text-[#83826e]">
              At Space Creations we will make your idea come true in 3 simple steps, a specialized designer will work on the perfect space for your property. After
              sharing your ideas with us along with photos and videos of your property you will schedule a call with one of our project managers to discuss your ideas
              and the designer can begin creating your new space.
            </p>
          </div>
        </div>
        <div className="flex w-full bgred-500 p2">
          <div className="w-full h-[75vh] bg-cover bg-no-repeat relative" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/carrito1.jpg')" }}>
            <div className="bg-white/50 w-[50%] absolute bottom-0 flex justify-center items-center py-8">
              <div className="w-[50%]">
                <h2 className="font-black">Includes:</h2>
                <p>● 30-minute phone call with a project manager</p>
                <p>● One round of design revisions</p>
                <p>● 2-3 week to design delivery</p>
                <p>● Plant selection specific for your property</p>
                <p>● List of materials selected for your project</p>
              </div>
            </div>
            <div className="w-[50%] bgblue-400 absolute right-0 h-full  flex flex-col justify-center px-[50px] ml-[50px] ">
              <div className=" bgpink-400 py-2 flex gap-8 overflow-x-scroll snap-x snap-mandatory  items-center  noScrollBar" >
                {
                  packages.map((pack, index) => (
                    <div className="relative" key={pack.id}>
                      
                      <Card className="h-[350px] w-[220px] flex-shrink-0 snap-center flex flex-col" >
                        <CardHeader className="flex justify-center items-start h-[30%] flex-col gap-1 px-8 red-400">
                          <h1 className="text-[#6b776d] text-3xl text-center whitespace-nowrap">{pack.title}</h1>
                          <h3 className="text-[#6b776d] bg-[#f0f0ef] px-2 py-1">from {pack.price}$</h3>
                        </CardHeader>
                        <CardBody className="h-[70%] bgorange-400 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${pack.image})` }}>
                          {/* <Image
                            src={pack.image}
                            alt="Card image"
                            className="rounded-none object-cover w-full h-full"
                          /> */}
                        </CardBody>
                      </Card>
                      <div className={`h-[350px] w-[220px] absolute top-0 left-0  z-[10] rounded-xl ${index === 0 ? "" : "bg-black/30"}`}>

                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="flex mt-6 gap-2 pl-4">
                <div className="p-1 text-white border-white border-1 rounded-full cursor-pointer justify-center items-center"><TiArrowSortedDown className="rotate-90 text-center text-2xl"/></div>
                <div className="p-1 text-white border-white border-1 rounded-full cursor-pointer justify-center items-center"><TiArrowSortedDown className="-rotate-90 text-center text-2xl"/></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
