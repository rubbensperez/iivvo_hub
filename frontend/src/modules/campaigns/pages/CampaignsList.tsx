import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

type Campaign = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedCount: number;
  completedCount: number;
};

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          throw new Error("Usuario no autenticado");
        }

        const token = await user.getIdToken();

        const res = await fetch(
          "https://us-central1-yodelfuturo.cloudfunctions.net/getCampaigns",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error al cargar campañas");
        }

        const data = await res.json();
        setCampaigns(data);
      } catch (err: any) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <p>Cargando campañas…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Campañas</h1>

      {campaigns.length === 0 && <p>No hay campañas disponibles.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {campaigns.map((c) => (
          <li
            key={c.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              marginBottom: 12,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/campaigns/${c.id}`)}
          >
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <p>
              <b>Asignados:</b> {c.assignedCount} |{" "}
              <b>Completados:</b> {c.completedCount}
            </p>
            <p>
              <b>Inicio:</b> {c.startDate} | <b>Fin:</b> {c.endDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
