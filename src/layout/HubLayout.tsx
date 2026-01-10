import { Outlet, Link } from "react-router-dom";

export default function HubLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, padding: 20 }}>
        <h3>🔥 HUB FUNCIONANDO 🔥</h3>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/campaigns">Campaigns</Link></li>
            <li><Link to="/results">Results</Link></li>
          </ul>
        </nav>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
