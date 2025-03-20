"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Section from "./Section";
import { apiService } from "@/services/apiService";
import { useSession } from "next-auth/react";

import { Product, Extra } from "@/utils/dataInterfaces";

import { Image } from "@heroui/image";

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
    <section className=" w-full">
      {loadingShoppingCart ? (
        <div className="w-full h-full min-h-[50vh] md:min-h-[calc(100vh-100px)] flex justify-center items-center bgred-300">
          <div className="bg-ed-300 justify-center items-center rounded-full p-16 relative">
            <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center animate-spin-slow  bgyellow-200">
              <div className="relative w-full h-full flex justify-center items-center bgblue-200">
                {/* Borde parcial */}
                <div
                  className="absolute w-full h-full border-[8px] border-transparent rounded-full bgred-300"
                  style={{
                    borderTopColor: "#848d5a",
                    borderLeftColor: "#848d5a",
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
                  }}
                />
              </div>
            </div>
            <div>
              <Image
                className="max-w-[100px]"
                src="https://github.com/BPM94/SCCTMD/raw/main/shopping-cart/shoppingCartLoaderSpaceGreen.gif"
                alt="Cargando carrito"
                width={100}
                height={100}
              />
            </div>
          </div>
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
