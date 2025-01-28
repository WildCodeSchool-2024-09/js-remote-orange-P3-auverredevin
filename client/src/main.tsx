// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/Aboutus/AboutUs";
import IndexBackOffice from "./pages/BackOffice/IndexBackOffice";
import ListEventsBO from "./pages/BackOffice/ListEventsBO";
import ListUsersBO from "./pages/BackOffice/ListUsersBO";
import ListWinesBO from "./pages/BackOffice/ListWinesBO";
import SuggestionsBO from "./pages/BackOffice/SuggestionsBO";
import Connexion from "./pages/Connexion/Connexion";
import Evenements from "./pages/Evenements/Evenements";
import Inscription from "./pages/Inscription/Inscription";
import ListWine from "./pages/ListeVin/ListeVin";
import NotFound from "./pages/NotFound/NotFound";
import Profil from "./pages/Profil/Profil";
import Quizz from "./pages/Quizz/Quizz";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
  },
  {
    path: "/aboutus".toLowerCase(),
    element: <AboutUs />,
  },
  {
    path: "/quizz".toLowerCase(), // The root path
    element: <Quizz />,
  },
  {
    path: "/inscription".toLowerCase(),
    element: <Inscription />,
  },
  {
    path: "/profil".toLowerCase(),
    element: <Profil />,
  },
  {
    path: "/evenements".toLowerCase(),
    element: <Evenements />,
  },
  {
    path: "*".toLowerCase(),

    element: <NotFound />,
  },
  {
    path: "/vins".toLowerCase(),
    element: <ListWine />,
  },
  {
    path: "/backoffice".toLowerCase(),
    element: <IndexBackOffice />,
  },
  {
    path: "/suggestionsBO".toLowerCase(),
    element: <SuggestionsBO />,
  },
  {
    path: "/vinsBO".toLowerCase(),
    element: <ListWinesBO />,
  },
  {
    path: "/evenementsBO".toLowerCase(),
    element: <ListEventsBO />,
  },
  {
    path: "/utilisateursBO".toLowerCase(),
    element: <ListUsersBO />,
  },
  {
    path: "/footer", // The root path
    element: <Footer />, // Renders the App component for the home page
  },
  {
    path: "/fnscription", // Page d'inscription
    element: <Inscription />,
  },
  {
    path: "/connexion", // Page d'inscription
    element: <Connexion />,
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
    <RouterProvider router={router} />
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
