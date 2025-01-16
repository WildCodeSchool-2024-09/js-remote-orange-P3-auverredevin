import "./NavBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="navbar">
        <BurgerMenu />
        <div className="logo">
          <img src="../src/assets/images/Logo.png" alt="Logo" />
        </div>
        <div className="connexion">
          <Link to="/inscription">
            <button type="button" className="button-connexion">
              <strong> Connexion </strong>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour ouvrir/fermer le menu
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Inverse l'état de isOpen
  };

  return (
    <div className="burger-menu">
      {/* Bouton burger */}
      <button type="button" className="burger-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu burger visible lorsque 'isOpen' est true */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">
              <strong>ACCUEIL</strong>
            </Link>
          </li>
          <li>
            <Link to="/quizz">
              <strong>QUIZZ</strong>
            </Link>
          </li>
          <li>
            <Link to="/vins">
              <strong>NOS VINS</strong>
            </Link>
          </li>
          <li>
            <Link to="/degustation">
              <strong>DEGUSTATION</strong>
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <strong>A propos de nous</strong>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
