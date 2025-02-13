import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import BienvenueImage from '../../assets/images/Bienvenue.png';

function Welcome() {
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        // Faire une requête à l'API pour récupérer le login
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Inclure les cookies si nécessaire
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération du login');
        }

        const data = await response.json();
        setLogin(data.login); // Assurez-vous que l'API renvoie { login: string }
      } catch (error) {
        setError('Erreur lors de la récupération du login');
      } finally {
        setLoading(false);
      }
    };

    fetchLogin();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Box sx={{ bgcolor: "whitesmoke", p: 3, borderRadius: 2, mt: 5 }}>
          {/* Logo centré */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={BienvenueImage}
              alt="Bienvenue"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </Box>

          {/* Titre avec le login */}
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
            Bienvenue, {login || "utilisateur"} 🍷
          </Typography>

          {/* Gestion des erreurs */}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Boutons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9f0c00",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
              component={Link}
              to="/vins"
            >
              Voir nos vins
            </Button>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              ou
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: "whitesmoke",
                backgroundColor: "#9f0c00",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
              component={Link}
              to="/quizz"
            >
              Faites un quizz pour découvrir vos goûts en matière de vin
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Welcome;