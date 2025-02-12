"use client";

import React, { use, useEffect, useState } from "react";
import QuestionnaireGeneral from "./QuestionnaireGeneral";
import QuestionnaireBackyard from "./QuestionnaireBackyard";
import QuestionnaireFrontyard from "./QuestionnaireFrontyard";
import QuestionnaireExtra from "./QuestionnaireExtra";

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

  const [selectedMaxTwoBackyard, setSelectedMaxTwoBackyard] = useState<number[]>([]);

  const handleMaxTwoBackyard = (index: number) => {
    if (selectedMaxTwoBackyard.includes(index)) {
      // Si el índice ya está seleccionado, lo eliminamos
      setSelectedMaxTwoBackyard(
        selectedMaxTwoBackyard.filter((option) => option !== index),
      );
    } else if (selectedMaxTwoBackyard.length < 2) {
      // Si aún no hay dos seleccionados, agregamos el índice
      setSelectedMaxTwoBackyard([...selectedMaxTwoBackyard, index]);
    }
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

  const [selectedMaxTwoFrontyard, setSelectedMaxTwoFrontyard] = useState<number[]>([]);

  const handleMaxTwoFrontyard = (index: number) => {
    if (selectedMaxTwoFrontyard.includes(index)) {
      // Si el índice ya está seleccionado, lo eliminamos
      setSelectedMaxTwoFrontyard(
        selectedMaxTwoFrontyard.filter((option) => option !== index),
      );
    } else if (selectedMaxTwoFrontyard.length < 2) {
      // Si aún no hay dos seleccionados, agregamos el índice
      setSelectedMaxTwoFrontyard([...selectedMaxTwoFrontyard, index]);
    }
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

  return (
    <div className='flex flex-col bgblue-300'>
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
        selectedMaxTwoBackyard={selectedMaxTwoBackyard}
        handleMaxTwoBackyard={handleMaxTwoBackyard}
        handleSubmitAnswersBackyard={handleSubmitAnswersBackyard}
      />
      {/* <QuestionnaireFrontyard
        isAnsweredGeneral={isAnsweredGeneral}
        isAnsweredBackyard={isAnsweredBackyard}
        answersFrontyard={answersFrontyard}
        isAnsweredFrontyard={isAnsweredFrontyard}
        setIsAnsweredFrontyard={setIsAnsweredFrontyard}
        selectedMaxTwoFrontyard={selectedMaxTwoFrontyard}
        handleMaxTwoFrontyard={handleMaxTwoFrontyard}
        handleSubmitAnswersFrontyard={handleSubmitAnswersFrontyard}
      /> */}
      {/* <QuestionnaireExtra
        isAnsweredGeneral={isAnsweredGeneral}
        isAnsweredBackyard={isAnsweredBackyard}
        isAnsweredFrontyard={isAnsweredFrontyard}
        answersExtra={answersExtra}
        setAnswersExtra={setAnswersExtra}
        isAnsweredExtra={isAnsweredExtra}
        setIsAnsweredExtra={setIsAnsweredExtra}
        handleSubmitAnswersExtra={handleSubmitAnswersExtra}
      /> */}
    </div>
  );
};

export default QuestionnaireManager;
