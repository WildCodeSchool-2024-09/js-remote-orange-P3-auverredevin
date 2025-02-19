import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import "./IndexBackOffice.css";

function IndexBackOffice() {
  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Box sx={{ bgcolor: "whitesmoke", p: 3, borderRadius: 2, mt: 5 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Index Back Office
          </Typography>
          <Box
            component="img"
            className="BOBOX"
            src="../src/assets/images/Backoffice.png"
            alt="backoffice"
            sx={{ width: "100%", maxWidth: "20.5rem" }}
          />
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
                width: "100%",
                maxWidth: "20.5rem",
              }}
              component={Link}
              to="/suggestionsBO"
            >
              Liste des suggestions
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9f0c00",
                ":hover": { backgroundColor: "#dd1e0d" },
                width: "100%",
                maxWidth: "20.5rem",
              }}
              component={Link}
              to="/utilisateursBO"
            >
              Liste des utilisateurs
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9f0c00",
                ":hover": { backgroundColor: "#dd1e0d" },
                width: "100%",
                maxWidth: "20.5rem",
              }}
              component={Link}
              to="/vinsBO"
            >
              Liste des vins
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9f0c00",
                ":hover": { backgroundColor: "#dd1e0d" },
                width: "100%",
                maxWidth: "20.5rem",
              }}
              component={Link}
              to="/evenementsBO"
            >
              Liste des évenements
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default IndexBackOffice;
