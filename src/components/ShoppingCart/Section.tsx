"use client";

import { RefObject } from "react";

import CardsDisplay from "@/components/ShoppingCart/CardsDisplay";
import PayProductSection from "@/components/ShoppingCart/PayProductSection";

import LoadingShoppingCart from "@/components/ShoppingCart/LoadingShoppingCart";

import {
  Product,
  Extra
} from "@/utils/dataInterfaces";


interface ShoppingCartProps{
  products: Product[] | null;
  selectedPackage: number;
  setSelectedPackage: React.Dispatch<React.SetStateAction<number>>;
  handleSelectedPackage: (index: number, direction: "next" | "prev") => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  extras: Extra[] | null;
}

const Section: React.FC<ShoppingCartProps> = ({ 
  products,
  selectedPackage,
  setSelectedPackage,
  handleSelectedPackage,
  scrollContainerRef,
  extras}) => {

  return (
    <div className='w-full bgrose-400 flex flex-col bgred-400'>
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
        )}
      </section>

      {products && products.length > 0 ? (
        <PayProductSection
          products={products}
          extras={extras}
          selectedPackage={selectedPackage}
          handleSelectedPackage={handleSelectedPackage}
        />
      ) : (
        <LoadingShoppingCart />
      )}
    </div>
  );
}

export default Section;