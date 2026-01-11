import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HubLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 220, padding: 20, background: "#111", color: "#fff" }}>
        <h2>🔥 HUB</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/campaigns">Campaigns</NavLink>
          <NavLink to="/results">Results</NavLink>
        </nav>

        <button onClick={handleLogout} style={{ marginTop: 30 }}>
          Cerrar sesión
        </button>
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 40 }}>
        <Outlet />
      </main>
    </div>
  );
}
