import { useEffect, useState, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineExpandLess } from "react-icons/md";

import { question } from "@/utils/dataInterfaces"

import { questionnaire } from "../components/Questionnaire/questionnaireFile";

interface QuestionnaireProgressProps {
  categories: string[];
  answersGeneral: question[];
  isAnsweredGeneral: boolean[];
  answersBackyard: question[];
  isAnsweredBackyard: boolean[];
  answersFrontyard: question[];
  isAnsweredFrontyard: boolean[];
  answersExtra: question[];
  isAnsweredExtra: boolean[];
}

const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = ({
  categories,
  answersGeneral,
  isAnsweredGeneral,
  answersBackyard,
  isAnsweredBackyard,
  answersFrontyard,
  isAnsweredFrontyard,
  answersExtra,
  isAnsweredExtra
}) => {
  const questionRefsGeneral = useRef<(HTMLDivElement | null)[]>([]);

  // Detectar la última pregunta respondida y hacer scroll
  useEffect(() => {
    const lastAnsweredIndex = isAnsweredGeneral.lastIndexOf(true);

    if (lastAnsweredIndex !== -1 && questionRefsGeneral.current[lastAnsweredIndex]) {
      questionRefsGeneral.current[lastAnsweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isAnsweredGeneral]);

  const [countedGeneralAnswers, setCountedGeneralAnswers] = useState(0);

  useEffect(() => {
    setCountedGeneralAnswers(isAnsweredGeneral.filter((isAnswered) => isAnswered).length);
  }, [isAnsweredGeneral]);


  

  const questionRefsBackyard = useRef<(HTMLDivElement | null)[]>([]);

  // Detectar la última pregunta respondida y hacer scroll
  useEffect(() => {
    const lastAnsweredIndex = isAnsweredBackyard.lastIndexOf(true);

    if (lastAnsweredIndex !== -1 && questionRefsBackyard.current[lastAnsweredIndex]) {
      questionRefsBackyard.current[lastAnsweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isAnsweredBackyard]);

  const [countedBackyardAnswers, setCountedBackyardAnswers] = useState(0);

  useEffect(() => {
    setCountedBackyardAnswers(isAnsweredBackyard.filter((isAnswered) => isAnswered).length);
  }, [isAnsweredBackyard]);




  const questionRefsFrontyard = useRef<(HTMLDivElement | null)[]>([]);

  // Detectar la última pregunta respondida y hacer scroll
  useEffect(() => {
    const lastAnsweredIndex = isAnsweredFrontyard.lastIndexOf(true);

    if (lastAnsweredIndex !== -1 && questionRefsFrontyard.current[lastAnsweredIndex]) {
      questionRefsFrontyard.current[lastAnsweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isAnsweredFrontyard]);

  const [countedFrontyardAnswers, setCountedFrontyardAnswers] = useState(0);
  

  useEffect(() => {
    setCountedFrontyardAnswers(isAnsweredFrontyard.filter((isAnswered) => isAnswered).length);
  }, [isAnsweredFrontyard]);


  const questionRefsExtra = useRef<(HTMLDivElement | null)[]>([]);

  // Detectar la última pregunta respondida y hacer scroll
  useEffect(() => {
    const lastAnsweredIndex = isAnsweredExtra.lastIndexOf(true);

    if (lastAnsweredIndex !== -1 && questionRefsExtra.current[lastAnsweredIndex]) {
      questionRefsExtra.current[lastAnsweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isAnsweredExtra]);

  const [countedExtraAnswers, setCountedExtraAnswers] = useState(0);
  

  useEffect(() => {
    setCountedExtraAnswers(isAnsweredExtra.filter((isAnswered) => isAnswered).length);
  }, [isAnsweredExtra]);
  

  const openProgress = (arrow: string, container: string) => {
    const openArrow = document.getElementById(arrow);
    const progress = document.getElementById(container);
    if (progress) {
      progress.classList.toggle("max-h-0");
      progress.classList.toggle("p-2");
      openArrow?.classList.toggle("rotate-180");
    }
  };

  return (
    <div className="bgred-300 flex flex-col w-full p-2 select-none">
      <div className="flex flex-col gap-2 w-full bgblue-300">
        <div className="w-full">
          <div className="flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer" onClick={()=>{openProgress("openGeneralArrow", "progressGeneral")}}>
            <MdOutlineExpandLess id="openGeneralArrow" className="bgred-300 text-lg rotate-180" />
            <h2 className={`pl4 `}>General Questions: <span className="text-xs">( {countedGeneralAnswers} / {questionnaire.general.length} )</span></h2>
          </div>
          <div id="progressGeneral" className="flex gap-2 w-full max-h-0 select-none overflow-y-hidden overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
            {questionnaire.general.map((answer, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) questionRefsGeneral.current[index] = el;
                }}
                
                className={`${isAnsweredGeneral[index] ? "bggreen-500" : "bgred-500"} flex gap-2 justify-center items-center px-2 py-1 rounded`}
              >
                <p className={`${isAnsweredGeneral[index] ? "text-white" : "text-gray-500/50"} text-xs`}>
                  {index + 1}.
                </p>
                <h3 className={`${isAnsweredGeneral[index] ? "text-white" : "text-gray-500/50"} text-xs whitespace-nowrap`}>
                  {answer.title}
                </h3>
                <FaCheck className={`${isAnsweredGeneral[index] ? "text-green-500" : "text-gray-500/50"}`} />
              </div>
            ))}
          </div>
        </div>
        {
          (categories.includes("Backyard")) && (
            <div  className="w-full">
          <div className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openProgress("openBackyardArrow", "progressBackyard")}}>
            <MdOutlineExpandLess id="openBackyardArrow" className="bgred-300 text-lg rotate-180 " />
            <h2 className={` `}>Backyard Questions: <span className="text-xs">( {countedBackyardAnswers} / {questionnaire.backyard.length} )</span></h2>
          </div>
          <div id="progressBackyard" className="flex gap-2 w-full select-none overflow-y-hidden max-h-0 overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
            {questionnaire.backyard.map((answer, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) questionRefsBackyard.current[index] = el;
                }}
                
                className={`${isAnsweredBackyard[index] ? "bggreen-500" : "bgred-500"} flex gap-2 justify-center items-center px-2 py-1 rounded`}
              >
                <p className={`${isAnsweredBackyard[index] ? "text-white" : "text-gray-500/50"} text-xs`}>
                  {index + 1}.
                </p>
                <h3 className={`${isAnsweredBackyard[index] ? "text-white" : "text-gray-500/50"} text-xs whitespace-nowrap`}>
                  {answer.title}
                </h3>
                <FaCheck className={`${isAnsweredBackyard[index] ? "text-green-500" : "text-gray-500/50"}`} />
              </div>
            ))}
          </div>
        </div>
          )
        }
        {
          (categories.includes("Backyard") && categories.includes("Frontyard")) && (
            <div  className="w-full">
          <div className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openProgress("openFrontyardArrow", "progressFrontyard")}}>
            <MdOutlineExpandLess id="openFrontyardArrow" className="bgred-300 text-lg rotate-180 " />
            <h2 className={` `}>Frontyard Questions: <span className="text-xs">( {countedFrontyardAnswers} / {questionnaire.backyard.length} )</span></h2>
          </div>
          <div id="progressFrontyard" className="flex gap-2 w-full select-none overflow-y-hidden max-h-0 overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
            {questionnaire.backyard.map((answer, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) questionRefsFrontyard.current[index] = el;
                }}
                
                className={`${isAnsweredFrontyard[index] ? "bggreen-500" : "bgred-500"} flex gap-2 justify-center items-center px-2 py-1 rounded`}
              >
                <p className={`${isAnsweredFrontyard[index] ? "text-white" : "text-gray-500/50"} text-xs`}>
                  {index + 1}.
                </p>
                <h3 className={`${isAnsweredFrontyard[index] ? "text-white" : "text-gray-500/50"} text-xs whitespace-nowrap`}>
                  {answer.title}
                </h3>
                <FaCheck className={`${isAnsweredFrontyard[index] ? "text-green-500" : "text-gray-500/50"}`} />
              </div>
            ))}
          </div>
        </div>
          )
        }
        {
          (!categories.includes("Backyard") && categories.includes("Frontyard")) && (
            <div  className="w-full">
          <div className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openProgress("openFrontyardArrow", "progressFrontyard")}}>
            <MdOutlineExpandLess id="openFrontyardArrow" className="bgred-300 text-lg rotate-180 " />
            <h2 className={` `}>Frontyard Questions: <span className="text-xs">( {countedFrontyardAnswers} / {questionnaire.backyard.length} )</span></h2>
          </div>
          <div id="progressFrontyard" className="flex gap-2 w-full select-none overflow-y-hidden max-h-0 overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
            {questionnaire.backyard.map((answer, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) questionRefsFrontyard.current[index] = el;
                }}
                
                className={`${isAnsweredFrontyard[index] ? "bggreen-500" : "bgred-500"} flex gap-2 justify-center items-center px-2 py-1 rounded`}
              >
                <p className={`${isAnsweredFrontyard[index] ? "text-white" : "text-gray-500/50"} text-xs`}>
                  {index + 1}.
                </p>
                <h3 className={`${isAnsweredFrontyard[index] ? "text-white" : "text-gray-500/50"} text-xs whitespace-nowrap`}>
                  {answer.title}
                </h3>
                <FaCheck className={`${isAnsweredFrontyard[index] ? "text-green-500" : "text-gray-500/50"}`} />
              </div>
            ))}
          </div>
        </div>
          )
        }
        {
          (!categories.includes("Frontyard")) && (
            <div  className="w-full">
          <div className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openProgress("openExtraArrow", "progressExtra")}}>
            <MdOutlineExpandLess id="openExtraArrow" className="bgred-300 text-lg rotate-180 " />
            <h2 className={` `}>Extra Questions: <span className="text-xs">( {countedExtraAnswers} / {questionnaire.extra.length} )</span></h2>
          </div>
          <div id="progressExtra" className="flex gap-2 w-full select-none overflow-y-hidden max-h-0 overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
            {questionnaire.extra.map((answer, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) questionRefsExtra.current[index] = el;
                }}
                
                className={`${isAnsweredExtra[index] ? "bggreen-500" : "bgred-500"} flex gap-2 justify-center items-center px-2 py-1 rounded`}
              >
                <p className={`${isAnsweredExtra[index] ? "text-white" : "text-gray-500/50"} text-xs`}>
                  {index + 1}.
                </p>
                <h3 className={`${isAnsweredExtra[index] ? "text-white" : "text-gray-500/50"} text-xs whitespace-nowrap`}>
                  {answer.title}
                </h3>
                <FaCheck className={`${isAnsweredExtra[index] ? "text-green-500" : "text-gray-500/50"}`} />
              </div>
            ))}
          </div>
        </div>
          )
        }
        {
          (categories.includes("Frontyard")) && (
            <div  className="w-full">
          <div className={`${isAnsweredFrontyard[isAnsweredFrontyard.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openProgress("openExtraArrow", "progressExtra")}}>
            <MdOutlineExpandLess id="openExtraArrow" className="bgred-300 text-lg rotate-180 " />
            <h2 className={` `}>Extra Questions: <span className="text-xs">( {countedExtraAnswers} / {questionnaire.extra.length} )</span></h2>
          </div>
          <div id="progressExtra" className="flex gap-2 w-full select-none overflow-y-hidden max-h-0 overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
            {questionnaire.extra.map((answer, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) questionRefsExtra.current[index] = el;
                }}
                
                className={`${isAnsweredExtra[index] ? "bggreen-500" : "bgred-500"} flex gap-2 justify-center items-center px-2 py-1 rounded`}
              >
                <p className={`${isAnsweredExtra[index] ? "text-white" : "text-gray-500/50"} text-xs`}>
                  {index + 1}.
                </p>
                <h3 className={`${isAnsweredExtra[index] ? "text-white" : "text-gray-500/50"} text-xs whitespace-nowrap`}>
                  {answer.title}
                </h3>
                <FaCheck className={`${isAnsweredExtra[index] ? "text-green-500" : "text-gray-500/50"}`} />
              </div>
            ))}
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
};

export default QuestionnaireProgress;
