"use client";

import React, { use, useEffect, useState } from "react";
import QuestionnaireGeneral from "./QuestionnaireGeneral";
import QuestionnaireBackyard from "./QuestionnaireBackyard";
import QuestionnaireFrontyard from "./QuestionnaireFrontyard";
import QuestionnaireExtra from "./QuestionnaireExtra";
import QuestionnaireMedia from "./QuestionnaireMedia";

import { questionnaire } from "../questionnaireFile";

const QuestionnaireManager: React.FC = () => {
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

  return (
    <div className='flex flex-col bgblue-300 gap-12'>
      <QuestionnaireGeneral
        answersGeneral={answersGeneral}
        selectedMaxTwoGeneral={selectedMaxTwoGeneral}
        handleMaxTwoGeneral={handleMaxTwoGeneral}
        isAnsweredGeneral={isAnsweredGeneral}
        setIsAnsweredGeneral={setIsAnsweredGeneral}
        handleSubmitAnswersGeneral={handleSubmitAnswersGeneral}
      />
      <QuestionnaireBackyard
        isAnsweredGeneral={isAnsweredGeneral}
        answersBackyard={answersBackyard}
        isAnsweredBackyard={isAnsweredBackyard}
        setIsAnsweredBackyard={setIsAnsweredBackyard}
        handleSubmitAnswersBackyard={handleSubmitAnswersBackyard}
      />
      <QuestionnaireFrontyard
        isAnsweredGeneral={isAnsweredGeneral}
        isAnsweredBackyard={isAnsweredBackyard}
        answersFrontyard={answersFrontyard}
        isAnsweredFrontyard={isAnsweredFrontyard}
        setIsAnsweredFrontyard={setIsAnsweredFrontyard}
        handleSubmitAnswersFrontyard={handleSubmitAnswersFrontyard}
      />
      <QuestionnaireExtra
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
