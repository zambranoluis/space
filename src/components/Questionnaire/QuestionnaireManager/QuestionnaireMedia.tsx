
"use client";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";



import {
  questionnaire,
} from "../questionnaireFile";


interface QuestionnaireMediaProps {
  isAnsweredGeneral: boolean[];
  isAnsweredBackyard: boolean[];
  isAnsweredFrontyard: boolean[];
  isAnsweredExtra: boolean[]
  answersMedia: { question: string; answer: string }[];
  isAnsweredMedia: boolean[]
  handleSubmitAnswersMedia: (question: string, answer: string) => void
}


const QuestionnaireMedia: React.FC<QuestionnaireMediaProps> = ({
  isAnsweredGeneral,
  isAnsweredBackyard,
  isAnsweredFrontyard,
  isAnsweredExtra,
  answersMedia,
  isAnsweredMedia,
  handleSubmitAnswersMedia
}) => {

  const [generalAnswersLength, setGeneralAnswersLength] = useState<number>(0);
  const [backyardAnswersLength, setBackyardAnswersLength] = useState<number>(0);
  const [frontyardAnswersLength, setFrontyardAnswersLength] = useState<number>(0);
  const [extraAnswersLength, setExtraAnswersLength] = useState<number>(0);

  useEffect(() => {
    setGeneralAnswersLength(isAnsweredGeneral.length - 1);
  }, [isAnsweredGeneral]);

  useEffect(() => {
    setBackyardAnswersLength(isAnsweredBackyard.length - 1);
  }, [isAnsweredBackyard]);

  useEffect(() => {
    setFrontyardAnswersLength(isAnsweredFrontyard.length - 1);
  }, [isAnsweredFrontyard]);

  useEffect(() => {
    setExtraAnswersLength(isAnsweredExtra.length - 1);
  }, [isAnsweredExtra]);



  return (


      <section id="extraQuestions" className="flex flex-col w-full justify-center items-center gap-20">
        <div className="flex flex-col w-[90%] gap-12">
          <div id="eq1" className={`${ isAnsweredFrontyard[frontyardAnswersLength] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersMedia(questionnaire["extra"][0].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
          <div id="eq2" className={`${ isAnsweredExtra[0] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersMedia(questionnaire["extra"][1].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
          <div id="eq3" className={`${ isAnsweredExtra[1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersMedia(questionnaire["extra"][2].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
          <div id="eq4" className={`${ isAnsweredExtra[2] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersMedia(questionnaire["extra"][3].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}

export default QuestionnaireMedia
