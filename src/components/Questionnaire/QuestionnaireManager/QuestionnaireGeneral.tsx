
"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
// import Link from "next/link";


import {
  questionnaire,
  packages
} from "../questionnaireFile";

interface QuestionnaireGeneralProps {
  answersGeneral: { question: string; answer: string }[];
  selectedMaxTwoGeneral: number[];
  handleMaxTwoGeneral: (index: number) => void;
  isAnsweredGeneral: boolean[];
  setIsAnsweredGeneral: React.Dispatch<React.SetStateAction<boolean[]>>;
  handleSubmitAnswersGeneral: (question: string, answer: string) => void;
}


const QuestionnaireGeneral: React.FC<QuestionnaireGeneralProps> = ({
  answersGeneral,
  selectedMaxTwoGeneral,
  handleMaxTwoGeneral,
  isAnsweredGeneral,
  setIsAnsweredGeneral,
  handleSubmitAnswersGeneral
}) => {

  useEffect(() => {
    setIsAnsweredGeneral((prev) => {
      const updatedIsAnsweredGeneral = questionnaire.general.map((questionObj) =>
        answersGeneral.some((answerObj) => answerObj.question === questionObj.title)
      );
  
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredGeneral) ? updatedIsAnsweredGeneral : prev;
    });
  }, [answersGeneral, questionnaire.general]);

  return (
    <section id="generalQuestions" className="flex flex-col bgred-200  w-[90%] gap-12 overflow-hidden">
      <div id="gq1" className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <h1>{questionnaire["general"][0].title}</h1>
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
              questionnaire["general"][1].options?.map((option, index) => (
                <div className="bgred-300 flex flex-col justify-center items-center p-4" key={option.id}>
                  <Image className="w-[110px] aspect-square object-cover object-center rounded-full" src={option.img} alt="" />
                  <div className="flex justify-center items-center gap-2 p-2">
                    <p className="text-black flex justify-center items-center gap-1"><span className="text-xl text-[#68664d]">▪ </span>{option.name}</p>
                    <input
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                      type="checkbox"
                      checked={selectedMaxTwoGeneral.includes(index)}
                      onChange={() => handleMaxTwoGeneral(index)}
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
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersGeneral(questionnaire["general"][1].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
      <div id="gq3" className={`${ isAnsweredGeneral[1] === true ? "" : "translate-x-[-110%] opacity-0" } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center  transition-all duration-1000`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire.general[2].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire.general[2].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              handleSubmitAnswersGeneral(questionnaire["general"][2].title, "Client Answer");
            }}
          >
            Submit Answer
          </button>
        </div>
      </div>
      <div id="gq4" className={`${ isAnsweredGeneral[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000  flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}>
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
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersGeneral(questionnaire["general"][3].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
      </div>
      <div id="gq5" className={`${ isAnsweredGeneral[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}>
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
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              handleSubmitAnswersGeneral(questionnaire["general"][4].title, "Client Answer");
            }}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuestionnaireGeneral
