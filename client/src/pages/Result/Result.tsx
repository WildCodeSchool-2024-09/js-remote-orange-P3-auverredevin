import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Result() {
  return (
    <div>
      <NavBar />
      <h1>Result</h1>
      <Link to="/quizz">Retour au quizz</Link>
      <Footer />
    </div>
  );
}

export default Result;
