import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import CampaignsList from "../modules/campaigns/pages/CampaignsList";
import { useAuth } from "../auth/AuthProvider";

/* 👇 AQUÍ VA */
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando…</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

/* 👇 ROUTER */
export default function AppRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PRIVATE */}
      <Route
        path="/campaigns"
        element={
          <PrivateRoute>
            <CampaignsList />
          </PrivateRoute>
        }
      />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/campaigns" replace />} />
    </Routes>
  );
}
