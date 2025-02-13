import "./Quizz.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Question1 from "../../components/Questions/Question1";
import Question2 from "../../components/Questions/Question2";
import Question3 from "../../components/Questions/Question3";
import Question4 from "../../components/Questions/Question4";
import Question5 from "../../components/Questions/Question5";

interface IAnswer {
  answer_id: number;
  answer_text: string;
  score_value: number;
  question_id: number;
}

interface IQuestion {
  question_id: number;
  question_text: string;
  answers: IAnswer[];
}

function Quizz() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: IAnswer[] }>({});
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number[];
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/question")
      .then((response) => {
        setQuestions(response.data as IQuestion[]);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des questions :", error),
      );

    axios
      .get("http://localhost:3310/api/answers")
      .then((response) => {
        const answersData = response.data as IAnswer[];
        const answersByQuestion = answersData.reduce(
          (acc: { [key: number]: IAnswer[] }, answer: IAnswer) => {
            if (!acc[answer.question_id]) {
              acc[answer.question_id] = [];
            }
            acc[answer.question_id].push(answer);
            return acc;
          },
          {},
        );
        setAnswers(answersByQuestion);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des réponses :", error),
      );
  }, []);

  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: [answerId],
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    axios
      .post("http://localhost:3310/api/answers", selectedAnswers, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log("Vin recommandé :", response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleResetQuiz = () => {
    const confirmReset = window.confirm(
      "Voulez-vous vraiment recommencer le quiz ?",
    );
    if (confirmReset) {
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
    }
  };

  const handleEditAnswer = (_questionId: number, _answerId: number) => {
    // Implement the edit answer functionality here
  };

  const handleDeleteAnswer = (_answerId: number) => {
    // Implement the delete answer functionality here
  };

  const renderQuestion = (question: IQuestion) => {
    const answersForQuestion = answers[question.question_id] || [];
    switch (question.question_id) {
      case 1:
        return (
          <Question1
            question={question}
            answers={answersForQuestion} // Passe les réponses
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      case 2:
        return (
          <Question2
            question={question}
            answers={answersForQuestion} // Passe les réponses
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
            onEditAnswer={handleEditAnswer}
            onDeleteAnswer={handleDeleteAnswer}
          />
        );
      case 3:
        return (
          <Question3
            question={question}
            answers={answersForQuestion} // Passe les réponses
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
            onEditAnswer={handleEditAnswer}
            onDeleteAnswer={handleDeleteAnswer}
          />
        );
      case 4:
        return (
          <Question4
            question={question}
            answers={answersForQuestion} // Passe les réponses
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
            onEditAnswer={handleEditAnswer}
            onDeleteAnswer={handleDeleteAnswer}
          />
        );
      case 5:
        return (
          <Question5
            question={question}
            answers={answersForQuestion} // Passe les réponses
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
            onEditAnswer={handleEditAnswer}
            onDeleteAnswer={handleDeleteAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="Quizz">
      <NavBar />
      <h1>Quizz</h1>
      <h2>Laissez-vous guider</h2>

      <div className="card-container">
        {questions.length > 0 &&
          renderQuestion(questions[currentQuestionIndex])}
      </div>

      <div className="buttons">
        {currentQuestionIndex > 0 && (
          <button type="button" onClick={handlePreviousQuestion}>
            Précédent
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button type="button" onClick={handleNextQuestion}>
            Suivant
          </button>
        ) : (
          <button type="button" onClick={handleSubmitQuiz}>
            Soumettre le quiz
          </button>
        )}
        <button type="button" onClick={handleResetQuiz}>
          Recommencer
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Quizz;
