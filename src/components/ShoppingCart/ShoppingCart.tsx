"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Section from "./Section";
import { apiService } from "@/services/apiService";
import { useSession } from "next-auth/react";

import { Product, Extra } from "@/utils/dataInterfaces";

export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [extras, setExtras] = useState<Extra[] | null>(null);
  const [loadingShoppingCart, setLoadingSholoadingShoppingCart] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getProducts();
        if (response && response.data) {
          setProducts(response.data as Product[]); // Cast response.data to Product[] type
        }
      } catch (err: unknown) {
        console.log("ShoppingCart: Error fetching products:", err);
      }
    };

    const fetchExtras = async () => {
      try {
        const response = await apiService.getExtras();
        if (response && response.data) {
          setExtras(response.data as Extra[]); // Cast response.data to Extra[] type
        }
      } catch (err: unknown) {
        console.log("ShoppingCart: Error fetching extras:", err);
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
    [products]
  );

  useEffect(() => {
    setTimeout(() => {
      setLoadingSholoadingShoppingCart(false);
    }, 3500);
  }, []);

  return (
    <section className="">
      {loadingShoppingCart ? (
        <div className="w-full h-full flex justify-center items-center bgred-300">
          <video
            autoPlay
            muted
            className="w-full min-h-[400px]  object-cover max-sm:object-[20%] "
            src="https://github.com/BPM94/SCCTMD/raw/main/shopping-cart/shoppingCartLoaderClean.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <Section
          products={products}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handleSelectedPackage={handleSelectedPackage}
          scrollContainerRef={scrollContainerRef}
          extras={extras || null}
          loadingShoppingCart={loadingShoppingCart}
        />
      )}
    </section>
  );
}
