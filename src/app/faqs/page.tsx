'use client'

import { useState } from "react";

import { Image } from "@nextui-org/image";
import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { SlArrowDown } from "react-icons/sl";



const faqs = [
  {
    id: 1,
    question: "What is Space Creations?",
    answer: " SpaceCreations is a studio specializing in landscape design for residential properties, transforming outdoor spaces into harmonious and functional environments. We have a team of expert designers who work closely with the client, understanding their needs and the context of the space to create innovative and personalized solutions. Our approach is to improve quality of life through well-designed landscapes that not only enhance the beauty of each residence but also optimize the relationship between the natural environment and architecture. At SpaceCreations, we are passionate about creating outdoor spaces that invite relaxation and enjoyment, while also adding aesthetic value and functionality to every home."
  },
  {
    id: 2,
    question: "What styles of landscape design do we offer?",
    answer: "At SpaceCreations, we offer a wide variety of design styles to meet the preferences and needs of each client. Whether you're looking for a traditional and classic style, a modern and minimalist design, a zen and relaxing atmosphere, or the warm touch of a Mediterranean style, our team of experts is ready to create the perfect landscape that complements your residence. Every project is unique, and we ensure that the chosen style not only reflects your personality but also integrates harmoniously with the surroundings and architecture of your home."
  },
  {
    id: 3,
    question: "Can you create a custom design to suit my needs and budget?",
    answer: "Yes, at SpaceCreations, we specialize in creating custom designs that fit both your needs and budget. We work closely with you to understand your expectations and provide solutions that maximize the potential of your space without compromising quality or your budget."
  },
  {
    id: 4,
    question: "Can I see examples of previous work or client references?",
    answer: " Yes, you can visit our portfolio section, where you can see examples of previous work in the different design styles we have worked on. There, you will find a variety of projects that showcase the diversity of our approach and the quality of the designs we have created for our clients."
  },
  {
    id: 5,
    question: "Can I choose the plants and materials that will be used in the project?",
    answer: " Yes, at SpaceCreations, we give you the opportunity to choose the plants and materials that will be used in your project. However, it is important that the plants you choose are suitable for the climate and conditions of the area where your residence is located. Our team will guide you to ensure that the options you select are the most appropriate to guarantee the success and durability of your landscape"
  },
  {
    id: 6,
    question: "Do you use native species or low - maintenance plants?",
    answer: " Our main focus is on using native species, as they are better suited to the local climate, require less maintenance, and contribute to the sustainability of the ecosystem. However, we always ensure that we meet our clients' requirements and preferences, also integrating low-maintenance plants when necessary to achieve a functional and attractive design."
  },
  {
    id: 7,
    question: "How long will it take to complete the design?",
    answer: " The delivery time for your design at SpaceCreations is usually around 2 weeks, although it may vary depending on the selected package and the complexity of the project. We work to ensure that we deliver a detailed, high-quality design within the agreed timeframe."
  },
  {
    id: 8,
    question: "What sets your company apart from others in the market?",
    answer: "What sets SpaceCreations apart from other companies in the market is our personalized approach and attention to detail in every project. We specialize in creating landscapes that are not only aesthetically pleasing but also functional and sustainable. Our experience and passion for design, combined with the use of native species and high-quality materials, allow us to offer unique solutions tailored to the specific needs of each client. Additionally, we work closely with our clients throughout the entire process, ensuring that their vision and budget are respected."
  },
  {
    id: 9,
    question: "Is the staff working on the projects properly trained and experienced?",
    answer: " Yes, all the staff working on our projects at SpaceCreations are properly trained and have extensive experience in landscape design. Our team consists of expert designers with deep knowledge in various areas, such as plant selection, space planning, and the use of sustainable materials. Additionally, we continuously work to stay updated with the latest trends and techniques in landscape design, ensuring quality and professionalism in every project."
  },
  {
    id: 10,
    question: "How is the initial consultation and project planning process carried out?",
    answer: " The initial consultation and project planning process at SpaceCreations begins with a personalized meeting where we discuss your ideas, needs, and expectations. During this consultation, we make sure to understand your goals, style preferences, and any space constraints. We also conduct a detailed analysis of the environment and the climate of the area to ensure that the proposed solutions are suitable.  Based on this information, we create a preliminary plan and design proposal that aligns with your budget and vision. We then present the design to gather your feedback and make any necessary adjustments. Once approved, we move on to the execution and monitoring phase, ensuring that the project is carried out as agreed, with the quality and attention to detail that defines SpaceCreations."
  },
  {
    id: 11,
    question: "How do you handle communication during the project? Will I be regularly informed about the progress?",
    answer: " Yes, we make sure to maintain constant and transparent communication throughout the entire project. We will communicate with you via Skype and email to keep you informed of any important details or updates. Additionally, you will receive notifications on our website, where you can track the progress of your design in real time. This way, you will always be informed and able to provide feedback or make adjustments as needed. "
  },
  {
    id: 12,
    question: "How do you handle revisions during the project?",
    answer: " Each design package at SpaceCreations includes one round of revisions, where you can make adjustments and modifications to the design. If you want additional rounds of revisions, for an extra $100, you can request new modifications to ensure the final design meets all your expectations. We make sure to work flexibly so that you are completely satisfied with the result. "
  },
  {
    id: 13,
    question: "Do you have availability for short-term projects, or how far in advance are you booked?",
    answer: "At SpaceCreations, we strive to be as flexible as possible with our timelines. While our schedule depends on the current workload, we generally have availability for short-term projects. We recommend getting in touch with us as soon as possible to coordinate the dates and ensure we can meet your deadlines without compromising the quality of the design. We would be happy to work with you and adapt to your needs."
  },
  {
    id: 14,
    question: "Are you willing to work with a tight budget and offer options to fit within it?",
    answer: " Yes, we are willing to work with a tight budget and are committed to offering options that fit within it without sacrificing the quality of the design. Our team focuses on finding creative and efficient solutions that maximize the visual and functional impact of the space, always balancing your needs and budget. We ensure that each project remains accessible while still meeting the quality standards that define us. "
  }
]



const CreateAccount = () => {

  const toggleAnswer = (id: number) => {
    const container = document.getElementById(`answerContainer${id}`);
    const answer = document.getElementById(`answer${id}`);
    const arrow = document.getElementById(`arrow${id}`);

    if (answer?.classList.contains("hidden")) {
      container?.classList.remove("h-[0px]")
      answer?.classList.remove("hidden");
      arrow?.classList.remove("-rotate-90");
    } else {
      answer?.classList.add("hidden");
      container?.classList.add("h-[0px]")
      arrow?.classList.add("-rotate-90");
    }
}



  return (
    
    <main className="flex w-full bgpurple-500 p2 flex-col">
      <section className="bg-[#dcd6c8] sm:h-[300px] w-full flex p2 justify-center items-center flex-col sm:flex-row ">
        <div className="  flex   bggreen-300 w-[50%] sm:w-[40%] ">
          <div className="bgpink-500  h-full flex flex-col text-center sm:text-end">
            <h2 className="text-lg md:text-2xl lg:text-3xl">We are here to answer your</h2>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">frequently asked questions</h1>
          </div>
        </div>
        <div className=" w-[50%] flex sm:w-[40%] h-full bg-cover 2xl:bg-contain bg-no-repeat bg-center bgorange-400" >
          <Image className="h-full w-full object-cover " src="https://github.com/BPM94/SCCTMD/raw/main/opt/mainAvatar.png" alt="" />
        </div>
      </section>

      <section className="flex w-full bgrose-400 justify-center">
        <div className="flex flex-col w-[90%] bgpurple-400 gap-4 sm:w-[80%] py-16 sm:px-8">
          {
            faqs.map((faq) => (
              <div className="flex flex-col w-full bgorange-300 gap-12 py-12  border-b border-black select-none" key={faq.id}>
                <div className="flex w-full bgrose-500 justify-between">
                  <h1 className="text-2xl md:text-3xl font-bold bgblue-800 py-4 px-4 border-l-8 border-[#6b776d] text-[#6b776d]">{faq.question}</h1>
                  <div className="flex bgblue-600 items-end">
                    <SlArrowDown id={`arrow${faq.id}`} className="text-4xl font-light text-[#6b776d] cursor-pointer" onClick={() => {toggleAnswer(faq.id)}}/>
                  </div>
                </div>
                <div id={`answerContainer${faq.id}`} className="flex duration-1000 bgred-400">
                  <p id={`answer${faq.id}`} className="bggreen-400 md:text-lg text-justify px-2 sm:px-6 duration-300">{faq.answer}</p>
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
};

export default CreateAccount;
