import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
const NotAuthorized = () => {
  return (
    <>
      <NavBar />
      <div>
        <h1>Accès Interdit</h1>
        <Box
          display="flex"
          justifyContent="center"
          sx={{ marginBottom: 12, marginTop: 7 }}
        >
          <img
            src="../src/assets/images/NotAuthorized.png"
            alt="Accès interdit"
          />
        </Box>
        <Box display="flex" justifyContent="center" marginBottom="2rem">
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#9f0c00",
                "&:hover": { backgroundColor: "#dd1e0d" },
              }}
            >
              Retour à L'acceuil
            </Button>
          </Link>
        </Box>
      </div>
      <Footer />
    </>
  );
};
export default NotAuthorized;
