import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Container
        className="not-found-page"
        maxWidth="sm"
        sx={{
          marginTop: "3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo centré */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="../src/assets/images/404.png"
            alt="Bienvenue"
            style={{ maxWidth: "400px", height: "auto" }}
          />
        </Box>
        <div className="not-found-container">
          <Typography
            variant="body1"
            className="not-found-message"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Oups, ce cru n'est pas disponible ici !
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9f0c00",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ":hover": { backgroundColor: "#dd1e0d" },
            }}
            className="back-home-button"
            component={Link}
            to="/"
          >
            Retour à l'accueil
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default NotFound;
