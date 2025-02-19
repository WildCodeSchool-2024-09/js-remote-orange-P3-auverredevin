import { Avatar, Box, Button, Dialog, DialogTitle, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface User {
  firstname: string;
  lastname: string;
  user_id: string;
  role_id: string;
  login: string;
  avatar?: string; // Ajout de l'avatar
}

const avatars = [
  "../src/assets/images/avvatar.png",
  "../src/assets/images/Madame.png",
  "../src/assets/images/Monsieur.png",
];

function Utilisateur() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Erreur lors du parsing des données utilisateur", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAvatarSelect = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setOpen(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          width: "90%",
          maxWidth: 600,
          padding: 3,
          backgroundColor: "#f9f1f1",
          boxShadow: 5,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {user ? (
            <div>
              <h1>
                <strong>Bonjour {user.firstname}</strong>
              </h1>
              <Avatar
                src={user.avatar || "/default-avatar.png"}
                sx={{
                  width: 200,
                  height: 200,
                  margin: "auto",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
              />
            </div>
          ) : (
            <p>Chargement des informations...</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* Modale de sélection d'avatar */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Changer d'Avatar</DialogTitle>
            <Grid container spacing={2} padding={2}>
              {avatars.map((avatar) => (
                <Grid item key={avatar}>
                  <Avatar
                    src={avatar}
                    sx={{ width: 80, height: 80, cursor: "pointer" }}
                    onClick={() => handleAvatarSelect(avatar)}
                  />
                </Grid>
              ))}
            </Grid>
          </Dialog>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#9f0c00",
              "&:hover": { backgroundColor: "#dd1e0d" },
              width: "220px",
              height: "60px",
              borderRadius: "1%",
              boxShadow: "0 0 5px #9f0c00",
            }}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </div>
      </Box>
      <Footer />
    </div>
  );
}

export default Utilisateur;
