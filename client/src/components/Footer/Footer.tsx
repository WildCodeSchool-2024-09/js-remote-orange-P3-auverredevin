import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="div_footer">
      <nav className="nav_footer">
        <ul className="ul_footer">
          <li>
            <a href="/vins">NOS VINS</a>
          </li>
          <li>
            <a href="/evenements">ÉVENEMENTS</a>
          </li>
          <li>
            <a href="/mesreservations">MES RESERVATIONS</a>
          </li>
          <li>
            <a href="/quizz">QUIZZ</a>
          </li>
          <li>
            <Link to="/Connexion">SE CONNECTER</Link>
          </li>
        </ul>
      </nav>

      <div className="logo_footer">
        <img
          src="../src/assets/images/auverredevinnnnn.png"
          alt="Au Verre De Vin Logo"
        />
      </div>

      <footer className="footer">
        <p>© 2024 Au Verre De Vin. L'abus d'alcool est dangereux pour la santé</p>
      </footer>
    </div>
  );
}

export default Footer;
