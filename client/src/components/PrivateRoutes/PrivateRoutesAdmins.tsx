import { Navigate } from "react-router-dom";

interface PrivateRoutesAdminsProps {
  component: React.ComponentType<unknown>;
  adminOnly?: boolean;
}

const PrivateRoutesAdmins = ({
  component: Component,
}: PrivateRoutesAdminsProps) => {
  const { isAuth, user } = useAuth();
  const roleId = localStorage.getItem("role_id");

  if (roleId !== "1") {
    return <Navigate to={roleId ? "/not-authorized" : "/connexion"} replace />;
  }

  return <Component />;
};

export default PrivateRoutesAdmins;