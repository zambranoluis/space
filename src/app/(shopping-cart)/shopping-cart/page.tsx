'use client';

import { useState, useRef, useCallback, useEffect, RefObject } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

import CardsDisplay from "@/components/ShoppingCart/CardsDisplay";
import PayProductSection from "@/components/ShoppingCart/PayProductSection";

import axios from "axios";

import {Switch} from "@nextui-org/switch";


import LoadingShoppingCart from "@/components/ShoppingCart/LoadingShoppingCart"

import { apiService } from "@/services/apiService";
import { products } from '../../../components/ShoppingCart/shopping-cart';

export interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
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



function ShoppingCart() {

  const [customer, setCustomer] = useState<Customer | null>({
    _id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: [],
    skype: "",
    address: "",
    birthdate: "",
  });
  
  const [products, setProducts] = useState<Product[]>([]) || null;
  const [extras, setExtras] = useState<Extra[]>([]) || null;
  
  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false); // Estado de carga
  const [errorCustomer, setErrorCustomer] = useState<string | null>(null); // Estado de error
  
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false); // Estado de carga
  const [errorProducts, setErrorProducts] = useState<string | null>(null); // Estado de error

  const [isLoadingExtras, setIsLoadingExtras] = useState<boolean>(false); // Estado de carga
  const [errorExtras, setErrorExtras] = useState<string | null>(null); // Estado de error

  const getCustomer = useCallback(async () => {
    setIsLoadingCustomer(true);
    setErrorCustomer(null);
    try {
      const response = await apiService.getCustomer('678b3cb754c8efd3f5677ee5');
      if (response){
        setCustomer(response.data);
      }
    } catch (err: unknown) {
      // if (axios.isAxiosError(err) && err.response) {
      //   setErrorCustomer(`Error: ${err.response.status} - ${err.response.data.message}`);
      // } else {
      //   setErrorCustomer("Error: No se pudo obtener el cliente.");
      // }
    } finally {
      // setIsLoadingCustomer(false);
    }
  }, []);


  const getProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setErrorProducts(null);
    try {
      const data = await apiService.getProducts();
      if (data){
        setProducts(data.data);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        // setErrorProducts(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else {
        // setErrorProducts("Error: No se pudo obtener los productos.");
      }
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const getExtras = useCallback(async () => {
    setIsLoadingExtras(true);
    setErrorExtras(null);
    try {
      const data = await apiService.getExtras();
      if (data){
        setExtras(data.data);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        // setErrorExtras(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else {
        // setErrorExtras("Error: No se pudo obtener los extras.");
      }
    } finally {
      setIsLoadingExtras(false);
    }
  }, []);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getExtras();
  }, [getExtras]);

  useEffect(() => {
    if (customer && products && extras) {
      console.log("customer desde shopping cart", customer);
      console.log("products desde shopping cart", products);
      console.log("extras desde shopping cart", extras);
    }
  }, [customer, products, extras]);

  const [selectedPackage, setSelectedPackage] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  

  const handleSelectedPackage = useCallback(
    (index: number, direction: "next" | "prev") => {
      const container = scrollContainerRef.current;
      if (!container) return;

      switch (direction) {
        case "next":
          if (index === products.length - 1) {
            container.scrollLeft = container.scrollWidth; // Final
          } else {
            setSelectedPackage(index + 1);
            container.scrollLeft += 200; // Avanzar
          }
          break;
        case "prev":
          if (index === 0) {
            container.scrollLeft = 0; // Inicio
          } else {
            setSelectedPackage(index - 1);
            container.scrollLeft -= 200; // Retroceder
          }
          break;
        default:
          break;
      }
    },
    [products]
  );


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
        {
          (products.length > 0) ? (
            <CardsDisplay products={products} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} handleSelectedPackage={handleSelectedPackage} scrollContainerRef={scrollContainerRef}  />
          ) : (
            <></>
            // <LoadingShoppingCart />
          )
        }
      </section>

      {
        (products.length > 0) ? (
          <PayProductSection
          customer={customer}
          products={products}
          extras={extras}
          selectedPackage={selectedPackage}
          handleSelectedPackage={handleSelectedPackage}
          />
        ) : (
          <LoadingShoppingCart />
        )
          
      }

    </main>
  );
}

export default ShoppingCart;
