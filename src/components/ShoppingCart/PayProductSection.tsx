"use client";

import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { apiService } from "@/services/apiService";

import { Switch } from "@nextui-org/switch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface Area {
  nameArea: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: {
    areaCode: string;
    number: string;
  };
  address: string;
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

export interface SelectedProduct {
  id: string;
  name: string;
  type: string;
  area: number;
  price: number;
  picture: string;
  include: [];
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

export interface SelectedExtra {
  extra: string;
  isActive: boolean;
}

export interface Purchase {
  customer: string;
  product: string;
  selectedAreas: [
    {
      nameArea: string;
      isActive: boolean;
    },
    {
      nameArea: string;
      isActive: boolean;
    },
  ];
  extras: SelectedExtra[];
  price: number;
  status: string;
  isActive: boolean;
}

// Props can be passed to the component for flexibility
interface PayProductSectionProps {
  customer: string | null;
  products: Product[];
  extras: Extra[] | null;
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
  const [productSelectedInfo, setProductSelectedInfo] = useState<string>();
  const [isTwoAreasAllowed, setIsTwoAreasAllowed] = useState(false);
  const [isProductPro, setIsProductPro] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (products !== null) {
      setProductSelectedInfo(products[selectedPackage]._id);
      setIsTwoAreasAllowed(products[selectedPackage].area === 2);
      setIsProductPro(products[selectedPackage].type === "Pro");
    }
  }, [selectedPackage, products]); // Added 'products' dependency

  const [selectedArea, setSelectedArea] = useState([
    { nameArea: "Frontyard", isActive: true },
    { nameArea: "Backyard", isActive: false },
  ]);

  const handleSelectedArea = (area: "frontyard" | "backyard") => {
    setSelectedArea((prevArea) =>
      prevArea.map((prevAreaItem) =>
        prevAreaItem.nameArea.toLowerCase() === area
          ? { ...prevAreaItem, isActive: true }
          : {
              ...prevAreaItem,
              isActive: isTwoAreasAllowed ? prevAreaItem.isActive : false,
            },
      ),
    );
  };

  const [selectedExtras, setSelectedExtras] = useState<
    { extra: string; isActive: boolean; price: number }[]
  >(
    extras?.map((extra) => ({
      extra: extra._id,
      isActive: false,
      price: extra.price,
    })) || [],
  );

  const handleSelectedExtras = (index: number) => {
    if (selectedExtras[index].isActive) {
      const newSelectedExtras = [...selectedExtras];
      newSelectedExtras[index].isActive = false;
      setSelectedExtras(newSelectedExtras);
    } else {
      const newSelectedExtras = [...selectedExtras];
      newSelectedExtras[index].isActive = true;
      setSelectedExtras(newSelectedExtras);
    }
  };

  const [finalPrice, setFinalPrice] = useState(products[selectedPackage].price);

  useEffect(() => {
    const selectedProduct = products[selectedPackage];
    if (selectedProduct) {
      const basePrice = selectedProduct.price;

      const extrasPrice = selectedExtras.reduce((total, extra, index) => {
        if (extra && isProductPro) {
          // Si el tipo de producto es "Pro", solo sumamos los índices 0 y 3
          return (index === 0 || index === 3) && extra.isActive && extra.price
            ? total + extra.price
            : total;
        } else {
          // Si no es "Pro", sumamos todos los extras activos
          return extra.isActive && extra.price ? total + extra.price : total;
        }
      }, 0);

      setFinalPrice(basePrice + extrasPrice);
    }
  }, [selectedPackage, selectedExtras, isProductPro, products]); // Added 'isProductPro' and 'products' dependencies

  const handlePurchase = async () => {
    if (!session) {
      alert("Debes iniciar sesión para realizar una compra.");
      router.push("/login");
      return;
    }

    if (!customer || !products[selectedPackage]) {
      alert("No se puede proceder con la compra. Intenta nuevamente.");
      return;
    }

    const newPurchase: Purchase = {
      customer: customer,
      product: products[selectedPackage]._id,
      selectedAreas: isTwoAreasAllowed
        ? [
            { nameArea: selectedArea[0].nameArea, isActive: true },
            { nameArea: selectedArea[1].nameArea, isActive: true },
          ]
        : [
            { nameArea: selectedArea[0].nameArea, isActive: selectedArea[0].isActive },
            { nameArea: selectedArea[1].nameArea, isActive: selectedArea[1].isActive },
          ],
      extras: selectedExtras.map((extra, index) => {
        if (isProductPro && (index === 1 || index === 2)) {
          return { extra: extra.extra, isActive: true };
        } else {
          return { extra: extra.extra, isActive: extra.isActive };
        }
      }) as SelectedExtra[],
      price: finalPrice as number,
      status: "pending",
      isActive: true,
    };

    try {
      const response = await apiService.createPurchase(newPurchase);
      if (!response) {
        alert("Error al crear la compra. Por favor, inténtalo de nuevo.");
        return;
      }

      alert("Compra creada correctamente. Redirigiendo al panel...");
      router.push("/panel-client?panel=purchases");
    } catch (err) {
      console.error("Error creating purchase:", err);
      alert("Hubo un problema con la compra. Inténtalo más tarde.");
    }
  };

  return (
    <section
      id='selectedPackageContainer'
      className={`relative select-none w-full bg-center bg-cover bg-no-repeat justify-center items-center sm:justify-end sm:pr-[120px]  flex `}
      style={{ backgroundImage: `url(${products[selectedPackage].picture})` }}>
      <div className='flex absolute bggreen-400 md:left-[5%] max-md:top-[0.5%] max-md:left-[3%] md:flex-col gap-4'>
        <div
          className={`${
            selectedPackage === 0 ? "hidden" : ""
          } p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full rotate-90 cursor-pointer`}
          onClick={() => {
            handleSelectedPackage(selectedPackage, "prev");
          }}>
          <TiArrowSortedDown className='text-4xl' />
        </div>
        <div
          className={`${
            selectedPackage === 3 ? "hidden" : ""
          } p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full -rotate-90 cursor-pointer`}
          onClick={() => {
            handleSelectedPackage(selectedPackage, "next");
          }}>
          <TiArrowSortedDown className='text-4xl' />
        </div>
      </div>
      <div className='bgred-500 py-8 w-[90%] max-w-[450px] flex'>
        <div
          id='extrasCard'
          className='bgpink-400 w-full bg-white flex flex-col justify-center items-center'>
          <div
            id='productCardTitle'
            className=' bg-[#848d5a] w-full  items-center flex py-6 pl-8'>
            <p className='text-2xl sm:text-3xl py-4 text-white max-sm:text-center'>
              {products[selectedPackage].name} {products[selectedPackage].type}
            </p>
          </div>
          <div
            id='productCardBody'
            className='  bgpurple-600 place-self-center py-8 w-[65%]  '>
            <div
              id='bodyIncludes'
              className='flex flex-col text-black bgred-400 h-[350px]'>
              <h2 className='font-black text-sm'>Includes:</h2>
              <div className='flex flex-col gap-1 py-4'>
                {products[selectedPackage].include.map((item, index) => (
                  <div key={index}>
                    <p>● {item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id='bodyOptions' className='flex flex-col bg-[#f0f0ef] p-4'>
              <div className='w-full gap-4 flex place-self-center'>
                <button
                  className={`w-full text-black text-sm border border-gray-500   ${
                    selectedArea[0].isActive === true ? "bg-[#6b776d] text-white" : ""
                  } ${isTwoAreasAllowed ? "bg-[#6b776d] text-white" : ""}`}
                  onClick={() => {
                    handleSelectedArea("frontyard");
                  }}>
                  Frontyard
                </button>
                <button
                  className={`w-full text-black text-sm border border-gray-500   ${
                    selectedArea[1].isActive === true ? "bg-[#6b776d] text-white" : ""
                  } ${isTwoAreasAllowed ? "bg-[#6b776d] text-white" : ""}`}
                  onClick={() => {
                    handleSelectedArea("backyard");
                  }}>
                  Backyard
                </button>
              </div>
              <div className='bggreen-700 p-6'>
                <div className='flex bg-[#ab9a62] place-self-start px-2 py-1 rounded-md'>
                  <p className='text-xs text-white'>Extras</p>
                </div>
                <div className='flex flex-col bggray-600 justify-center items-center p-2 gap-2'>
                  {extras?.map((item, index) => (
                    <div
                      className='flex bgpink-300 justify-center w-full gap-2'
                      key={index}>
                      <div className='text-xs w-[50%] bgyellow-300 text-[#9a9989]'>
                        <p>{item.name}</p>
                      </div>
                      <div className=' bgblue-300'>
                        {products &&
                        products[selectedPackage].type === "Pro" &&
                        (index === 1 || index === 2) ? (
                          <Switch isSelected isDisabled />
                        ) : (
                          <Switch
                            onChange={() => {
                              handleSelectedExtras(index);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex bgred-300 justify-center gap-2 text-black'>
                  <div className='flex'>
                    <p>Final Price:</p>
                  </div>
                  <div className='flex border border-black rounded-sm px-4'>
                    <p className='font-semibold'>{finalPrice}</p>
                  </div>
                </div>
                <div className='flex justify-center bgpurple-400 relative'>
                  <button
                    className='w-[70%] justify-center flex items-center bg-[#302626] rounded-md text-[#e9e8e8] text-sm top-[25px] absolute py-1'
                    onClick={() => {
                      if (!session) {
                        alert("Debes iniciar sesión para continuar con la compra.");
                        router.push("/login");
                      } else {
                        handlePurchase();
                      }
                    }}>
                    PAY
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            id='productCardFooter'
            className='px-12 py-6 bgpurple-800 w-full bg-[#dcd6c8] text-black relative'>
            <div
              id='extrasCircle'
              className='bg-[#302626] rounded-full w-[50px] h-[50px] min-[500px]:w-[70px] min-[500px]:h-[70px]  md:w-[100px] md:h-[100px] flex justify-center items-center text-white absolute top-0 min-[320px]:top-[40%] sm:top-[40%] left-[0px] min-[320px]:left-[-20px] min-[500px]:left-[-30px]  md:left-[-60px] text-xs sm:text-sm md:text-lg'>
              <p>EXTRAS</p>
            </div>
            <div className='flex flex-col'>
              {extras?.map(
                (extra, index) =>
                  extra.name !== "Side Yard" && (
                    <div
                      className={`py-4 gap-2 flex flex-col ${
                        index !== extras.length - 1 ? "border-b border-black" : ""
                      }`}
                      key={index}>
                      <h3 className='text-sm  font-bold'>{extra.name}</h3>
                      {extra.description && (
                        <p className='  text-xs'>{extra.description}</p>
                      )}
                      <div className='flex text-xs max-sm:flex-col sm:gap-2'>
                        {extra.items.map((item, index) => (
                          <div key={`item-${index}`}>
                            <p className=''>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayProductSection;