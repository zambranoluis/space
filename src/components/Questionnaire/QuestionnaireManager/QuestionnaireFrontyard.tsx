
"use client";
import { useEffect, useState, useRef } from "react";
import { Image } from "@nextui-org/image";

import { question } from "@/utils/dataInterfaces";


import {
  questionnaire
} from "../questionnaireFile";

interface QuestionnaireFrontyardProps {
  categories: string[];
  answersFrontyard: question[];
  isAnsweredGeneral: boolean[];
  isAnsweredBackyard: boolean[];
  isAnsweredFrontyard: boolean[];
  selectedFq2: number | null;
  handleFq2Change: (index: number) => void;
  selectedWaterFrontyard: number[];
  setSelectedWaterFrontyard: React.Dispatch<React.SetStateAction<number[]>>
  selectedFireFrontyard: number[];
  setSelectedFireFrontyard: React.Dispatch<React.SetStateAction<number[]>>
  handleSubmitAnswers: (question: string, typeQuestion: string, categoryQuestion: string, htmlElements: string) => void
}


const QuestionnaireFrontyard: React.FC<QuestionnaireFrontyardProps> = ({
  categories,
  answersFrontyard,
  isAnsweredGeneral,
  isAnsweredBackyard,
  isAnsweredFrontyard,
  selectedFq2,
  handleFq2Change,
  selectedWaterFrontyard,
  setSelectedWaterFrontyard,
  selectedFireFrontyard,
  setSelectedFireFrontyard,
  handleSubmitAnswers
}) => {



  const containerRefFrontyard = useRef<HTMLDivElement>(null);
  const sectionRefFrontyard = useRef<HTMLDivElement>(null);
  const questionRefsFrontyard = useRef<Array<HTMLDivElement | null>>(new Array(questionnaire.backyard.length).fill(null));

  const [containerHeightFrontyard, setContainerHeightFrontyard] = useState(0);


  useEffect(() => {
    if (categories.includes("Backyard")) {
      if (
        isAnsweredBackyard[isAnsweredBackyard.length - 1] &&
        questionRefsFrontyard.current &&
        questionRefsFrontyard.current.length > 0 &&
        questionRefsFrontyard.current[0] &&
        questionRefsFrontyard.current[0].offsetHeight
      ) {
        setContainerHeightFrontyard((prevHeight) => prevHeight + questionRefsFrontyard.current![0]!.offsetHeight || 0);
        setTimeout(() => {
          if (sectionRefFrontyard.current) {
            window.scrollBy({ top: sectionRefFrontyard.current.offsetHeight, behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      if (
        isAnsweredGeneral[isAnsweredGeneral.length - 1] &&
        questionRefsFrontyard.current &&
        questionRefsFrontyard.current.length > 0 &&
        questionRefsFrontyard.current[0] &&
        questionRefsFrontyard.current[0].offsetHeight
      ) {
        setContainerHeightFrontyard((prevHeight) => prevHeight + questionRefsFrontyard.current![0]!.offsetHeight || 0);
        setTimeout(() => {
          if (sectionRefFrontyard.current) {
            window.scrollBy({ top: sectionRefFrontyard.current.offsetHeight, behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [questionRefsFrontyard, isAnsweredGeneral, isAnsweredBackyard]);


  useEffect(() => {
    const calculateContainerHeightFrontyard = () => {
      let newHeight = 0;
      let nextUnansweredIndex = -1;

      isAnsweredFrontyard.forEach((answered, index) => {
        const currentElement = questionRefsFrontyard.current[index];
        const nextElement = questionRefsFrontyard.current[index + 1];

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
          if (index + 1 < isAnsweredFrontyard.length && !isAnsweredFrontyard[index + 1] && nextElement) {
            if (nextUnansweredIndex === -1) {
              nextUnansweredIndex = index + 1;
            }
            newHeight += nextElement.offsetHeight || 0;
            newHeight += 40;

            setTimeout(() => {
              window.scrollBy({ top: nextElement.offsetHeight + 40, behavior: "smooth" });
            }, 100); // 🔹 Pequeña espera adicional para evitar conflictos de renderizado
          }
        } else if (index === 0 && !answered) {
          newHeight += questionRefsFrontyard.current![0]!.offsetHeight || 0;
          newHeight += 40;
        }
      });

      newHeight += 40;
      setContainerHeightFrontyard(newHeight);
    };

    // Ejecutar el cálculo solo si los elementos existen
    if (questionRefsFrontyard.current.every((el) => el)) {
      calculateContainerHeightFrontyard();
    }
  }, [isAnsweredGeneral, isAnsweredBackyard, isAnsweredFrontyard, categories, questionRefsFrontyard.current.map((el) => el?.offsetHeight).join(",")]);

  return (
    (!categories.includes("Backyard"))
      ? <section id="frontyardQuestions" className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] === true ? "" : "hidden"} flex flex-col w-full justify-center items-center gap-20  bgred-200`}>
        <div ref={sectionRefFrontyard} className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] === true ? "" : "opacity-0"} transition-all duration-1000 flex max-sm:flex-col bgred-300 sm:h-[300px] w-full`}>
          <div className="flex sm:w-[40%] justify-center items-center max-sm:py-24">
            <h1 className="font-black text-3xl text-[#6c786e]">FRONTYARD</h1>
          </div>
          <div className="sm:w-[60%] max-sm:h-[300px] h-full bg-cover bg-center bg-no-repeat scale-x-[-1]" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireBgFrontyard.webp" }}></div>
        </div>
        <div ref={containerRefFrontyard} className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] === true ? "" : ""} flex flex-col w-[90%] gap-12 overflow-hidden`} style={{ height: `${containerHeightFrontyard}px` }}>

          {(answersFrontyard && isAnsweredFrontyard[0] === true)
            ? <div id="fq1" ref={(el) => { questionRefsFrontyard.current[0] = el; }} className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 delay-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][0].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["backyard"][0].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq1Select" value={answersFrontyard[0].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6">
                  <option value="1">Green and Whites</option>
                  <option value="2">Colorful Plants</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#6c786e]">Note:</p>
                  <textarea id="fq1Note" placeholder={answersFrontyard[0].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            : <div id="fq1" ref={(el) => { questionRefsFrontyard.current[0] = el; }} className={`${isAnsweredGeneral[isAnsweredGeneral.length - 1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 delay-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][0].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["backyard"][0].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq1Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6">
                  <option value="1">Green and Whites</option>
                  <option value="2">Colorful Plants</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#6c786e]">Note:</p>
                  <textarea id="fq1Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][0].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq1");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          <div id="fq2" ref={(el) => { questionRefsFrontyard.current[1] = el; }} className={`${isAnsweredFrontyard[0] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                          <p className=" gap-1 fq2Plants">{option.name}</p>
                          <p className="text-xs">{option.detail}</p>
                        </div>
                      </div>
                      <input
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                        type="checkbox"
                        checked={selectedFq2 === index}
                        onChange={() => { handleFq2Change(index) }}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswers(questionnaire["backyard"][1].title.replace("?", "").replace(",", ""), "How Many Plants Question", "Frontyard", "fq2");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>


          {(answersFrontyard && isAnsweredFrontyard[2] === true)
            ? <div id="fq3" ref={(el) => { questionRefsFrontyard.current[2] = el; }} className={`${isAnsweredFrontyard[1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                      <textarea placeholder={answersFrontyard[2].notes[index].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px] fq3ThingsKeepRemove" />
                    </div>
                  ))
                }
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    alert("update answer logic");
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
            : <div id="fq3" ref={(el) => { questionRefsFrontyard.current[2] = el; }} className={`${isAnsweredFrontyard[1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                      <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px] fq3ThingsKeepRemove" />
                    </div>
                  ))
                }
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][2].title.replace("?", "").replace(",", ""), "Things to Keep or Remove Question", "Frontyard", "fq3");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[3] === true)
            ? <div id="fq4" ref={(el) => { questionRefsFrontyard.current[3] = el; }} className={`${isAnsweredFrontyard[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][3].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][3].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq4Select" value={answersFrontyard[3].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq4Note" placeholder={answersFrontyard[3].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    alert("update answer logic")
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
            : <div id="fq4" ref={(el) => { questionRefsFrontyard.current[3] = el; }} className={`${isAnsweredFrontyard[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][3].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][3].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq4Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq4Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][3].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq4");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[4] === true)
            ? <div id="fq5" ref={(el) => { questionRefsFrontyard.current[4] = el; }} className={`${isAnsweredFrontyard[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][4].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq5Select" value={answersFrontyard[4].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid md:grid-cols-3 w-full gap-12">
                  {
                    questionnaire["backyard"][4].options.map((option, index) => (
                      <div className={`${index === 2 ? "hidden" : ""}  flex flex-col gap-6 justify-center items-center text-black w-full bgblue-300`} key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq5WaterOption "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                          <input type="checkbox" checked={selectedWaterFrontyard.includes(index)} onChange={() => {
                            setSelectedWaterFrontyard((prev) =>
                              prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                            );
                          }} className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq5WaterCheckbox" />
                        </div>
                      </div>
                    ))

                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq5Note" placeholder={answersFrontyard[4].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
                <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                  <button
                    className="bg-[#858e5b] px-4 py-2 rounded-lg"
                    onClick={() => {
                      alert("update answer logic")
                    }}
                  >
                    Update Answer
                  </button>
                </div>
              </div>
            </div>
            : <div id="fq5" ref={(el) => { questionRefsFrontyard.current[4] = el; }} className={`${isAnsweredFrontyard[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][4].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq5Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid md:grid-cols-3 w-full gap-12">
                  {
                    questionnaire["backyard"][4].options.map((option, index) => (
                      <div className={`${index === 2 ? "hidden" : ""}  flex flex-col gap-6 justify-center items-center text-black w-full bgblue-300`} key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq5WaterOption "><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                          <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq5WaterCheckbox" />
                        </div>
                      </div>
                    ))

                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq5Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
                <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                  <button
                    className="bg-[#858e5b] px-4 py-2 rounded-lg"
                    onClick={() => {
                      handleSubmitAnswers(questionnaire["backyard"][4].title.replace("?", "").replace(",", ""), "Water Feature Question", "Frontyard", "fq5");
                    }}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[5] === true)
            ? <div id="fq6" ref={(el) => { questionRefsFrontyard.current[5] = el; }} className={`${isAnsweredFrontyard[4] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][5].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq6FireSelect" value={answersFrontyard[5].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                  {
                    questionnaire["backyard"][5].options.map((option, index) => (
                      <div className="flex flex-col gap-4  text-black bbqlue-300 " key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq6FireOption"><span className="text-xl  text-[#68664d] ">▪ </span>{option.name}</p>
                          <input type="checkbox" checked={selectedFireFrontyard.includes(index)} onChange={() => {
                            setSelectedFireFrontyard((prev) =>
                              prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                            );
                          }} className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq6FireCheckbox" />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <div className="flex gap-2">
                    <p className="text-[#68664d]">{questionnaire["backyard"][5].question}</p>
                    <input id="fq6FirePeople" placeholder={`${answersFrontyard[5].people}`} className="outline-none border-none bg-[#ebebeb] w-10 text-black pl-2" type="number" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#68664d]">Note:</p>
                    <textarea id="fq6FireNote" placeholder={answersFrontyard[5].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                  </div>
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
            : <div id="fq6" ref={(el) => { questionRefsFrontyard.current[5] = el; }} className={`${isAnsweredFrontyard[4] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][5].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq6FireSelect" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                  {
                    questionnaire["backyard"][5].options.map((option, index) => (
                      <div className="flex flex-col gap-4  text-black bbqlue-300 " key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq6FireOption"><span className="text-xl  text-[#68664d] ">▪ </span>{option.name}</p>
                          <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq6FireCheckbox" />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <div className="flex gap-2">
                    <p className="text-[#68664d]">{questionnaire["backyard"][5].question}</p>
                    <input id="fq6FirePeople" className="outline-none border-none bg-[#ebebeb] w-10 text-black pl-2" type="number" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#68664d]">Note:</p>
                    <textarea id="fq6FireNote" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                  </div>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][5].title.replace("?", "").replace(",", ""), "Fire Feature Question", "Frontyard", "fq6");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[6] === true)
            ? <div id="fq7" ref={(el) => { questionRefsFrontyard.current[6] = el; }} className={`${isAnsweredFrontyard[5] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][6].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][6].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq7Select" value={answersFrontyard[6].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq7Note" placeholder={answersFrontyard[6].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    alert("update answer logic")
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
            : <div id="fq7" ref={(el) => { questionRefsFrontyard.current[6] = el; }} className={`${isAnsweredFrontyard[5] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][6].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][6].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq7Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq7Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][6].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq7");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[7] === true)
            ? <div id="fq8" ref={(el) => { questionRefsFrontyard.current[7] = el; }} className={`${isAnsweredFrontyard[6] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][7].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][7].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq8Select" value={answersFrontyard[7].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq8Note" placeholder={answersFrontyard[7].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    alert("update answer logic")
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
            : <div id="fq8" ref={(el) => { questionRefsFrontyard.current[7] = el; }} className={`${isAnsweredFrontyard[6] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][7].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][7].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq8Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq8Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][7].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq8");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[8] === true)
            ? <div id="fq9" ref={(el) => { questionRefsFrontyard.current[8] = el; }} className={`${isAnsweredFrontyard[7] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][8].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][8].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq9Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq9Note" placeholder={answersFrontyard[8].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    alert("update answer logic")
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
            : <div id="fq9" ref={(el) => { questionRefsFrontyard.current[8] = el; }} className={`${isAnsweredFrontyard[7] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][8].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][8].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq9Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq9Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][8].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq9");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[9] === true)
            ? <div id="fq10" ref={(el) => { questionRefsFrontyard.current[9] = el; }} className={`${isAnsweredFrontyard[8] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][9].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][9].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq10Select" value={answersFrontyard[9].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq10Note" placeholder={answersFrontyard[9].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    alert("update answer logic")
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
            : <div id="fq10" ref={(el) => { questionRefsFrontyard.current[9] = el; }} className={`${isAnsweredFrontyard[8] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][9].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][9].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq10Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq10Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][9].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq10");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>

          }

        </div>
      </section>
      : <section id="frontyardQuestions" className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "hidden"} flex flex-col w-full justify-center items-center gap-20  bgred-200`}>
        <div ref={sectionRefFrontyard} className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "opacity-0"} transition-all duration-1000 flex max-sm:flex-col bgred-300 sm:h-[300px] w-full`}>
          <div className="flex sm:w-[40%] justify-center items-center max-sm:py-24">
            <h1 className="font-black text-3xl text-[#6c786e]">FRONTYARD</h1>
          </div>
          <div className="sm:w-[60%] max-sm:h-[300px] h-full bg-cover bg-center bg-no-repeat scale-x-[-1]" style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireBgFrontyard.webp" }}></div>
        </div>
        <div ref={containerRefFrontyard} className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : ""} flex flex-col w-[90%] gap-12 overflow-hidden`} style={{ height: `${containerHeightFrontyard}px` }}>

          {(answersFrontyard && isAnsweredFrontyard[0] === true)
            ? <div id="fq1" ref={(el) => { questionRefsFrontyard.current[0] = el; }} className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 delay-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][0].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["backyard"][0].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq1Select" value={answersFrontyard[0].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6">
                  <option value="1">Green and Whites</option>
                  <option value="2">Colorful Plants</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#6c786e]">Note:</p>
                  <textarea id="fq1Note" placeholder={answersFrontyard[0].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            : <div id="fq1" ref={(el) => { questionRefsFrontyard.current[0] = el; }} className={`${isAnsweredBackyard[isAnsweredBackyard.length - 1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 delay-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][0].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover rounded-full" src={questionnaire["backyard"][0].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq1Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6">
                  <option value="1">Green and Whites</option>
                  <option value="2">Colorful Plants</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#6c786e]">Note:</p>
                  <textarea id="fq1Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][0].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq1");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          <div id="fq2" ref={(el) => { questionRefsFrontyard.current[1] = el; }} className={`${isAnsweredFrontyard[0] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                          <p className=" gap-1 fq2Plants">{option.name}</p>
                          <p className="text-xs">{option.detail}</p>
                        </div>
                      </div>
                      <input
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                        type="checkbox"
                        checked={selectedFq2 === index}
                        onChange={() => { handleFq2Change(index) }}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswers(questionnaire["backyard"][1].title.replace("?", "").replace(",", ""), "How Many Plants Question", "Frontyard", "fq2");
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>

          {(answersFrontyard && isAnsweredFrontyard[2] === true)
            ? <div id="fq3" ref={(el) => { questionRefsFrontyard.current[2] = el; }} className={`${isAnsweredFrontyard[1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                      <textarea placeholder={answersFrontyard[2].notes[index].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px] fq3ThingsKeepRemove" />
                    </div>
                  ))
                }
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
            : <div id="fq3" ref={(el) => { questionRefsFrontyard.current[2] = el; }} className={`${isAnsweredFrontyard[1] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
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
                      <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px] fq3ThingsKeepRemove" />
                    </div>
                  ))
                }
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][2].title.replace("?", "").replace(",", ""), "Things to Keep or Remove Question", "Frontyard", "fq3");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[3] === true)
            ? <div id="fq4" ref={(el) => { questionRefsFrontyard.current[3] = el; }} className={`${isAnsweredFrontyard[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][3].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][3].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq4Select" value={answersFrontyard[3].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq4Note" placeholder={answersFrontyard[3].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            : <div id="fq4" ref={(el) => { questionRefsFrontyard.current[3] = el; }} className={`${isAnsweredFrontyard[2] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][3].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][3].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq4Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq4Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][3].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq4");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[4] === true)
            ? <div id="fq5" ref={(el) => { questionRefsFrontyard.current[4] = el; }} className={`${isAnsweredFrontyard[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][4].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq5Select" value={answersFrontyard[4].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid md:grid-cols-3 w-full gap-12">
                  {
                    questionnaire["backyard"][4].options.map((option, index) => (
                      <div className={`${index === 2 ? "hidden" : ""}  flex flex-col gap-6 justify-center items-center text-black w-full bgblue-300`} key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq5WaterOption"><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                          <input type="checkbox" checked={selectedWaterFrontyard.includes(index)} onChange={() => {
                            setSelectedWaterFrontyard((prev) =>
                              prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                            );
                          }}
                            className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq5WaterCheckbox" />
                        </div>
                      </div>
                    ))

                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq5Note" placeholder={answersFrontyard[4].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            </div>
            : <div id="fq5" ref={(el) => { questionRefsFrontyard.current[4] = el; }} className={`${isAnsweredFrontyard[3] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][4].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq5Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid md:grid-cols-3 w-full gap-12">
                  {
                    questionnaire["backyard"][4].options.map((option, index) => (
                      <div className={`${index === 2 ? "hidden" : ""}  flex flex-col gap-6 justify-center items-center text-black w-full bgblue-300`} key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq5WaterOption"><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                          <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq5WaterCheckbox" />
                        </div>
                      </div>
                    ))

                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq5Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
                <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                  <button
                    className="bg-[#858e5b] px-4 py-2 rounded-lg"
                    onClick={() => {
                      handleSubmitAnswers(questionnaire["backyard"][4].title.replace("?", "").replace(",", ""), "Water Feature Question", "Frontyard", "fq5");
                    }}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[5] === true)
            ? <div id="fq6" ref={(el) => { questionRefsFrontyard.current[5] = el; }} className={`${isAnsweredFrontyard[4] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][5].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq6FireSelect" value={answersFrontyard[5].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                  {
                    questionnaire["backyard"][5].options.map((option, index) => (
                      <div className="flex flex-col gap-4  text-black bbqlue-300 " key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq6FireOption"><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                          <input type="checkbox" checked={selectedFireFrontyard.includes(index)} onChange={() => {
                            setSelectedFireFrontyard((prev) =>
                              prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                            );
                          }} className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq6FireCheckbox" />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <div className="flex gap-2">
                    <p className="text-[#68664d]">{questionnaire["backyard"][5].question}</p>
                    <input id="fq6FirePeople" placeholder={`${answersFrontyard[5].people}`} className="outline-none border-none bg-[#ebebeb] w-10 text-black pl-2" type="number" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#68664d]">Note:</p>
                    <textarea id="fq6FireNote" placeholder={answersFrontyard[5].notes[0].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                  </div>
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
            : <div id="fq6" ref={(el) => { questionRefsFrontyard.current[5] = el; }} className={`${isAnsweredFrontyard[4] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][5].title}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq6FireSelect" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                  {
                    questionnaire["backyard"][5].options.map((option, index) => (
                      <div className="flex flex-col gap-4  text-black bbqlue-300 " key={index}>
                        <Image className="w-[100px] aspect-square object-cover" src={option.img} alt="" />
                        <div className="flex gap-6">
                          <p className="text-xs sm:text-base flex justify-center items-center gap-1 fq6FireOption"><span className="text-xl  text-[#68664d]">▪ </span>{option.name}</p>
                          <input type="checkbox" className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer fq6FireCheckbox" />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex flex-col w-full p-2">
                  <div className="flex gap-2">
                    <p className="text-[#68664d]">{questionnaire["backyard"][5].question}</p>
                    <input id="fq6FirePeople" className="outline-none border-none bg-[#ebebeb] w-10 text-black pl-2" type="number" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#68664d]">Note:</p>
                    <textarea id="fq6FireNote" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                  </div>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][5].title.replace("?", "").replace(",", ""), "Fire Feature Question", "Frontyard", "fq6");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[6] === true)
            ? <div id="fq7" ref={(el) => { questionRefsFrontyard.current[6] = el; }} className={`${isAnsweredFrontyard[5] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][6].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][6].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq7Select" value={answersFrontyard[6].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq7Note" placeholder={answersFrontyard[6].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            : <div id="fq7" ref={(el) => { questionRefsFrontyard.current[6] = el; }} className={`${isAnsweredFrontyard[5] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][6].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][6].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq7Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq7Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][6].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq7");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[7] === true)
            ? <div id="fq8" ref={(el) => { questionRefsFrontyard.current[7] = el; }} className={`${isAnsweredFrontyard[6] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][7].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][7].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq8Select" value={answersFrontyard[7].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq8Note" placeholder={answersFrontyard[7].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            : <div id="fq8" ref={(el) => { questionRefsFrontyard.current[7] = el; }} className={`${isAnsweredFrontyard[6] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][7].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][7].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq8Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq8Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][7].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq8");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[8] === true)
            ? <div id="fq9" ref={(el) => { questionRefsFrontyard.current[8] = el; }} className={`${isAnsweredFrontyard[7] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][8].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][8].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq9Select" value={answersFrontyard[8].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq9Note" placeholder={answersFrontyard[8].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][8].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq9");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
            : <div id="fq9" ref={(el) => { questionRefsFrontyard.current[8] = el; }} className={`${isAnsweredFrontyard[7] === true ? "" : "translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][8].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][8].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq9Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq9Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][8].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq9");
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          }

          {(answersFrontyard && isAnsweredFrontyard[9] === true)
            ? <div id="fq10" ref={(el) => { questionRefsFrontyard.current[9] = el; }} className={`${isAnsweredFrontyard[8] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][9].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][9].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq10Select" value={answersFrontyard[9].select === true ? "2" : "1"} className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq10Note" placeholder={answersFrontyard[9].notes[1].note} className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
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
            : <div id="fq10" ref={(el) => { questionRefsFrontyard.current[9] = el; }} className={`${isAnsweredFrontyard[8] === true ? "" : "-translate-x-[-110%] opacity-0"} transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}>
              <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
                <div className="w-full bggreen-300 p-2 flex">
                  <h1 className="bgred-200">{questionnaire["backyard"][9].title}</h1>
                </div>
                <div className="flex absolute right-[20px] top-[55px]">
                  <Image className="w-[120px] aspect-square object-cover" src={questionnaire["backyard"][9].img} alt="" />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20" >
                <select id="fq10Select" className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6">
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </select>
                <div className="flex flex-col w-full p-2">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea id="fq10Note" className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(questionnaire["backyard"][9].title.replace("?", "").replace(",", ""), "Yes or No With Note Question", "Frontyard", "fq10");
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

export default QuestionnaireFrontyard
