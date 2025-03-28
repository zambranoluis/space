'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { TiArrowSortedDown } from "react-icons/ti";
import { Switch } from "@heroui/switch";
import { products, extras } from "./shopping-cart";



function LoadingShoppingCart() {
  const [selectedYard, setSelectedYard] = useState("frontyard");
  const [selectedPackage, setSelectedPackage] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSelectedPackage = (index: number, direction: "next" | "prev") => {
    const container = scrollContainerRef.current;
    if (!container) return; // Asegura que el contenedor no sea null
  
    if (!products[selectedPackage]) return; // Verifica que el paquete seleccionado exista
  
    switch (direction) {
      case "next":
        if (index < products.length - 1) {
          setSelectedPackage(index + 1);
          container.scrollLeft = Math.min(container.scrollLeft + 200, container.scrollWidth);
        } else {
          container.scrollLeft = container.scrollWidth;
        }
        break;
      case "prev":
        if (index > 0) {
          setSelectedPackage(index - 1);
          container.scrollLeft = Math.max(container.scrollLeft - 200, 0);
        } else {
          container.scrollLeft = 0;
        }
        break;
      default:
        break;
    }
  };



    return (
      <main className="w-full bgrose-400 flex flex-col bgred-400 OFFSC">

        <section className="bgpurple-500 flex flex-col w-full">
          {
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
          }
        </section>

        {
          <section id="selectedPackageContainer" className={`relative select-none w-full bg-center bg-cover bg-no-repeat justify-center items-center sm:justify-end sm:pr-[120px]  flex `} style={{ backgroundImage: `url(${products[selectedPackage].picture})` }} >
            <div className="flex absolute bggreen-400 md:left-[5%] max-md:top-[0.5%] max-md:left-[3%] md:flex-col gap-4">
              <div className={`${selectedPackage === 0 ? "hidden" : ""} p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full rotate-90 cursor-pointer`} onClick={() => { handleSelectedPackage(selectedPackage, "prev") }} >
                <TiArrowSortedDown className="text-4xl" />
              </div>
              <div className={`${selectedPackage === products.length - 1 ? "hidden" : ""} p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full -rotate-90 cursor-pointer`} onClick={() => { handleSelectedPackage(selectedPackage, "next") }} >
                <TiArrowSortedDown className="text-4xl " />
              </div>
            </div>
            <div className="bgred-500 py-8 w-[90%] max-w-[450px]    flex ">
              <div id="extrasCard" className="bgpink-400 w-full bg-white flex flex-col justify-center items-center">
                <div id="productCardTitle" className=" bg-[#848d5a] w-full  items-center flex py-6 pl-8" >
                  <p className="text-2xl sm:text-3xl py-4 text-white max-sm:text-center">{products[selectedPackage].name}{" "}{products[selectedPackage].type}</p>
                </div>
                <div id="productCardBody" className="  bgpurple-600 place-self-center py-8 w-[65%]  " >
                  <div id="bodyIncludes" className="flex flex-col text-black bgred-400 h-[350px]">
                    <h2 className="font-black text-sm">Includes:</h2>
                    <div className="flex flex-col gap-1 py-4">
                      {
                        products[selectedPackage].include.map((item, index) => (
                          <div key={index}>
                            <p>● {item}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div id="bodyOptions" className="flex flex-col bg-[#f0f0ef] p-4">
                    <div className="w-full gap-4 flex place-self-center">
                      <button className={`w-full ${(products[selectedPackage].name.toLowerCase().includes("2")) ? "bg-[#848d5a] text-white" : ""}  ${(selectedYard === "frontyard") ? "bg-[#848d5a] text-white" : "text-black"} text-sm border border-gray-500  `} onClick={() => { setSelectedYard("frontyard") }}>Frontyard</button>
                      <button className={`w-full ${(products[selectedPackage].name.toLowerCase().includes("2")) ? "bg-[#848d5a] text-white" : ""}  ${(selectedYard === "backyard") ? "bg-[#848d5a] text-white" : "text-black"}  text-sm border border-gray-500`} onClick={() => { setSelectedYard("backyard") }}>Backyard</button>
                    </div>
                    <div className="bggreen-700 p-6">
                      <div className="flex bg-[#ab9a62] place-self-start px-2 py-1 rounded-md" ><p className="text-xs text-white">Extras</p></div>
                      <div className="flex flex-col bggray-600 justify-center items-center p-2 gap-2">
                        {
                          extras.map((item, index) => (
                            <div className="flex bgpink-300 justify-center w-full gap-2" key={index}>
                              <div className="text-xs w-[50%] bgyellow-300 text-[#9a9989]">
                                <p>{item.name}</p>
                              </div>
                              <div className=" bgblue-300">
                                {
                                  (products[selectedPackage].type.toLowerCase().includes("pro") && (index === 1 || index === 2))
                                    ? <Switch isSelected isDisabled className=" rounded-full" id={`extra-${index}`} size="sm" />
                                    : <Switch className=" rounded-full" id={`extra-${index}`} size="sm" />
                                }
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <div className="flex bgred-300 justify-center gap-2 text-black">
                        <div className="flex">
                          <p>
                            Final Price:
                          </p>
                        </div>
                        <div className="flex border border-black rounded-sm px-4">
                          <p className="font-semibold">0$</p>
                        </div>
                      </div>
                      <div className="flex justify-center bgpurple-400 relative">
                        <button className="w-[70%] justify-center flex items-center bg-[#302626] rounded-md text-[#e9e8e8] text-sm top-[25px] absolute py-1 " >
                          PAY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="productCardFooter" className="px-12 py-6 bgpurple-800 w-full bg-[#dcd6c8] text-black relative" >
                  <div id="extrasCircle" className="bg-[#302626] rounded-full w-[50px] h-[50px] min-[500px]:w-[70px] min-[500px]:h-[70px]  md:w-[100px] md:h-[100px] flex justify-center items-center text-white absolute top-0 min-[320px]:top-[40%] sm:top-[40%] left-[0px] min-[320px]:left-[-20px] min-[500px]:left-[-30px]  md:left-[-60px] text-xs sm:text-sm md:text-lg">
                    <p>EXTRAS</p>
                  </div>
                  <div className="flex flex-col">
                    {
                      extras.map((extra, index) => (
                        (extra.name !== "Side Yard") && <div className={`py-4 gap-2 flex flex-col ${(index !== extras.length - 1 ? "border-b border-black" : "")}`} key={index}>
                          <h3 className="text-sm  font-bold">{extra.name}</h3>
                          {(extra.description) && <p className="  text-xs">{extra.description}</p>}
                          <div className="flex text-xs max-sm:flex-col sm:gap-2">
                            {
                              extra.items?.map((item, index) => (
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
        }

      </main>
    );
  }


  export default LoadingShoppingCart;
