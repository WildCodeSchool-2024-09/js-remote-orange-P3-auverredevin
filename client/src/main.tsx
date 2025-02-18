// Necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hook/useAuth";
/* ************************************************************************* */

// Main app component
import App from "./App";

// Front-end pages
import AboutUs from "./pages/Aboutus/AboutUs";
import Connexion from "./pages/Connexion/Connexion";
import Evenements from "./pages/Evenements/Evenements";
import Inscription from "./pages/Inscription/Inscription";
import LegalMentions from "./pages/LegalMentions/legalMention";
import ListWine from "./pages/ListeVin/ListeVin";
import NotAuthorized from "./pages/NotAuthorized/NotAuthorized";
import NotFound from "./pages/NotFound/NotFound";
import Quizz from "./pages/Quizz/Quizz";
import Utilisateur from "./pages/Utilisateur/Utilisateur";
import Welcome from "./pages/Welcome/Welcome";

// Back-office pages
import IndexBackOffice from "./pages/BackOffice/IndexBackOffice";
import ListEventsBO from "./pages/BackOffice/ListEventsBO";
import ListUsersBO from "./pages/BackOffice/ListUsersBO";
import ListWinesBO from "./pages/BackOffice/ListWinesBO";
import SuggestionsBO from "./pages/BackOffice/SuggestionsBO";

import PrivateRoutesAdmins from "./components/PrivateRoutes/PrivateRoutesAdmins";
// Import PrivateRoute component
import PrivateRoutesUsers from "./components/PrivateRoutes/PrivateRoutesUsers";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/aboutus", element: <AboutUs /> },
  { path: "/quizz", element: <Quizz /> },
  { path: "/inscription", element: <Inscription /> },
  { path: "/evenements", element: <Evenements /> },
  { path: "/vins", element: <ListWine /> },
  { path: "/welcome", element: <Welcome /> },
  { path: "/connexion", element: <Connexion /> },
  { path: "/legalmentions", element: <LegalMentions /> },
  { path: "/not-authorized", element: <NotAuthorized /> },
  { path: "*", element: <NotFound /> },

  // Routes Utilisateur
  {
    path: "/utilisateur",
    element: <PrivateRoutesUsers component={Utilisateur} userOnly />,
  },

  // Routes Back-Office (Admins uniquement)
  {
    path: "/backoffice",
    element: <PrivateRoutesAdmins component={IndexBackOffice} adminOnly />,
  },
  {
    path: "/suggestionsBO",
    element: <PrivateRoutesAdmins component={SuggestionsBO} adminOnly />,
  },
  {
    path: "/vinsBO",
    element: <PrivateRoutesAdmins component={ListWinesBO} adminOnly />,
  },
  {
    path: "/evenementsBO",
    element: <PrivateRoutesAdmins component={ListEventsBO} adminOnly />,
  },
  {
    path: "/utilisateursBO",
    element: <PrivateRoutesAdmins component={ListUsersBO} adminOnly />,
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
      <RouterProvider router={router} />
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
