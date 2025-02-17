// Necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AnswersProvider } from "./Context/AnswersScore";
import { AuthProvider } from "./hook/useAuth";
/* ************************************************************************* */

// Main app component
import App from "./App";
import Footer from "./components/Footer/Footer";

// Front-end pages
import AboutUs from "./pages/Aboutus/AboutUs";
import Connexion from "./pages/Connexion/Connexion";
import Evenements from "./pages/Evenements/Evenements";
import Inscription from "./pages/Inscription/Inscription";
import LegalMentions from "./pages/LegalMentions/legalMention";
import ListWine from "./pages/ListeVin/ListeVin";
import NotFound from "./pages/NotFound/NotFound";
import Profil from "./pages/Profil/Profil";
import Quizz from "./pages/Quizz/Quizz";
import Welcome from "./pages/Welcome/Welcome";

// Back-office pages
import IndexBackOffice from "./pages/BackOffice/IndexBackOffice";
import ListEventsBO from "./pages/BackOffice/ListEventsBO";
import ListUsersBO from "./pages/BackOffice/ListUsersBO";
import ListWinesBO from "./pages/BackOffice/ListWinesBO";
import SuggestionsBO from "./pages/BackOffice/SuggestionsBO";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Page d'accueil
  },
  {
    path: "/aboutus",
    element: <AboutUs />, // Page à propos
  },
  {
    path: "/quizz",
    element: <Quizz />, // Page de quizz
  },
  {
    path: "/inscription",
    element: <Inscription />, // Page d'inscription
  },
  {
    path: "/profil",
    element: <Profil />, // Page de profil
  },
  {
    path: "/evenements",
    element: <Evenements />, // Page d'événements
  },
  {
    path: "*",

    element: <NotFound />, // Page 404
  },
  {
    path: "/vins",
    element: <ListWine />, // Liste des vins
  },
  {
    path: "/backoffice",
    element: <IndexBackOffice />, // backoffice
  },
  {
    path: "/suggestionsBO",
    element: <SuggestionsBO />, // backoffice suggestions
  },
  {
    path: "/vinsBO",
    element: <ListWinesBO />, // backoffice vins
  },
  {
    path: "/evenementsBO",
    element: <ListEventsBO />, // backoffice événements
  },
  {
    path: "/utilisateursBO",
    element: <ListUsersBO />, // backoffice utilisateurs
  },
  {
    path: "/footer",
    element: <Footer />, // Page de bienvenue
  },
  {
    path: "/fnscription", // Page d'inscription
    element: <Inscription />,
  },
  {
    path: "/welcome", // Page de bienvenue
    element: <Welcome />,
  },
  {
    path: "/connexion", // Page d'inscription
    element: <Connexion />,
  },
  {
    path: "/legalmentions",
    element: <LegalMentions />, // Page de mentions légales
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <AnswersProvider>
        <RouterProvider router={router} />
      </AnswersProvider>
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
