import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import CampaignsList from "@/pages/CampaignsList";
import Results from "@/pages/Results";
import Login from "@/pages/Login";
import RoleRoute from "./RoleRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔑 Default */}
        <Route path="/" element={<Navigate to="/campaigns" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Private */}
        <Route
          path="/dashboard"
          element={
            <RoleRoute>
              <Dashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/campaigns"
          element={
            <RoleRoute>
              <CampaignsList />
            </RoleRoute>
          }
        />

        <Route
          path="/results"
          element={
            <RoleRoute>
              <Results />
            </RoleRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/campaigns" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
