"use client";
import { useEffect, useState, useRef } from "react";
import { Image } from "@heroui/image";

import { question } from "@/utils/dataInterfaces";

import { questionnaire } from "../questionnaireFile";

interface QuestionnaireBackyardProps {
  answersBackyard: question[];
  setAnswersBackyard: React.Dispatch<React.SetStateAction<question[]>>;
  isAnsweredGeneral: boolean[];
  isAnsweredBackyard: boolean[];
  setIsAnsweredBackyard: React.Dispatch<React.SetStateAction<boolean[]>>;
  selectedBq2: number | null;
  handleBq2Change: (index: number) => void;
  selectedWaterBackyard: number[];
  setSelectedWaterBackyard: React.Dispatch<React.SetStateAction<number[]>>;
  selectedFireBackyard: number[];
  setSelectedFireBackyard: React.Dispatch<React.SetStateAction<number[]>>;
  handleSubmitAnswers: (
    question: string,
    answer: string,
    categoryQuestion: string,
    htmlElements: string
  ) => void;
  handleUpdateAnswers: (
    question: string,
    answer: string,
    categoryQuestion: string,
    htmlElements: string,
    index: number
  ) => void;
}

const QuestionnaireBackyard: React.FC<QuestionnaireBackyardProps> = ({
  answersBackyard,
  setAnswersBackyard,
  isAnsweredGeneral,
  isAnsweredBackyard,
  setIsAnsweredBackyard,
  selectedBq2,
  handleBq2Change,
  selectedWaterBackyard,
  setSelectedWaterBackyard,
  selectedFireBackyard,
  setSelectedFireBackyard,
  handleSubmitAnswers,
  handleUpdateAnswers,
}) => {
  const containerRefBackyard = useRef<HTMLDivElement>(null);

  const sectionRefBackyard = useRef<HTMLDivElement>(null);

  const questionRefsBackyard = useRef<Array<HTMLDivElement | null>>(
    new Array(questionnaire.backyard.length).fill(null)
  );

  const [containerHeightBackyard, setContainerHeightBackyard] = useState(40);

  useEffect(() => {
    if (
      isAnsweredGeneral[isAnsweredGeneral.length - 1] &&
      questionRefsBackyard.current &&
      questionRefsBackyard.current.length > 0 &&
      questionRefsBackyard.current[0] &&
      questionRefsBackyard.current[0].offsetHeight
    ) {
      setContainerHeightBackyard(
        (prevHeight) =>
          prevHeight + questionRefsBackyard.current![0]!.offsetHeight || 0
      );
      setTimeout(() => {
        if (sectionRefBackyard.current) {
          window.scrollBy({
            top: sectionRefBackyard.current.offsetHeight - 150,
            behavior: "smooth",
          });
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
              window.scrollBy({
                top: currentElement.offsetHeight + 40,
                behavior: "smooth",
              });
            }, 100); // 🔹 Espera un poco para asegurar que el DOM está actualizado
          }

          // Si la siguiente pregunta no está respondida, hacer scroll a ella
          if (
            index + 1 < isAnsweredBackyard.length &&
            !isAnsweredBackyard[index + 1] &&
            nextElement
          ) {
            if (nextUnansweredIndex === -1) {
              nextUnansweredIndex = index + 1;
            }
            newHeight += nextElement.offsetHeight || 0;
            newHeight += 40;

            setTimeout(() => {
              window.scrollBy({
                top: nextElement.offsetHeight + 40,
                behavior: "smooth",
              });
            }, 100); // 🔹 Pequeña espera adicional para evitar conflictos de renderizado
          }
        } else if (index === 0 && !answered) {
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
  }, [
    isAnsweredGeneral,
    isAnsweredBackyard,
    questionRefsBackyard.current.map((el) => el?.offsetHeight).join(","),
  ]);

  const handleControlText = (value: string, index: number) => {
    const newValue = value;
    setAnswersBackyard((prev) =>
      prev.map((item, answerIndex) =>
        answerIndex === index
          ? {
              ...item,
              notes: item.notes.map((noteItem, noteIndex) =>
                noteIndex === 1 ? { ...noteItem, note: newValue } : noteItem
              ),
            }
          : item
      )
    );
  };

  const handleControlDoubleText = (
    value: string,
    index: number,
    box: string
  ) => {
    if (box === "keep") {
      const newValue = value;
      setAnswersBackyard((prev) =>
        prev.map((item, answerIndex) =>
          answerIndex === index
            ? {
                ...item,
                notes: item.notes.map((noteItem, noteIndex) =>
                  noteIndex === 0 ? { ...noteItem, note: newValue } : noteItem
                ),
              }
            : item
        )
      );
    } else if (box === "remove") {
      const newValue = value;
      setAnswersBackyard((prev) =>
        prev.map((item, answerIndex) =>
          answerIndex === index
            ? {
                ...item,
                notes: item.notes.map((noteItem, noteIndex) =>
                  noteIndex === 1 ? { ...noteItem, note: newValue } : noteItem
                ),
              }
            : item
        )
      );
    }
  };

  const handleControlPeople = (value: number, index: number) => {
    const newValue = value;
    setAnswersBackyard((prev) =>
      prev.map((item, answerIndex) =>
        answerIndex === index
          ? {
              ...item,
              people: newValue,
            }
          : item
      )
    );
  };

  const handleControlSelect = (value: string, index: number) => {
    const newValue = value === "2"; // Convierte "2" en `true` y "1" en `false`
    setAnswersBackyard((prev) =>
      prev.map((item, answerIndex) =>
        answerIndex === index ? { ...item, select: newValue } : item
      )
    );
  };

  return (
    <section
      id="backyardQuestions"
      className={`${
        isAnsweredGeneral[isAnsweredGeneral.length - 1] === true
          ? "bgred-300"
          : "bggreen-400 hidden"
      }  flex flex-col w-full justify-center items-center gap-20 overflow-hidden `}
    >
      <div
        ref={sectionRefBackyard}
        className={`${
          isAnsweredGeneral[isAnsweredGeneral.length - 1] === true
            ? "bgpink-500"
            : "bgpurple-400"
        } flex max-sm:flex-col bgred-300 sm:h-[300px] w-full `}
      >
        <div className="flex sm:w-[40%] justify-center items-center max-sm:py-24">
          <h1 className="font-black text-3xl text-[#6c786e]">BACKYARD</h1>
        </div>
        <div
          className="sm:w-[60%] max-sm:h-[300px] h-full bg-cover bg-center bg-no-repeat scale-x-[-1]"
          style={{
            backgroundImage:
              "url('https://github.com/BPM94/SCCTMD/raw/main/questionnaire/questionnaireBgBackyard.webp",
          }}
        ></div>
      </div>
      <div
        ref={containerRefBackyard}
        className={`flex flex-col w-[90%] gap-12 ${
          isAnsweredGeneral[isAnsweredGeneral.length - 1] === true ? "" : ""
        } w-[90%] `}
        style={{ height: `${containerHeightBackyard}px` }}
      >
        {answersBackyard && isAnsweredBackyard[0] === true ? (
          <div
            id="bq1"
            ref={(el) => {
              questionRefsBackyard.current[0] = el;
            }}
            className={`${
              isAnsweredGeneral[isAnsweredGeneral.length - 1] === true
                ? "bgblue-400"
                : "bgwyellow-200"
            } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][0].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover rounded-full"
                  src={questionnaire["backyard"][0].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq1Select"
                value={answersBackyard[0].select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 0);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6"
              >
                <option value="1">Green and Whites</option>
                <option value="2">Colorful Plants</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#6c786e]">Note:</p>
                <textarea
                  id="bq1Note"
                  value={answersBackyard[0]?.notes[1].note}
                  onChange={(e) => {
                    handleControlText(e.target.value, 0);
                  }}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleUpdateAnswers(
                    questionnaire.backyard[0].title
                      .replace("?", "")
                      .replace(",", ""),
                    "Yes or No With Note Question",
                    "Backyard",
                    "bq1",
                    0
                  );
                }}
              >
                Update Answer
              </button>
            </div>
          </div>
        ) : (
          <div
            id="bq1"
            ref={(el) => {
              questionRefsBackyard.current[0] = el;
            }}
            className={`${
              isAnsweredGeneral[isAnsweredGeneral.length - 1] === true
                ? "bgblue-400"
                : "bgwyellow-200"
            } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][0].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover rounded-full"
                  src={questionnaire["backyard"][0].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq1Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#6c786e] py-2 px-6"
              >
                <option value="1">Green and Whites</option>
                <option value="2">Colorful Plants</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#6c786e]">Note:</p>
                <textarea
                  id="bq1Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswers(
                    questionnaire["backyard"][0].title
                      .replace("?", "")
                      .replace(",", ""),
                    "Yes or No With Note Question",
                    "Backyard",
                    "bq1"
                  );
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[1] === true ? (
          <div
            id="bq2"
            ref={(el) => {
              questionRefsBackyard.current[1] = el;
            }}
            className={`${
              isAnsweredBackyard[0] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][1].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][1].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center p-8 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-sm:gap-8 gap-2 w-full py-16 bgred-300 ">
                {questionnaire["backyard"][1].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex    bbqlue-300 justify-center gap-6"
                  >
                    <div className="flex  text-black gap-2">
                      <span className="text-xl text-[#68664d]">▪ </span>
                      <div className="flex flex-col bgred-300">
                        <p className=" gap-1 bq2Plants">{option.name}</p>
                        <p className="text-xs">{option.detail}</p>
                      </div>
                    </div>
                    <input
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                      type="checkbox"
                      checked={selectedBq2 === index}
                      onChange={() => {
                        handleBq2Change(index);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire.backyard[1].title
                        .replace("?", "")
                        .replace(",", ""),
                      "How Many Plants Question",
                      "Backyard",
                      "bq2",
                      1
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq2"
            ref={(el) => {
              questionRefsBackyard.current[1] = el;
            }}
            className={`${
              isAnsweredBackyard[0] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][1].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][1].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center p-8 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-sm:gap-8 gap-2 w-full py-16 bgred-300 ">
                {questionnaire["backyard"][1].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex    bbqlue-300 justify-center gap-6"
                  >
                    <div className="flex  text-black gap-2">
                      <span className="text-xl text-[#68664d]">▪ </span>
                      <div className="flex flex-col bgred-300">
                        <p className=" gap-1 bq2Plants">{option.name}</p>
                        <p className="text-xs">{option.detail}</p>
                      </div>
                    </div>
                    <input
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                      type="checkbox"
                      checked={selectedBq2 === index}
                      onChange={() => {
                        handleBq2Change(index);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][1].title
                        .replace("?", "")
                        .replace(",", ""),
                      "How Many Plants Question",
                      "Backyard",
                      "bq2"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[2] === true ? (
          <div
            id="bq3"
            ref={(el) => {
              questionRefsBackyard.current[2] = el;
            }}
            className={`${
              isAnsweredBackyard[1] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][2].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][2].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-center p-8 py-20">
              {questionnaire["backyard"][2].options.map((option, index) => (
                <div className="flex flex-col w-full " key={index}>
                  <p className="text-[#68664d]">{option.name}</p>
                  <textarea
                    value={answersBackyard[2]?.notes[index].note}
                    onChange={(e) => {
                      index === 0
                        ? handleControlDoubleText(e.target.value, 2, "keep")
                        : handleControlDoubleText(e.target.value, 2, "remove");
                    }}
                    className="bg-[#ebebeb] p-2 text-black outline-none h-[100px] bq3ThingsKeepRemove"
                  />
                </div>
              ))}
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleUpdateAnswers(
                    questionnaire.backyard[2].title
                      .replace("?", "")
                      .replace(",", ""),
                    "Things to Keep or Remove Question",
                    "Backyard",
                    "bq3",
                    2
                  );
                }}
              >
                Update Answer
              </button>
            </div>
          </div>
        ) : (
          <div
            id="bq3"
            ref={(el) => {
              questionRefsBackyard.current[2] = el;
            }}
            className={`${
              isAnsweredBackyard[1] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][2].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][2].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-center p-8 py-20">
              {questionnaire["backyard"][2].options.map((option, index) => (
                <div className="flex flex-col w-full " key={index}>
                  <p className="text-[#68664d]">{option.name}</p>
                  <textarea className="bg-[#ebebeb] p-2 text-black outline-none h-[100px] bq3ThingsKeepRemove" />
                </div>
              ))}
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswers(
                    questionnaire["backyard"][2].title
                      .replace("?", "")
                      .replace(",", ""),
                    "Things to Keep or Remove Question",
                    "Backyard",
                    "bq3"
                  );
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[3] === true ? (
          <div
            id="bq4"
            ref={(el) => {
              questionRefsBackyard.current[3] = el;
            }}
            className={`${
              isAnsweredBackyard[2] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][3].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][3].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq4Select"
                value={answersBackyard[3]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 3);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq4Note"
                  value={answersBackyard[3]?.notes[1].note}
                  onChange={(e) => handleControlText(e.target.value, 3)}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleUpdateAnswers(
                    questionnaire["backyard"][3].title
                      .replace("?", "")
                      .replace(",", ""),
                    "Yes or No With Note Question",
                    "Backyard",
                    "bq4",
                    3
                  );
                }}
              >
                Update Answer
              </button>
            </div>
          </div>
        ) : (
          <div
            id="bq4"
            ref={(el) => {
              questionRefsBackyard.current[3] = el;
            }}
            className={`${
              isAnsweredBackyard[2] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][3].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][3].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq4Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq4Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswers(
                    questionnaire["backyard"][3].title
                      .replace("?", "")
                      .replace(",", ""),
                    "Yes or No With Note Question",
                    "Backyard",
                    "bq4"
                  );
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[4] === true ? (
          <div
            id="bq5"
            ref={(el) => {
              questionRefsBackyard.current[4] = el;
            }}
            className={`${
              isAnsweredBackyard[3] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][4].title}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq5Select"
                value={answersBackyard[4]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 4);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 w-full gap-12">
                {questionnaire["backyard"][4].options.map((option, index) => (
                  <div
                    className="flex flex-col gap-6 justify-center items-center text-black w-full"
                    key={index}
                  >
                    <Image
                      className="w-[100px] aspect-square object-cover"
                      src={option.img}
                      alt=""
                    />
                    <div className="flex gap-6">
                      <p className="text-xs sm:text-base flex justify-center items-center gap-1 bq5WaterOption">
                        <span className="text-xl  text-[#68664d]">▪ </span>
                        {option.name}
                      </p>
                      <input
                        type="checkbox"
                        checked={selectedWaterBackyard.includes(index)}
                        onChange={() => {
                          setSelectedWaterBackyard((prev) =>
                            prev.includes(index)
                              ? prev.filter((item) => item !== index)
                              : [...prev, index]
                          );
                        }}
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer bq5WaterCheckbox"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq5Note"
                  value={answersBackyard[4]?.notes[1].note}
                  onChange={(e) => {
                    handleControlText(e.target.value, 4);
                  }}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire["backyard"][4].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Water Feature Question",
                      "Backyard",
                      "bq5",
                      4
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq5"
            ref={(el) => {
              questionRefsBackyard.current[4] = el;
            }}
            className={`${
              isAnsweredBackyard[3] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][4].title}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq5Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 w-full gap-12">
                {questionnaire["backyard"][4].options.map((option, index) => (
                  <div
                    className="flex flex-col gap-6 justify-center items-center text-black w-full"
                    key={index}
                  >
                    <Image
                      className="w-[100px] aspect-square object-cover"
                      src={option.img}
                      alt=""
                    />
                    <div className="flex gap-6">
                      <p className="text-xs sm:text-base flex justify-center items-center gap-1 bq5WaterOption">
                        <span className="text-xl  text-[#68664d]">▪ </span>
                        {option.name}
                      </p>
                      <input
                        type="checkbox"
                        onChange={() => {
                          setSelectedWaterBackyard((prev) =>
                            prev.includes(index)
                              ? prev.filter((item) => item !== index)
                              : [...prev, index]
                          );
                        }}
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer bq5WaterCheckbox"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq5Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][4].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Water Feature Question",
                      "Backyard",
                      "bq5"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[5] === true ? (
          <div
            id="bq6"
            ref={(el) => {
              questionRefsBackyard.current[5] = el;
            }}
            className={`${
              isAnsweredBackyard[4] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][5].title}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq6FireSelect"
                value={answersBackyard[5]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 5);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                {questionnaire["backyard"][5].options.map((option, index) => (
                  <div
                    className="flex flex-col gap-4  text-black bbqlue-300 "
                    key={index}
                  >
                    <Image
                      className="w-[100px] aspect-square object-cover"
                      src={option.img}
                      alt=""
                    />
                    <div className="flex gap-6">
                      <p className="text-xs sm:text-base flex justify-center items-center gap-1 bq6FireOption">
                        <span className="text-xl  text-[#68664d]">▪ </span>
                        {option.name}
                      </p>
                      <input
                        type="checkbox"
                        checked={selectedFireBackyard.includes(index)}
                        onChange={() => {
                          setSelectedFireBackyard((prev) =>
                            prev.includes(index)
                              ? prev.filter((item) => item !== index)
                              : [...prev, index]
                          );
                        }}
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer bq6FireCheckbox"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full p-2">
                <div className="flex gap-2">
                  <p className="text-[#68664d]">
                    {questionnaire["backyard"][5].question}
                  </p>
                  <input
                    id="bq6FirePeople"
                    value={`${answersBackyard[5]?.people}`}
                    onChange={(e) => {
                      handleControlPeople(parseInt(e.target.value), 5);
                    }}
                    className="w-[60px] outline-none border-none bg-[#ebebeb] w-10 text-black pl-2"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea
                    id="bq6FireNote"
                    value={`${answersBackyard[5]?.notes[1].note}`}
                    onChange={(e) => {
                      handleControlText(e.target.value, 5);
                    }}
                    className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                  ></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire["backyard"][5].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Fire Feature Question",
                      "Backyard",
                      "bq6",
                      5
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq6"
            ref={(el) => {
              questionRefsBackyard.current[5] = el;
            }}
            className={`${
              isAnsweredBackyard[4] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][5].title}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq6FireSelect"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="grid sm:grid-cols-2 w-full place-items-center max-sm:gap-8 place-content-center bgred-300 max-w-[500px] place-self-center">
                {questionnaire["backyard"][5].options.map((option, index) => (
                  <div
                    className="flex flex-col gap-4  text-black bbqlue-300 "
                    key={index}
                  >
                    <Image
                      className="w-[100px] aspect-square object-cover"
                      src={option.img}
                      alt=""
                    />
                    <div className="flex gap-6">
                      <p className="text-xs sm:text-base flex justify-center items-center gap-1 bq6FireOption">
                        <span className="text-xl  text-[#68664d]">▪ </span>
                        {option.name}
                      </p>
                      <input
                        type="checkbox"
                        onChange={() => {
                          setSelectedFireBackyard((prev) =>
                            prev.includes(index)
                              ? prev.filter((item) => item !== index)
                              : [...prev, index]
                          );
                        }}
                        className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer bq6FireCheckbox"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full p-2">
                <div className="flex gap-2">
                  <p className="text-[#68664d]">
                    {questionnaire["backyard"][5].question}
                  </p>
                  <input
                    id="bq6FirePeople"
                    className="w-[60px] outline-none border-none bg-[#ebebeb] w-10 text-black pl-2"
                    type="number"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#68664d]">Note:</p>
                  <textarea
                    id="bq6FireNote"
                    className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                  ></textarea>
                </div>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][5].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Fire Feature Question",
                      "Backyard",
                      "bq6"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[6] === true ? (
          <div
            id="bq7"
            ref={(el) => {
              questionRefsBackyard.current[6] = el;
            }}
            className={`${
              isAnsweredBackyard[5] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][6].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][6].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq7Select"
                value={answersBackyard[6]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 6);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq7Note"
                  value={answersBackyard[6]?.notes[1].note}
                  onChange={(e) => {
                    handleControlText(e.target.value, 6);
                  }}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire["backyard"][6].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq7",
                      6
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq7"
            ref={(el) => {
              questionRefsBackyard.current[6] = el;
            }}
            className={`${
              isAnsweredBackyard[5] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][6].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][6].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq7Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq7Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][6].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq7"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[7] ? (
          <div
            id="bq8"
            ref={(el) => {
              questionRefsBackyard.current[7] = el;
            }}
            className={`${
              isAnsweredBackyard[6] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][7].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][7].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq8Select"
                value={answersBackyard[7]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 7);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq8Note"
                  value={answersBackyard[7]?.notes[1].note}
                  onChange={(e) => {
                    handleControlText(e.target.value, 7);
                  }}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire["backyard"][7].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq8",
                      7
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq8"
            ref={(el) => {
              questionRefsBackyard.current[7] = el;
            }}
            className={`${
              isAnsweredBackyard[6] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][7].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][7].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq8Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq8Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][7].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq8"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[8] ? (
          <div
            id="bq9"
            ref={(el) => {
              questionRefsBackyard.current[8] = el;
            }}
            className={`${
              isAnsweredBackyard[7] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][8].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][8].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq9Select"
                value={answersBackyard[8]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 8);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq9Note"
                  value={answersBackyard[8]?.notes[1].note}
                  onChange={(e) => {
                    handleControlText(e.target.value, 8);
                  }}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire["backyard"][8].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq9",
                      8
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq9"
            ref={(el) => {
              questionRefsBackyard.current[8] = el;
            }}
            className={`${
              isAnsweredBackyard[7] === true
                ? ""
                : "translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][8].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][8].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq9Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq9Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][8].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq9"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}

        {answersBackyard && isAnsweredBackyard[9] ? (
          <div
            id="bq10"
            ref={(el) => {
              questionRefsBackyard.current[9] = el;
            }}
            className={`${
              isAnsweredBackyard[8] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][9].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][9].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq10Select"
                value={answersBackyard[9]?.select === true ? "2" : "1"}
                onChange={(e) => {
                  handleControlSelect(e.target.value, 9);
                }}
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq10Note"
                  value={answersBackyard[9]?.notes[1].note}
                  onChange={(e) => {
                    handleControlText(e.target.value, 9);
                  }}
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleUpdateAnswers(
                      questionnaire["backyard"][9].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq10",
                      9
                    );
                  }}
                >
                  Update Answer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="bq10"
            ref={(el) => {
              questionRefsBackyard.current[9] = el;
            }}
            className={`${
              isAnsweredBackyard[8] === true
                ? ""
                : "-translate-x-[-110%] opacity-0 "
            } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#6c786e] justify-center items-center`}
          >
            <div className="flex bg-[#6c786e] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
              <div className="w-full bggreen-300 p-2 flex">
                <h1 className="bgred-200">
                  {questionnaire["backyard"][9].title}
                </h1>
              </div>
              <div className="flex absolute right-[20px] top-[55px]">
                <Image
                  className="w-[120px] aspect-square object-cover"
                  src={questionnaire["backyard"][9].img}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
              <select
                id="bq10Select"
                className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#68664d] py-2 px-6"
              >
                <option value="1">No</option>
                <option value="2">Yes</option>
              </select>
              <div className="flex flex-col w-full p-2">
                <p className="text-[#68664d]">Note:</p>
                <textarea
                  id="bq10Note"
                  className="bg-[#ebebeb] p-2 text-black outline-none h-[100px]"
                ></textarea>
              </div>
              <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
                <button
                  className="bg-[#858e5b] px-4 py-2 rounded-lg"
                  onClick={() => {
                    handleSubmitAnswers(
                      questionnaire["backyard"][9].title
                        .replace("?", "")
                        .replace(",", ""),
                      "Yes or No With Note Question",
                      "Backyard",
                      "bq10"
                    );
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionnaireBackyard;
