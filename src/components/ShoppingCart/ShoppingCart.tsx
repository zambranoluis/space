"use client"

import { useState, useRef, useCallback, useEffect } from "react";

import Section from "./Section";



import { apiService } from "@/services/apiService";
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

export default function ShoppingCart() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [extras, setExtras] = useState<Extra[] | null>(null);
  const { data: session } = useSession();

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
        if (response) {
          setProducts(response.data);
        }
      } catch (err: unknown) {
        console.error("ShoppingCart: Error fetching products:", err);
      }
    };

    const fetchExtras = async () => {
      try {
        const response = await apiService.getExtras();
        if (response) {
          setExtras(response.data);
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
    <section>
      <Section
        products={products}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        handleSelectedPackage={handleSelectedPackage}
        scrollContainerRef={scrollContainerRef}
        extras={extras}
        customer={customer?._id || null}      
      />
    </section>
  )

}