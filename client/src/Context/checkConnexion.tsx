import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth"; // Importer useAuth

interface PrivateRouteProps {
  component: React.ComponentType<unknown>;
  [key: string]: unknown;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { isAuth } = useAuth(); // Utiliser le hook useAuth pour obtenir l'état d'authentification

  // Si l'utilisateur est authentifié, afficher la route privée, sinon rediriger vers la page de connexion
  return isAuth ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/connexion" replace />
  );
};

export default PrivateRoute;
