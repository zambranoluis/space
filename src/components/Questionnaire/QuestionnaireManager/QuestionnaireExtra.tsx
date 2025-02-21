
"use client";
import { useEffect, useState, useRef } from "react";
import { Image } from "@nextui-org/image";
import {question} from "@/utils/dataInterfaces";



import {
  questionnaire,
} from "../questionnaireFile";


interface QuestionnaireExtraProps {
  answersExtra: question[]
  categories: string[];
  isAnsweredBackyard: boolean[];
  isAnsweredFrontyard: boolean[];
  isAnsweredExtra: boolean[];
  handleSubmitAnswers: (question: string, questionType: string, questionCategory: string, htmlElements: string) => void
}


const QuestionnaireExtra: React.FC<QuestionnaireExtraProps> = ({
  answersExtra,
  categories,
  isAnsweredBackyard,
  isAnsweredFrontyard,
  isAnsweredExtra,
  handleSubmitAnswers
}) => {


  const containerRefExtra = useRef<HTMLDivElement>(null);
  const questionRefsExtra = useRef<Array<HTMLDivElement | null>>(new Array(questionnaire.extra.length).fill(null));

  const [containerHeightExtra, setContainerHeightExtra] = useState(0);








  useEffect(() => {
    if (categories.includes("Frontyard")) {
      if (
        isAnsweredFrontyard[isAnsweredFrontyard.length - 1] &&
        questionRefsExtra.current &&
        questionRefsExtra.current.length > 0 &&
        questionRefsExtra.current[0] &&
        questionRefsExtra.current[0].offsetHeight
      ) {
        setContainerHeightExtra((prevHeight) => prevHeight + questionRefsExtra.current![0]!.offsetHeight || 0);
      }
    } else {
      if (
        isAnsweredBackyard[isAnsweredBackyard.length - 1] &&
        questionRefsExtra.current &&
        questionRefsExtra.current.length > 0 &&
        questionRefsExtra.current[0] &&
        questionRefsExtra.current[0].offsetHeight
      ) {
        setContainerHeightExtra((prevHeight) => prevHeight + questionRefsExtra.current![0]!.offsetHeight || 0);
      }
    }
  }, [questionRefsExtra, isAnsweredBackyard, isAnsweredFrontyard]);





  useEffect(() => {
    const calculateContainerHeightExtra = () => {
      let newHeight = 0;
      let nextUnansweredIndex = -1;
  
      isAnsweredExtra.forEach((answered, index) => {
        const currentElement = questionRefsExtra.current[index];
        const nextElement = questionRefsExtra.current[index + 1];
  
        if (answered && currentElement) {
          // Sumar la altura de la pregunta contestada
          newHeight += currentElement.offsetHeight || 0;
          newHeight += 40;
  
          // Si no es la primera pregunta, hacer scroll
          if (index !== 0) {
            setTimeout(() => {
              window.scrollBy({ top: currentElement.offsetHeight + 40, behavior: "smooth" });
            }, 100); // 🔹 Espera un poco para asegurar que el DOM está actualizado
          }
  
          // Si la siguiente pregunta no está respondida, hacer scroll a ella
          if (index + 1 < isAnsweredExtra.length && !isAnsweredExtra[index + 1] && nextElement) {
            if (nextUnansweredIndex === -1) {
              nextUnansweredIndex = index + 1;
            }
            newHeight += nextElement.offsetHeight || 0;
            newHeight += 40;
  
            setTimeout(() => {
              window.scrollBy({ top: nextElement.offsetHeight + 40, behavior: "smooth" });
            }, 100); // 🔹 Pequeña espera adicional para evitar conflictos de renderizado
          }
        } else if ( index=== 0 && !answered) {
          newHeight += questionRefsExtra.current![0]!.offsetHeight || 0;
          newHeight += 40;
        }
      });
  
      newHeight += 40;
      setContainerHeightExtra(newHeight);
    };
  
    // Ejecutar el cálculo solo si los elementos existen
    if (questionRefsExtra.current.every((el) => el)) {
      calculateContainerHeightExtra();
    }
  }, [isAnsweredBackyard, isAnsweredFrontyard, isAnsweredExtra, questionRefsExtra.current.map((el) => el?.offsetHeight).join(",")]);


  return ((categories.includes("Frontyard"))
    ?<section id="extraQuestions" className={`${ isAnsweredFrontyard[isAnsweredFrontyard.length - 1] === true ? "" : "hidden" } flex flex-col w-full justify-center items-center gap-20${ isAnsweredFrontyard[isAnsweredFrontyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0" } `}>
    <div  ref={containerRefExtra} className="flex flex-col w-[90%] gap-12 overflow-hidden" style={{height: `${containerHeightExtra}px`}}>
      
      {(answersExtra && isAnsweredExtra[0] === true)
        ? <div id="eq1" ref={(el) => {questionRefsExtra.current[0] = el;}} className={`${ isAnsweredFrontyard[isAnsweredFrontyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq1Note" placeholder={answersExtra[0].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq1" ref={(el) => {questionRefsExtra.current[0] = el;}} className={`${ isAnsweredFrontyard[isAnsweredFrontyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq1Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire.extra[0].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq1");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
      }
      
      {(answersExtra && isAnsweredExtra[1] === true)
        ? <div id="eq2" ref={(el) => {questionRefsExtra.current[1] = el;}} className={`${ isAnsweredExtra[0] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq2Note" placeholder={answersExtra[1].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq2" ref={(el) => {questionRefsExtra.current[1] = el;}} className={`${ isAnsweredExtra[0] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq2Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire["extra"][1].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq2");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
      }

      {(answersExtra && isAnsweredExtra[2] === true)
        ? <div id="eq3" ref={(el) => {questionRefsExtra.current[2] = el;}} className={`${ isAnsweredExtra[1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq3Note" placeholder={answersExtra[2].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq3" ref={(el) => {questionRefsExtra.current[2] = el;}} className={`${ isAnsweredExtra[1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq3Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire["extra"][2].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq3");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
      }

      {(answersExtra && isAnsweredExtra[3] === true)
        ? <div id="eq4" ref={(el) => {questionRefsExtra.current[3] = el;}} className={`${ isAnsweredExtra[2] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq4Note" placeholder={answersExtra[3].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq4" ref={(el) => {questionRefsExtra.current[3] = el;}} className={`${ isAnsweredExtra[2] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq4Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire["extra"][3].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq4");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
      }

    </div>
  </section>  
    :<section id="extraQuestions" className={`${ isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "hidden" } flex flex-col w-full justify-center items-center gap-20${ isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0" } `}>
    <div  ref={containerRefExtra} className="flex flex-col w-[90%] gap-12 overflow-hidden" style={{height: `${containerHeightExtra}px`}}>
      {(answersExtra && isAnsweredExtra[0] === true)
        ? <div id="eq1" ref={(el) => {questionRefsExtra.current[0] = el;}} className={`${ isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq1Note" placeholder={answersExtra[0].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq1" ref={(el) => {questionRefsExtra.current[0] = el;}} className={`${ isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq1Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire["extra"][0].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq1");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
      }
      
      {(answersExtra && isAnsweredExtra[1] === true)
        ? <div id="eq2" ref={(el) => {questionRefsExtra.current[1] = el;}} className={`${ isAnsweredExtra[0] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq2Note" placeholder={answersExtra[1].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
        : <div id="eq2" ref={(el) => {questionRefsExtra.current[1] = el;}} className={`${ isAnsweredExtra[0] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq2Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              handleSubmitAnswers(questionnaire["extra"][1].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq2");
            }}
          >
            Submit Answer
          </button>
        </div>
      </div>
      }

      {(answersExtra && isAnsweredExtra[2] === true)
        ? <div id="eq3" ref={(el) => {questionRefsExtra.current[2] = el;}} className={`${ isAnsweredExtra[1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq3Note" placeholder={answersExtra[2].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq3" ref={(el) => {questionRefsExtra.current[2] = el;}} className={`${ isAnsweredExtra[1] === true ? "" : "translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq3Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire["extra"][2].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq3");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
      }

      {(answersExtra && isAnsweredExtra[3] === true)
        ? <div id="eq4" ref={(el) => {questionRefsExtra.current[3] = el;}} className={`${ isAnsweredExtra[2] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
            <textarea id="eq4Note" placeholder={answersExtra[3].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
          </div>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {
              alert("Update Answer logic");
            }}
          >
            Update Answer
          </button>
        </div>
      </div>
      : <div id="eq4" ref={(el) => {questionRefsExtra.current[3] = el;}} className={`${ isAnsweredExtra[2] === true ? "" : "-translate-x-[-110%] opacity-0" } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#68664d] justify-center items-center`}>
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
          <textarea id="eq4Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
        </div>
      </div>
      <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
        <button
          className="bg-[#858e5b] px-4 py-2 rounded-lg"
          onClick={() => {
            handleSubmitAnswers(questionnaire["extra"][3].title.replace("?", "").replace(",", ""), "Note Question", "Extra", "eq4");
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>

      }

    </div>
  </section>
      
  );
}

export default QuestionnaireExtra
