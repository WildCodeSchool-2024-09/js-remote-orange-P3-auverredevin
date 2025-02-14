import { createTheme } from "@mui/material/styles";

// Importation de la fonction createTheme depuis le module @mui/material/styles

// Création d'un thème personnalisé avec la fonction createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#9f0c00", // Couleur principale
    },
    secondary: {
      main: "#f5f5f5", // Couleur secondaire
    },
    background: {
      default: "#ffffff", // Couleur de fond par défaut
      paper: "#f5f5f5", // Couleur de fond des éléments de type "papier"
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Police de caractères par défaut
    h1: {
      fontSize: "2.5rem", // Taille de police pour les titres de niveau 1
      fontWeight: 700, // Poids de police pour les titres de niveau 1
    },
    h2: {
      fontSize: "2rem", // Taille de police pour les titres de niveau 2
      fontWeight: 600, // Poids de police pour les titres de niveau 2
    },
    body1: {
      fontSize: "1rem", // Taille de police pour le corps du texte
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Bordure arrondie pour les boutons
          textTransform: "none", // Pas de transformation de texte pour les boutons
        },
      },
    },
  },
});

// Exportation du thème pour l'utiliser dans d'autres parties de l'application
export default theme;
