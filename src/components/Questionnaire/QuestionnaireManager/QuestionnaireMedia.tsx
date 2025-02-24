
"use client";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";



import {
  questionnaire,
} from "../questionnaireFile";


interface QuestionnaireMediaProps {
  isAnsweredExtra: boolean[]
}


const QuestionnaireMedia: React.FC<QuestionnaireMediaProps> = ({
  isAnsweredExtra
}) => {



  return (


    <section id="customerUploads" className={`${isAnsweredExtra[isAnsweredExtra.length - 1] ? "" : "hidden" } w-full flex flex-col bgred-300 justify-center items-center gap-12 py-8`}>
    <div id="title" className="flex flex-col sm:flex-row bggreen-300 max-sm:h-[500px] sm:h-[300px] w-[85%] rounded-3xl  border-2 border-[#68664d]">
      <div className="flex  sm:w-[50%] justify-center items-center max-sm:h-[200px] text-[#68664d]">
        <h1 className="text-3xl lg:text-5xl max-sm:text-center sm:pl-16">Customer Uploads</h1>
      </div>
      <div className="bg-[#68664d] sm:w-[50%] max-sm:h-[300px]  h-full w-full bg-cover bg-center bg-no-repeat max-sm:rounded-b-[20px] sm:rounded-r-[20px]" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireBgCostumerUploads.webp')"}}>

      </div>
    </div>
    <div id="filesContainer" className="flex flex-col w-[90%] gap-12">
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
                <Image className="w-[40px] aspect-square object-contain" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-13.png" alt="" />
              </label>
              <input id="files1" name="files1" className="hidden" type="file" />
            </div>
          </div>
          <div className="flex max-sm:w-[60%] sm:w-[80%]  bgred-300  sm:gap-6 justify-center items-center p-2">
            <Image className="h-full   rounded-none " src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-sm:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-md:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-lg:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full  rounded-none max-xl:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
          </div>
        </div>
      </div>
      <div id="f2" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center">
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
                <Image className="w-[40px] aspect-square object-contain" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-13.png" alt="" />
              </label>
              <input id="files2" name="files2" className="hidden" type="file" />
            </div>
          </div>
          <div className="flex max-sm:w-[60%] sm:w-[80%]  bgred-300  sm:gap-6 justify-center items-center p-2">
            <Image className="h-full   rounded-none " src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-sm:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-md:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-lg:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full  rounded-none max-xl:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
          </div>
        </div>
      </div>
      <div id="f3" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#e6e7eb] justify-center items-center">
        <div className="flex bg-[#6c786e] relative pt-4 pl-8 pb-6 text-xl  rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200 font-light">Please upload here: Images of plants and other landscaping designs that you like:</h1>
          </div>
        </div>
        <div className="flex w-full justify-center items-center h-[250px]" >
          <div className="flex max-sm:w-[40%]  sm:w-[20%] bgblue-300  justify-center items-center">
            <div className="flex">
              <label htmlFor="files3" className="flex bg-[#6c786e] p-3 rounded-full cursor-pointer">
                <Image className="w-[40px] aspect-square object-contain" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-13.png" alt="" />
              </label>
              <input id="files3" name="files3" className="hidden" type="file" />
            </div>
          </div>
          <div className="flex max-sm:w-[60%] sm:w-[80%]  bgred-300  sm:gap-6 justify-center items-center p-2">
            <Image className="h-full   rounded-none " src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-sm:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-md:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full   rounded-none max-lg:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
            <Image className="h-full  rounded-none max-xl:hidden" src="https://github.com/BPM94/SCCTMD/raw/main/questionnaire/elementos-12.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default QuestionnaireMedia
