"use client";

import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { apiService } from "@/services/apiService";
import { Switch } from "@nextui-org/switch";

export interface Area {
  nameArea: string;
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: any;
  address: string;
}

export interface Product {
  _id: string;
  name: string;
  type: string;
  area: number; // Define si el producto tiene una o dos áreas
  image: string;
  include: string[];
  extra: string[];
  cost: number;
  price: number;
  picture: string;
}

export interface Extra {
  _id: string;
  name: string;
  description?: string;
  items: string[];
  cost: number;
  price: number;
  isActive: boolean;
}

export interface Purchase {
  customer: string;
  product: string;
  extras: { extra: string; isActive: boolean }[];
  status: string;
  isActive: boolean;
  total: number;
}

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
  extras,
  selectedPackage,
  handleSelectedPackage,
}) => {
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([
    { nameArea: "Frontyard", isActive: false },
    { nameArea: "Backyard", isActive: false },
  ]);

  // Actualizar producto seleccionado, áreas y estado de extras
  useEffect(() => {
    const selected = products[selectedPackage];
    setProductSelected(selected);

    // Actualizar las áreas seleccionadas según el producto
    if (selected.area === 2) {
      setSelectedAreas([
        { nameArea: "Frontyard", isActive: true },
        { nameArea: "Backyard", isActive: true },
      ]);
    } else {
      setSelectedAreas([
        { nameArea: "Frontyard", isActive: true },
        { nameArea: "Backyard", isActive: false },
      ]);
    }

    // Actualizar los extras seleccionados
    const updatedExtras = extras.map((extra, index) => ({
      ...extra,
      isActive: selected.type === "Pro" ? index === 1 || index === 2 : false,
    }));
    setSelectedExtras(updatedExtras);
  }, [selectedPackage, products, extras]);

  // Calcular precio final
  useEffect(() => {
    if (!productSelected) return;

    const basePrice = productSelected.price;
    const extrasPrice = selectedExtras.reduce((total, extra, index) => {
      if (productSelected.type === "Pro" && (index === 1 || index === 2)) {
        return total; // Ignorar extras preseleccionados
      }
      return extra.isActive ? total + extra.price : total;
    }, 0);

    setFinalPrice(basePrice + extrasPrice);
  }, [productSelected, selectedExtras]);

  const handleToggleArea = (area: "Frontyard" | "Backyard") => {
    setSelectedAreas((prev) => {
      if (productSelected?.area === 1) {
        // Si el producto tiene una sola área, permitir solo una activa
        return prev.map((a) =>
          a.nameArea === area ? { ...a, isActive: true } : { ...a, isActive: false },
        );
      } else {
        // Si el producto tiene dos áreas, ambas están activas
        return prev.map((a) => ({ ...a, isActive: true }));
      }
    });
  };

  const toggleExtra = (index: number) => {
    setSelectedExtras((prev) =>
      prev.map((extra, i) =>
        i === index && !(productSelected?.type === "Pro" && (i === 1 || i === 2))
          ? { ...extra, isActive: !extra.isActive }
          : extra,
      ),
    );
  };

  const handlePurchase = async () => {
    if (!productSelected) return;

    try {
      // Crear la compra en el backend
      const purchaseResponse = await apiService.createPurchase({
        customer: "675388347f312ad7cc0a2ba2", // Cambia por el ID del cliente actual
        product: productSelected._id,
        selectedAreas: selectedAreas.map((area) => ({
          nameArea: area.nameArea,
          isActive: area.isActive,
        })),
        extras: selectedExtras.map((extra) => ({
          extra: extra._id,
          isActive: extra.isActive,
        })),
        total: finalPrice,
        status: "Pending",
        isActive: true,
      });

      if (!purchaseResponse?.data?._id) {
        console.error("Error al crear la compra");
        alert("Error al crear la compra. Por favor, inténtalo de nuevo.");
        return;
      }

      // Redirigir al panel de cliente
      alert("Compra creada correctamente. Redirigiendo al panel...");
      window.location.href = `/panel-client?purchaseId=${purchaseResponse.data._id}`;
    } catch (error) {
      console.error("Error en el proceso de compra:", error);
      alert("Hubo un error al crear la compra. Por favor, inténtalo más tarde.");
    }
  };

  return (
    <section
      id='selectedPackageContainer'
      className='relative select-none w-full bg-center bg-cover bg-no-repeat justify-center items-center sm:justify-end sm:pr-[120px] flex'
      style={{ backgroundImage: `url(${productSelected?.picture || ""})` }}>
      <div className='absolute md:left-[5%] flex flex-col gap-4 max-md:top-[0.5%] max-md:left-[3%]'>
        <div
          className={`${
            selectedPackage === 0 ? "hidden" : ""
          } p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full rotate-90 cursor-pointer`}
          onClick={() => handleSelectedPackage(selectedPackage, "prev")}>
          <TiArrowSortedDown className='text-4xl' />
        </div>
        <div
          className={`${
            selectedPackage === products.length - 1 ? "hidden" : ""
          } p-2 md:p-4 bg-white border border-[#dcd6c8] text-[#dcd6c8] rounded-full -rotate-90 cursor-pointer`}
          onClick={() => handleSelectedPackage(selectedPackage, "next")}>
          <TiArrowSortedDown className='text-4xl' />
        </div>
      </div>
      <div className='py-8 w-[90%] max-w-[450px] flex'>
        <div
          id='extrasCard'
          className='w-full bg-white flex flex-col justify-center items-center'>
          <div id='productCardTitle' className='bg-[#848d5a] w-full flex py-6 pl-8'>
            <p className='text-2xl sm:text-3xl py-4 text-white'>
              {productSelected?.name} {productSelected?.type}
            </p>
          </div>
          <div id='productCardBody' className='py-8 w-[65%] flex flex-col gap-6'>
            <div id='bodyIncludes' className='bg-[#f8f8f8] p-4 rounded-md'>
              <h2 className='font-bold text-lg mb-2'>Includes:</h2>
              <ul>
                {productSelected?.include.map((item, index) => (
                  <li key={index} className='text-sm'>
                    ● {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => handleToggleArea("Frontyard")}
                className={`w-full px-4 py-2 border ${
                  selectedAreas[0].isActive ? "bg-green-600 text-white" : ""
                }`}>
                Frontyard
              </button>
              <button
                onClick={() => handleToggleArea("Backyard")}
                className={`w-full px-4 py-2 border ${
                  selectedAreas[1].isActive ? "bg-green-600 text-white" : ""
                }`}>
                Backyard
              </button>
            </div>
            <div id='extrasSection'>
              <h3 className='font-bold text-lg'>Extras:</h3>
              {selectedExtras.map((extra, index) => (
                <div key={index} className='flex justify-between items-center my-2'>
                  <p className='text-sm'>{extra.name}</p>
                  <Switch
                    isSelected={extra.isActive}
                    isDisabled={
                      productSelected?.type === "Pro" && (index === 1 || index === 2)
                    }
                    onChange={() => toggleExtra(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='py-4 border-t border-gray-300'>
            <p className='font-bold text-lg'>Final Price: ${finalPrice}</p>
            <button
              onClick={handlePurchase}
              className='w-full mt-4 bg-blue-500 text-white py-2 rounded-md'>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayProductSection;
