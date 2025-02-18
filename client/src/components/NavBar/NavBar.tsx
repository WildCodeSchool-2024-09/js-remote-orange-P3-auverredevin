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
import { Link } from "react-router-dom";

function NavBar() {
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
          <Link to="/connexion">
            <button type="button" className="button-connexion">
              <strong> Connexion </strong>
            </button>
          </Link>
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
    { text: "QUIZ", path: "/quizz" },
    { text: "NOS VINS", path: "/vins" },
    { text: "ÉVENEMENTS", path: "/evenements" },
    { text: "À propos de nous", path: "/aboutus" },
  ];

  return (
    <div className="burger-menu">
      {/* Bouton burger avec MUI */}
      <IconButton
        color="inherit"
        aria-label="menu"
        className="burger-button"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Drawer (menu burger) */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#F5E8DF", // Couleur de fond du menu
            color: "#ffffff", // Couleur du texte
            width: 250, // Largeur du Drawer
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)", // Ombre douce
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
                    color: "#4A4A4A", // Couleur du texte des éléments
                    textTransform: "uppercase", // Texte en majuscules
                    fontWeight: "bolder", // Texte en gras
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
