import { Navigate } from "react-router-dom";

interface PrivateRoutesAdminsProps {
  component: React.ComponentType<unknown>;
  adminOnly?: boolean;
}

const PrivateRoutesAdmins = ({
  component: Component,
}: PrivateRoutesAdminsProps) => {
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role_id");

  if (!token) {
    return <Navigate to="/connexion" replace />;
  }

  if (roleId !== "1") {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Component />;
};

export default PrivateRoutesAdmins;
