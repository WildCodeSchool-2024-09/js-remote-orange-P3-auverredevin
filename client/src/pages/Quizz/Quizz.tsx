import "./Quizz.css";
import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface Quizz {
  question_id: number;
  question_text: string;
}

function Quizz() {
  useEffect(() => {
    fetch("http://localhost:3310/api/questions")
      .then((response) => response.json())
      .then((data) => {
        data;
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Quizz">
      <NavBar />
      <h1>Quizz</h1>
      <h2>Laissez Vous guider</h2>

      <div className="card-container">
        <div className="card">
          <h3>Question 1</h3>
          <p>Réponse à la question 1</p>
        </div>
        <div className="card">
          <h3>Question 2</h3>
          <p>Réponse à la question 2</p>
        </div>
        <div className="card">
          <h3>Question 3</h3>
          <p>Réponse à la question 3</p>
        </div>
        <div className="card">
          <h3>Question 4</h3>
          <p>Réponse à la question 4</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Quizz;
