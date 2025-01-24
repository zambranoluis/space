"use client";

import { useRef, useCallback, useEffect, useState, use } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { TiArrowSortedDown } from "react-icons/ti";
import { apiService } from "@/services/apiService";

import {Switch} from "@nextui-org/switch";
// import { select } from "@nextui-org/react";


export interface Area {
  nameArea: string;
  isActive: boolean;
}


export interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
}


export interface Product {
  _id: string;
  name: string;
  type: string;
  area: number;
  image: string;
  include: [];
  extra: [];
  cost: number;
  price: number;
  picture: string;
}


export interface Extra {
  _id: string;
  name: string;
  description: string;
  items: [];
  cost: number;
  price: number;
  isActive: boolean;
}


export interface Purchase {
  customer: string;
  selectedAreas: [
    {
      nameArea: string;
      isActive: boolean;
    },
    {
      nameArea: string;
      isActive: boolean;
    }
  ],
  product: Product;
  extras: [
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    }
  ];
  price: number;
  status: string;
  isActive: boolean;
}



// Props can be passed to the component for flexibility
interface PayProductSectionProps {
  customer: Customer | null;
  products: Product[];
  extras: Extra[];
  selectedPackage: number;
  handleSelectedPackage: (index: number, direction: "next" | "prev") => void;
}

const PayProductSection: React.FC<PayProductSectionProps> = ({
  customer,
  products,
  selectedPackage,
  handleSelectedPackage,
  extras,
}) => {

  const extrasInfo = [
    "678ad9d12f1981e3e1f545a7",
    "678ad9da2f1981e3e1f545a9",
    "678ad9e02f1981e3e1f545ab",
    "678ad9e52f1981e3e1f545ad",
  ]

  const [purchase, setPurchase] = useState<Purchase>({
    customer: "",
    selectedAreas: [{
      nameArea: "",
      isActive: false
    },{
      nameArea: "",
      isActive: false
    }],
    product: products[selectedPackage],
    extras: [
      {
        extra: extrasInfo[0],
        isActive: false
      },
      {
        extra: extrasInfo[1],
        isActive: false
      },
      {
        extra: extrasInfo[2],
        isActive: false
      },
      {
        extra: extrasInfo[3],
        isActive: false
      }
    ],
    price: 0,
    status: "pending",
    isActive: false,
  });
  
  const [selectedExtras, setSelectedExtras] = useState<{ extra: string; isActive: boolean, price: number }[]>([
    { extra: extrasInfo[0], isActive: false, price: extras[0].price },
    { extra: extrasInfo[1], isActive: (products[selectedPackage].type === "Pro") ? true : false, price: extras[1].price },
    { extra: extrasInfo[2], isActive: false, price: extras[2].price },
    { extra: extrasInfo[3], isActive: (products[selectedPackage].type === "Pro") ? true : false, price: extras[3].price },
  ]);
  

  const [isTwoAreasAllowed, setIsTwoAreasAllowed] = useState(products[selectedPackage].name.includes("2") || null);

  useEffect(() => {
    setIsTwoAreasAllowed(products[selectedPackage].name.includes("2") || null);
  }, [selectedPackage]);

  const [selectedArea, setSelectedArea] = useState(
    [
      {
        nameArea: "Frontyard",
        isActive: true
      },
      {
        nameArea: "Backyard",
        isActive: false
      }
    ]
  );

  const handleSelectedArea = (area: "frontyard" | "backyard" ) => {
    if (isTwoAreasAllowed) {
      // Si se permiten ambas áreas, ambas están activas
      setSelectedArea([
        { nameArea: "Frontyard", isActive: true },
        { nameArea: "Backyard", isActive: true },
      ]);
    } else if (area === "frontyard") {
      // Si solo se permite una área, activamos el área seleccionada y desactivamos la otra
      setSelectedArea([
        { nameArea: "Frontyard", isActive: true },
        { nameArea: "Backyard", isActive: false },
      ]);
    } else if (area === "backyard") {
      setSelectedArea([
        { nameArea: "Frontyard", isActive: false },
        { nameArea: "Backyard", isActive: true },
      ]);
    }
  };

  const handleSelectedExtras = (index: number) => {
    console.log("extras seleccionados en el componente pay: ", selectedExtras);
    console.log("extra accionado - extra: ", index)
    if (selectedExtras[index].isActive) {
      // Si el extra ya estaba activo, lo desactivamos
      const newSelectedExtras = [...selectedExtras];
      newSelectedExtras[index].isActive = false;
      setSelectedExtras(newSelectedExtras);
    } else {
      // Si el extra estaba desactivado, lo activamos
      const newSelectedExtras = [...selectedExtras];
      newSelectedExtras[index].isActive = true;
      setSelectedExtras(newSelectedExtras);
    }
  };

  const [finalPrice, setFinalPrice] = useState<number>(products[selectedPackage].price);


  const handleFinalPrice = () => {
    console.log("calculating final price...");
    const base = products[selectedPackage].price;
    console.log("base: ", base);

    const extrasPrice = selectedExtras.reduce((total, extra) => {
      if (extra.isActive) {
        console.log("extraPrice : ", extra.price);
        return total + extra.price;
      }
      return total;
    }, 0);

    console.log("total extras: ", extrasPrice);

    const totalPrice = base + extrasPrice;
    console.log("totalPrice: ", totalPrice);
    setFinalPrice(totalPrice);

  }

  useEffect(() => {
    handleFinalPrice();
  }, [selectedExtras, selectedPackage, products]);


    const handlePurchase = async () => {
      console.log("data to be evaluated: ");
      console.log("customer: ", customer);
      console.log("products: ", products);
      console.log("extras: ", extras);
      console.log("selectedExtras: ", selectedExtras);
      console.log("selectedArea: ", selectedArea);
      if (!customer || !products || !extras || !selectedExtras || !selectedArea) {
        console.error("Error: Customer or products or extras or selectedArea is null");
        return;
      }

      setPurchase({
        customer: customer._id,
        product: products[selectedPackage],
        selectedAreas: products[selectedPackage].name.includes("2")
          ? [
            { nameArea: selectedArea[0].nameArea, isActive: true },
            { nameArea: selectedArea[1].nameArea, isActive: true },
          ]
          : [
            { nameArea: selectedArea[0].nameArea, isActive: selectedArea[0].isActive },
            { nameArea: selectedArea[1].nameArea, isActive: selectedArea[1].isActive },
          ],
        extras: products[selectedPackage].type === "Pro"
          ? [
            { extra: selectedExtras[0].extra, isActive: selectedExtras[0].isActive },
            { extra: selectedExtras[1].extra, isActive: true },
            { extra: selectedExtras[2].extra, isActive: true },
            { extra: selectedExtras[3].extra, isActive: selectedExtras[3].isActive },
          ]
          : [
            { extra: selectedExtras[0].extra, isActive: selectedExtras[0].isActive },
            { extra: selectedExtras[1].extra, isActive: selectedExtras[1].isActive },
            { extra: selectedExtras[2].extra, isActive: selectedExtras[2].isActive },
            { extra: selectedExtras[3].extra, isActive: selectedExtras[3].isActive },
          ],
        price: finalPrice,
        status: "pending",
        isActive: true
      })

      console.log("newPurchase", purchase);

      try {
        const data = await apiService.createPurchase(purchase);
        window.location.href = "/panel-client";

      } catch (err: unknown) {
        // if (axios.isAxiosError(err) && err.response) {
        //   setErrorExtras(`Error: ${err.response.status} - ${err.response.data.message}`);
        // } else {
        //   setErrorExtras("Error: No se pudo obtener los extras.");
        // }
      }

  }



  return (
    <section id="selectedPackageContainer" className={`relative select-none w-full bg-center bg-cover bg-no-repeat justify-center items-center sm:justify-end sm:pr-[120px]  flex `} style={{ backgroundImage: `url(${products[selectedPackage].picture})` }} >
        <div className="flex absolute bggreen-400 md:left-[5%] max-md:top-[0.5%] max-md:left-[3%] md:flex-col gap-4">
          <div className={`${selectedPackage === 0 ? "hidden" : ""} p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full rotate-90 cursor-pointer`} onClick={() => { handleSelectedPackage(selectedPackage, "prev") }} >
            <TiArrowSortedDown className="text-4xl" />
          </div>
          <div className={`${selectedPackage === products.length - 1 ? "hidden" : ""} p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full -rotate-90 cursor-pointer`} onClick={() => { handleSelectedPackage(selectedPackage, "next") }} >
            <TiArrowSortedDown className="text-4xl" />
          </div>
        </div>
        <div className="bgred-500 py-8 w-[90%] max-w-[450px] flex">
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
                  <button className={`w-full text-black text-sm border border-gray-500 ${isTwoAreasAllowed ? "bg-[#6b776d] text-white" : ""}  ${selectedArea[0].isActive === true ? "bg-[#6b776d] text-white" : ""} `} onClick={() => { handleSelectedArea("frontyard") }}>Frontyard</button>
                  <button className={`w-full text-black text-sm border border-gray-500 ${isTwoAreasAllowed ? "bg-[#6b776d] text-white" : ""}  ${selectedArea[1].isActive === true ? "bg-[#6b776d] text-white" : ""} `} onClick={() => { handleSelectedArea("backyard") }}>Backyard</button>
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
                              (products[selectedPackage].type === "Pro" && (index === 1 || index === 2))
                                ? <Switch isSelected isDisabled  />
                                : <Switch onChange={() => { handleSelectedExtras(index) }} />
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
                      <p className="font-semibold">{finalPrice}</p>
                    </div>
                  </div>
                  <div className="flex justify-center bgpurple-400 relative">
                    <button className="w-[70%] justify-center flex items-center bg-[#302626] rounded-md text-[#e9e8e8] text-sm top-[25px] absolute py-1 " onClick={() => { handleFinalPrice(); handlePurchase() }}>
                      PAY FOR
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
                    (extra.name !== "Side Yard" ) && <div className={`py-4 gap-2 flex flex-col ${(index !== extras.length - 1 ? "border-b border-black" : "")}`} key={index}>
                    <h3 className="text-sm  font-bold">{extra.name}</h3>
                    {(extra.description) && <p className="  text-xs">{extra.description}</p>}
                    <div className="flex text-xs max-sm:flex-col sm:gap-2">
                      {
                        extra.items.map((item, index) => (
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
  );
}

export default PayProductSection;