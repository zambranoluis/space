
"use client";
import { useEffect, useState, useRef } from "react";
import { Image } from "@nextui-org/image";
// import Link from "next/link";


import {
  questionnaire
} from "../questionnaireFile";

interface QuestionnaireBackyardProps {
  isAnsweredGeneral: boolean[];
  answersBackyard: { question: string; answer: string }[];
  isAnsweredBackyard: boolean[];
  setIsAnsweredBackyard: React.Dispatch<React.SetStateAction<boolean[]>>;
  handleSubmitAnswersBackyard: (question: string, answer: string) => void
}


const QuestionnaireBackyard: React.FC<QuestionnaireBackyardProps> = ({
  isAnsweredGeneral,
  answersBackyard,
  isAnsweredBackyard,
  setIsAnsweredBackyard,
  handleSubmitAnswersBackyard
}) => {

  const [generalAnswersLength, setGeneralAnswersLength] = useState<number>(0);

  useEffect(() => {
    setGeneralAnswersLength(isAnsweredGeneral.length - 1);
  }, [isAnsweredGeneral])

  useEffect(() => {
    setIsAnsweredBackyard((prev) => {
      const updatedIsAnswered = questionnaire.backyard.map((questionObj) =>
        answersBackyard.some((answerObj) => answerObj.question === questionObj.title)
      );
      // Solo actualiza si el nuevo estado es diferente al anterior
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnswered) ? updatedIsAnswered : prev;
    });
  }, [answersBackyard, questionnaire.backyard]);
  
  const containerRefBackyard = useRef<HTMLDivElement>(null);

  const sectionRefBackyard = useRef<HTMLDivElement>(null);

  const questionRefsBackyard = useRef<Array<HTMLDivElement | null>>(new Array(questionnaire.backyard.length).fill(null));

  const [containerHeightBackyard, setContainerHeightBackyard] = useState(50);

  useEffect(() => {
    if (
      isAnsweredGeneral[isAnsweredGeneral.length - 1] &&
      questionRefsBackyard.current &&
      questionRefsBackyard.current.length > 0 &&
      questionRefsBackyard.current[0] &&
      questionRefsBackyard.current[0].offsetHeight
    ) {
      setContainerHeightBackyard((prevHeight) => prevHeight + questionRefsBackyard.current![0]!.offsetHeight || 0);
      setTimeout(() => {
        if (sectionRefBackyard.current) {
          window.scrollBy({ top: sectionRefBackyard.current.offsetHeight, behavior: "smooth" });
        }
      }, 100);
    }
  }, [questionRefsBackyard, isAnsweredGeneral]);
  
  


  useEffect(() => {
    const calculateContainerHeightBackyard = () => {
      let newHeight = 0;
      let nextUnansweredIndex = -1;
  
      isAnsweredBackyard.forEach((answered, index) => {
        const currentElement = questionRefsBackyard.current[index];
        const nextElement = questionRefsBackyard.current[index + 1];
  
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
          if (index + 1 < isAnsweredBackyard.length && !isAnsweredBackyard[index + 1] && nextElement) {
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
          newHeight += questionRefsBackyard.current![0]!.offsetHeight || 0;
          newHeight += 40;
        }
      });
  
      newHeight += 40;
      setContainerHeightBackyard(newHeight);
    };
  
    // Ejecutar el cálculo solo si los elementos existen
    if (questionRefsBackyard.current.every((el) => el)) {
      calculateContainerHeightBackyard();
    }
  }, [isAnsweredGeneral, isAnsweredBackyard, questionRefsBackyard.current.map((el) => el?.offsetHeight).join(",")]);
  

  

  



  return (
    <section  id="backyardQuestions"  className={`${ isAnsweredGeneral[generalAnswersLength] === true ? "bgred-300" : "bggreen-400 hidden"}  flex flex-col w-full justify-center items-center gap-20 overflow-hidden`} >
        <div ref={sectionRefBackyard}  className={`${ isAnsweredGeneral[generalAnswersLength] === true ? "bgpink-500" : "bgpurple-400"} flex max-sm:flex-col bgred-300 sm:h-[300px] w-full `}>
          <div className="flex sm:w-[40%] justify-center items-center max-sm:py-24">
            <h1 className="font-black text-3xl text-[#6c786e]">BACKYARD</h1>
          </div>
          <div className="sm:w-[60%] max-sm:h-[300px] h-full bg-cover bg-center bg-no-repeat scale-x-[-1]" style={{backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireBgBackyard.webp"}}></div>
        </div>
        <div ref={containerRefBackyard} className={`flex flex-col w-[90%] gap-12 ${ isAnsweredGeneral[generalAnswersLength] === true ? "" : "" } `} style={{ height: `${containerHeightBackyard}px`}}>
          <div id="bq1" ref={(el) => {questionRefsBackyard.current[0] = el;}} className={`${ isAnsweredGeneral[generalAnswersLength] === true ? "bgblue-400" : "bgwyellow-200" } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersBackyard(questionnaire["backyard"][0].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
          <div id="bq2" ref={(el) => {questionRefsBackyard.current[1] = el;}} className={`${ isAnsweredBackyard[0] === true ? "" : "-translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                        // checked={}
                        onChange={() => {}}
                      />
                    </div>
                  ))
                }
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswersBackyard(questionnaire["backyard"][1].title, "Client Answer");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
          <div id="bq3" ref={(el) => {questionRefsBackyard.current[2] = el;}} className={`${ isAnsweredBackyard[1] === true ? "" : "translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersBackyard(questionnaire["backyard"][2].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
          <div id="bq4" ref={(el) => {questionRefsBackyard.current[3] = el;}} className={`${ isAnsweredBackyard[2] === true ? "" : "-translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswersBackyard(questionnaire["backyard"][3].title, "Client Answer");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
          <div id="bq5" ref={(el) => {questionRefsBackyard.current[4] = el;}} className={`${ isAnsweredBackyard[3] === true ? "" : "translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswersBackyard(questionnaire["backyard"][4].title, "Client Answer");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
          <div id="bq6" ref={(el) => {questionRefsBackyard.current[5] = el;}} className={`${ isAnsweredBackyard[4] === true ? "" : "-translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersBackyard(questionnaire["backyard"][5].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
            </div>
          </div>
          <div id="bq7" ref={(el) => {questionRefsBackyard.current[6] = el;}} className={`${ isAnsweredBackyard[5] === true ? "" : "translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersBackyard(questionnaire["backyard"][6].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
            </div>
          </div>
          <div id="bq8" ref={(el) => {questionRefsBackyard.current[7] = el;}} className={`${ isAnsweredBackyard[6] === true ? "" : "-translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersBackyard(questionnaire["backyard"][7].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
            </div>
          </div>
          <div  id="bq9" ref={(el) => {questionRefsBackyard.current[8] = el;}} className={`${ isAnsweredBackyard[7] === true ? "" : "translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersBackyard(questionnaire["backyard"][8].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
            </div>
          </div>
          <div id="bq10" ref={(el) => {questionRefsBackyard.current[9] = el;}} className={`${ isAnsweredBackyard[8] === true ? "" : "-translate-x-[-110%] opacity-0 " } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswersBackyard(questionnaire["backyard"][9].title, "Client Answer");
              }}
            >
              Submit Answer
            </button>
          </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default QuestionnaireBackyard
