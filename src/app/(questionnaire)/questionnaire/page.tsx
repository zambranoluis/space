'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

import {Switch} from "@nextui-org/switch";


import {
  questionnaire
} from "./questionnaire";



function ShoppingCart() {

  

  return (
    <main className="w-full bgrose-400 flex flex-col gap-20 items-center">
      <section id="Landing" className="flex max-md:flex-col w-full md:h-[230px] lg:h-[280px] xl:h-[380px]">
        <div className="flex flex-col w-full md:w-[50%] bgred-200 p-2 justify-center gap-4 md:gap-8  py-12">
          <Link className="flex bggreen-300 p-2 min-lg:pl-12 justify-center items-center" href={"/shopping-cart"}>
            <Image className={`w-full bgblue-300 max-w-[250px] dropshadow-[0_1.8px_1.8px_rgba(0,0,0,0.8)]`}
              src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
              alt=""
            />
          </Link>
          <div className=" flex flex-col  gap-2 p-6  justify-center items-center bgrose-500">
            <div className="flex flex-col md:pl-8 bggreen-400">
              <h1 className="font-black text-3xl text-[#6c786e] min-[400px]text-5xl bgorange-200">Questionnaire</h1>
              <p className="text-xs text-black min-[400px]text-lg bgorange-500">Answer the following questions to help us<br />
              design your dream space</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-md:h-[500px]  md:w-[50%] bg-top bg-cover bg-no-repeat scale-x-[-1]" style={{backgroundImage: "url('/questionnaire/questionnaireBGTop.webp')",}}>
          
        </div>
      </section>

      <section id="generalQuestions" className="flex flex-col bgred-200 min-h-[500px] w-[90%] gap-12">
        <div id="gq1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-2 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][0].title}</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 py-12 gap-2 text-black">
            {
              questionnaire["general"][0].options.map((option, index) => (
                <div className="flex bgblue-300 gap-2 w-full items-center justify-center " key={option.id}>
                  <div className="w-[60%] bggreen-300 justify-end items-end flex">
                    <p className="text-xs sm:text-base flex justify-center items-center gap-1"><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                  </div>
                  <div className="w-[15%] bgyellow-200">
                    <input className="text-[#ebebeb]" type="checkbox" />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div id="gq2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-2 text-xl font-black rounded-t-3xl">
            <h1>What style are you looking for your space?</h1>
          </div>
          <div className="w-full bgblue-300">
            <div className="grid   gap-2 py-6 min-[400px]:grid-cols-2 md:grid-cols-4 bggreen-300">
              {
                questionnaire["general"][1].options.map((option, index) => (
                  <div className="bgred-300 flex flex-col justify-center items-center p-4" key={option.id}>
                    <Image className="w-[110px] aspect-square object-cover object-center rounded-full" src={option.img} alt=""/>
                    <div className="flex justify-center items-center gap-2 p-2">
                      <p className="text-black flex justify-center items-center gap-1"><span className="text-xl text-[#68664d]">▪ </span>{option.name}</p>
                      <input type="checkbox" />
                    </div>
                  </div>
                ))
              }
            </div>
            <div id="gqOther" className="flex gap-2 w-full bgred-200 px-16 py-12 text-black items-end">
              <p className="text-[#68664d]">Other: </p>
              <div className="border border-b-black border-b-2 w-full">
                <input className="h-[40px] text-xl outline-none border-none bg-white w-full text-black  pl-2" placeholder="" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div id="gq3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][2].title}</h1>
          </div>
          <div className="flex relative h-[120px]">
            <div className="flex justify-center items-center bgred-200 pl-2 min-[450px]:pl-8">
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                Yes/No
              </button>
            </div>
            <div className="bgred-300 h-full w-full absolute justify-end items-center flex pr-2 min-[450px]:pr-8 top-[-15px]">
              <Image className="w-[120px] object-cover object-center aspect-square rounded-full" src={questionnaire["general"][2].img} alt="" />
            </div>
          </div>
        </div>
        <div id="gq4" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][3].title}</h1>
          </div>
          <div className="flex relative h-[120px]">
            <div className="flex justify-center items-center bgred-200 pl-2 min-[450px]:pl-8">
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                Yes/No
              </button>
            </div>
            <div className="bgred-300 h-full w-full absolute justify-end items-center flex pr-2 min-[450px]:pr-8 top-[-15px]">
              <Image className="w-[120px]  object-cover object-top aspect-square rounded-full" src={questionnaire["general"][3].img} alt="" />
            </div>
          </div>
        </div>
        <div id="gq5" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl">
            <h1>{questionnaire["general"][4].title}</h1>
          </div>
          <div className="flex relative h-[120px]">
            <div className="flex justify-center items-center bgred-200 pl-2 min-[450px]:pl-8">
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                Yes/No
              </button>
            </div>
            <div className="bgred-300 h-full w-full absolute justify-end items-center flex pr-2 min-[450px]:pr-8 top-[-15px]">
              <Image className="w-[120px] aspect-square object-cover object-top  rounded-full" src={questionnaire["general"][4].img} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="backyardQuestions" className="flex flex-col w-full justify-center items-center gap-20">
        <div className="flex max-sm:flex-col bgred-300 sm:h-[300px] w-full">
          <div className="flex sm:w-[40%] justify-center items-center max-sm:py-24">
            <h1 className="font-black text-3xl text-[#6c786e]">BACKYARD</h1>
          </div>
          <div className="sm:w-[60%] max-sm:h-[300px] h-full bg-cover bg-center bg-no-repeat scale-x-[-1]" style={{backgroundImage: "url('/questionnaire/questionnaireBgBackyard.webp"}}></div>
        </div>
        <div className="flex flex-col w-[90%] gap-12">
          <div id="bq1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl w-full">
              <h1>{questionnaire["backyard"][0].title}</h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center p-8 " >
              <div className="flex  items-center  w-full relative py-12 px-8">
                <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][0].buttonText}</button>
                <div className="flex absolute right-0 top-[-50px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][0].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="bq2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][1].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][1].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center p-8 " >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-sm:gap-8 gap-2 w-full py-16 bgred-300 ">
                {
                  questionnaire["backyard"][1].options.map((option, index) => (
                    <div key={index} className="flex    bbqlue-300 justify-center gap-6">
                      <div className="flex  text-black gap-2">
                        <span className="text-xl text-[#68664d]">▪ </span>
                        <div className="flex flex-col bgred-300">
                          <p className=" gap-1 ">{option.name}</p>
                          <p className="text-xs">{option.detail}</p>
                        </div>
                      </div>
                      <input type="checkbox" className="" />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div id="bq3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][2].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][2].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-center p-8 py-20" >
              {
                questionnaire["backyard"][2].options.map((option, index) => (
                  <div className="flex flex-col w-full " key={index}>
                    <p className="text-[#68664d]">{option.name}</p>
                    <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]" />
                  </div>
                ))
              }
            </div>
          </div>
          <div id="bq4" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][3].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][3].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][3].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
          <div id="bq5" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][4].title}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][4].buttonText}</button>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 w-full">
                {
                  questionnaire["backyard"][4].options.map((option, index) => (
                    <div className="flex flex-col gap-6 justify-center items-center text-black w-full" key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex justify-center items-center gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  ))

                }
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="bq6" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][5].title}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][5].buttonText}</button>
              <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                {
                  questionnaire["backyard"][5].options.map((option, index) => (
                    <div className="flex flex-col gap-4  text-black bbqlue-300 " key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="bq7" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][6].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][6].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][6].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="bq8" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][7].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][7].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][7].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="bq9" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][8].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][8].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][8].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="bq10" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][9].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][9].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][9].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="frontyardQuestions" className="flex flex-col w-full justify-center items-center gap-20">
        <div className="flex max-sm:flex-col bgred-300 sm:h-[300px] w-full">
          <div className="flex sm:w-[40%] justify-center items-center max-sm:py-24">
            <h1 className="font-black text-3xl text-[#6c786e]">FRONTYARD</h1>
          </div>
          <div className="sm:w-[60%] max-sm:h-[300px] h-full bg-cover bg-center bg-no-repeat scale-x-[-1]" style={{ backgroundImage: "url('/questionnaire/questionnaireBgFrontyard.webp" }}></div>
        </div>
        <div className="flex flex-col w-[90%] gap-12">
          <div id="fq1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] pt-4 pl-6 pb-4 text-xl font-black rounded-t-3xl w-full">
              <h1>{questionnaire["backyard"][0].title}</h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center p-8 " >
              <div className="flex  items-center  w-full relative py-12 px-8">
                <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][0].buttonText}</button>
                <div className="flex absolute right-0 top-[-50px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][0].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="fq2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][1].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][1].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center p-8 " >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-sm:gap-8 gap-2 w-full py-16 bgred-300 ">
                {
                  questionnaire["backyard"][1].options.map((option, index) => (
                    <div key={index} className="flex    bqflue-300 justify-center gap-6">
                      <div className="flex  text-black gap-2">
                        <span className="text-xl text-[#68664d]">▪ </span>
                        <div className="flex flex-col bgred-300">
                          <p className=" gap-1 ">{option.name}</p>
                          <p className="text-xs">{option.detail}</p>
                        </div>
                      </div>
                      <input type="checkbox" className="" />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div id="fq3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][2].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][2].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-center p-8 py-20" >
              {
                questionnaire["backyard"][2].options.map((option, index) => (
                  <div className="flex flex-col w-full " key={index}>
                    <p className="text-[#68664d]">{option.name}</p>
                    <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]" />
                  </div>
                ))
              }
            </div>
          </div>
          <div id="fq4" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][3].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][3].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][3].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
          <div id="fq5" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][4].title}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][4].buttonText}</button>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 w-full">
                {
                  questionnaire["backyard"][4].options.map((option, index) => (
                    <div className="flex flex-col gap-6 justify-center items-center text-black w-full" key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex justify-center items-center gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  ))

                }
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="fq6" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][5].title}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][5].buttonText}</button>
              <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                {
                  questionnaire["backyard"][5].options.map((option, index) => (
                    <div className="flex flex-col gap-4  text-black bqblue-300 " key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="fq7" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][6].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][6].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][6].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="fq8" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][7].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][7].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][7].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="fq9" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][8].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][8].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][8].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>

          <div id="fq10" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][9].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][9].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["backyard"][9].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="extraQuestions" className="flex flex-col w-full justify-center items-center gap-20">
        <div className="flex flex-col w-[90%] gap-12">
          <div id="eq1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["extra"][0].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["extra"][0].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["extra"][0].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
          <div id="eq2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["extra"][1].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["extra"][1].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["extra"][1].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
          <div id="eq3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["extra"][2].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["extra"][2].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["extra"][2].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
          <div id="eq4" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center">
            <div className="flex bg-[#68664d] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["extra"][3].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["extra"][3].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <button className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">{questionnaire["extra"][3].buttonText}</button>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="customerUploads"></section>
    </main>
  );
}

export default ShoppingCart;
