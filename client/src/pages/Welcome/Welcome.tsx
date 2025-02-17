import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import UserInfoModule from "../../components/UserInfo/UserInfo";

interface WelcomeProps {
  username?: string;
}

function Welcome({ username }: WelcomeProps) {
  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Box sx={{ bgcolor: "whitesmoke", p: 3, borderRadius: 2, mt: 5 }}>
          {/* Logo centré */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src="../src/assets/images/Bienvenue.png"
              alt="Bienvenue"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </Box>

          {/* Titre */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Bienvenue {username ? username : "cher amateur de vin"} 🍷
          </Typography>

          {/* Boutons et texte */}
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
        <div>
          <UserInfoModule />
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default Welcome;
