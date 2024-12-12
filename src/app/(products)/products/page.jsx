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
          <div className="w-full h-[600px] pt-4 sm:h-[75vh] bg-cover bg-no-repeat relative flex" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/carrito1.jpg')" }}>
            <div className="flex w-full justify-center items-center sm:justify-start absolute bottom-0">
              <div className="bg-white/50 w-[80%]  sm:w-[50%] flex justify-center items-center py-4 min-[400px]:py-8">
                  <div className="sm:w-[70%] text-xs px-2 sm:text-sm md:text-base">
                    <h2 className="font-black">Includes:</h2>
                    <p>● 30-minute phone call with a project manager</p>
                    <p>● One round of design revisions</p>
                    <p>● 2-3 week to design delivery</p>
                    <p>● Plant selection specific for your property</p>
                    <p>● List of materials selected for your project</p>
                  </div>
                
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


      <section className=" w-full  bg-cover bg-no-repeat justify-center items-center sm:justify-end sm:pr-[120px]  flex " style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/carrito2.jpg')" }}>
        <div className="bgred-500 py-8 w-[90%] max-w-[450px]    flex ">
          <div id="extrasCard" className="bgpink-400 w-full bg-white">
            <div id="productCardTitle" className=" bg-[#848d5a] w-full  items-center flex py-6 pl-8" >
              <p className="text-2xl sm:text-3xl py-4 text-white max-sm:text-center">1 Area Basic</p>
            </div>
            <div id="productCardBody" className="  bgpurple-600 place-self-center py-8  " >
              <div id="bodyIncludes" className="flex flex-col ">
                <h2 className="font-black text-sm">Includes:</h2>
                <div className="flex flex-col gap-1 py-4">
                  <p className="text-xs">● 30-minute phone call with a project manager</p>
                  <p className="text-xs">● One round of design revisions</p>
                  <p className="text-xs">● 2-3 week to design delivery</p>
                  <p className="text-xs">● Plant selection specific for your property</p>
                  <p className="text-xs">● List of materials selected for your project</p>
                </div>
              </div>
              <div id="bodyOptions" className="flex flex-col bg-[#f0f0ef] p-4">
                <div className="w-full gap-4 flex place-self-center">
                  <button className="w-full bg-[#848d5a] text-sm text-white ">Frontyard</button>
                  <button className="w-full  text-sm border border-gray-500">Backyard</button>
                </div>
                <div className="bggreen-700 p-6">
                  <div className="flex bg-[#ab9a62] place-self-start px-2 py-1 rounded-md" ><p className="text-xs text-white">Extras</p></div>
                  <div className="flex flex-col bggray-600 justify-center items-center p-2 gap-2">
                    {
                      extras.map((extra) => (
                        <div className="flex bgpink-300 justify-center w-full gap-2" key={extra.id}>
                          <div className="text-xs w-[50%] bgyellow-300 text-[#9a9989]"><p>{extra.title}</p></div>
                          <div className=" bgblue-300"><Switch className=" rounded-full" id={`extra-${extra.id}`} size="sm" /></div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex justify-center bgpurple-400 relative">
                    <button className="w-[70%] bg-[#302626] rounded-md text-[#e9e8e8] text-sm top-[25px] absolute py-1 ">
                      PAY FOR
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="productCardFooter" className="px-12 py-6 bgpurple-800 w-full bg-[#dcd6c8] text-black relative" >
            <div id="extrasCircle" className="bg-[#302626] rounded-full w-[70px] h-[70px]  md:w-[100px] md:h-[100px] flex justify-center items-center text-white absolute top-[50%] left-[-40px] md:bottom-[80px] md:left-[-60px] text-sm md:text-lg">
            <p>EXTRAS</p>
          </div>
              <div className="flex flex-col">
                {
                  extrasDetails.map((detail, index) => (
                    <div className={`py-4 gap-2 flex flex-col ${(index !== extrasDetails.length - 1 ? "border-b border-black" : "")}`} key={detail.id}>
                      <h3 className="text-sm  font-bold">{detail.title}</h3>
                      {(detail.description) && <p className="  text-xs">{detail.description}</p>}
                      <div className="flex text-xs max-sm:flex-col sm:gap-2">
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
      </section>
    </main>
  );
}

export default HomePage;
