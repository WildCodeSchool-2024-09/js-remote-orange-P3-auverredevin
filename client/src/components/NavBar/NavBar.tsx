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
          <button type="button">Connexion</button>
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
              <strong>Accueil</strong>
            </Link>
          </li>
          <li>
            <Link to="/boutique">
              <strong>Quizz</strong>
            </Link>
          </li>
          <li>
            <Link to="/albums">
              <strong>Nos vins</strong>
            </Link>
          </li>
          <li>
            <Link to="/concerts">
              <strong>Dégustation</strong>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
