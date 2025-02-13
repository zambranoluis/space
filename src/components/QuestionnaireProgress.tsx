interface QuestionnaireProgressProps {
  isAnsweredGeneral: boolean[];
  isAnsweredBackyard: boolean[];
  isAnsweredFrontyard: boolean[];
  isAnsweredExtra: boolean[];
}

const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = () => {
  return (
    <div className="bg-red-300 flex flex-col">
      <h1>Questionnaire Progress</h1>
      <div>

      </div>
    </div>
  );
}

export default QuestionnaireProgress;