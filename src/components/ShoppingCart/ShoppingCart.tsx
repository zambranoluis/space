"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Section from "./Section";
import { apiService } from "@/services/apiService";
import { useSession } from "next-auth/react";

import {
  Product,
  Extra,
} from "@/utils/dataTypes"

export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [extras, setExtras] = useState<Extra[] | null>(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        if (response && response.data) {
          setProducts(response.data as Product[]); // Cast response.data to Product[] type
        }
      } catch (err: unknown) {
        console.error("ShoppingCart: Error fetching products:", err);
      }
    };

    const fetchExtras = async () => {
      try {
        const response = await apiService.getExtras();
        if (response && response.data) {
          setExtras(response.data as Extra[]); // Cast response.data to Extra[] type
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
            container.scrollLeft = container.scrollWidth; // Scroll to the end
          } else {
            setSelectedPackage(index + 1);
            container.scrollLeft += 200; // Scroll forward
          }
          break;
        case "prev":
          if (index === 0) {
            container.scrollLeft = 0; // Scroll to the start
          } else {
            setSelectedPackage(index - 1);
            container.scrollLeft -= 200; // Scroll backward
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
        extras={extras || null}
      />
    </section>
  );
}