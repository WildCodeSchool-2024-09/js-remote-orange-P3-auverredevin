import "./inscription.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";


function Inscription() {
  return (
    <>  
    <NavBar />
    <div className="connecter">
    <div className="logo">
      <img src="../src/assets/images/Logo.png" alt="logo" />
    </div>
     
      <h1>INSCRIPTION</h1>
      <div className="avatar">
        <img src="..//src/assets/images/avvatar.png" alt="avvatar" />
      </div>
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
    <Link to="/connexion">
          <button type="submit">S'inscrire</button>
              </Link>
          
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Inscription;
