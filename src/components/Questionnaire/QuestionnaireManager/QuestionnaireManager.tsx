"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import QuestionnaireGeneral from "./QuestionnaireGeneral";
import QuestionnaireBackyard from "./QuestionnaireBackyard";
import QuestionnaireFrontyard from "./QuestionnaireFrontyard";
import QuestionnaireExtra from "./QuestionnaireExtra";
import QuestionnaireMedia from "./QuestionnaireMedia";
import QuestionnaireProgress from "@/components/Questionnaire/QuestionnaireManager/QuestionnaireProgress";

import { questionnaire } from "../questionnaireFile";
import { RiCollapseDiagonal2Line } from "react-icons/ri";

import {
  ProjectInformation,
  question,
  createQuestionnaires,
} from "@/utils/dataInterfaces";

import { apiService } from "@/services/apiService";
import { set } from "date-fns";

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
      setCategories((prevCategories) => [
        ...prevCategories,
        ...project.questionnaire.category
          .map((category) => category.type)
          .filter((type) => !prevCategories.includes(type)),
      ]);
    }
  }, [project]);

  // Obtener datos de cuestionario segun proyecto
  const [questionnaireData, setQuestionnaireData] = useState<question[]>([]);

  useEffect(() => {
    const fetchQuestionnaireData = async () => {
      if (project) {
        try {
          const response = await apiService.getQuestionnaireById(
            project?.questionnaire._id
          );
          setQuestionnaireData(response.questionnaire.questions);
        } catch (error) {}
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
    if (questionnaireData.length > 0) {
      const generalQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "General")
        .map((question) => question.question);

      setAnswersGeneral(generalQuestions);

      const backyardQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "Backyard")
        .map((question) => question.question);

      setAnswersBackyard(backyardQuestions);

      const frontyardQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "Frontyard")
        .map((question) => question.question);

      setAnswersFrontyard(frontyardQuestions);

      const extraQuestions: question[] = questionnaireData
        .filter((question) => question.question.category === "Extra")
        .map((question) => question.question);

      setAnswersExtra(extraQuestions);
    }
  }, [questionnaireData]);

  const [isAnsweredGeneral, setIsAnsweredGeneral] = useState<boolean[]>(
    questionnaire.general.map((_, index) => (index === 0 ? true : false))
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
      const updatedIsAnsweredGeneral = questionnaire.general.map(
        (questionObj, index) =>
          index === 0
            ? true
            : answersGeneral.some(
                (answerObj) =>
                  answerObj.quest === questionObj.title.replace("?", "")
              )
      );

      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredGeneral)
        ? updatedIsAnsweredGeneral
        : prev;
    });
  }, [answersGeneral, questionnaire.general]);

  useEffect(() => {
    setIsAnsweredBackyard((prev) => {
      const updatedIsAnsweredBackyard = questionnaire.backyard.map(
        (questionObj) =>
          answersBackyard.some(
            (answerObj) =>
              answerObj.quest ===
              questionObj.title.replace("?", "").replace(",", "")
          )
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredBackyard)
        ? updatedIsAnsweredBackyard
        : prev;
    });
  }, [answersBackyard, questionnaire.backyard]);

  useEffect(() => {
    setIsAnsweredFrontyard((prev) => {
      const updatedIsAnsweredFrontyard = questionnaire.backyard.map(
        (questionObj) =>
          answersFrontyard.some(
            (answerObj) =>
              answerObj.quest ===
              questionObj.title.replace("?", "").replace(",", "")
          )
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
          (answerObj) => answerObj.quest === questionObj.title.replace("?", "")
        )
      );
      return JSON.stringify(prev) !== JSON.stringify(updatedIsAnsweredExtra)
        ? updatedIsAnsweredExtra
        : prev;
    });
  }, [answersExtra, questionnaire.extra]);

  useEffect(() => {
    console.log("1. AnsweredGeneral: ", answersGeneral);
  }, [answersGeneral]);

  useEffect(() => {
    console.log("2. answersBackyard: ", answersBackyard);
  }, [answersBackyard]);

  useEffect(() => {
    console.log("3. answersFrontyard: ", answersFrontyard);
  }, [answersFrontyard]);

  useEffect(() => {
    console.log("4. answersExtra: ", answersExtra);
  }, [answersExtra]);

  useEffect(() => {
    console.log(
      "1. isAnsweredGeneral actualizado segun su propio valor: ",
      isAnsweredGeneral
    );
  }, [isAnsweredGeneral]);

  useEffect(() => {
    console.log(
      "2. isAnsweredBackyard actualizado segun su propio valor: ",
      isAnsweredBackyard
    );
  }, [isAnsweredBackyard]);

  useEffect(() => {
    console.log(
      "3. isAnsweredFrontyard actualizado segun su propio valor: ",
      isAnsweredFrontyard
    );
  }, [isAnsweredFrontyard]);

  useEffect(() => {
    console.log(
      "4. isAnsweredExtra actualizado segun su propio valor: ",
      isAnsweredExtra
    );
  }, [isAnsweredExtra]);

  const [selectedMaxTwoGeneral, setSelectedMaxTwoGeneral] = useState<number[]>(
    []
  );

  useEffect(() => {
    if (answersGeneral[0]) {
      const styles = Array.from(
        document.getElementsByClassName("gq2Styles")
      ) as HTMLElement[];
      const stylesText = styles.map((style) =>
        style.textContent.replace("▪ ", "")
      );
      const selectedIndices: number[] = [];
      answersGeneral[0].selecteds.forEach((selected, index) => {
        stylesText.forEach((style, indexStyle) => {
          if (style === selected.selected) {
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
        selectedMaxTwoGeneral.filter((option) => option !== index)
      );
    } else if (selectedMaxTwoGeneral.length < 2) {
      // Si aún no hay dos seleccionados, agregamos el índice
      setSelectedMaxTwoGeneral([...selectedMaxTwoGeneral, index]);
    }
  };

  const [selectedBq2, setSelectedBq2] = useState<number | null>(null);
  useEffect(() => {
    if (answersBackyard[1]) {
      const plants = Array.from(
        document.getElementsByClassName("bq2Plants")
      ) as HTMLElement[];
      const plantsText = plants.map((plant) => plant.textContent);
      const selectedIndices: number[] = [];
      answersBackyard[1].selecteds.forEach((selected, index) => {
        plantsText.forEach((plant, indexPlant) => {
          if (plant === selected.selected) {
            selectedIndices.push(indexPlant);
          }
        });
      });
      setSelectedBq2(selectedIndices[0]);
    }
  }, [answersBackyard[1]]);

  const handleBq2Change = (index: number) => {
    setSelectedBq2(index === selectedBq2 ? null : index); // Permitir deseleccionar.
  };

  const [selectedFq2, setSelectedFq2] = useState<number | null>(null);
  useEffect(() => {
    if (answersFrontyard[1]) {
      const plants = Array.from(
        document.getElementsByClassName("fq2Plants")
      ) as HTMLElement[];
      const plantsText = plants.map((plant) => plant.textContent);
      const selectedIndices: number[] = [];
      answersFrontyard[1].selecteds.forEach((selected, index) => {
        plantsText.forEach((plant, indexPlant) => {
          if (plant === selected.selected) {
            selectedIndices.push(indexPlant);
          }
        });
      });
      setSelectedFq2(selectedIndices[0]);
    }
  }, [answersFrontyard[1]]);
  const handleFq2Change = (index: number) => {
    setSelectedFq2(index === selectedFq2 ? null : index); // Permitir deseleccionar.
  };

  const [selectedWaterBackyard, setSelectedWaterBackyard] = useState<number[]>(
    []
  );
  useEffect(() => {
    if (answersBackyard[4]) {
      const water = Array.from(
        document.getElementsByClassName("bq5WaterOption")
      ) as HTMLElement[];
      const waterText = water.map((w) => w.textContent?.replace("▪ ", ""));
      const selectedIndices: number[] = [];
      answersBackyard[4].selecteds.forEach((selected, index) => {
        waterText.forEach((water, indexWater) => {
          if (water === selected.selected) {
            selectedIndices.push(indexWater);
          }
        });
      });
      setSelectedWaterBackyard(selectedIndices);
    }
  }, [answersBackyard[4]]);

  const [selectedFireBackyard, setSelectedFireBackyard] = useState<number[]>(
    []
  );
  useEffect(() => {
    if (answersBackyard[5]) {
      const fire = Array.from(
        document.getElementsByClassName("bq6FireOption")
      ) as HTMLElement[];
      const fireText = fire.map((f) => f.textContent?.replace("▪ ", ""));
      const selectedIndices: number[] = [];
      answersBackyard[5].selecteds.forEach((selected, index) => {
        fireText.forEach((fire, indexFire) => {
          if (fire === selected.selected) {
            selectedIndices.push(indexFire);
          }
        });
      });
      setSelectedFireBackyard(selectedIndices);
    }
  }, [answersBackyard[5]]);

  const [selectedWaterFrontyard, setSelectedWaterFrontyard] = useState<
    number[]
  >([]);
  useEffect(() => {
    if (answersFrontyard[4]) {
      const water = Array.from(
        document.getElementsByClassName("fq5WaterOption")
      ) as HTMLElement[];
      const waterText = water.map((w) => w.textContent?.replace("▪ ", ""));
      const selectedIndices: number[] = [];
      answersFrontyard[4].selecteds.forEach((selected, index) => {
        waterText.forEach((water, indexWater) => {
          if (water === selected.selected) {
            selectedIndices.push(indexWater);
          }
        });
      });
      setSelectedWaterFrontyard(selectedIndices);
    }
  }, [answersFrontyard[4]]);

  const [selectedFireFrontyard, setSelectedFireFrontyard] = useState<number[]>(
    []
  );
  useEffect(() => {
    if (answersFrontyard[5]) {
      const fire = Array.from(
        document.getElementsByClassName("fq6FireOption")
      ) as HTMLElement[];
      const fireText = fire.map((f) => f.textContent?.replace("▪ ", ""));
      const selectedIndices: number[] = [];
      answersFrontyard[5].selecteds.forEach((selected, index) => {
        fireText.forEach((fire, indexFire) => {
          if (fire === selected.selected) {
            selectedIndices.push(indexFire);
          }
        });
      });
      setSelectedFireFrontyard(selectedIndices);
    }
  }, [answersFrontyard[5]]);

  const [imagesRaw, setImagesRaw] = useState<ViewFiles[]>([]);
  const [imagesData, setImagesData] = useState({
    rawArea: [] as string[],
    sketchs: [] as string[],
    extras: [] as string[],
  });

  useEffect(() => {
    console.log("imagesData: ", imagesData);
  }, [imagesData]);

  const [isMediaUploaded, setIsMediaUploaded] = useState({
    rawArea: false,
    sketchs: false,
    extras: false,
  });

  useEffect(() => {
    setIsMediaUploaded((prev) => ({
      rawArea: imagesData.rawArea.length > 0 ? true : prev.rawArea,
      sketchs: imagesData.sketchs.length > 0 ? true : prev.sketchs,
      extras: imagesData.extras.length > 0 ? true : prev.extras,
    }));
  }, [imagesData]);

  useEffect(() => {
    if (project?._id) {
      apiService
        .getFilesByProjectId(project?._id)
        .then((response) => {
          setImagesRaw(response.files);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, [project?._id]);

  useEffect(() => {
    if (imagesRaw.length > 0) {
      setImagesData({
        rawArea: imagesRaw
          .filter((image) => image.category === "rawArea")
          .map((image) => image.path),
        sketchs: imagesRaw
          .filter((image) => image.category === "sketchs")
          .map((image) => image.path),
        extras: imagesRaw
          .filter((image) => image.category === "extras")
          .map((image) => image.path),
      });
    }
  }, [imagesRaw]);

  const handleSubmitAnswers = (
    question: string,
    typeQuestion: string,
    categoryQuestion: string,
    htmlElements: string
  ) => {
    const isDuplicate = answersGeneral.some(
      (answer) =>
        answer.quest === question && answer.category === categoryQuestion
    );

    if (isDuplicate) {
      return;
    }

    switch (typeQuestion) {
      case "Styles General Question":
        const styles = document.getElementsByClassName(`${htmlElements}Styles`);
        const inputNote = document.getElementById(`${htmlElements}Input`);
        const inputNoteText = inputNote?.value;

        // Generar el array de `selecteds` asegurando el tipo correcto
        const selectedsArray: { selected: string }[] = selectedMaxTwoGeneral
          .map((index) => ({
            selected: styles[index]?.textContent?.replace("▪ ", "") || "",
          }))
          .filter((item) => item.selected.trim() !== "");

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

        const submitNewAnswer = async () => {
          try {
            const response = await apiService.createQuestion(newAnswer);
            console.log("response crear styles question: ", response);
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };

        submitNewAnswer();
        break;
      case "Yes or No Question":
        const selection = document.getElementById(`${htmlElements}Select`);
        const selectedText = selection.options[selection.selectedIndex].text;

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

        const submitNewAnswerYesOrNo = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerYesOrNo);
            console.log("response crear yesno question: ", response);
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };

        submitNewAnswerYesOrNo();
        break;
      case "Yes or No With Note Question":
        const selectionWithNote = document.getElementById(
          `${htmlElements}Select`
        );
        const noteElement = document.getElementById(`${htmlElements}Note`);
        const selectedTextWithNote: string =
          selectionWithNote.options[selectionWithNote.selectedIndex].text;
        const noteText: string = noteElement.value;

        const newAnswerYesOrNoWithNote: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: selectedTextWithNote }, { note: noteText }],
          selecteds: [{ selected: "" }],
          select:
            selectedTextWithNote === "Colorful Plants" ||
            selectedTextWithNote === "Yes"
              ? true
              : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        const submitNewAnswerYesOrNoWithNote = async () => {
          try {
            const response = await apiService.createQuestion(
              newAnswerYesOrNoWithNote
            );
            console.log("response crear noteyesno question: ", response);
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };
        submitNewAnswerYesOrNoWithNote();
        break;
      case "How Many Plants Question":
        const optionsPlants = document.getElementsByClassName(
          `${htmlElements}Plants`
        );
        if (categoryQuestion === "Frontyard" && selectedFq2 !== null) {
          const selectedTextPlants = optionsPlants[selectedFq2].textContent;

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

          const submitNewAnswerHowManyPlants = async () => {
            try {
              const response = await apiService.createQuestion(
                newAnswerHowManyPlants
              );
              console.log("response crear manyplants question: ", response);
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
                    setAnswersExtra((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  default:
                    break;
                }
              }
            } catch (error) {}
          };
          submitNewAnswerHowManyPlants();
        } else if (categoryQuestion === "Backyard" && selectedBq2 !== null) {
          const selectedTextPlants = optionsPlants[selectedBq2].textContent;

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

          const submitNewAnswerHowManyPlants = async () => {
            try {
              const response = await apiService.createQuestion(
                newAnswerHowManyPlants
              );
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
                    setAnswersExtra((prevAnswers) => [
                      ...prevAnswers,
                      response.question,
                    ]);
                    break;
                  default:
                    break;
                }
              }
            } catch (error) {}
          };
          submitNewAnswerHowManyPlants();
        } else {
          Swal.fire({
            icon: "error",
            text: "Please select at least one option",
          });
        }
        break;
      case "Things to Keep or Remove Question":
        const thingsBoxes = document.getElementsByClassName(
          `${htmlElements}ThingsKeepRemove`
        );
        const thingsBoxesText = Array.from(thingsBoxes).map((box) => box.value);

        const newAnswerThingsKeepRemove: question = {
          quest: question,
          category: categoryQuestion,
          notes: [
            { note: `${thingsBoxesText[0]}` },
            { note: `${thingsBoxesText[1]}` },
          ],
          selecteds: [{ selected: "" }],
          select: false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        const submitNewAnswerThingsKeepRemove = async () => {
          try {
            const response = await apiService.createQuestion(
              newAnswerThingsKeepRemove
            );
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };
        submitNewAnswerThingsKeepRemove();
        break;
      case "Water Feature Question":
        const waterSelect = document.getElementById(`${htmlElements}Select`);
        const waterFeatures = document.getElementsByClassName(
          `${htmlElements}WaterOption`
        );
        const waterChecks = document.getElementsByClassName(
          `${htmlElements}WaterCheckbox`
        );
        const waterNote = document.getElementById(`${htmlElements}Note`);

        const waterSelectText =
          waterSelect.options[waterSelect.selectedIndex].text;
        const waterNoteText = waterNote.value;

        const selectedWaterFeatures = Array.from(waterChecks)
          .map((check, index) =>
            check.checked
              ? waterFeatures[index]?.textContent.replace("▪ ", "")
              : null
          ) // Tomar solo los seleccionados
          .filter((feature) => feature !== null); // Eliminar los valores nulos

        const formatSelectedWaterFeatures = selectedWaterFeatures.map(
          (feature) => ({
            selected: feature,
          })
        );

        const newAnswerWaterFeature: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: waterSelectText }, { note: waterNoteText }],
          selecteds: formatSelectedWaterFeatures,
          select: waterSelectText === "Yes" ? true : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        const submitNewAnswerWaterFeature = async () => {
          try {
            const response = await apiService.createQuestion(
              newAnswerWaterFeature
            );
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };
        submitNewAnswerWaterFeature();
        break;
      case "Fire Feature Question":
        const fireSelect = document.getElementById(`${htmlElements}FireSelect`);
        const fireFeatures = document.getElementsByClassName(
          `${htmlElements}FireOption`
        );
        const fireChecks = document.getElementsByClassName(
          `${htmlElements}FireCheckbox`
        );
        const firePeople = document.getElementById(`${htmlElements}FirePeople`);
        const fireNote = document.getElementById(`${htmlElements}FireNote`);
        const fireSelectText =
          fireSelect.options[fireSelect.selectedIndex].text;
        const firePeopleNumber = firePeople.value;
        const fireNoteText = fireNote.value;

        const selectedFireFeatures = Array.from(fireChecks)
          .map((check, index) =>
            check.checked
              ? fireFeatures[index]?.textContent.replace("▪ ", "")
              : null
          ) // Tomar solo los seleccionados
          .filter((feature) => feature !== null);

        const formatSelectedFireFeatures = selectedFireFeatures.map(
          (feature) => ({
            selected: feature,
          })
        );

        const newAnswerFireFeature: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: fireSelectText }, { note: fireNoteText }],
          selecteds: formatSelectedFireFeatures,
          select: fireSelectText === "Yes" ? true : false,
          people: firePeopleNumber,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        const submitNewAnswerFireFeature = async () => {
          try {
            const response = await apiService.createQuestion(
              newAnswerFireFeature
            );
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };
        submitNewAnswerFireFeature();
        break;
      case "Note Question":
        const note = document.getElementById(`${htmlElements}Note`);
        const noteContain = note.value;

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

        const submitNewAnswerOnlyNote = async () => {
          try {
            const response = await apiService.createQuestion(newAnswerOnlyNote);
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
                  setAnswersExtra((prevAnswers) => [
                    ...prevAnswers,
                    response.question,
                  ]);
                  break;
                default:
                  break;
              }
            }
          } catch (error) {}
        };
        submitNewAnswerOnlyNote();
        break;

      default:
        break;
    }
  };

  const handleUpdateAnswers = (
    question: string,
    typeQuestion: string,
    categoryQuestion: string,
    htmlElements: string,
    index: number
  ) => {
    console.log("1. trying to update answer... question type: ", typeQuestion);
    switch (typeQuestion) {
      case "Styles General Question":
        console.log("2. Entering type question: ", typeQuestion);
        const styles = document.getElementsByClassName(`${htmlElements}Styles`);
        const inputNote = document.getElementById(`${htmlElements}Input`);
        const inputNoteText = inputNote?.value;
        // Generar el array de `selecteds` asegurando el tipo correcto
        const selectedsArray: { selected: string }[] = selectedMaxTwoGeneral
          .map((index) => ({
            selected: styles[index]?.textContent?.replace("▪ ", "") || "",
          }))
          .filter((item) => item.selected.trim() !== ""); // Filtrar valores vacíos
        const questionIdStyles =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";
        const newAnswerStyles: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: inputNoteText }],
          selecteds: selectedsArray,
          select: false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };
        const submitNewAnswer = async () => {
          try {
            if (!questionIdStyles || typeof questionIdStyles !== "string") {
              console.error("❌ Error: ID de la pregunta inválido", questionId);
              return;
            }
            const response = await apiService.updateQuestion(
              questionIdStyles,
              newAnswerStyles
            );
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswer();
        break;
      case "Yes or No Question":
        const selection = document.getElementById(`${htmlElements}Select`);
        const selectedText = selection.options[selection.selectedIndex].text;
        const questionIdYesNo =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";
        const newAnswerYesOrNo: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: selectedText }],
          selecteds: [{ selected: "" }],
          select: selectedText === "Yes" ? true : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
          _id: questionIdYesNo,
        };
        const submitNewAnswerYesOrNo = async () => {
          try {
            const response = await apiService.updateQuestion(
              questionIdYesNo,
              newAnswerYesOrNo
            );
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? newAnswerYesOrNo : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? newAnswerYesOrNo : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? newAnswerYesOrNo : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? newAnswerYesOrNo : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswerYesOrNo();
        break;
      case "Yes or No With Note Question":
        const selectionWithNote = document.getElementById(
          `${htmlElements}Select`
        );
        const noteElement = document.getElementById(`${htmlElements}Note`);
        const selectedTextWithNote: string =
          selectionWithNote.options[selectionWithNote.selectedIndex].text;
        const noteText: string = noteElement.value;

        const questionIdYesNoNote =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";

        const newAnswerYesOrNoWithNote: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: selectedTextWithNote }, { note: noteText }],
          selecteds: [{ selected: "" }],
          select:
            selectedTextWithNote === "Colorful Plants" ||
            selectedTextWithNote === "Yes"
              ? true
              : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };
        console.log("newAnswerYesOrNoWithNote: ", newAnswerYesOrNoWithNote);
        const submitNewAnswerYesOrNoWithNote = async () => {
          try {
            const response = await apiService.updateQuestion(
              questionIdYesNoNote,
              newAnswerYesOrNoWithNote
            );
            console.log("respuesta de la actualización noteyesno: ", response);
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswerYesOrNoWithNote();
        break;
      case "How Many Plants Question":
        const optionsPlants = document.getElementsByClassName(
          `${htmlElements}Plants`
        );
        if (categoryQuestion === "Frontyard" && selectedFq2 !== null) {
          const selectedTextPlants = optionsPlants[selectedFq2].textContent;
          const questionIdPlantsFrontyard = answersFrontyard[index]?._id;
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
          const submitNewAnswerHowManyPlants = async () => {
            try {
              const response = await apiService.updateQuestion(
                questionIdPlantsFrontyard,
                newAnswerHowManyPlants
              );
              console.log(
                "respuesta de la actualización howmanyplants: ",
                response
              );
              if (response.message === "Question updated successfully") {
                setAnswersFrontyard((prevAnswers) =>
                  prevAnswers.map((answer, i) =>
                    i === index ? response.question : answer
                  )
                );
                Swal.fire({
                  title: "Question updated successfully",
                  icon: "success",
                });
              }
            } catch (error) {}
          };
          submitNewAnswerHowManyPlants();
        } else if (categoryQuestion === "Backyard" && selectedBq2 !== null) {
          const selectedTextPlants = optionsPlants[selectedBq2].textContent;
          const questionIdPlantsBackyard = answersBackyard[index]?._id;
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
          const submitNewAnswerHowManyPlants = async () => {
            try {
              const response = await apiService.updateQuestion(
                questionIdPlantsBackyard,
                newAnswerHowManyPlants
              );
              if (response.message === "Question updated successfully") {
                console.log(
                  "respuesta de la actualización many plants: ",
                  response
                );
                setAnswersBackyard((prevAnswers) =>
                  prevAnswers.map((answer, i) =>
                    i === index ? response.question : answer
                  )
                );
                Swal.fire({
                  title: "Question updated successfully",
                  icon: "success",
                });
              }
            } catch (error) {}
          };
          submitNewAnswerHowManyPlants();
        } else {
        }
        break;
      case "Things to Keep or Remove Question":
        const thingsBoxes = document.getElementsByClassName(
          `${htmlElements}ThingsKeepRemove`
        );
        const thingsBoxesText = Array.from(thingsBoxes).map((box) => box.value);
        const questionIdKeepRemove =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";
        const newAnswerThingsKeepRemove: question = {
          quest: question,
          category: categoryQuestion,
          notes: [
            { note: `${thingsBoxesText[0]}` },
            { note: `${thingsBoxesText[1]}` },
          ],
          selecteds: [{ selected: "" }],
          select: false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        const submitNewAnswerThingsKeepRemove = async () => {
          try {
            const response = await apiService.updateQuestion(
              questionIdKeepRemove,
              newAnswerThingsKeepRemove
            );
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswerThingsKeepRemove();
        break;
      case "Water Feature Question":
        const waterSelect = document.getElementById(`${htmlElements}Select`);
        const waterFeatures = document.getElementsByClassName(
          `${htmlElements}WaterOption`
        );
        const waterChecks = document.getElementsByClassName(
          `${htmlElements}WaterCheckbox`
        );
        const waterNote = document.getElementById(`${htmlElements}Note`);

        const waterSelectText =
          waterSelect.options[waterSelect.selectedIndex].text;
        const waterNoteText = waterNote.value;

        const selectedWaterFeatures = Array.from(waterChecks)
          .map((check, index) =>
            check.checked
              ? waterFeatures[index]?.textContent.replace("▪ ", "")
              : null
          ) // Tomar solo los seleccionados
          .filter((feature) => feature !== null); // Eliminar los valores nulos

        const formatSelectedWaterFeatures = selectedWaterFeatures.map(
          (feature) => ({
            selected: feature,
          })
        );
        const questionIdWater =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";

        const newAnswerWaterFeature: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: waterSelectText }, { note: waterNoteText }],
          selecteds: formatSelectedWaterFeatures,
          select: waterSelectText === "Yes" ? true : false,
          people: 0,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("newAnswerWaterFeature: ", newAnswerWaterFeature);

        const submitNewAnswerWaterFeature = async () => {
          try {
            const response = await apiService.updateQuestion(
              questionIdWater,
              newAnswerWaterFeature
            );
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswerWaterFeature();
        break;
      case "Fire Feature Question":
        const fireSelect = document.getElementById(`${htmlElements}FireSelect`);
        const fireFeatures = document.getElementsByClassName(
          `${htmlElements}FireOption`
        );
        const fireChecks = document.getElementsByClassName(
          `${htmlElements}FireCheckbox`
        );
        const firePeople = document.getElementById(`${htmlElements}FirePeople`);
        const fireNote = document.getElementById(`${htmlElements}FireNote`);

        const fireSelectText =
          fireSelect.options[fireSelect.selectedIndex].text;
        const firePeopleNumber = firePeople.value;
        const fireNoteText = fireNote.value;

        const selectedFireFeatures = Array.from(fireChecks)
          .map((check, index) =>
            check.checked
              ? fireFeatures[index]?.textContent.replace("▪ ", "")
              : null
          ) // Tomar solo los seleccionados
          .filter((feature) => feature !== null);

        const formatSelectedFireFeatures = selectedFireFeatures.map(
          (feature) => ({
            selected: feature,
          })
        );
        const questionIdFire =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";
        const newAnswerFireFeature: question = {
          quest: question,
          category: categoryQuestion,
          notes: [{ note: fireSelectText }, { note: fireNoteText }],
          selecteds: formatSelectedFireFeatures,
          select: fireSelectText === "Yes" ? true : false,
          people: firePeopleNumber,
          files: [],
          questionnaireId: project?.questionnaire._id,
        };

        console.log("newAnswerFireFeature: ", newAnswerFireFeature);

        const submitNewAnswerFireFeature = async () => {
          try {
            const response = await apiService.updateQuestion(
              questionIdFire,
              newAnswerFireFeature
            );
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswerFireFeature();
        break;
      case "Note Question":
        const note = document.getElementById(`${htmlElements}Note`);
        const noteContain = note.value;
        const questionIdNote =
          categoryQuestion === "General"
            ? answersGeneral[index]?._id
            : categoryQuestion === "Backyard"
            ? answersBackyard[index]?._id
            : categoryQuestion === "Frontyard"
            ? answersFrontyard[index]?._id
            : categoryQuestion === "Extra"
            ? answersExtra[index]?._id
            : "";
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
        console.log("newAnswerOnlyNote: ", newAnswerOnlyNote);

        const submitNewAnswerOnlyNote = async () => {
          try {
            const response = await apiService.updateQuestion(
              questionIdNote,
              newAnswerOnlyNote
            );
            if (response.message === "Question updated successfully") {
              switch (categoryQuestion) {
                case "General":
                  setAnswersGeneral((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Backyard":
                  setAnswersBackyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Frontyard":
                  setAnswersFrontyard((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                case "Extra":
                  setAnswersExtra((prevAnswers) =>
                    prevAnswers.map((answer, i) =>
                      i === index ? response.question : answer
                    )
                  );
                  break;
                default:
                  break;
              }
              Swal.fire({
                title: "Question updated successfully",
                icon: "success",
              });
            }
          } catch (error) {}
        };
        submitNewAnswerOnlyNote();
        break;
      default:
        break;
    }
  };

  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const toggleQuestionnaireShow = () => {
    setIsQuestionnaireOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col bg-purple-400-300 gap-12 relative transition-all duration-300 w-full">
      {showProgress && (
        <div className="flex flex-col fixed sm:max-w-[500px]  bg-[#6c786e]/70 hover:bg-[#6c786e]/85 transition-colors duration-300 rounded-lg z-[100] max-sm:left-[5%] top-[50px] sm:right-[5%] w-[90%] ">
          <div
            className={` p-2 flex justify-start items-center gap-1 select-none place-self-start cursor-pointer`}
            onClick={toggleQuestionnaireShow}
          >
            <RiCollapseDiagonal2Line className="text-2xl " />
            <p className="text-xl font-bold">Questionnaire Progress</p>
          </div>
          <div
            className={`flex  ${
              isQuestionnaireOpen ? "" : "max-h-0"
            } transition-all duration-1000`}
          >
            <QuestionnaireProgress
              isQuestionnaireOpen={isQuestionnaireOpen}
              categories={categories}
              answersGeneral={answersGeneral}
              isAnsweredGeneral={isAnsweredGeneral}
              answersBackyard={answersBackyard}
              isAnsweredBackyard={isAnsweredBackyard}
              answersFrontyard={answersFrontyard}
              isAnsweredFrontyard={isAnsweredFrontyard}
              answersExtra={answersExtra}
              isAnsweredExtra={isAnsweredExtra}
              isMediaUploaded={isMediaUploaded}
            />
          </div>
        </div>
      )}
      <QuestionnaireGeneral
        project={project}
        selectedMaxTwoGeneral={selectedMaxTwoGeneral}
        setSelectedMaxTwoGeneral={setSelectedMaxTwoGeneral}
        handleMaxTwoGeneral={handleMaxTwoGeneral}
        answersGeneral={answersGeneral}
        setAnswersGeneral={setAnswersGeneral}
        isAnsweredGeneral={isAnsweredGeneral}
        handleSubmitAnswers={handleSubmitAnswers}
        handleUpdateAnswers={handleUpdateAnswers}
      />
      {categories.includes("Backyard") && (
        <QuestionnaireBackyard
          answersBackyard={answersBackyard}
          setAnswersBackyard={setAnswersBackyard}
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
          handleUpdateAnswers={handleUpdateAnswers}
        />
      )}
      {categories.includes("Frontyard") && (
        <QuestionnaireFrontyard
          categories={categories}
          answersFrontyard={answersFrontyard}
          setAnswersFrontyard={setAnswersFrontyard}
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
          handleUpdateAnswers={handleUpdateAnswers}
        />
      )}
      <QuestionnaireExtra
        categories={categories}
        answersExtra={answersExtra}
        setAnswersExtra={setAnswersExtra}
        isAnsweredBackyard={isAnsweredBackyard}
        isAnsweredFrontyard={isAnsweredFrontyard}
        isAnsweredExtra={isAnsweredExtra}
        handleSubmitAnswers={handleSubmitAnswers}
        handleUpdateAnswers={handleUpdateAnswers}
      />
      <QuestionnaireMedia
        isAnsweredExtra={isAnsweredExtra}
        projectId={project?._id}
        imagesData={imagesData}
        setIsMediaUploaded={setIsMediaUploaded}
      />
    </div>
  );
};

export default QuestionnaireManager;
