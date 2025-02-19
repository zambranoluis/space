"use client";

import React, { useEffect, useState, useRef } from "react";
import QuestionnaireGeneral from "./QuestionnaireGeneral";
import QuestionnaireBackyard from "./QuestionnaireBackyard";
import QuestionnaireFrontyard from "./QuestionnaireFrontyard";
import QuestionnaireExtra from "./QuestionnaireExtra";
import QuestionnaireMedia from "./QuestionnaireMedia";
import QuestionnaireProgress from "@/components/QuestionnaireProgress";

import { questionnaire } from "../questionnaireFile";

import { ProjectInformation, question, createQuestionnaires } from "@/utils/dataInterfaces";

import { apiService } from "@/services/apiService";

interface QuestionnaireManagerProps {
  showProgress: boolean;
  project: ProjectInformation | null

}

const QuestionnaireManager: React.FC<QuestionnaireManagerProps> = ({
  showProgress,
  project
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  //Mostrar proyecto y extraer categorias
  useEffect(() => {
    if (project) {
      // console.log("project en questionnaire manager: ", project);
      setCategories((prevCategories) => [
        ...prevCategories,
        ...project.questionnaire.category.map((category) => category.type).filter(
          (type) => !prevCategories.includes(type)
        ),
      ]);
      // console.log("categories: ", categories);
    }
  }, [project]);

  
  // Obtener datos de cuestionario segun proyecto
  const [questionnaireData, setQuestionnaireData] = useState<question[]>([]);

  useEffect(() => {
    const fetchQuestionnaireData = async () => {
      if (project){
        try {
          const response = await apiService.getQuestionnaireById(project?.questionnaire._id);
          console.log("response de getQuestionnaireById: ", response);
          setQuestionnaireData(response.questionnaire.questions);
          // console.log("questionnaireData: ", questionnaireData);

        } catch (error) {
          console.error("Error al obtener los datos del questionnaire:", error);
        }
      }
    };
    fetchQuestionnaireData();
  }, [project?.questionnaire._id]);


  // Extraer preguntas por categorias
  const [answersGeneral, setAnswersGeneral] = useState<question[]>([]);
  const [answersBackyard, setAnswersBackyard] = useState<question[]>([]);
  const [answersFrontyard, setAnswersFrontyard] = useState<question[]>([]);
  const [answersExtra, setAnswersExtra] = useState<question[]>([]);

  useEffect(() => {
    console.log("questionnaireData para ser desglosado: ", questionnaireData);
  
    if (questionnaireData.length > 0) {
      const generalQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "General")
        .map((question) => question.question);
  
      console.log("todas las preguntas de General: ", generalQuestions);
  
      setAnswersGeneral(generalQuestions);

      const backyardQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "Backyard")
        .map((question) => question.question);
  
      console.log("todas las preguntas de Backyard: ", backyardQuestions);
  
      setAnswersBackyard(backyardQuestions);

      const frontyardQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "Frontyard")
        .map((question) => question.question);
  
      console.log("todas las preguntas de Frontyard: ", frontyardQuestions);
  
      setAnswersFrontyard(frontyardQuestions);

      const extraQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "Extra")
        .map((question) => question.question);
  
      console.log("todas las preguntas de Extra: ", extraQuestions);
  
      setAnswersExtra(extraQuestions);

    }
  }, [questionnaireData]);

  useEffect(() => {
    console.log("answersGeneral actualizado segun su propio valor: ", answersGeneral);
  }, [answersGeneral]);
  useEffect(() => {
    console.log("answersBackyard actualizado segun su propio valor: ", answersBackyard);
  }, [answersBackyard]);
  useEffect(() => {
    console.log("answersFrontyard actualizado segun su propio valor: ", answersFrontyard);
  }, [answersFrontyard]);
  useEffect(() => {
    console.log("answersExtra actualizado segun su propio valor: ", answersExtra);
  }, [answersExtra]);


  // Definir que respuestas estan respondidas

  const [isAnsweredGeneral, setIsAnsweredGeneral] = useState<boolean[]>(
    questionnaire.general.map((_, index) => index === 0 ? true : false)
  );

  const [isAnsweredBackyard, setIsAnsweredBackyard] = useState<boolean[]>(
    questionnaire.backyard.map((_, index) => false)
  );

  const [isAnsweredFrontyard, setIsAnsweredFrontyard] = useState<boolean[]>(
    questionnaire.backyard.map((_, index) => false)
  );

  const [isAnsweredExtra, setIsAnsweredExtra] = useState<boolean[]>(
    questionnaire.extra.map((_, index) => false)
  );

  useEffect(() => {
    setIsAnsweredGeneral((prev) => {
      const updatedIsAnsweredGeneral = questionnaire.general.map((questionObj, index) =>
        index === 0 ? true : answersGeneral.some((answerObj) => answerObj.quest === questionObj.title.replace("?", ""))
      );

      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredGeneral) ? updatedIsAnsweredGeneral : prev;
    });
  }, [answersGeneral, questionnaire.general]);

  useEffect(() => {
    setIsAnsweredBackyard((prev) => {
      const updatedIsAnsweredBackyard = questionnaire.backyard.map((questionObj) =>
        answersBackyard.some((answerObj) => answerObj.quest === questionObj.title.replace("?", "").replace(",", ""))
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredBackyard) ? updatedIsAnsweredBackyard : prev;
    });
  }, [answersBackyard, questionnaire.backyard]);

  useEffect(() => {
    setIsAnsweredFrontyard((prev) => {
      const updatedIsAnsweredFrontyard = questionnaire.backyard.map((questionObj) =>
        answersFrontyard.some((answerObj) => answerObj.quest === questionObj.title.replace("?", "").replace(",", ""))
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredFrontyard) ? updatedIsAnsweredFrontyard : prev;
    });
  }, [answersFrontyard, questionnaire.backyard]);

  useEffect(() => {
    setIsAnsweredExtra((prev) => {
      const updatedIsAnsweredExtra = questionnaire.extra.map((questionObj) =>
        answersExtra.some((answerObj) => answerObj.quest === questionObj.title.replace("?", ""))
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredExtra) ? updatedIsAnsweredExtra : prev;
    });
  }, [answersExtra, questionnaire.extra]);

  useEffect(() => {
    console.log("isAnsweredGeneral actualizado segun su propio valor: ", isAnsweredGeneral);
  }, [isAnsweredGeneral]);

  useEffect(() => {
    console.log("isAnsweredBackyard actualizado segun su propio valor: ", isAnsweredBackyard);
  }, [isAnsweredBackyard]);

  useEffect(() => {
    console.log("isAnsweredFrontyard actualizado segun su propio valor: ", isAnsweredFrontyard);
  }, [isAnsweredFrontyard]);

  useEffect(() => {
    console.log("isAnsweredExtra actualizado segun su propio valor: ", isAnsweredExtra);
  }, [isAnsweredExtra]);





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

  const [selectedBq2, setSelectedBq2] = useState<number | null>(null);
const handleBq2Change = (index: number) => {
    setSelectedBq2(index === selectedBq2 ? null : index); // Permitir deseleccionar.
  };
  const [selectedFq2, setSelectedFq2] = useState<number | null>(null);

  
  const handleFq2Change = (index: number) => {
    setSelectedFq2(index === selectedFq2 ? null : index); // Permitir deseleccionar.
  };



  const [questionContainer, setQuestionContainer] = useState<question | null>(null);

  const handleSubmitAnswers = (question: string, typeQuestion: string, categoryQuestion: string) => {
    console.log("1. Pregunta accionada:", question);
    console.log("2. Tipo de pregunta:", typeQuestion);
    console.log("3. verificando duplicado...");
  
    const isDuplicate = answersGeneral.some(
      (answer) => answer.quest === question && answer.category === categoryQuestion
    );
  
    if (isDuplicate) {
      console.log("4. La pregunta ya ha sido respondida.");
      return;
    }
  
    console.log("4. Pregunta no duplicada. Creando nueva pregunta...");

    switch (typeQuestion) {
      case "Styles General Question":
  console.log("Question type: ", typeQuestion);
  const styles = document.getElementsByClassName("stylesCheckbox");
  console.log("styles: ", styles);

  // Generar el array de `selecteds` asegurando el tipo correcto
  const selectedsArray: { selected: string }[] = selectedMaxTwoGeneral
    .map((index) => ({
      selected: styles[index]?.textContent?.replace("▪ ", "") || "",
    }))
    .filter((item) => item.selected.trim() !== ""); // Filtrar valores vacíos

  // Validar que haya al menos un estilo seleccionado
  if (selectedsArray.length === 0) {
    console.log("❌ Debes seleccionar al menos un estilo.");
    return;
  }

  console.log("✅ Selected styles: ", selectedsArray);

  const newAnswer: question = {
    quest: question,
    category: categoryQuestion,
    notes: [{ note: "" }],
    selecteds: selectedsArray,
    select: false,
    people: 0,
    files: [],
    questionnaireId: project?.questionnaire._id,
  };

  console.log("5. Pregunta a agregar: ", newAnswer);
        const submitNewAnswer = async () => {
        try {
          const response = await apiService.createQuestion(newAnswer);
          console.log("✅ Respuesta de la creación de pregunta:", response);
          if (response) {
            switch (categoryQuestion) {
              case "General":
                setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                break;
              case "Backyard":
                setAnswersBackyard((prevAnswers) => [...prevAnswers, response.question]);
                break;
              case "Frontyard":
                setAnswersFrontyard((prevAnswers) => [...prevAnswers, response.question]);
                break;
              case "Extra":
                setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                break;
              default:
                break;
            }
          }
        } catch (error) {
          console.error("❌ Error al crear la pregunta:", error);
        }
      };
    
      submitNewAnswer();
    }

    // const newAnswerGeneral = {
    //   quest: question,
    //   category: categoryQuestion,
    //   notes: [{ note: "" }],
    //   selecteds: [{ selected: "" }],
    //   select: false,
    //   people: 0,
    //   files: [],
    //   questionnaireId: project?.questionnaire._id,
    // } as question;
  
    // console.log("5. Pregunta a agregar: ", newAnswerGeneral);
  
    // const submitNewAnswer = async () => {
    //   try {
    //     const response = await apiService.createQuestion(newAnswerGeneral);
    //     console.log("✅ Respuesta de la creación de pregunta:", response);
    //     if (response) {
    //       switch (categoryQuestion) {
    //         case "General":
    //           setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
    //           break;
    //         case "Backyard":
    //           setAnswersBackyard((prevAnswers) => [...prevAnswers, response.question]);
    //           break;
    //         case "Frontyard":
    //           setAnswersFrontyard((prevAnswers) => [...prevAnswers, response.question]);
    //           break;
    //         case "Extra":
    //           setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   } catch (error) {
    //     console.error("❌ Error al crear la pregunta:", error);
    //   }
    // };
  
    // submitNewAnswer();
  };



  


  return (
    <div className='flex flex-col bg-purple-400-300 gap-12 relative transition-all duration-300 w-full'>
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
        selectedMaxTwoGeneral={selectedMaxTwoGeneral}
        handleMaxTwoGeneral={handleMaxTwoGeneral}
        isAnsweredGeneral={isAnsweredGeneral}
        handleSubmitAnswers={handleSubmitAnswers}
      />
      {
        (categories.includes("Backyard")) && (
          <QuestionnaireBackyard
            isAnsweredGeneral={isAnsweredGeneral}
            isAnsweredBackyard={isAnsweredBackyard}
            setIsAnsweredBackyard={setIsAnsweredBackyard}
            selectedBq2={selectedBq2}
            handleBq2Change={handleBq2Change}
            handleSubmitAnswers={handleSubmitAnswers}
          />
        )
      }
      {
        (categories.includes("Frontyard")) && (
          <QuestionnaireFrontyard
            categories={categories}
            isAnsweredGeneral={isAnsweredGeneral}
            isAnsweredBackyard={isAnsweredBackyard}
            isAnsweredFrontyard={isAnsweredFrontyard}
            selectedFq2={selectedFq2}
            handleFq2Change={handleFq2Change}
            handleSubmitAnswers={handleSubmitAnswers}
          />
        )
      }
      <QuestionnaireExtra
        categories={categories}
        isAnsweredBackyard={isAnsweredBackyard}
        isAnsweredFrontyard={isAnsweredFrontyard}
        isAnsweredExtra={isAnsweredExtra}
        handleSubmitAnswers={handleSubmitAnswers}
      />
      <QuestionnaireMedia isAnsweredExtra={isAnsweredExtra} />
    </div>
  );
};

export default QuestionnaireManager;
