import { useEffect, useState, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
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

  return (
    <div className="bgred-300 flex flex-col w-full p-2 ">
      <div className="flex flex-col gap-2 w-full bgblue-300">
        <div id="progressGeneral" className="w-full">
          <h2 className="pl-4">General Questions: <span className="text-xs">( {countedGeneralAnswers} / {questionnaire.general.length} )</span></h2>
          <div className="flex gap-2 w-full overflow-scroll select-none overflow-y-hidden p-2">
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
        <div id="progressBackyard" className="w-full">
          <h2 className="pl-4">Backyard Questions: <span className="text-xs">( {countedBackyardAnswers} / {questionnaire.backyard.length} )</span></h2>
          <div className="flex gap-2 w-full overflow-scroll select-none overflow-y-hidden p-2">
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
        <div id="progressFrontyard" className="w-full">
          <h2 className="pl-4">Frontyard Questions: <span className="text-xs">( {countedFrontyardAnswers} / {questionnaire.backyard.length} )</span></h2>
          <div className="flex gap-2 w-full overflow-scroll select-none overflow-y-hidden p-2">
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
        
      </div>
    </div>
  );
};

export default QuestionnaireProgress;
