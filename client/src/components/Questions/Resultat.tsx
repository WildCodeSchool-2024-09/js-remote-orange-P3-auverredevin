import { Link } from "react-router-dom";

function Result() {
  return (
    <div>
      <h1>Result</h1>
      <Link to="/quizz">Retour au quizz</Link>
      <button type="button" onClick={() => window.location.reload()}>
        Recommencer le quiz
      </button>
    </div>
  );
}

export default Result;
