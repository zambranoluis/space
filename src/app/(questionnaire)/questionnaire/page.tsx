'use client';

import { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

import { IoCloudUploadOutline } from "react-icons/io5";


import {Switch} from "@nextui-org/switch";


import {
  questionnaire,
  packages
} from "./questionnaire";



function ShoppingCart() {
  const containerId: string = "containerFrontyard";


  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [selectedFq2, setSelectedFq2] = useState<number | null>(null);


  const handleCheckboxChange = (index: number) => {
    setSelectedOption(index === selectedOption ? null : index); // Permitir deseleccionar.
  };

  const handleFq2Change = (index: number) => {
    setSelectedFq2(index === selectedFq2 ? null : index); // Permitir deseleccionar.
  };

  const [selectedOptions2, setSelectedOptions2] = useState<number[]>([]);

  const handleCheckboxChange2 = (index: number) => {
    if (selectedOptions2.includes(index)) {
      // Si el índice ya está seleccionado, lo eliminamos
      setSelectedOptions2(selectedOptions2.filter((option) => option !== index));
    } else if (selectedOptions2.length < 2) {
      // Si aún no hay dos seleccionados, agregamos el índice
      setSelectedOptions2([...selectedOptions2, index]);
    }
  };
  

  return (
    <main className="w-full bgrose-400 flex flex-col gap-20 justify-center items-center">
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
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <h1>{questionnaire["general"][2].title}</h1>
          </div>
          <div className="flex flex-col py-12 gap-6  text-black  w-full bgred-300 px-16">
            <h1 className="text-3xl font-black">{packages[2].title}</h1>
            <div className="flex flex-col gap-2">
              <h2>Includes: </h2>
              <div className="flex flex-col bgred-300">
                {
                  packages[2].includes.map((include, index) => (
                    <p key={index}>{include}</p>
                  ))
                }
              </div>
            </div>

          </div>
        </div>
        <div id="gq2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <h1>What style are you looking for your space?</h1>
          </div>
          <div className="w-full bgblue-300  flex flex-col">
            <div className="grid   gap-2 py-12 min-[400px]:grid-cols-2 md:grid-cols-4 bggreen-300">
              {
                questionnaire["general"][1].options.map((option, index) => (
                  <div className="bgred-300 flex flex-col justify-center items-center p-4" key={option.id}>
                    <Image className="w-[110px] aspect-square object-cover object-center rounded-full" src={option.img} alt=""/>
                    <div className="flex justify-center items-center gap-2 p-2">
                      <p className="text-black flex justify-center items-center gap-1"><span className="text-xl text-[#68664d]">▪ </span>{option.name}</p>
                      <input
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer" 
                      type="checkbox"
                      checked={selectedOptions2.includes(index)}
                      onChange={() => handleCheckboxChange2(index)}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
            <div id="gqOther" className="flex gap-2 place-self-center bgred-200 w-[90%] pb-12 text-black items-end">
              <p className="text-[#68664d]">Other: </p>
              <div className="border border-b-black border-b-2 w-full">
                <input className="h-[40px] text-xl outline-none border-none bg-white w-full text-black  pl-2" placeholder="" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div id="gq3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center">
            <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["general"][2].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][2].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <select  className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
            </div>
          </div>
          <div id="gq4" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center">
            <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["general"][3].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][3].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
            </div>
          </div>
          <div id="gq5" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center">
            <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["general"][4].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][4].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">{questionnaire["backyard"][0].title}</h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["backyard"][0].img} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
              <select defaultValue="Green and Whites" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6">
                <option value="1">Green and Whites</option>
                <option value="2">Colorful Plants</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#6c786e]">Note:</p>
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
                      <input
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                        type="checkbox"
                        checked={selectedOption === index}
                        onChange={() => handleCheckboxChange(index)}
                      />
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 w-full gap-12">
                {
                  questionnaire["backyard"][4].options.map((option, index) => (
                    <div className="flex flex-col gap-6 justify-center items-center text-black w-full" key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex justify-center items-center gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"/>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                {
                  questionnaire["backyard"][5].options.map((option, index) => (
                    <div className="flex flex-col gap-4  text-black bbqlue-300 " key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex justify-center items-center gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer" />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-col w-full p-2">
                <div className="flex gap-2">
                  <p className="text-[#68664d]">{questionnaire["backyard"][5].question}</p>
                  <input className="outline-none border-none bg-[#ebebeb] w-10 text-black pl-2" type="text" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
                <select className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">Green and Whites</option>
                  <option value="2">Colorfulx  Plants</option>
                </select>
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
                      <input 
                      type="checkbox"
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                      checked={selectedFq2 === index}
                      onChange={() => handleFq2Change(index)}
                      />
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className={` grid sm:grid-cols-2 md:grid-cols-3 w-full gap12 place-content-center place-items-center bgred-300 ali`}>
                {
                  questionnaire["backyard"][4].options.map((option, index) => (
                    <div id="questionnaireBackyard" className={`${index === 2 ? "hidden" : ""}  flex flex-col gap-6 justify-center items-center text-black w-full bgblue-300`} key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                        <p className="text-xs sm:text-base flex justify-center items-center gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input
                        type="checkbox" 
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer" />
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                {
                  questionnaire["backyard"][5].options.map((option, index) => (
                    <div className="flex flex-col gap-4  text-black bqblue-300 " key={index}>
                      <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                      <div className="flex gap-6">
                      <p className="text-xs sm:text-base flex justify-center items-center gap-1 "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                        <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer" />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-col w-full p-2">
                <div className="flex gap-2">
                  <p className="text-[#68664d]">{questionnaire["backyard"][5].question}</p>
                  <input className="outline-none border-none bg-[#ebebeb] w-10 text-black pl-2" type="text" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <select defaultValue="No" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
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
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="customerUploads" className="w-full flex flex-col bgred-300 justify-center items-center gap-12 py-8">
        <div id="title" className="flex flex-col sm:flex-row bggreen-300 max-sm:h-[500px] sm:h-[300px] w-[85%] rounded-3xl  border-2 border-[#68664d]">
          <div className="flex  sm:w-[50%] justify-center items-center max-sm:h-[200px] text-[#68664d]">
            <h1 className="text-3xl lg:text-5xl max-sm:text-center">Customer Uploads</h1>
          </div>
          <div className="bg-[#68664d] sm:w-[50%] max-sm:h-[300px]  h-full w-full bg-cover bg-center bg-no-repeat max-sm:rounded-b-[20px] sm:rounded-r-[20px]" style={{ backgroundImage: "url('/questionnaire/questionnaireBgCostumerUploads.webp')"}}>

          </div>
        </div>
        <div id="filesContainer" className="flex flex-col w-[90%] gap-12">
          <div id="eq1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center">
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
          <div id="eq2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200 font-light">Please upload here: Sketches of the areas to be worked
                </h1>
              </div>
            </div>
            <div className="flex w-full justify-center items-center h-[250px]" >
              <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
                <div className="flex">
                  <label htmlFor="files2" className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer">
                    <Image className="w-[40px] aspect-square object-contain" src="/questionnaire/elementos-13.png" alt="" />
                  </label>
                  <input id="files2" name="files2" className="hidden" type="file" />
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
          <div id="eq3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center">
            <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200 font-light">Please upload here: Images of plants and other landscaping designs that you like:</h1>
              </div>
            </div>
            <div className="flex w-full justify-center items-center h-[250px]" >
              <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
                <div className="flex">
                  <label htmlFor="files3" className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer">
                    <Image className="w-[40px] aspect-square object-contain" src="/questionnaire/elementos-13.png" alt="" />
                  </label>
                  <input id="files3" name="files3" className="hidden" type="file" />
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
        </div>
      </section>
    </main>
  );
}

export default ShoppingCart;
