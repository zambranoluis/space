
"use client"

import { RefObject } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

import { TiArrowSortedDown } from "react-icons/ti";

interface Product {
  name: string;
  type: string;
  price: number;
  picture: string;
  include: string[];
}



interface CardsDisplayProps {
  products: Product[];
  selectedPackage: number;
  setSelectedPackage: React.Dispatch<React.SetStateAction<number>>;
  handleSelectedPackage: (index: number, direction: "next" | "prev") => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}


const CardsDisplay: React.FC<CardsDisplayProps> = ({
  products,
  selectedPackage,
  setSelectedPackage,
  handleSelectedPackage,
  scrollContainerRef,
}) => {

  
  return (
    <div className="flex w-full bgred-500 p2">
      <div className="w-full h-[650px] pt-4 sm:h-[75vh] bg-cover bg-no-repeat relative flex" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/shopping-cart/carrito1.webp')" }}>
        <div className="flex w-full justify-center items-center sm:justify-start absolute bottom-0 bgred-400 h-[30%] sm:h-[60%] min-[950px]:h-[40%]">
          <div className="bg-white/50 w-[80%]  sm:w-[50%] flex justify-center items-center py4 min-[400px]:py8 h-full ">
            <div className="sm:w-[70%] text-xs px-2 sm:text-sm md:text-base text-black flex flex-col bgred-300 h-full gap-4 py-4">
              <h2 className="font-black">Includes:</h2>
              <div className="flex flex-col">
                {
                  products[selectedPackage]?.include?.map((item, index) => (
                    <div key={index}>
                      <p>● {item}</p>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </div>
        <div className="w-[90%] sm:w-[50%] bgblue-400 absolute max-sm:left-[5%] sm:right-0 h-full  flex flex-col sm:justify-center sm:px-[50px] sm:ml-[50px] ">
          <div className=" bgpink-400 py-2 flex gap-8 overflow-x-scroll scroll-smooth snap-x snap-mandatory  items-center  .noScrollBar bgred-400 px-4 " ref={scrollContainerRef} >
            {
              products.map((pack, index) => (
                <div className="relative cursor-pointer " key={index} onClick={() => setSelectedPackage(index)}>
                  <Card className={`h-[350px] w-[190px] sm:w-[220px] bg-white flex-shrink-0 snap-center flex flex-col  ${index === selectedPackage ? "shadow-white shadow-md" : ""}`} >
                    <CardHeader className="flex justify-center  items-start h-[30%] flex-col gap-1 sm:px-8 bgred-400">
                      <h1 className="text-[#6b776d] text-2xl sm:text-3xl text-center whitespace-nowrap">{pack.name}{" "}{pack.type}</h1>
                      <h3 className="text-[#6b776d] bg-[#f0f0ef] px-2 py-1">from {pack.price}$</h3>
                    </CardHeader>
                    <CardBody className="h-[70%] bgorange-400 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${pack.picture})` }}>

                    </CardBody>
                  </Card>
                  <div className={`h-[350px] duration-300 w-[190px] sm:w-[220px] absolute top-0 left-0  z-[10] rounded-xl ${index === selectedPackage ? "" : "bg-black/30"}`}>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="flex mt-3 sm:mt-6 gap-2 pl-4">
            <div className="p-1 text-white border-white border-1 rounded-full cursor-pointer justify-center items-center" onClick={() => { handleSelectedPackage(selectedPackage, "prev") }}><TiArrowSortedDown className="rotate-90 text-center text-2xl" /></div>
            <div className="p-1 text-white border-white border-1 rounded-full cursor-pointer justify-center items-center" onClick={() => { handleSelectedPackage(selectedPackage, "next") }}><TiArrowSortedDown className="-rotate-90 text-center text-2xl" /></div>
          </div>
        </div>
      </div>
    </div>

  )


}


export default CardsDisplay;