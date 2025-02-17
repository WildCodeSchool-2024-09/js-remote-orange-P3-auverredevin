import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Question1 from "../../components/Questions/Question1";
import Question2 from "../../components/Questions/Question2";
import Question3 from "../../components/Questions/Question3";
import Question4 from "../../components/Questions/Question4";
import Question5 from "../../components/Questions/Question5";
import "../../components/Questions/Questions.css";

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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/question")
      .then((response) => setQuestions(response.data as IQuestion[]))
      .catch((error) =>
        console.error("Erreur lors de la récupération des questions :", error),
      );

    axios
      .get("http://localhost:3310/api/answers")
      .then((response) => {
        const answersData = response.data as IAnswer[];
        const answersByQuestion = answersData.reduce(
          (acc: { [key: number]: IAnswer[] }, answer: IAnswer) => {
            if (!acc[answer.question_id]) acc[answer.question_id] = [];
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
        console.info("Vin recommandé :", response.data);
        navigate("/result");
      })
      .catch((error) => console.error(error));
  };

  const handleResetQuiz = () => {
    if (window.confirm("Voulez-vous vraiment recommencer le quiz ?")) {
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
    }
  };

  const renderQuestion = (question: IQuestion) => {
    const answersForQuestion = answers[question.question_id] || [];
    switch (question.question_id) {
      case 1:
        return (
          <Question1
            question={question}
            answers={answersForQuestion}
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      case 2:
        return (
          <Question2
            question={question}
            answers={answersForQuestion}
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      case 3:
        return (
          <Question3
            question={question}
            answers={answersForQuestion}
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      case 4:
        return (
          <Question4
            question={question}
            answers={answersForQuestion}
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      case 5:
        return (
          <Question5
            question={question}
            answers={answersForQuestion}
            selectedAnswers={selectedAnswers[question.question_id] || []}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: "#9f0c00", fontWeight: "bold" }}
        >
          Quiz Vin
        </Typography>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Découvrez quel vin vous correspond 🍷
        </Typography>

        <Box mt={4} display="flex" justifyContent="center">
          {questions.length > 0 && (
            <Card
              sx={{
                width: "100%",
                maxWidth: 600,
                padding: 3,
                backgroundColor: "#f9f1f1",
                boxShadow: 5,
                borderRadius: 3,
              }}
            >
              <CardContent>
                {renderQuestion(questions[currentQuestionIndex])}
              </CardContent>
            </Card>
          )}
        </Box>

        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          {currentQuestionIndex > 0 && (
            <Button
              variant="contained"
              onClick={handlePreviousQuestion}
              sx={{
                backgroundColor: "#9f0c00",
                color: "whitesmoke",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
            >
              Précédent
            </Button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              sx={{
                backgroundColor: "#9f0c00",
                color: "whitesmoke",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
            >
              Suivant
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmitQuiz}
              sx={{
                backgroundColor: "#9f0c00",
                color: "whitesmoke",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
            >
              Voir mon résultat
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleResetQuiz}
            sx={{
              backgroundColor: "#333",
              color: "whitesmoke",
              ":hover": { backgroundColor: "#555" },
            }}
          >
            Recommencer
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Quizz;
