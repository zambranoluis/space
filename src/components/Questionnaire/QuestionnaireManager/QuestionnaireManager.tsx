"use client";

import React, { useEffect, useState } from "react";
import QuestionnaireGeneral from "./QuestionnaireGeneral";
import QuestionnaireBackyard from "./QuestionnaireBackyard";
import QuestionnaireFrontyard from "./QuestionnaireFrontyard";
import QuestionnaireExtra from "./QuestionnaireExtra";
import QuestionnaireMedia from "./QuestionnaireMedia";
import QuestionnaireProgress from "@/components/QuestionnaireProgress";

import { questionnaire } from "../questionnaireFile";

import { ProjectInformation } from "@/utils/dataInterfaces";

interface QuestionnaireManagerProps {
  showProgress: boolean;
  project: ProjectInformation | null

}

const QuestionnaireManager: React.FC<QuestionnaireManagerProps> = ({
  showProgress,
  project
}) => {
  // useEffect(() => {
  //   console.log("project en questionnaire manager: ", project);
  // })
  const [answersGeneral, setAnswersGeneral] = useState<
    { question: string; answer: string }[]
  >([]);

  const [isAnsweredGeneral, setIsAnsweredGeneral] = useState<boolean[]>(
    questionnaire.general.map((_, index) => index === 0 ? true : false)
  );

  const [selectedMaxTwoGeneral, setSelectedMaxTwoGeneral] = useState<number[]>([]);

  const handleMaxTwoGeneral = (index: number) => {
    if (selectedMaxTwoGeneral.includes(index)) {
      // Si el índice ya está seleccionado, lo eliminamos
      setSelectedMaxTwoGeneral(
        selectedMaxTwoGeneral.filter((option) => option !== index),
      );
    } else if (selectedMaxTwoGeneral.length < 2) {
      // Si aún no hay dos seleccionados, agregamos el índice
      setSelectedMaxTwoGeneral([...selectedMaxTwoGeneral, index]);
    }
  };

  const handleSubmitAnswersGeneral = (question: string, answer: string) => {
    if (!answersGeneral.includes({ question: question, answer: answer })) {
      setAnswersGeneral([...answersGeneral, { question: question, answer: answer }]);
    }
  };

  const [answersBackyard, setAnswersBackyard] = useState<
    { question: string; answer: string }[]
  >([]);

  const [isAnsweredBackyard, setIsAnsweredBackyard] = useState<boolean[]>(questionnaire.backyard.map((question) => false));

  const [selectedBq2, setSelectedBq2] = useState<number | null>(null);
const handleBq2Change = (index: number) => {
    setSelectedBq2(index === selectedBq2 ? null : index); // Permitir deseleccionar.
  };


  const handleSubmitAnswersBackyard = (question: string, answer: string) => {
    if (!answersBackyard.includes({ question: question, answer: answer })) {
      setAnswersBackyard([...answersBackyard, { question: question, answer: answer }]);
    }
  };

  const [answersFrontyard, setAnswersFrontyard] = useState<
    { question: string; answer: string }[]
  >([]);

  const [isAnsweredFrontyard, setIsAnsweredFrontyard] = useState<boolean[]>(
    questionnaire.backyard.map((question) => false),
  );


  const [selectedFq2, setSelectedFq2] = useState<number | null>(null);

  
  const handleFq2Change = (index: number) => {
    setSelectedFq2(index === selectedFq2 ? null : index); // Permitir deseleccionar.
  };

  const handleSubmitAnswersFrontyard = (question: string, answer: string) => {
    if (!answersFrontyard.includes({ question: question, answer: answer })) {
      setAnswersFrontyard([...answersFrontyard, { question: question, answer: answer }]);
    }
  };


  const [answersExtra, setAnswersExtra] = useState<
    { question: string; answer: string }[]
  >([]);

  const [isAnsweredExtra, setIsAnsweredExtra] = useState<boolean[]>(
    questionnaire.backyard.map((question) => false),
  );

  const handleSubmitAnswersExtra = (question: string, answer: string) => {
    if (!answersExtra.includes({ question: question, answer: answer })) {
      setAnswersExtra([...answersExtra, { question: question, answer: answer }]);
    }
  };

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      setCategories((prevCategories) => [
        ...prevCategories,
        ...project.questionnaire.category.map((category) => category.type).filter(
          (type) => !prevCategories.includes(type)
        ),
      ]);
    }
    console.log("categories: ", categories);
  }, [project]);

  return (
    <div className='flex flex-col bg-purple-400-300 gap-12 relative transition-all duration-300'>
      {
        showProgress && (<div className="flex fixed bg-black/70 hover:bg-black/85 transition-colors duration-300 rounded-lg z-[100] left-[5%] top-[50px] w-[90%] ">
          <QuestionnaireProgress
            categories={categories}
            answersGeneral={answersGeneral}
            isAnsweredGeneral={isAnsweredGeneral}
            answersBackyard={answersBackyard}
            isAnsweredBackyard={isAnsweredBackyard}
            answersFrontyard={answersFrontyard}
            isAnsweredFrontyard={isAnsweredFrontyard}
            answersExtra={answersExtra}
            isAnsweredExtra={isAnsweredExtra}
          />
        </div>
        )
      }
      <QuestionnaireGeneral
        project={project}
        answersGeneral={answersGeneral}
        selectedMaxTwoGeneral={selectedMaxTwoGeneral}
        handleMaxTwoGeneral={handleMaxTwoGeneral}
        isAnsweredGeneral={isAnsweredGeneral}
        setIsAnsweredGeneral={setIsAnsweredGeneral}
        handleSubmitAnswersGeneral={handleSubmitAnswersGeneral}
      />
      {
        (categories.includes("Backyard")) && (
          <QuestionnaireBackyard
            isAnsweredGeneral={isAnsweredGeneral}
            answersBackyard={answersBackyard}
            isAnsweredBackyard={isAnsweredBackyard}
            setIsAnsweredBackyard={setIsAnsweredBackyard}
            selectedBq2={selectedBq2}
            handleBq2Change={handleBq2Change}
            handleSubmitAnswersBackyard={handleSubmitAnswersBackyard}
          />
        )
      }
      {
        (categories.includes("Frontyard")) && (
          <QuestionnaireFrontyard
            categories={categories}
            isAnsweredGeneral={isAnsweredGeneral}
            isAnsweredBackyard={isAnsweredBackyard}
            answersFrontyard={answersFrontyard}
            isAnsweredFrontyard={isAnsweredFrontyard}
            setIsAnsweredFrontyard={setIsAnsweredFrontyard}
            selectedFq2={selectedFq2}
            handleFq2Change={handleFq2Change}
            handleSubmitAnswersFrontyard={handleSubmitAnswersFrontyard}
          />
        )
      }
      <QuestionnaireExtra
        categories={categories}
        isAnsweredGeneral={isAnsweredGeneral}
        isAnsweredBackyard={isAnsweredBackyard}
        isAnsweredFrontyard={isAnsweredFrontyard}
        answersExtra={answersExtra}
        isAnsweredExtra={isAnsweredExtra}
        setIsAnsweredExtra={setIsAnsweredExtra}
        handleSubmitAnswersExtra={handleSubmitAnswersExtra}
      />
      <QuestionnaireMedia isAnsweredExtra={isAnsweredExtra} />
    </div>
  );
};

export default QuestionnaireManager;
