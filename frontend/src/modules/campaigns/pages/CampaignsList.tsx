import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        const auth = getAuth();
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
          throw new Error("Error al obtener campañas");
        }

        const json = await res.json();

        // 🔐 NORMALIZACIÓN CANÓNICA
        const campaignsData =
          json.campaigns ||
          json.data?.campaigns ||
          (Array.isArray(json) ? json : []);

        setCampaigns(campaignsData);
      } catch (err: any) {
        console.error("Error loading campaigns", err);
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="p-6">Cargando campañas…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Campañas</h1>

        <button
          onClick={() => navigate("/campaigns/create")}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Crear campaña
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-gray-500">
          No hay campañas registradas.
        </div>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-sm text-gray-600">{c.description}</p>

                <p className="text-sm mt-1">
                  <strong>Periodo:</strong>{" "}
                  {c.startDate} → {c.endDate}
                </p>

                <p className="text-sm mt-1">
                  <strong>Progreso:</strong>{" "}
                  {c.completedCount} / {c.assignedCount} completados
                </p>
              </div>

              <button
                onClick={() => navigate(`/campaigns/${c.id}`)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Gestionar campaña
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
