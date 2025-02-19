import "./Accueil.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Accueil() {
  return (
    <div className="Accueil">
      <NavBar />

      <div className="main">
        <h1>
          <strong>DECOUVREZ VOTRE PROFIL</strong>
        </h1>
        <h4>Participez à ce quizz pour en savoir plus sur vous goûts !</h4>

        <Link to="/quizz" className="link-button">
          <button type="button" className="button-quizz">
            <strong>QUIZ</strong>
          </button>
        </Link>
      </div>

      <section className="nav-buttons">
        <Link to="/vins" className="link-button">
          <button type="button" className="button-vin">
            <img
              className="raisin"
              src="..//src/assets/images/Raisin.png"
              alt="Raisin"
            />
            <strong>Nos vins</strong>
            <p>
              Réveillez votre palais gustativement avec notre sélection de 50
              vins au choix !
            </p>
          </button>
        </Link>
        <Link to="/evenements" className="link-button">
          <button type="button" className="button-degustation">
            <img
              className="degustation"
              src="..//src/assets/images/Degustation.png"
              alt="degustation"
            />
            <strong>Évènements</strong>
            <p>
              Venez participer à nos séances dégustation qui réveillera vos
              papilles !
            </p>
          </button>
        </Link>
        <Link to="/aboutus" className="link-button">
          <button type="button" className="button-francais">
            <img
              className="Francais"
              src="..//src/assets/images/Francais.png"
              alt="100% Francais"
            />
            <strong>100% Français</strong>
            <p>Tout nos vins sont directement produits de vignes française !</p>
          </button>
        </Link>
      </section>

      <section className="aventure">
        <h1>
          <strong>PRÊT A PARTIR À L’AVENTURE ?</strong>
        </h1>

        <Link to="/vins" className="link-button">
          <button type="button" className="button-vins">
            <strong>NOS VINS</strong>
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Accueil;
