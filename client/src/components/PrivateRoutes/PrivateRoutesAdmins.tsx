import { Navigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

interface PrivateRoutesAdminsProps {
  component: React.ComponentType<unknown>;
  adminOnly?: boolean;
}

const PrivateRoutesAdmins = ({
  component: Component,
  adminOnly,
}: PrivateRoutesAdminsProps) => {
  const { isAuth, user } = useAuth();
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role_id");

  if (!isAuth) {
    return <Navigate to="/connexion" replace />;
  }

  const userObj = typeof user === "string" ? JSON.parse(user) : user;

  if (adminOnly && userObj?.role_id !== 1) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Component />;
};

export default PrivateRoutesAdmins;
