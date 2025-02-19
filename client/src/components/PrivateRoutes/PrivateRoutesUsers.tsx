import { Navigate } from "react-router-dom";

// Définition des propriétés attendues par le composant PrivateRoute
interface PrivateRouteUsersProps {
  component: React.ComponentType<unknown>; // Le composant à rendre si l'utilisateur est authentifié
  [key: string]: unknown; // Autres propriétés possibles
}

// Composant PrivateRoute qui vérifie l'authentification de l'utilisateur
const PrivateRoutesUsers = ({
  component: Component,
  ...rest
}: PrivateRouteUsersProps) => {
  const token = localStorage.getItem("token"); // Récupération du token d'authentification depuis le localStorage
  return token ? <Component {...rest} /> : <Navigate to="/connexion" replace />; // Si le token existe, rendre le composant, sinon rediriger vers la page de connexion
};

export default PrivateRoutesUsers;
