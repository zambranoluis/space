import { useEffect, useState, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineExpandLess } from "react-icons/md";

import { questionnaire } from "../components/Questionnaire/questionnaireFile";

interface QuestionnaireProgressProps {
  answersGeneral: { question: string; answer: string }[];
  isAnsweredGeneral: boolean[];
  answersBackyard: { question: string; answer: string }[];
  isAnsweredBackyard: boolean[];
  answersFrontyard: { question: string; answer: string }[];
  isAnsweredFrontyard: boolean[];
  answersExtra: { question: string; answer: string }[];
  isAnsweredExtra: boolean[];
}

const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = ({
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
    isAnsweredGeneral.map((isAnswered, index) => {
      (isAnswered ? setCountedGeneralAnswers(countedGeneralAnswers + 1) : null);
      })
  }, [isAnsweredGeneral])


  

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
    isAnsweredBackyard.map((isAnswered, index) => {
      (isAnswered ? setCountedBackyardAnswers(countedBackyardAnswers + 1) : null);
    })
  }, [isAnsweredBackyard])




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
    isAnsweredFrontyard.map((isAnswered, index) => {
      (isAnswered ? setCountedFrontyardAnswers(countedFrontyardAnswers + 1) : null);
    })
  }, [isAnsweredFrontyard])


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
    isAnsweredExtra.map((isAnswered, index) => {
      (isAnswered ? setCountedExtraAnswers(countedExtraAnswers + 1) : null);
    })
  }, [isAnsweredExtra])

  const openGeneral = () => {
    const openGeneralArrow = document.getElementById("openGeneralArrow");
    const progressGeneral = document.getElementById("progressGeneral");
    if (progressGeneral) {
      progressGeneral.classList.toggle("max-h-0");
      progressGeneral.classList.toggle("p-2");
      openGeneralArrow?.classList.toggle("rotate-180");
    }
  };

  const openBackyard = () => {
    const openBackyardArrow = document.getElementById("openBackyardArrow");
    const progressBackyard = document.getElementById("progressBackyard");
    if (progressBackyard) {
      progressBackyard.classList.toggle("max-h-0");
      progressBackyard.classList.toggle("p-2");
      openBackyardArrow?.classList.toggle("rotate-180");
    }
  };

  const openFrontyard = () => {
    const openFrontyardArrow = document.getElementById("openFrontyardArrow");
    const progressFrontyard = document.getElementById("progressFrontyard");
    if (progressFrontyard) {
      progressFrontyard.classList.toggle("max-h-0");
      progressFrontyard.classList.toggle("p-2");
      openFrontyardArrow?.classList.toggle("rotate-180");
    }
  };

  const openExtra = () => {
    const openExtraArrow = document.getElementById("openExtraArrow");
    const progressExtra = document.getElementById("progressExtra");
    if (progressExtra) {
      progressExtra.classList.toggle("max-h-0");
      progressExtra.classList.toggle("p-2");
      openExtraArrow?.classList.toggle("rotate-180");
    }
  };

  return (
    <div className="bgred-300 flex flex-col w-full p-2 select-none">
      <div className="flex flex-col gap-2 w-full bgblue-300">
        <div className="w-full">
          <div className="flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer" onClick={()=>{openGeneral()}}>
            <MdOutlineExpandLess id="openGeneralArrow" className="bgred-300 text-lg rotate-180" />
            <h2 className={`pl4 `}>General Questions: <span className="text-xs">( {countedGeneralAnswers} / {questionnaire.general.length} )</span></h2>
          </div>
          <div id="progressGeneral" className="flex gap-2 w-full select-none overflow-y-hidden max-h-0 overflow-x-auto transition-all duration-100 questionnaireProgressScroll">
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
        <div  className="w-full">
          <div className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openBackyard()}}>
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
        <div  className="w-full">
          <div className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openFrontyard()}}>
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
        <div  className="w-full">
          <div className={`${isAnsweredFrontyard[isAnsweredFrontyard.length - 1] ? "text-white" : "text-gray-500/50"} flex justify-center items-center gap-1 bgred-200 place-self-start cursor-pointer`} onClick={()=>{openExtra()}}>
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
      </div>
    </div>
  );
};

export default QuestionnaireProgress;
