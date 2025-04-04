"use client"

import {faqs} from "./faqsAll"

import { Image } from "@heroui/image";

import { SlArrowDown } from "react-icons/sl";

interface FaqsProps {
  toggleAnswer: (id:number) => void;
}

const Section:React.FC<FaqsProps> = ({toggleAnswer}) => {
  return (
    <main className="flex w-full bgpurple-500 p2 flex-col">
      <section className="bg-[#dcd6c8] sm:h-[300px] w-full flex p2 justify-center items-center flex-col sm:flex-row ">
        <div className="  flex   bggreen-300 w-[60%] sm:w-[40%] max-sm:py-6 relative">
          <div className="bgpink-500  h-full flex flex-col text-center sm:text-end">
            <h2 className="text-lg md:text-2xl lg:text-3xl">We are here to answer your</h2>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">frequently asked questions</h1>
          </div>
        </div>
        <div className=" w-[50%] flex sm:w-[40%] h-full bg-cover   2xl:bg-contain bg-no-repeat bg-center bgorange-400" >
          <Image className="h-full w-full object-cover" src="https://github.com/BPM94/SCCTMD/raw/main/faqs/mainAvatar.png" alt="" />
        </div>
      </section>

      <section className="flex w-full bgrose-400 justify-center">
        <div className="flex flex-col w-[90%] bgpurple-400 gap-4 sm:w-[80%] py-16 sm:px-8">
          {
            faqs.map((faq) => (
              <div className="flex flex-col w-full bgorange-300 gap-12 py-12  border-b border-black select-none" key={faq.id}>
                <div className="flex w-full bgrose-500 justify-between cursor-pointer" onClick={() => {toggleAnswer(faq.id)}}>
                  <h1 className="text-2xl md:text-3xl font-bold bgblue-800 py-4 px-4 border-l-8 border-[#6b776d] text-[#6b776d]">{faq.question}</h1>
                  <div className="flex bgblue-600 items-end">
                    <SlArrowDown id={`arrow${faq.id}`} className=" text-4xl font-light text-[#6b776d] cursor-pointer" />
                  </div>
                </div>
                <div id={`answerContainer${faq.id}`} className="flex duration-1000 bgred-400 text-black">
                  <p id={`answer${faq.id}`} className="bggreen-400 hidden md:text-lg text-justify px-2 sm:px-6 duration-300">{faq.answer}</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>
        
      <section className="flex w-full mt-8 h-[600px] bggreen-500 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/opt/footerFaq1.jpg')" }}>
      </section>
    </main>
  );
}

export default Section;