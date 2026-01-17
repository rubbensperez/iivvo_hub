
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../lib/api";

type Campaign = {
  id: string;
  name: string;
  description?: string;
};

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchWithAuth<Campaign[]>("getCampaigns");
        setCampaigns(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Cargando campañas…</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Listado de campañas</h1>
      <ul>
        {campaigns.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

