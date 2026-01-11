import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useClaims } from "../auth/useClaims";

type Props = {
  allow: Array<"admin" | "operador" | "lectura">;
  children: ReactNode;
};

export default function RoleRoute({ allow, children }: Props) {
  const { loading, role, isAuthenticated } = useClaims();

  if (loading) return <div>Cargando permisos...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/forbidden" replace />;
  }

  if (!role || !allow.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
}
