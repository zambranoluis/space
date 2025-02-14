"use client"

import { MdOutlineDoubleArrow } from "react-icons/md";

import Section from "./Section"

const Portfolio = () => {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <section className="">
      <Section />
      <div className="bg-red-300 flex justify-end">
        <button className="bg-[#6d786f]/70 hover:bg-[#6d786f] cursor-pointer rounded-lg p-4 fixed bottom-4 right-4 flex flex-col justify-center items-center z-[500]" onClick={() =>{handleScrollToTop()}}>
          <MdOutlineDoubleArrow className="text-white -rotate-90 text-xl" />
          <p className="text-xs text-center">Scroll <br />to top</p>
        </button>
      </div>
    </section>
  );
}

export default Portfolio;