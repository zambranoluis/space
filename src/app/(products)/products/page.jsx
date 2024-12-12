'use client';

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { TiArrowSortedDown } from "react-icons/ti";
import {Switch} from "@nextui-org/switch";

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

const extras =[
  {
    id: 1,
    title: "Irrigation Plan",
  },
  {
    id: 2,
    title: "360° Virtual Tour of Design",
  },
  {
    id: 3,
    title: "Lighting Plan",
  },
  {
    id: 4,
    title: "Side Yard",
  }
]

const extrasDetails = [
  {
    id: 1,
    title: "Irrigation Plan",
    description: "Add an irrigation system to your design to keep your landscape design well maintained",
    items: ["● 1 area basic", "● 1 area pro", "● 2 Basic areas"]
  },
  {
    id: 2,
    title: "360° Virtual Tour of Design",
    description: "Experience your design in a 360° video",
    items: ["● 1 area basic", "● 2 Basic areas"]
  },
  {
    id: 3,
    title: "Lighting Plan",
    items: ["● 1 area basic", "● 2 Basic areas"]
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
        <div className="flex max-lg:flex-col max-lg:gap-2 max-lg:justify-center items-center w-full  py-8 lg:gap-6">
          <div className="lg:w-[40%] bgblue-300 flex justify-center items-center max-lg:w-full p-2">
            <p className="text-2xl sm:text-5xl font-black whitespace-nowrap text-center text-[#6b776d]">
              SHOPPING CART
            </p>
          </div>
          <div className="lg:w-[60%]  bgpurple-400 w-[90%]">
            <p className="text-xs text-[#83826e] ">
              At Space Creations we will make your idea come true in 3 simple steps, a specialized designer will work on the perfect space for your property. After
              sharing your ideas with us along with photos and videos of your property you will schedule a call with one of our project managers to discuss your ideas
              and the designer can begin creating your new space.
            </p>
          </div>
        </div>
        <div className="flex w-full bgred-500 p2">
          <div className="w-full h-[90vh] pt-4 sm:h-[75vh] bg-cover bg-no-repeat relative flex" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/carrito1.jpg')" }}>
            <div className="bg-white/50 sm:w-[50%] absolute bottom-0  flex justify-center items-center py-8">
              <div className="sm:w-[50%] text-xs px-2">
                <h2 className="font-black">Includes:</h2>
                <p>● 30-minute phone call with a project manager</p>
                <p>● One round of design revisions</p>
                <p>● 2-3 week to design delivery</p>
                <p>● Plant selection specific for your property</p>
                <p>● List of materials selected for your project</p>
              </div>
            </div>
            <div className="w-[90%] sm:w-[50%] bgblue-400 absolute max-sm:left-[5%] sm:right-0 h-full  flex flex-col sm:justify-center sm:px-[50px] sm:ml-[50px] ">
              <div className=" bgpink-400 py-2 flex gap-8 overflow-x-scroll snap-x snap-mandatory  items-center  .noScrollBar bgred-400 px-4" >
                {
                  packages.map((pack, index) => (
                    <div className="relative " key={pack.id}>
                      <Card className={`h-[350px] w-[190px] sm:w-[220px] flex-shrink-0 snap-center flex flex-col ${index === 0 ? "shadow-white shadow-md" : ""}`} >
                        <CardHeader className="flex justify-center items-start h-[30%] flex-col gap-1 sm:px-8 bgred-400">
                          <h1 className="text-[#6b776d] text-2xl sm:text-3xl text-center whitespace-nowrap">{pack.title}</h1>
                          <h3 className="text-[#6b776d] bg-[#f0f0ef] px-2 py-1">from {pack.price}$</h3>
                        </CardHeader>
                        <CardBody className="h-[70%] bgorange-400 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${pack.image})` }}>
                          
                        </CardBody>
                      </Card>
                      <div className={`h-[350px] w-[190px] sm:w-[220px] absolute top-0 left-0  z-[10] rounded-xl ${index === 0 ? "" : "bg-black/30"}`}>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="flex mt-3 sm:mt-6 gap-2 pl-4">
                <div className="p-1 text-white border-white border-1 rounded-full cursor-pointer justify-center items-center"><TiArrowSortedDown className="rotate-90 text-center text-2xl"/></div>
                <div className="p-1 text-white border-white border-1 rounded-full cursor-pointer justify-center items-center"><TiArrowSortedDown className="-rotate-90 text-center text-2xl"/></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* <section className=" w-full  bg-cover bg-no-repeat justify-center items-center sm:justify-end sm:pr-[120px]  flex " style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/carrito2.jpg')" }}>
        <div className="bg-red-500 p-2 w-[75%] max-w-[420px]    flex relative ">
          <div id="extrasCircle" className="bg-[#302626] rounded-full w-[70px] h-[70px]  md:w-[100px] md:h-[100px] flex justify-center items-center text-white absolute bottom-[40px] left-[-40px] md:bottom-[80px] md:left-[-60px] text-sm md:text-lg">EXTRAS</div>
          <div className="bg-pink-400 w-full ">
            <div id="productCardTitle" className="h[15%] bg-[#848d5a] w-full  items-center flex px-6" >
              <p className="text-3xl text-white">1 Area Basic</p>
            </div>
            <div id="productCardBody" className="h[60%] bg-white bgpurple-600 place-self-center w-[90%] max-w-[280px] " >
              <div id="bodyIncludes" className="">
                <h2 className="font-black text-sm">Includes:</h2>
                <div className="flex flex-col">
                  <p className="text-xs">● 30-minute phone call with a project manager</p>
                  <p className="text-xs">● One round of design revisions</p>
                  <p className="text-xs">● 2-3 week to design delivery</p>
                  <p className="text-xs">● Plant selection specific for your property</p>
                  <p className="text-xs">● List of materials selected for your project</p>
                </div>
              </div>
              <div id="bodyOptions" className="flex flex-col">
                <div className="w-[90%] gap-4 flex place-self-center">
                  <button className="w-full bg-rose-500 text-sm ">Frontyard</button>
                  <button className="w-full bg-rose-700 text-sm border border-gray-500">Backyard</button>
                </div>
                <div>
                  <div className="flex" ><p className="text-xs">Extras</p></div>
                  <div className="flex flex-col">
                    {
                      extras.map((extra) => (
                        <div className="flex" key={extra.id}>
                          <div className="text-xs"><p>{extra.title}</p></div>
                          <div><Switch className=" rounded-full" id={`extra-${extra.id}`} size="sm" /></div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex justify-center">
                    <button className="w-[50%] bg-rose-500 text-sm ">
                      Pay For
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="productCardFooter" className="h[25%] bgpurple-800 w-full bg-[#dcd6c8] text-black" >
              <div>
                {
                  extrasDetails.map((detail) => (
                    <div key={detail.id}>
                      <h3 className="text-sm  font-bold">{detail.title}</h3>
                      <p className="  text-xs">{detail.description}</p>
                      <div className="flex text-xs">
                        {
                          detail.items.map((item, index) => (
                            <div key={`item-${index}`} >
                              <p className="">{item}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

export default HomePage;
