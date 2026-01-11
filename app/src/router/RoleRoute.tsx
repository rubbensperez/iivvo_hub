import { Navigate, Outlet } from "react-router-dom";
import { useClaims } from "../auth/useClaims";

export default function RoleRoute({ allow }: { allow: string[] }) {
  const { loading, role } = useClaims();

  if (loading) return <div>Cargando…</div>;
  if (!role) return <Navigate to="/login" replace />;
  if (!allow.includes(role)) return <Navigate to="/403" replace />;

  return <Outlet />;
}
