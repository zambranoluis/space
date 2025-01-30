"use client"

import { questionnaire } from "./questionnaire";

import { useEffect, useState, ReactNode } from "react";
import { Image } from "@nextui-org/image";

import NavbarWorker from "@/components/NavbarWorker";

import AsideWorker from "@/components/AsideWorker";

import ChatModal from "@/components/ChatModal";

const ProjectDevelopment: React.FC = () => {
  return (
    <main className="flex flex-col w-full bggreen-400 ">
      <NavbarWorker />
      <section id="developmentContainer" className="min-h-[calc(100vh-100px)] bgblue-300">
        <div id="customer" className="flex flex-col bgred-200 w-full">
          <div className="flex flex-col w-full bgred-300">
            <div id="projectInfo" className="bg-[#f2f2f1] h-[150px] gap-1 flex flex-col justify-center items-center">
              <h1 className="text-black font-bold md:text-3xl">Project 22133568</h1>
              <p className="text-[#868370] w-[60%] max-w-[500px] md:text-lg bgorange-300 text-center">Project 22133568 (3d Design Package - Front Yard, 30 Day
                Design Revisions, 2D Satellite Design, Oasis Lighting Plan)</p>
            </div>
            <div id="customerInfo" className="bgpurple-400 w-[70%] place-self-center justify-center items-center flex flex-col py-8">
              <div className="flex flex-col">
                <div id="title" className="flex bgrose-400 px-4 py-4">
                  <h1  className="text-2xl sm:text-4xl py-2 font-bold border-l-8 border-[#68664d] text-[#68664d] pl-4">Customer Information</h1>
                </div>
                <div id="details" className="flex flex-col p-8 text-black">
                  <p>Tim Sawyer</p>
                  <p>2916 Sunset Dr</p>
                  <p>Uniontown, OH 44685</p>
                </div>
                <div id="media" className="bgred-300">
                  <div className="border-1 border-[#d7d7d7] flex gap-2 p-6 max-sm:flex-col max-sm:h-[350px] h-[300px]">
                    <div className=" w-full bg-[#d7d7d7] max-sm:h-full ">

                    </div>
                    <div className="flex max-sm:flex-row flex-col gap-2 bgpurple-800 justify-between">
                      <div className="w-[80px] h-[80px]  bg-[#d7d7d7]"></div>
                      <div className="w-[80px] h-[80px]  bg-[#d7d7d7]"></div>
                      <div className="w-[80px] h-[80px]  bg-[#d7d7d7]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="questionnaire" className="flex justify-center items-center py-8">
            <div className="flex flex-col bg-[#f3f3f3] rounded-[60px] w-[90%] p-20">
              <div className="flex flex-col w-[80%] bgyellow-300 gap-2">
                <div className="flex border-l-8 border-l-[#6d786f] py-2 pl-4">
                  <h1 className="text-3xl font-bold text-[#6d786f]">Questionnaire</h1>
                </div>
                <div className="flex flex-col p-4 bgemerald-300">
                  <div  className="flex flex-col gap-8">
                    <h2 className="font-bold text-xl  text-[#6d786f]">General Questions</h2>
                    <div className="flex flex-col gap-1">
                      {
                        questionnaire.general.map((question, index) => (
                          <div id="question" className="flex flex-col gap-2" key={index}>
                            <h3 className="font-bold text-black">{question.title}<span className="font-normal"> Choise</span></h3>
                            {(question.note) && (
                              <div className="bg-white rounded-2xl border border-black text-black p-4 w-full">
                              <p className="text-[#b5b5b5]">Customer note</p>
                            </div>
                            )}
                          </div>
                        ))
                      }
                    </div>
                    <h2 className="font-bold text-xl  text-[#6d786f]">Backyard Questions</h2>
                    <div className="flex flex-col gap-1">
                      {
                        questionnaire.backyard.map((question, index) => (
                          <div id="question" className="flex flex-col gap-2" key={index}>
                            <h3 className="font-bold text-black">{question.title}<span className="font-normal"> Choise</span></h3>
                            {(question.note) && (
                              <div className="bg-white rounded-2xl border border-black text-black p-4 w-full">
                              <p className="text-[#b5b5b5]">Customer note</p>
                            </div>
                            )}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="pm" className="bgpurple-500 py-8 flex flex-col ">
          <div className="flex flex-col bgred-600 w-[90%] bg-[#f3f3f3] rounded-[50px] p-6 place-self-center">
            <div className="flex justify-center items-center p-6 md:justify-start">
            <div className="flex border-l-8 border-[#68664d] py-2 px-4  ">
                <h1 className="text-4xl font-black text-[#68664d]">Project Manager</h1>
              </div>
            </div>
            <div className="bgrose-300  place-self-center w-full p-4 border rounded-md border-[#d7d7d7] flex flex-col gap-4">
              <textarea className="w-full bg-white text-black p-4" placeholder="Add Project Manager notes here..." name="" id=""></textarea>
              <div className="flex max-w-[500px] gap-5">
                <select className="bg-gray-600 px-4 py-2 rounded-md" name="" id="">
                  <option value="1">Designer 1</option>
                  <option value="2">Designer 2</option>
                </select>
                <button className="px-4 py-2 rounded-md bg-[#848d5a]">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div id="ds" className="bgpurple-500 py-8 flex flex-col ">
          <div className="flex flex-col bgred-600 w-[90%] bg-[#f3f3f3] rounded-[50px] p-6 place-self-center">
            <div className="flex justify-center items-center p-6 md:justify-start">
              <div className="flex border-l-8 border-[#68664d] py-2 px-4  ">
                <h1 className="text-4xl font-black text-[#68664d]">Designer</h1>
              </div>
            </div>
            <div className="bgrose-300  place-self-center w-full p-4 border rounded-md border-[#d7d7d7] gap-8 flex flex-col">
              <div id="f1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center">
              <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200 font-light">Please upload here: The photos of the area to be worked on</h1>
                </div>
              </div>
              <div className="flex w-full justify-center items-center h-[250px]" >
                <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
                  <div className="flex">
                    <label htmlFor="files1" className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer">
                      <Image className="w-[40px] aspect-square object-contain" src="/questionnaire/elementos-13.png" alt="" />
                    </label>
                    <input id="files1" name="files1" className="hidden" type="file" />
                  </div>
                </div>
                <div className="flex max-sm:w-[60%] sm:w-[80%]  bgred-300  sm:gap-6 justify-center items-center p-2">
                  <Image className="h-full   rounded-none " src="/questionnaire/elementos-12.png" alt="" />
                  <Image className="h-full   rounded-none max-sm:hidden" src="/questionnaire/elementos-12.png" alt="" />
                  <Image className="h-full   rounded-none max-md:hidden" src="/questionnaire/elementos-12.png" alt="" />
                  <Image className="h-full   rounded-none max-lg:hidden" src="/questionnaire/elementos-12.png" alt="" />
                  <Image className="h-full  rounded-none max-xl:hidden" src="/questionnaire/elementos-12.png" alt="" />
                </div>
              </div>
            </div>
              <textarea className="w-full bg-white text-black p-4" placeholder="Add Designer notes here..." name="" id=""></textarea>
              <div className="flex max-w-[500px] gap-5">
                <button className="px-4 py-2 rounded-md bg-[#848d5a]">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div id="qa" className="bgpurple-500 py-8 flex flex-col ">
          <div className="flex flex-col bgred-600 w-[90%] bg-[#f3f3f3] rounded-[50px] p-6 place-self-center">
            <div className="flex justify-center items-center p-6 md:justify-start">
              <div className="flex border-l-8 border-[#68664d] py-2 px-4 ">
                <h1 className="text-4xl font-black text-[#68664d]">Quality Assurance</h1>
              </div>
            </div>
            <div className="bgrose-300  place-self-center w-full p-4 border rounded-md border-[#d7d7d7] flex flex-col gap-4">
              <textarea className="w-full bg-white text-black p-4" placeholder="Add Quality Assurance notes here..." name="" id=""></textarea>
              <div className="flex max-w-[500px] gap-5">
                <select className="bg-gray-600 px-4 py-2 rounded-md" name="" id="">
                  <option value="1">Submit Revision</option>
                  <option value="2">Submit Approval</option>
                </select>
                <button className="px-4 py-2 rounded-md bg-[#848d5a]">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex bgred-200 absolute bottom-[10px] items-end  right-[10px] z-[3000]">
        <ChatModal />
      </div>
    </main>
  );
}

export default ProjectDevelopment;