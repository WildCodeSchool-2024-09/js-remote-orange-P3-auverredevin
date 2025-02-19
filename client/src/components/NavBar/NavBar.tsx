import "./NavBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<{
    firstname: string;
    avatar?: string;
    login: string;
  } | null>(null);

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
            <Link
              to="/utilisateur"
              className="user-info"
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "bisque",
                  padding: "10px 20px", // Increased padding for larger size
                  borderRadius: "5px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Avatar sans bord arrondi */}
                <Avatar
                  src={user?.avatar || "/default-avatar.png"}
                  variant="square"
                  sx={{ width: 40, height: 40 }}
                />
                {/* Bouton de gestion de compte */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#9f0c00",
                    "&:hover": { backgroundColor: "#dd1e0d" },
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {user?.login &&
                    `${user.login.charAt(0).toUpperCase()}${user.login.slice(1)}`}
                </Button>
              </Box>
            </Link>
          ) : (
            <Link to="/connexion">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#9f0c00",
                  "&:hover": { backgroundColor: "#dd1e0d" },
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Connexion
              </Button>
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
    { text: "QUIZ", path: "/quizz" },
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
