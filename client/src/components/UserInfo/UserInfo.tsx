import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

function UserInfoModule() {
  const { user, isAuth } = useAuth() as unknown as {
    user: {
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      address: string;
    };
    isAuth: boolean;
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/connexion");
  };

  if (!isAuth || !user) {
    return <Typography>Vous n'êtes pas connecté</Typography>;
  }

  return (
    <Container
      id="userInfoModule"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        mt: 5,
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Bienvenue {user.firstname} {user.lastname}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Téléphone: {user.phone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Adresse: {user.address}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        sx={{ mt: 2 }}
      >
        Déconnexion
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Déconnexion</DialogTitle>
        <DialogContent>
          <DialogContentText>Voulez-vous vous déconnecter ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleLogout} color="secondary">
            Déconnexion
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserInfoModule;
