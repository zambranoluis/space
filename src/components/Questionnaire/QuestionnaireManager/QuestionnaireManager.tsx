"use client";

import React, { useEffect, useState, useRef } from "react";
import QuestionnaireGeneral from "./QuestionnaireGeneral";
import QuestionnaireBackyard from "./QuestionnaireBackyard";
import QuestionnaireFrontyard from "./QuestionnaireFrontyard";
import QuestionnaireExtra from "./QuestionnaireExtra";
import QuestionnaireMedia from "./QuestionnaireMedia";
import QuestionnaireProgress from "@/components/QuestionnaireProgress";

import { questionnaire } from "../questionnaireFile";

import {
  ProjectInformation,
  question,
  createQuestionnaires,
} from "@/utils/dataInterfaces";

import { apiService } from "@/services/apiService";

interface QuestionnaireManagerProps {
  showProgress: boolean;
  project: ProjectInformation | null;
}

const QuestionnaireManager: React.FC<QuestionnaireManagerProps> = ({
  showProgress,
  project,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  //Mostrar proyecto y extraer categorias
  useEffect(() => {
    if (project) {
      // console.log("project en questionnaire manager: ", project);
      setCategories((prevCategories) => [
        ...prevCategories,
        ...project.questionnaire.category
          .map((category) => category.type)
          .filter((type) => !prevCategories.includes(type)),
      ]);
      // console.log("categories: ", categories);
    }
  }, [project]);

  useEffect(() => {
    console.log("project en questionnaire manager: ", project);
  }, [project]);

  // Obtener datos de cuestionario segun proyecto
  const [questionnaireData, setQuestionnaireData] = useState<question[]>([]);

  useEffect(() => {
    const fetchQuestionnaireData = async () => {
      if (project) {
        try {
          const response = await apiService.getQuestionnaireById(
            project?.questionnaire._id,
          );
          console.log("response de getQuestionnaireById: ", response);
          setQuestionnaireData(response.questionnaire.questions);
          // console.log("questionnaireData: ", questionnaireData);
        } catch (error) {
          console.log("Error al obtener los datos del questionnaire:", error);
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
    questionnaire.general.map((_, index) => (index === 0 ? true : false)),
  );

  const [isAnsweredBackyard, setIsAnsweredBackyard] = useState<boolean[]>(
    questionnaire.backyard.map((_, index) => false),
  );

  const [isAnsweredFrontyard, setIsAnsweredFrontyard] = useState<boolean[]>(
    questionnaire.backyard.map((_, index) => false),
  );

  const [isAnsweredExtra, setIsAnsweredExtra] = useState<boolean[]>(
    questionnaire.extra.map((_, index) => false),
  );

  useEffect(() => {
    setIsAnsweredGeneral((prev) => {
      const updatedIsAnsweredGeneral = questionnaire.general.map((questionObj, index) =>
        index === 0
          ? true
          : answersGeneral.some(
              (answerObj) => answerObj.quest === questionObj.title.replace("?", ""),
            ),
      );

      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredGeneral)
        ? updatedIsAnsweredGeneral
        : prev;
    });
  }, [answersGeneral, questionnaire.general]);

  useEffect(() => {
    setIsAnsweredBackyard((prev) => {
      const updatedIsAnsweredBackyard = questionnaire.backyard.map((questionObj) =>
        answersBackyard.some(
          (answerObj) =>
            answerObj.quest === questionObj.title.replace("?", "").replace(",", ""),
        ),
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredBackyard)
        ? updatedIsAnsweredBackyard
        : prev;
    });
  }, [answersBackyard, questionnaire.backyard]);

  useEffect(() => {
    setIsAnsweredFrontyard((prev) => {
      const updatedIsAnsweredFrontyard = questionnaire.backyard.map((questionObj) =>
        answersFrontyard.some(
          (answerObj) =>
            answerObj.quest === questionObj.title.replace("?", "").replace(",", ""),
        ),
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredFrontyard)
        ? updatedIsAnsweredFrontyard
        : prev;
    });
  }, [answersFrontyard, questionnaire.backyard]);

  useEffect(() => {
    setIsAnsweredExtra((prev) => {
      const updatedIsAnsweredExtra = questionnaire.extra.map((questionObj) =>
        answersExtra.some(
          (answerObj) => answerObj.quest === questionObj.title.replace("?", ""),
        ),
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredExtra)
        ? updatedIsAnsweredExtra
        : prev;
    });
  }, [answersExtra, questionnaire.extra]);

  useEffect(() => {
    console.log(
      "isAnsweredGeneral actualizado segun su propio valor: ",
      isAnsweredGeneral,
    );
  }, [isAnsweredGeneral]);

  useEffect(() => {
    console.log(
      "isAnsweredBackyard actualizado segun su propio valor: ",
      isAnsweredBackyard,
    );
  }, [isAnsweredBackyard]);

  useEffect(() => {
    console.log(
      "isAnsweredFrontyard actualizado segun su propio valor: ",
      isAnsweredFrontyard,
    );
  }, [isAnsweredFrontyard]);

  useEffect(() => {
    console.log("isAnsweredExtra actualizado segun su propio valor: ", isAnsweredExtra);
  }, [isAnsweredExtra]);

  const [selectedMaxTwoGeneral, setSelectedMaxTwoGeneral] = useState<number[]>([]);

  useEffect(() => {
    console.log("XXX UE GQ2")
    if (answersGeneral[0]) {
      console.log("XXX UE GQ2 EXISTE")
      const styles = Array.from(document.getElementsByClassName("gq2Styles")) as HTMLElement[];
      const stylesText = styles.map((style) => style.textContent.replace("▪ ", ""));
      console.log("stylesText: ", stylesText);
      const selectedIndices: number[] = [];
      answersGeneral[0].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        stylesText.forEach((style, indexStyle) => {
          console.log("style: ", indexStyle, " - ", style);
          if (style === selected.selected) {
            console.log("estilo conseguido: ", style);
            selectedIndices.push(indexStyle);
          }
        });
      });
      setSelectedMaxTwoGeneral(selectedIndices.slice(0, 2));
    }
  }, [answersGeneral[0]]);

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
  useEffect(() => {
    if (answersBackyard[1]) {
      console.log("XXX UE BQ2")
      const plants = Array.from(document.getElementsByClassName("bq2Plants")) as HTMLElement[];
      const plantsText = plants.map((plant) => plant.textContent);
      console.log("plantsText: ", plantsText);
      const selectedIndices: number[] = [];
      answersBackyard[1].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        plantsText.forEach((plant, indexPlant) => {
          console.log("plant: ", indexPlant, " - ", plant);
          if (plant === selected.selected) {
            console.log("plant conseguido: ", plant);
            selectedIndices.push(indexPlant);
          }
        });
      });
      setSelectedBq2(selectedIndices[0]);
    }
  }, [answersBackyard[1]])


  const handleBq2Change = (index: number) => {
    setSelectedBq2(index === selectedBq2 ? null : index); // Permitir deseleccionar.
  };

  const [selectedFq2, setSelectedFq2] = useState<number | null>(null);
  useEffect(() => {
    if (answersFrontyard[1]) {
      console.log("XXX UE FQ2")
      const plants = Array.from(document.getElementsByClassName("fq2Plants")) as HTMLElement[];
      const plantsText = plants.map((plant) => plant.textContent);
      console.log("plantsText: ", plantsText);
      const selectedIndices: number[] = [];
      answersFrontyard[1].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        plantsText.forEach((plant, indexPlant) => {
          console.log("plant: ", indexPlant, " - ", plant);
          if (plant === selected.selected) {
            console.log("plant conseguido: ", plant);
            selectedIndices.push(indexPlant);
          }
        });
      });
      setSelectedFq2(selectedIndices[0]);
    }
  }, [answersFrontyard[1]])
  const handleFq2Change = (index: number) => {
    setSelectedFq2(index === selectedFq2 ? null : index); // Permitir deseleccionar.
  };

  

  const [selectedWaterBackyard, setSelectedWaterBackyard] = useState<number[]>([]);
  useEffect(() => {
    if (answersBackyard[4]) {
      console.log("XXX UE Water Front")
      const water = Array.from(document.getElementsByClassName("bq5WaterOption")) as HTMLElement[];
      const waterText = water.map((w) => w.textContent?.replace("▪ ", ""));
      console.log("waterText: ", waterText);
      const selectedIndices: number[] = [];
      answersBackyard[4].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        waterText.forEach((water, indexWater) => {
          console.log("water: ", indexWater, " - ", water);
          if (water === selected.selected) {
            console.log("water conseguido: ", water);
            selectedIndices.push(indexWater);
          }
        });
      });
      setSelectedWaterBackyard(selectedIndices);
      // console.log("indices seleccionados para water: ", selectedWaterBackyard);
    }
  }, [answersBackyard[4]])

  const [selectedFireBackyard, setSelectedFireBackyard] = useState<number[]>([]);
  useEffect(() => {
    if (answersBackyard[5]) {
      console.log("XXX UE Fire Front")
      const fire = Array.from(document.getElementsByClassName("bq6FireOption")) as HTMLElement[];
      const fireText = fire.map((f) => f.textContent?.replace("▪ ", ""));
      console.log("fireText: ", fireText);
      const selectedIndices: number[] = [];
      answersBackyard[5].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        fireText.forEach((fire, indexFire) => {
          console.log("water: ", indexFire, " - ", fire);
          if (fire === selected.selected) {
            console.log("water conseguido: ", fire);
            selectedIndices.push(indexFire);
          }
        });
      });
      setSelectedFireBackyard(selectedIndices);
      // console.log("indices seleccionados para water: ", selectedWaterBackyard);
    }
  }, [answersBackyard[5]])


  const [selectedWaterFrontyard, setSelectedWaterFrontyard] = useState<number[]>([]);
  

  useEffect(() => {
    if (answersFrontyard[4]) {
      console.log("XXX UE Water Front")
      const water = Array.from(document.getElementsByClassName("fq5WaterOption")) as HTMLElement[];
      const waterText = water.map((w) => w.textContent?.replace("▪ ", ""));
      console.log("waterText: ", waterText);
      const selectedIndices: number[] = [];
      answersFrontyard[4].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        waterText.forEach((water, indexWater) => {
          console.log("water: ", indexWater, " - ", water);
          if (water === selected.selected) {
            console.log("water conseguido: ", water);
            selectedIndices.push(indexWater);
          }
        });
      });
      setSelectedWaterFrontyard(selectedIndices);
      // console.log("indices seleccionados para water: ", selectedWaterFrontyard);
    }
  }, [answersFrontyard[4]])

  const [selectedFireFrontyard, setSelectedFireFrontyard] = useState<number[]>([]);
  useEffect(() => {
    if (answersFrontyard[5]) {
      console.log("XXX UE Fire Front")
      const fire = Array.from(document.getElementsByClassName("fq6FireOption")) as HTMLElement[];
      const fireText = fire.map((f) => f.textContent?.replace("▪ ", ""));
      console.log("fireText: ", fireText);
      const selectedIndices: number[] = [];
      answersFrontyard[5].selecteds.forEach((selected, index) => {
        console.log("selected: ", index, " - ",  selected);
        fireText.forEach((fire, indexFire) => {
          console.log("water: ", indexFire, " - ", fire);
          if (fire === selected.selected) {
            console.log("water conseguido: ", fire);
            selectedIndices.push(indexFire);
          }
        });
      });
      setSelectedFireFrontyard(selectedIndices);
      // console.log("indices seleccionados para water: ", selectedWaterFrontyard);
    }
  }, [answersFrontyard[5]])

  


  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmitAnswers = (
    question: string,
    typeQuestion: string,
    categoryQuestion: string,
    htmlElements: string,
  ) => {
    console.log("1. Pregunta accionada:", question);
    console.log("2. Tipo de pregunta:", typeQuestion);
    console.log("3. verificando duplicado...");

    const isDuplicate = answersGeneral.some(
      (answer) => answer.quest === question && answer.category === categoryQuestion,
    );

    if (isDuplicate) {
      console.log("4. La pregunta ya ha sido respondida.");
      return;
    }

    console.log("4. Pregunta no duplicada. Creando nueva pregunta...");

    switch (typeQuestion) {

      case "Styles General Question":
        console.log("5. Question type: ", typeQuestion);
        const styles = document.getElementsByClassName(`${htmlElements}Styles`);
        const inputNote = document.getElementById(`${htmlElements}Input`);
        const inputNoteText = inputNote?.value;
        console.log("styles: ", styles);
        console.log("inputNoteText: ", inputNoteText);

        // Generar el array de `selecteds` asegurando el tipo correcto
        const selectedsArray: { selected: string }[] = selectedMaxTwoGeneral
          .map((index) => ({
            selected: styles[index]?.textContent?.replace("▪ ", "") || "",
          }))
          .filter((item) => item.selected.trim() !== ""); // Filtrar valores vacíos

        // Validar que haya al menos un estilo seleccionado
        if (selectedsArray.length === 0) {
          setSubmitError("Please select at least 1 style.");
          console.log("No se ha seleccionado ningun estilo.");
          return;
        }

        console.log("✅ Selected styles: ", selectedsArray);

        const newAnswer: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: inputNoteText }],
          selecteds: selectedsArray,
          select: false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswer);
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
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };

        submitNewAnswer();
        break;

      case "Yes or No Question":
        console.log("5. Question type: ", typeQuestion);
        const selection = document.getElementById(htmlElements);
        console.log("select html element: ", selection);
        const selectedText = selection.options[selection.selectedIndex].text;
        console.log(selectedText); // Devuelve "No" o "Yes"

        const newAnswerYesOrNo: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: selectedText }],
          selecteds: [{ selected: "" }],
          select: selectedText === "Yes" ? true : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswerYesOrNo);
        const submitNewAnswerYesOrNo = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerYesOrNo);
            console.log("✅ Respuesta de la creación de pregunta:", response);
            if (response) {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };

        submitNewAnswerYesOrNo();
        break;

      case "Yes or No With Note Question":
        console.log("5.  Question type: ", typeQuestion);
        const selectionWithNote = document.getElementById(`${htmlElements}Select`);
        const noteElement = document.getElementById(`${htmlElements}Note`);
        console.log("Select html element: ", selectionWithNote);
        console.log("Note html element: ", noteElement);
        const selectedTextWithNote: string =
          selectionWithNote.options[selectionWithNote.selectedIndex].text;
        console.log("selectedTextWithNote: ", selectedTextWithNote);
        const noteText: string = noteElement.value;
        console.log("noteText: ", noteText);

        const newAnswerYesOrNoWithNote: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: selectedTextWithNote }, { note: noteText }],
          selecteds: [{ selected: "" }],
          select:
            selectedTextWithNote === "Colorful Plants" || selectedTextWithNote === "Yes"
              ? true
              : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswerYesOrNoWithNote);
        const submitNewAnswerYesOrNoWithNote = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerYesOrNoWithNote);
            console.log("✅ Respuesta de la creación de pregunta:", response);
            if (response) {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };
        submitNewAnswerYesOrNoWithNote();
        break;

      case "How Many Plants Question":
        console.log("5. Question type: ", typeQuestion);
        const optionsPlants = document.getElementsByClassName(`${htmlElements}Plants`);
        console.log("optionsPlants: ", optionsPlants);
        console.log("selectedFq2: ", selectedFq2);
        if (categoryQuestion === "Frontyard" && selectedFq2 !== null) {
          const selectedTextPlants = optionsPlants[selectedFq2].textContent;
          console.log("selectedTextPlants: ", selectedTextPlants);

          const newAnswerHowManyPlants: question = {
            quest: question,
            category: categoryQuestion,
            notes: [{ note: "" }],
            selecteds: [{ selected: selectedTextPlants }],
            select: false,
            people: 0,
            files: [],
            questionnaireId: project?.questionnaire._id,
          };

          console.log("6. Pregunta a agregar: ", newAnswerHowManyPlants);
          const submitNewAnswerHowManyPlants = async () => {
            try {
              const response = await apiService.createQuestion(newAnswerHowManyPlants);
              console.log("✅ Respuesta de la creación de pregunta:", response);
              if (response) {
                switch (categoryQuestion) {
                  case "General":
                    setAnswersGeneral((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  case "Backyard":
                    setAnswersBackyard((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  case "Frontyard":
                    setAnswersFrontyard((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  case "Extra":
                    setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                    break;
                  default:
                    break;
                }
              }
            } catch (error) {
              console.log("❌ Error al crear la pregunta:", error);
            }
          };
          submitNewAnswerHowManyPlants();
        } else if (categoryQuestion === "Backyard" && selectedBq2 !== null) {
          const selectedTextPlants = optionsPlants[selectedBq2].textContent;
          console.log("selectedTextPlants: ", selectedTextPlants);

          const newAnswerHowManyPlants: question = {
            quest: question,
            category: categoryQuestion,
            notes: [{ note: "" }],
            selecteds: [{ selected: selectedTextPlants }],
            select: false,
            people: 0,
            files: [],
            questionnaireId: project?.questionnaire._id,
          };

          console.log("6. Pregunta a agregar: ", newAnswerHowManyPlants);
          const submitNewAnswerHowManyPlants = async () => {
            try {
              const response = await apiService.createQuestion(newAnswerHowManyPlants);
              console.log("✅ Respuesta de la creación de pregunta:", response);
              if (response) {
                switch (categoryQuestion) {
                  case "General":
                    setAnswersGeneral((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  case "Backyard":
                    setAnswersBackyard((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  case "Frontyard":
                    setAnswersFrontyard((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  case "Extra":
                    setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                    break;
                  default:
                    break;
                }
              }
            } catch (error) {
              console.log("❌ Error al crear la pregunta:", error);
            }
          };
          submitNewAnswerHowManyPlants();
        } else {
          console.log("por favor seleccionar al menos una cantidad");
        }
        break;

      case "Things to Keep or Remove Question":
        console.log("5. Question type: ", typeQuestion);
        const thingsBoxes = document.getElementsByClassName(
          `${htmlElements}ThingsKeepRemove`,
        );
        console.log("things Boxes: ", thingsBoxes);
        const thingsBoxesText = Array.from(thingsBoxes).map((box) => box.value);
        console.log("thingsBoxesText: ", thingsBoxesText);

        const newAnswerThingsKeepRemove: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: `${thingsBoxesText[0]}` }, { note: `${thingsBoxesText[1]}` }],
          selecteds: [{ selected: "" }],
          select: false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswerThingsKeepRemove);

        const submitNewAnswerThingsKeepRemove = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerThingsKeepRemove);
            console.log("✅ Respuesta de la creación de pregunta:", response);
            if (response) {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };
        submitNewAnswerThingsKeepRemove();
        break;

      case "Water Feature Question":
        console.log("5. Question type: ", typeQuestion);
        const waterSelect = document.getElementById(`${htmlElements}Select`);
        const waterFeatures = document.getElementsByClassName(
          `${htmlElements}WaterOption`,
        );
        const waterChecks = document.getElementsByClassName(
          `${htmlElements}WaterCheckbox`,
        );
        const waterNote = document.getElementById(`${htmlElements}Note`);

        console.log("waterSelect: ", waterSelect);
        const waterSelectText = waterSelect.options[waterSelect.selectedIndex].text;
        console.log("waterSelectText: ", waterSelectText);
        console.log("waterFeatures: ", waterFeatures);
        console.log("waterChecks: ", waterChecks);
        console.log("waterNote: ", waterNote);
        const waterNoteText = waterNote.value;
        console.log("waterNoteText: ", waterNoteText);

        const selectedWaterFeatures = Array.from(waterChecks)
          .map((check, index) =>
            check.checked ? waterFeatures[index]?.textContent.replace("▪ ", "") : null,
          ) // Tomar solo los seleccionados
          .filter((feature) => feature !== null); // Eliminar los valores nulos

        console.log("selectedWaterFeatures: ", selectedWaterFeatures);

        const formatSelectedWaterFeatures = selectedWaterFeatures.map((feature) => ({
          selected: feature,
        }));

        console.log(formatSelectedWaterFeatures);

        const newAnswerWaterFeature: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: waterNoteText }],
          selecteds: formatSelectedWaterFeatures,
          select: waterSelectText === "Yes" ? true : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswerWaterFeature);

        const submitNewAnswerWaterFeature = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerWaterFeature);
            console.log("✅ Respuesta de la creación de pregunta:", response);
            if (response) {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };
        submitNewAnswerWaterFeature();
        break;

      case "Fire Feature Question":
        console.log("5. Question type: ", typeQuestion);
        const fireSelect = document.getElementById(`${htmlElements}FireSelect`);
        const fireFeatures = document.getElementsByClassName(`${htmlElements}FireOption`);
        const fireChecks = document.getElementsByClassName(`${htmlElements}FireCheckbox`);
        const firePeople = document.getElementById(`${htmlElements}FirePeople`);
        const fireNote = document.getElementById(`${htmlElements}FireNote`);

        console.log("fireSelect: ", fireSelect);
        const fireSelectText = fireSelect.options[fireSelect.selectedIndex].text;
        console.log("fireSelectText: ", fireSelectText);
        console.log("fireFeatures: ", fireFeatures);
        console.log("fireChecks: ", fireChecks);
        console.log("firePeople:", firePeople);
        const firePeopleNumber = firePeople.value;
        console.log("firePeopleNumber: ", firePeopleNumber);
        console.log("fireNote: ", fireNote);
        const fireNoteText = fireNote.value;
        console.log("fireNoteText: ", fireNoteText);

        const selectedFireFeatures = Array.from(fireChecks)
          .map((check, index) =>
            check.checked ? fireFeatures[index]?.textContent.replace("▪ ", "") : null,
          ) // Tomar solo los seleccionados
          .filter((feature) => feature !== null);

        console.log("selectedFireFeatures: ", selectedFireFeatures);

        const formatSelectedFireFeatures = selectedFireFeatures.map((feature) => ({
          selected: feature,
        }));

        console.log("formatSelectedFeatures: ", formatSelectedFireFeatures);

        const newAnswerFireFeature: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: fireNoteText }],
          selecteds: formatSelectedFireFeatures,
          select: fireSelectText === "Yes" ? true : false,
          people: firePeopleNumber,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswerFireFeature);

        const submitNewAnswerFireFeature = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerFireFeature);
            console.log("✅ Respuesta de la creación de pregunta:", response);
            if (response) {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };
        submitNewAnswerFireFeature();
        break;

      case "Note Question":
        console.log("5. Question type: ", typeQuestion);
        const note = document.getElementById(`${htmlElements}Note`);
        const noteContain = note.value;
        console.log("note: ", note, "contain: ", noteContain);

        const newAnswerOnlyNote: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: noteContain }],
          selecteds: [{ selected: "" }],
          select: false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("6. Pregunta a agregar: ", newAnswerOnlyNote);

        const submitNewAnswerOnlyNote = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerOnlyNote);
            console.log("✅ Respuesta de la creación de pregunta:", response);
            if (response) {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) => [...prevAnswers, response.question]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {
            console.log("❌ Error al crear la pregunta:", error);
          }
        };
        submitNewAnswerOnlyNote();
        break;

      default:
        break;

    }
  };

  return (
    <div className='flex flex-col bg-purple-400-300 gap-12 relative transition-all duration-300 w-full'>
      {showProgress && (
        <div className='flex fixed bg-black/70 hover:bg-black/85 transition-colors duration-300 rounded-lg z-[100] left-[5%] top-[50px] w-[90%] '>
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
      )}
      <QuestionnaireGeneral
        project={project}
        selectedMaxTwoGeneral={selectedMaxTwoGeneral}
        handleMaxTwoGeneral={handleMaxTwoGeneral}
        answersGeneral={answersGeneral}
        isAnsweredGeneral={isAnsweredGeneral}
        handleSubmitAnswers={handleSubmitAnswers}
      />
      {categories.includes("Backyard") && (
        <QuestionnaireBackyard
          answersBackyard={answersBackyard}
          isAnsweredGeneral={isAnsweredGeneral}
          isAnsweredBackyard={isAnsweredBackyard}
          setIsAnsweredBackyard={setIsAnsweredBackyard}
          selectedBq2={selectedBq2}
          handleBq2Change={handleBq2Change}
          selectedWaterBackyard={selectedWaterBackyard}
          setSelectedWaterBackyard={setSelectedWaterBackyard}
          selectedFireBackyard={selectedFireBackyard}
          setSelectedFireBackyard={setSelectedFireBackyard}
          handleSubmitAnswers={handleSubmitAnswers}
        />
      )}
      {categories.includes("Frontyard") && (
        <QuestionnaireFrontyard
          categories={categories}
          answersFrontyard={answersFrontyard}
          isAnsweredGeneral={isAnsweredGeneral}
          isAnsweredBackyard={isAnsweredBackyard}
          isAnsweredFrontyard={isAnsweredFrontyard}
          selectedFq2={selectedFq2}
          handleFq2Change={handleFq2Change}
          selectedWaterFrontyard={selectedWaterFrontyard}
          setSelectedWaterFrontyard={setSelectedWaterFrontyard}
          selectedFireFrontyard={selectedFireFrontyard}
          setSelectedFireFrontyard={setSelectedFireFrontyard}
          handleSubmitAnswers={handleSubmitAnswers}
        />
      )}
      <QuestionnaireExtra
        categories={categories}
        answersExtra={answersExtra}
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
