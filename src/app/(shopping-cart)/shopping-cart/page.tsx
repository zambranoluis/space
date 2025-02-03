"use client";

import { useState, useRef, useCallback, useEffect, RefObject } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

import CardsDisplay from "@/components/ShoppingCart/CardsDisplay";
import PayProductSection from "@/components/ShoppingCart/PayProductSection";

import axios from "axios";

import { Switch } from "@nextui-org/switch";

import LoadingShoppingCart from "@/components/ShoppingCart/LoadingShoppingCart";

import { apiService } from "@/services/apiService";
import { products } from "../../../components/ShoppingCart/shopping-cart";
import { useSession } from "next-auth/react";

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
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [extras, setExtras] = useState<Extra[] | null>(null);
  const { data: session } = useSession();

  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false); // Estado de carga
  const [errorCustomer, setErrorCustomer] = useState<string | null>(null); // Estado de error

  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false); // Estado de carga
  const [errorProducts, setErrorProducts] = useState<string | null>(null); // Estado de error

  const [isLoadingExtras, setIsLoadingExtras] = useState<boolean>(false); // Estado de carga
  const [errorExtras, setErrorExtras] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    if (session?.user?.id) {
      const fetchCustomer = async () => {
        try {
          const response = await apiService.getCustomer(session?.user?.id);
          if (response) {
            setCustomer(response);
          }
        } catch (err) {
          console.error("Error fetching customer:", err);
        }
      };
      fetchCustomer();
    } else {
      setCustomer(null); // Si no hay sesión, aseguramos que `customer` sea null
    }
  }, [session]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        // console.log("ShoppingCart: Products response:", response); // Log the API response
        if (response) {
          setProducts(response.data);
          // console.log("ShoppingCart: Products data:", response.data); // Log the API response
        }
      } catch (err: unknown) {
        console.error("ShoppingCart: Error fetching products:", err);
      }
    };

    const fetchExtras = async () => {
      try {
        const response = await apiService.getExtras();
        // console.log("ShoppingCart: Extras response:", response); // Log the API response
        if (response) {
          setExtras(response.data);
          // console.log("ShoppingCart: Extras data:", response.data); // Log the API response
        }
      } catch (err: unknown) {
        console.error("ShoppingCart: Error fetching extras:", err);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchExtras()]);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (customer && products && extras) {
  //     console.log("ShoppingCart Render: Data is available");
  //     console.log("ShoppingCart Render: Customer:", customer); // Log the state value
  //     console.log("ShoppingCart Render: Products:", products); // Log the state value
  //     console.log("ShoppingCart Render: Extras:", extras); // Log the state value
  //   }
  // }, [customer, products, extras]);

  const [customerSelectedInfo, setCustomerSelectedInfo] = useState<{
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: {
      areaCode: string;
      number: string;
    }; // Cambiado de un array a un solo objeto
    address: string;
  } | null>(null);

  useEffect(() => {
    if (customer !== null) {
      const customerInfo = {
        id: customer._id,
        name: customer.name,
        lastname: customer.lastname,
        email: customer.email,
        phone: {
          areaCode: customer.phone[0].areaCode, // Tomamos el primer número
          number: customer.phone[0].number,
        },
        address: customer.address,
      };
      setCustomerSelectedInfo(customerInfo);
      // console.log("xxx Shopping Cart: Customer info:", customerInfo);
    }
  }, [customer]);

  const [selectedPackage, setSelectedPackage] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSelectedPackage = useCallback(
    (index: number, direction: "next" | "prev") => {
      const container = scrollContainerRef.current;
      if (!container || !products) return;

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
    [products],
  );

  return (
    <main className='w-full bgrose-400 flex flex-col bgred-400'>
      <section className='bgpurple-500 flex flex-col w-full'>
        <div className='flex max-lg:flex-col max-lg:gap-2 max-lg:justify-center items-center w-full  py-8 lg:gap-6'>
          <div className='lg:w-[40%] bgblue-300 flex justify-center items-center max-lg:w-full p-2'>
            <p className='text-2xl sm:text-5xl font-black whitespace-nowrap text-center text-[#6b776d]'>
              SHOPPING CART
            </p>
          </div>
          <div className='lg:w-[60%]  bgpurple-400 w-[90%]'>
            <p className='text-xs text-[#83826e] '>
              At Space Creations we will make your idea come true in 3 simple steps, a
              specialized designer will work on the perfect space for your property. After
              sharing your ideas with us along with photos and videos of your property you
              will schedule a call with one of our project managers to discuss your ideas
              and the designer can begin creating your new space.
            </p>
          </div>
        </div>
        {products && products.length > 0 ? (
          <CardsDisplay
            products={products}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            handleSelectedPackage={handleSelectedPackage}
            scrollContainerRef={scrollContainerRef}
          />
        ) : (
          <></>
          // <LoadingShoppingCart />
        )}
      </section>

      {products && products.length > 0 ? (
        <PayProductSection
          customer={customerSelectedInfo}
          products={products}
          extras={extras}
          selectedPackage={selectedPackage}
          handleSelectedPackage={handleSelectedPackage}
        />
      ) : (
        <LoadingShoppingCart />
      )}
    </main>
  );
}

export default ShoppingCart;
