import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleRoute from "./router/RoleRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME libre */}
        <Route path="/" element={<h1>HOME OK</h1>} />

        {/* CAMPAIGNS con rol */}
        <Route
          path="/campaigns"
          element={
            <RoleRoute allow={["admin", "operador"]}>
              <h1>CAMPAIGNS OK CON ROLE</h1>
            </RoleRoute>
          }
        />

        {/* Forbidden */}
        <Route path="/forbidden" element={<h1>FORBIDDEN</h1>} />

        {/* Catch all */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
