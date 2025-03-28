"use client";
import { useEffect, useState, useRef } from "react";
import { Image } from "@heroui/image";
import { ProjectInformation, question } from "../../../utils/dataInterfaces";

import { questionnaire } from "../questionnaireFile";
import { RiContactsBookLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";

interface QuestionnaireGeneralProps {
  project: ProjectInformation | null;
  selectedMaxTwoGeneral: number[];
  setSelectedMaxTwoGeneral: React.Dispatch<React.SetStateAction<number[]>>;
  handleMaxTwoGeneral: (index: number) => void;
  answersGeneral: question[];
  setAnswersGeneral: React.Dispatch<React.SetStateAction<question[]>>;
  isAnsweredGeneral: boolean[];
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

const QuestionnaireGeneral: React.FC<QuestionnaireGeneralProps> = ({
  project,
  selectedMaxTwoGeneral,
  setSelectedMaxTwoGeneral,
  handleMaxTwoGeneral,
  answersGeneral,
  setAnswersGeneral,
  isAnsweredGeneral,
  handleSubmitAnswers,
  handleUpdateAnswers,
}) => {
  const containerRefGeneral = useRef<HTMLDivElement>(null);

  const questionRefsGeneral = useRef<Array<HTMLDivElement | null>>(
    new Array(questionnaire.general.length).fill(null)
  );

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
              window.scrollBy({
                top: currentElement.offsetHeight + 40,
                behavior: "smooth",
              });
            }, 100); // 🔹 Espera un poco para asegurar que el DOM está actualizado
          }

          // Si la siguiente pregunta no está respondida, hacer scroll a ella
          if (
            index + 1 < isAnsweredGeneral.length &&
            !isAnsweredGeneral[index + 1] &&
            nextElement
          ) {
            if (nextUnansweredIndex === -1) {
              nextUnansweredIndex = index + 1;
            }
            newHeight += nextElement.offsetHeight || 0;
            newHeight += 40;

            setTimeout(() => {
              if (index > 0) {
                window.scrollBy({
                  top: nextElement.offsetHeight + 40,
                  behavior: "smooth",
                });
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
  }, [
    isAnsweredGeneral,
    questionRefsGeneral.current.map((el) => el?.offsetHeight).join(","),
  ]);

  const handleControlText = (value: string, index: number) => {
    const newValue = value;
    setAnswersGeneral((prev) =>
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
  };

  const handleControlSelect = (value: string, index: number) => {
    const newValue = value === "2"; // Convierte "2" en `true` y "1" en `false`
    setAnswersGeneral((prev) =>
      prev.map((item, answerIndex) =>
        answerIndex === index ? { ...item, select: newValue } : item
      )
    );
  };

  const [selectedIncluded, setSelectedIncluded] = useState<boolean>(false);

  const handleControlMaxTwo = (style: string, index: number) => {
    console.log("estilo accionado: ", style, "- indice: ", index);
    // Manejo de selectedMaxTwoGeneral
    setSelectedMaxTwoGeneral((prev) => {
      if (prev.includes(index)) {
        return prev.filter((option) => option !== index);
      } else if (prev.length < 2) {
        return [...prev, index];
      }
      return prev;
    });

    // Manejo de answersGeneral[0].selecteds
    setAnswersGeneral((prev) => {
      const updatedAnswers = [...prev];
      const selecteds = updatedAnswers[0].selecteds || [];

      if (selecteds.some((item) => item.selected === style)) {
        // Si el estilo ya está seleccionado, lo eliminamos
        updatedAnswers[0].selecteds = selecteds.filter(
          (item) => item.selected !== style
        );
      } else if (selecteds.length < 2) {
        // Si hay menos de 2 seleccionados, lo agregamos
        updatedAnswers[0].selecteds = [...selecteds, { selected: style }];
      }

      return updatedAnswers;
    });
  };

  return (
    <section
      ref={containerRefGeneral}
      id="generalQuestions"
      className={`bgred-200 flex flex-col bgred-200 w-[90%] gap-12 overflow-hidden place-self-center`}
      style={{ height: `${containerHeightGeneral}px` }}
    >
      <div
        id="gq1"
        ref={(el) => {
          questionRefsGeneral.current[0] = el;
        }}
        className="flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]"
      >
        <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
          <h1>{questionnaire["general"][0].title}</h1>
        </div>
        <div className="flex flex-col py-12 gap-6  text-black  w-full bgred-300 px-16">
          <h1 className="text-3xl font-black">
            {project?.description.name} {project?.description.type}
          </h1>
          <div className="flex gap-2 pl2">
            {project?.description.areas.map((area, index) => (
              <h2 key={index}>{area}</h2>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2>Extras: </h2>
            <div className="flex flex-col gap-2">
              {project?.description.extras
                .flatMap((extra) => extra.split(", "))
                .map((include, index) => (
                  <p className="pl2" key={index}>
                    {include}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="w-[90%] place-self-center flex flex-col gap-1 pb-6">
          <div className="flex flex-col items-center gap1 text-black text-sm">
            <div className="w-full flex gap-1 items-center font-bold text-base ">
              <FaLocationDot />
              <h1>Location:</h1>
            </div>
            <div className="w-full flex gap1 items-center">
              <p className="p-2">
                Please find your location on the following map and open it with
                the top left corner{" "}
                <span className=" font-bold">View larger map</span> button to
                find the location, press the mouse right click on top of the
                exact location to copy it in the form of latitude and longitude
                and paste it down below
              </p>
            </div>
          </div>
          <div className="rounded-lg p border-2 border-[#858e5b]">
            <iframe
              className="rounded-md"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed"
            ></iframe>
          </div>
          <div className="text-black flex flex-col gap-2 mt-4 w-full">
            <p>Paste coordinates here: </p>
            <div className="w-full">
              <input
                className="bg-white w-full max-w-[350px] pl-2  border border-black rounded-md "
                placeholder="i.e: 34.578134993305305, -40.58331449925346"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      {answersGeneral[0] && isAnsweredGeneral[1] === true ? (
        <div
          id="gq2"
          ref={(el) => {
            questionRefsGeneral.current[1] = el;
          }}
          className={` flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] `}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <h1>What style are you looking for your space?</h1>
          </div>
          <div className="w-full bgblue-300  flex flex-col">
            <div className="">
              <p className="text-sm text-black pl-8 py-2 font-bold">
                Please select up to 2 styles.
              </p>
            </div>
            <div className="grid gap-2 py-12 min-[400px]:grid-cols-2 md:grid-cols-4 bggreen-300">
              {questionnaire["general"][1].options?.map((option, index) => (
                <div
                  className="bgred-300 flex flex-col justify-center items-center p-4"
                  key={option.id}
                >
                  <Image
                    className="w-[110px] aspect-square object-cover object-center rounded-full"
                    src={option.img}
                    alt=""
                  />
                  <div className="flex justify-center items-center gap-2 p-2">
                    <p className="text-black flex justify-center items-center gap-1 gq2Styles">
                      <span className="text-xl text-[#68664d]">▪ </span>
                      {option.name}
                    </p>
                    <input
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                      type="checkbox"
                      checked={selectedMaxTwoGeneral.includes(index)}
                      onChange={() => handleControlMaxTwo(option.name, index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              id="gqOther"
              className="flex gap-2 place-self-center bgred-200 w-[90%] pb-12 text-black items-end"
            >
              <p className="text-[#68664d]">Other: </p>
              <div className="border border-b-black border-b-2 w-full">
                <input
                  id="gq2Input"
                  value={
                    answersGeneral[0] ? answersGeneral[0]?.notes[0].note : ""
                  }
                  onChange={(e) => {
                    handleControlText(e.target.value, 0);
                  }}
                  className="h-[40px] text-xl outline-none border-none bg-white w-full text-black  pl-2"
                  type="text"
                />
              </div>
            </div>

            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleUpdateAnswers(
                    questionnaire.general[1].title.replace("?", ""),
                    "Styles General Question",
                    "General",
                    "gq2",
                    0
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
          id="gq2"
          ref={(el) => {
            questionRefsGeneral.current[1] = el;
          }}
          className={`flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b]`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <h1>What style are you looking for your space?</h1>
          </div>
          <div className="w-full bgblue-300  flex flex-col">
            <div className="grid   gap-2 py-12 min-[400px]:grid-cols-2 md:grid-cols-4 bggreen-300">
              {questionnaire["general"][1].options?.map((option, index) => (
                <div
                  className="bgred-300 flex flex-col justify-center items-center p-4"
                  key={option.id}
                >
                  <Image
                    className="w-[110px] aspect-square object-cover object-center rounded-full"
                    src={option.img}
                    alt=""
                  />
                  <div className="flex justify-center items-center gap-2 p-2">
                    <p className="text-black flex justify-center items-center gap-1 gq2Styles">
                      <span className="text-xl text-[#68664d]">▪ </span>
                      {option.name}
                    </p>
                    <input
                      className="w-6 h-6 bg-[#ebebeb] appearance-none checked:bg-[#858e5b] checked:border-2 checked:rounded checked:border-[#484e2c] disabled:bg-black  disabled:cursor-not-allowed cursor-pointer"
                      type="checkbox"
                      checked={selectedMaxTwoGeneral.includes(index)}
                      onChange={() => handleMaxTwoGeneral(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              id="gqOther"
              className="flex gap-2 place-self-center bgred-200 w-[90%] pb-12 text-black items-end"
            >
              <p className="text-[#68664d]">Other: </p>
              <div className="border border-b-black border-b-2 w-full">
                <input
                  id="gq2Input"
                  className="h-[40px] text-xl outline-none border-none bg-white w-full text-black  pl-2"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
              <button
                className="bg-[#858e5b] px-4 py-2 rounded-lg"
                onClick={() => {
                  handleSubmitAnswers(
                    questionnaire.general[1].title.replace("?", ""),
                    "Styles General Question",
                    "General",
                    "gq2"
                  );
                }}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}

      {answersGeneral[1] && isAnsweredGeneral[2] === true ? (
        <div
          id="gq3"
          ref={(el) => {
            questionRefsGeneral.current[2] = el;
          }}
          className={`${
            isAnsweredGeneral[1] === true ? "" : "translate-x-[-110%] opacity-0"
          } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center  transition-all duration-1000`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200">{questionnaire.general[2].title}</h1>
            </div>
            <div className="flex absolute right-[20px] top-[55px]">
              <Image
                className="w-[120px] aspect-square object-cover rounded-full"
                src={questionnaire.general[2].img}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
            <select
              id="gq3Select"
              value={answersGeneral[1].select === true ? "2" : "1"}
              onChange={(e) => {
                handleControlSelect(e.target.value, 1);
              }}
              className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6"
            >
              <option value="1">No</option>
              <option value="2">Yes</option>
            </select>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleUpdateAnswers(
                  questionnaire.general[2].title.replace("?", ""),
                  "Yes or No Question",
                  "General",
                  "gq3",
                  1
                );
              }}
            >
              Update Answer
            </button>
          </div>
        </div>
      ) : (
        <div
          id="gq3"
          ref={(el) => {
            questionRefsGeneral.current[2] = el;
          }}
          className={`${
            isAnsweredGeneral[1] === true ? "" : "translate-x-[-110%] opacity-0"
          } flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center  transition-all duration-1000`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200">{questionnaire.general[2].title}</h1>
            </div>
            <div className="flex absolute right-[20px] top-[55px]">
              <Image
                className="w-[120px] aspect-square object-cover rounded-full"
                src={questionnaire.general[2].img}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
            <select
              id="gq3Select"
              className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6"
            >
              <option value="1">No</option>
              <option value="2">Yes</option>
            </select>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswers(
                  questionnaire.general[2].title.replace("?", ""),
                  "Yes or No Question",
                  "General",
                  "gq3"
                );
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      )}

      {answersGeneral[2] && isAnsweredGeneral[3] === true ? (
        <div
          id="gq4"
          ref={(el) => {
            questionRefsGeneral.current[3] = el;
          }}
          className={`${
            isAnsweredGeneral[2] === true
              ? ""
              : "-translate-x-[-110%] opacity-0"
          } transition-all duration-1000  flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200">{questionnaire["general"][3].title}</h1>
            </div>
            <div className="flex absolute right-[20px] top-[55px]">
              <Image
                className="w-[120px] aspect-square object-cover rounded-full"
                src={questionnaire["general"][3].img}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
            <select
              id="gq4Select"
              value={answersGeneral[2].select === true ? "2" : "1"}
              onChange={(e) => {
                handleControlSelect(e.target.value, 2);
              }}
              className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6"
            >
              <option value="1">No</option>
              <option value="2">Yes</option>
            </select>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleUpdateAnswers(
                  questionnaire.general[3].title.replace("?", ""),
                  "Yes or No Question",
                  "General",
                  "gq4",
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
          id="gq4"
          ref={(el) => {
            questionRefsGeneral.current[3] = el;
          }}
          className={`${
            isAnsweredGeneral[2] === true
              ? ""
              : "-translate-x-[-110%] opacity-0"
          } transition-all duration-1000  flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200">{questionnaire["general"][3].title}</h1>
            </div>
            <div className="flex absolute right-[20px] top-[55px]">
              <Image
                className="w-[120px] aspect-square object-cover rounded-full"
                src={questionnaire["general"][3].img}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
            <select
              id="gq4Select"
              className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6"
            >
              <option value="1">No</option>
              <option value="2">Yes</option>
            </select>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswers(
                  questionnaire.general[3].title.replace("?", ""),
                  "Yes or No Question",
                  "General",
                  "gq4"
                );
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      )}

      {answersGeneral[3] && isAnsweredGeneral[4] === true ? (
        <div
          id="gq5"
          ref={(el) => {
            questionRefsGeneral.current[4] = el;
          }}
          className={`${
            isAnsweredGeneral[3] === true ? "" : "translate-x-[-110%] opacity-0"
          } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200">{questionnaire["general"][4].title}</h1>
            </div>
            <div className="flex absolute right-[20px] top-[55px]">
              <Image
                className="w-[120px] aspect-square object-cover rounded-full"
                src={questionnaire["general"][4].img}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
            <select
              id="gq5Select"
              value={answersGeneral[3].select === true ? "2" : "1"}
              onChange={(e) => {
                handleControlSelect(e.target.value, 3);
              }}
              className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6"
            >
              <option value="1">No</option>
              <option value="2">Yes</option>
            </select>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleUpdateAnswers(
                  questionnaire.general[4].title.replace("?", ""),
                  "Yes or No Question",
                  "General",
                  "gq5",
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
          id="gq5"
          ref={(el) => {
            questionRefsGeneral.current[4] = el;
          }}
          className={`${
            isAnsweredGeneral[3] === true ? "" : "translate-x-[-110%] opacity-0"
          } transition-all duration-1000 flex flex-col bgred-300 rounded-t-[28px] border-2 border-[#858e5b] justify-center items-center`}
        >
          <div className="flex bg-[#858e5b] relative pt-4 pl-6 pb-6 text-xl font-black rounded-t-3xl w-full">
            <div className="w-full bggreen-300 p-2 flex">
              <h1 className="bgred-200">{questionnaire["general"][4].title}</h1>
            </div>
            <div className="flex absolute right-[20px] top-[55px]">
              <Image
                className="w-[120px] aspect-square object-cover rounded-full"
                src={questionnaire["general"][4].img}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full justify-center items-start p-12 py-20">
            <select
              id="gq5Select"
              className="bg-[#ebebeb] rounded-tl-3xl rounded-br-3xl text-[#858e5b] py-2 px-6"
            >
              <option value="1">No</option>
              <option value="2">Yes</option>
            </select>
          </div>
          <div className="flex bgred-300 justify-end pr-4 py-4 w-full">
            <button
              className="bg-[#858e5b] px-4 py-2 rounded-lg"
              onClick={() => {
                handleSubmitAnswers(
                  questionnaire.general[4].title.replace("?", ""),
                  "Yes or No Question",
                  "General",
                  "gq5"
                );
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuestionnaireGeneral;
