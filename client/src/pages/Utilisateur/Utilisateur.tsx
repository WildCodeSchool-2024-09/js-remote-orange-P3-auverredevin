import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface User {
  firstname: string;
  lastname: string;
  user_id: string;
  role_id: number;
  login: string;
  avatar?: string;
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
        const parsedUser = JSON.parse(userData);
        parsedUser.role_id = Number(parsedUser.role_id);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erreur lors du parsing des données utilisateur", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role_id");
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && user) {
          const updatedUser = { ...user, avatar: reader.result as string };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      };
      reader.readAsDataURL(file);
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
        <Typography variant="body1" align="center" sx={{ marginTop: "10px" }}>
          Changez d'avatar en cliquant sur l'image
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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

            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#9f0c00",
                "&:hover": { backgroundColor: "#dd1e0d" },
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                marginTop: "10px",
                maxWidth: "80%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "10px",
              }}
            >
              Upload File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                hidden
              />
            </Button>
          </Dialog>

          {/* Bouton vers le BackOffice si l'utilisateur est admin */}
          {user?.role_id === 1 && (
            <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
              <Link to="/backoffice" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "220px",
                    height: "60px",
                    borderRadius: "1%",
                    boxShadow: "0 0 5px #9f0c00",
                    backgroundColor: "#9f0c00",
                    "&:hover": { backgroundColor: "#dd1e0d" },
                  }}
                >
                  Index BackOffice
                </Button>
              </Link>
            </Box>
          )}

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
              marginTop: "10px",
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
