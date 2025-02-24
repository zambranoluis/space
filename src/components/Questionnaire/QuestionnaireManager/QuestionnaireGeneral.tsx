
"use client";
import { useEffect, useState, useRef } from "react";
import { Image } from "@heroui/image";
import { ProjectInformation, question } from '../../../utils/dataInterfaces';



import {
  questionnaire
} from "../questionnaireFile";

interface QuestionnaireGeneralProps {
  project: ProjectInformation | null;
  selectedMaxTwoGeneral: number[];
  handleMaxTwoGeneral: (index: number) => void;
  answersGeneral: question[];
  isAnsweredGeneral: boolean[];
  handleSubmitAnswers: (question: string, answer: string, categoryQuestion: string, htmlElements: string) => void;
}


const QuestionnaireGeneral: React.FC<QuestionnaireGeneralProps> = ({
  project,
  selectedMaxTwoGeneral,
  handleMaxTwoGeneral,
  answersGeneral,
  isAnsweredGeneral,
  handleSubmitAnswers
}) => {



  useEffect(() => {
    console.log("project en QuestionnaireGeneral: ", project);
  }, [project]);


  const containerRefGeneral = useRef<HTMLDivElement>(null);

  const questionRefsGeneral = useRef<Array<HTMLDivElement | null>>(new Array(questionnaire.general.length).fill(null));

  const [containerHeightGeneral, setContainerHeightGeneral] = useState(0);
  
  useEffect(() => {
    const calculateContainerHeightGeneral = () => {
      let newHeight = 0;
      let nextUnansweredIndex = -1;
  
      isAnsweredGeneral.forEach((answered, index) => {
        const currentElement = questionRefsGeneral.current[index];
        const nextElement = questionRefsGeneral.current[index + 1];
  
        if (answered && currentElement) {
          // Sumar la altura de la pregunta contestada
          newHeight += currentElement.offsetHeight || 0;
          newHeight += 40;
  
          // Si no es la primera pregunta, hacer scroll
          if (index > 0) {
            setTimeout(() => {
              window.scrollBy({ top: currentElement.offsetHeight + 40, behavior: "smooth" });
            }, 100); // 🔹 Espera un poco para asegurar que el DOM está actualizado
          }
  
          // Si la siguiente pregunta no está respondida, hacer scroll a ella
          if (index + 1 < isAnsweredGeneral.length && !isAnsweredGeneral[index + 1] && nextElement) {
            if (nextUnansweredIndex === -1) {
              nextUnansweredIndex = index + 1;
            }
            newHeight += nextElement.offsetHeight || 0;
            newHeight += 40;
  
            setTimeout(() => {
              if (index > 0) {
                window.scrollBy({ top: nextElement.offsetHeight + 40, behavior: "smooth" });
              }
            }, 100);
          }
        }
      });
  
      newHeight += 20;
      setContainerHeightGeneral(newHeight);
    };
  
    // Ejecutar el cálculo solo si los elementos existen
    if (questionRefsGeneral.current.every((el) => el)) {
      calculateContainerHeightGeneral();
    }
  }, [isAnsweredGeneral, questionRefsGeneral.current.map((el) => el?.offsetHeight).join(",")]);
  
  
  return (
    <section ref={containerRefGeneral} id="generalQuestions" className={`bgred-200 flex flex-col bgred-200 w-[90%] gap-12 overflow-hidden place-self-center`} style={{ height: `${containerHeightGeneral}px`}}>
      
      <div id="gq1" ref={(el) => {questionRefsGeneral.current[0] = el;}} className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <h1>{questionnaire["general"][0].title}</h1>
        </div>
        <div className="flex flex-col py-12 gap-6  text-black  w-full bgred-300 px-16">
          <h1 className="text-3xl font-black">{project?.description.name} {project?.description.type}</h1>
          <div className="flex gap-2 pl2">
            {project?.description.areas.map((area, index) => (
              <h2 key={index}>{area}</h2>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2>Extras: </h2>
            <div className="flex flex-col gap-2">
              {project?.description.extras.flatMap(extra => extra.split(", ")).map((include, index) => (
                <p className="pl2" key={index}>{include}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {( answersGeneral && isAnsweredGeneral[1] === true)
        ? <div id="gq2" ref={(el) => {questionRefsGeneral.current[1] = el;}} className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
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
                    <p className="text-black flex justify-center items-center gap-1 gq2Styles"><span className="text-xl text-[#68664d]">▪ </span>{option.name}</p>
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
              <input id="gq2Input" placeholder={answersGeneral[0].notes[0].note} className="h-[40px] text-xl outline-none border-none bg-white w-full text-black  pl-2" type="text" />
            </div>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => { alert("Update answer logic"); }}
            >
              Update Answer
            </button>
          </div>
        </div>
      </div>
        : <div id="gq2" ref={(el) => {questionRefsGeneral.current[1] = el;}} className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]">
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
                    <p className="text-black flex justify-center items-center gap-1 gq2Styles"><span className="text-xl text-[#68664d]">▪ </span>{option.name}</p>
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
              <input id="gq2Input" className="h-[40px] text-xl outline-none border-none bg-white w-full text-black  pl-2" placeholder="" type="text" />
            </div>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {handleSubmitAnswers(questionnaire.general[1].title.replace("?", ""), "Styles General Question", "General", "gq2")}}
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
      }
      
      
      {(answersGeneral && isAnsweredGeneral[2] === true)
        ? <div id="gq3" ref={(el) => {questionRefsGeneral.current[2] = el;}} className={`${ isAnsweredGeneral[1] === true ? "" : "translate-x-[-110%] opacity-0" } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center  transition-all duration-1000`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire.general[2].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire.general[2].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select id="gq3Select" value={answersGeneral[1].select===true ? "2" : "1" } className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">Noooo</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {alert("ajustar logica de update answer")}}
          >
            Update Answer
          </button>
        </div>
      </div>
        : <div id="gq3" ref={(el) => {questionRefsGeneral.current[2] = el;}} className={`${ isAnsweredGeneral[1] === true ? "" : "translate-x-[-110%] opacity-0" } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center  transition-all duration-1000`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire.general[2].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire.general[2].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select id="gq3Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {handleSubmitAnswers(questionnaire.general[2].title.replace("?", ""), "Yes or No Question", "General", "gq3Select")}}
          >
            Submit Answer
          </button>
        </div>
      </div>

      }


      {(answersGeneral.length && isAnsweredGeneral[3] === true)
        ? <div id="gq4" ref={(el) => {questionRefsGeneral.current[3] = el;}} className={`${ isAnsweredGeneral[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000  flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire["general"][3].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][3].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select id="gq4Select" value={answersGeneral[2].select===true ? "2" : "1" } className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {alert("ajustar logica de update answer")}}
            >
              Update Answer
            </button>
          </div>
      </div>
        : <div id="gq4" ref={(el) => {questionRefsGeneral.current[3] = el;}} className={`${ isAnsweredGeneral[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000  flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire["general"][3].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][3].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select id="gq4Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {handleSubmitAnswers(questionnaire.general[3].title.replace("?", ""), "Yes or No Question", "General", "gq4Select")}}
            >
              Submit Answer
            </button>
          </div>
      </div>
      }


      {(answersGeneral && isAnsweredGeneral[4] === true)
        ? <div id="gq5" ref={(el) => {questionRefsGeneral.current[4] = el;}} className={`${ isAnsweredGeneral[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire["general"][4].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][4].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select id="gq5Select" value={answersGeneral[3].select === true ? "2" : "1" } className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => { alert("Update answer logic"); }}
          >
            Update Answer
          </button>
        </div>
      </div>
        : <div id="gq5" ref={(el) => {questionRefsGeneral.current[4] = el;}} className={`${ isAnsweredGeneral[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}>
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <div className="w-full bggreen-300 p-2 flex">
            <h1 className="bgred-200">{questionnaire["general"][4].title}</h1>
          </div>
          <div className="flex absolute right-[20px] top-[55px]">
            <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["general"][4].img} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
          <select id="gq5Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6">
            <option value="1">No</option>
            <option value="2">Yes</option>
          </select>
        </div>
        <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
          <button
            className="bg-[#858e5b] px-4 py-2 rounded-lg"
            onClick={() => {handleSubmitAnswers(questionnaire.general[4].title.replace("?", ""), "Yes or No Question", "General", "gq5Select")}}
          >
            Submit Answer
          </button>
        </div>
      </div>
      }
      
    </section>
  );
}

export default QuestionnaireGeneral
