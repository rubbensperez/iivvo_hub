
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CampaignsList from "../pages/CampaignsList";
import Results from "../pages/Results";

import RoleRoute from "./RoleRoute";
import { AuthProvider } from "../auth/AuthProvider";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <RoleRoute allow={["admin", "operador", "lectura"]}>
                <Dashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/campaigns"
            element={
              <RoleRoute allow={["admin", "operador"]}>
                <CampaignsList />
              </RoleRoute>
            }
          />

          <Route
            path="/results"
            element={
              <RoleRoute allow={["admin"]}>
                <Results />
              </RoleRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

