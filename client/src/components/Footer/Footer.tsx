import "./Footer.css";

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
            <a href="/quizz">QUIZ</a>
          </li>
          <li>
            <a href="/aboutus">À PROPOS DE NOUS</a>
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
        <p>
          © 2024 Au Verre De Vin. L'abus d'alcool est dangereux pour la santé.{" "}
          <br />{" "}
          <a href="/legalmentions" style={{ color: "#9f0c00" }}>
            Mentions légales.
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
