import "./inscription.css";

function Inscription() {
  return (
    <div className="connecter">
      <div className="logo">
        <img src="../src/assets/images/Logo.png" alt="logoo" />
      </div>

      <h1>SE CONNECTER</h1>

      <div className="avatar" />

      <form className="case">
        <input type="text" placeholder="Prénom" />
        <input type="text" placeholder="Nom" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mots de passe" />
        <input type="text" placeholder="Adresse" />

        <div className="newsletter">
          <input type="checkbox" />
          Acceptez-vous de recevoir nos offres personnalisé par email
        </div>

        <button type="submit">S'inscrire</button>
      </form>

      <nav className="navigation">
        <a href="/nosvins">NOS VINS</a>
        <a href="/degustations">DEGUSTATION</a>
        <a href="/reservations">MES RESERVATIONS</a>
        <a href="/quizz">QUIZ</a>
        <a href="/seconnecter">SE CONNECTER</a>
      </nav>

      <footer>
        <p>© 2024 Au Verre De Vin. L'alcool est dangereux pour la santé</p>
      </footer>
    </div>
  );
}

export default Inscription;
