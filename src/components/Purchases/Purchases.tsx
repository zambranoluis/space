"use client";

import { useEffect, useState, ReactNode, useCallback, use } from "react";

import { TiArrowSortedDown } from "react-icons/ti";

import { Image } from "@nextui-org/image";

import {projects} from "../../app/(panel-client)/panel-client/steps";

import { apiService } from "@/services/apiService";

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

interface PurchasesProps {
  customerId: string;
}

export const Purchases: React.FC<PurchasesProps> = ({ customerId }) => {

  const [purchase, setPurchase] = useState<Purchase[]>([]);
  const [isLoadingPurchase, setIsLoadingPurchase] = useState<boolean>(false);

  const getPurchasesByCustomer = useCallback(async () => {
    setIsLoadingPurchase(true);
    try {
      const response = await apiService.getPurchasesByCustomerAndId("678b3cb754c8efd3f5677ee5");
      if (response) {
        console.log("1- respuesta axios getPurchasesByCustomer", response);
        setPurchase(response.data);
        setIsLoadingPurchase(false);
        console.log("2- data axios getPurchasesByCustomer", response.data);
      }
    } catch (error) {
      
    }
  }, []);
  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getPurchasesByCustomer();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [getPurchasesByCustomer]);

  useEffect(() => {
    console.log("purchase: ", purchase);
  }, [purchase]);

  

  return (
    <section className="bgred-100  w-full h-full">
      <div className="flex pl-6 text-[#6d786f]">
        <h1 className="flex text-3xl font-black ">Purchases{""}</h1>
      </div>
      <div className="flex flex-col pl-12 text-[#6d786f] mt-8">
        <div className="flex">
          <h1 className="font-re">You paid for: </h1>
        </div>
        <div className="flex flex-col">
          {!isLoadingPurchase ? 
            (<div className="">
              {/* <h2>{purchase.product.name}</h2> */}
            </div>)
            :
            (<>
            </>)
          }
        </div>
      </div>
    </section>
  );
}



