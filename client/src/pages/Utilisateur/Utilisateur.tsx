import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Utilisateur() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    navigate("/"); // Rediriger vers la page d'accueil (ou une autre page)
  };

  return (
    <div>
      <NavBar />
      <h1>Utilisateur</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#9f0c00",
            "&:hover": { backgroundColor: "#dd1e0d" },
            width: "150px",
            height: "40px",
          }}
          onClick={handleLogout}
        >
          Déconnexion
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Utilisateur;
