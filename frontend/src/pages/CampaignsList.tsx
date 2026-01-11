import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";

type Campaign = {
  id: string;
  name: string;
  description?: string;
  status?: string;
};

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Cargar campañas
  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        const data = await fetchWithAuth("getCampaigns");
        setCampaigns(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error cargando campañas");
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  // ➕ Crear campaña
  async function handleCreateCampaign() {
    const name = prompt("Nombre de la campaña");
    if (!name) return;

    try {
      await fetchWithAuth("createCampaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description: "",
        }),
      });

      // 🔁 refrescar lista
      const data = await fetchWithAuth("getCampaigns");
      setCampaigns(data);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error creando campaña");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Campañas</h1>

      <button onClick={handleCreateCampaign}>
        Crear campaña
      </button>

      {loading && <p>Cargando campañas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {campaigns.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
