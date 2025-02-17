import "./NavBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  // Vérifier si un token existe dans le localStorage
  const token = localStorage.getItem("token");

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    navigate("/"); // Rediriger vers la page d'accueil (ou une autre page)
  };

  return (
    <>
      <BurgerMenu />
      <div className="navbar">
        <div className="logo_navbar">
          <Link to="/">
            <img src="../src/assets/images/Logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="connexion">
          {token ? (
            <button
              type="button"
              className="button-connexion"
              onClick={handleLogout}
            >
              <strong>Déconnexion</strong>
            </button>
          ) : (
            <Link to="/connexion">
              <button type="button" className="button-connexion">
                <strong>Connexion</strong>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

const BurgerMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const menuItems = [
    { text: "ACCUEIL", path: "/" },
    { text: "QUIZZ", path: "/quizz" },
    { text: "NOS VINS", path: "/vins" },
    { text: "ÉVENEMENTS", path: "/evenements" },
    { text: "À propos de nous", path: "/aboutus" },
  ];

  return (
    <div className="burger-menu">
      <IconButton
        color="inherit"
        aria-label="menu"
        className="burger-button"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#F5E8DF",
            color: "#ffffff",
            width: 250,
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <nav onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem component={Link} to={item.path} key={item.text}>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: "#4A4A4A",
                    textTransform: "uppercase",
                    fontWeight: "bolder",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </nav>
      </Drawer>
    </div>
  );
};

export default NavBar;
