import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useClaims } from "../auth/useClaims";

type Role = "admin" | "operador" | "lectura";

type Props = {
  allow: Role[];
  children: ReactNode;
};

export default function RoleRoute({ allow, children }: Props) {
  const { role, loading } = useClaims();

  if (loading) return null;

  if (!role || !allow.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

