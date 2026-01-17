import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvitePublic } from "../../../../services/invitesPublic";
import { updateInviteStatus } from "../../../../services/invitesStatus";
import type { PublicInvite } from "../../../../services/invitesPublic";

export default function CampaignDetail() {
  const params = useParams();
  const navigate = useNavigate();

  // 🔑 normalizamos el token (string | null)
  const token: string | null = params.id ?? null;

  const [invite, setInvite] = useState<PublicInvite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token inválido");
      return;
    }

    const tokenId = token; // ✅ TypeScript ahora sabe que es string

    async function load() {
      try {
        const data = await getInvitePublic(tokenId);
        setInvite(data);

        // 🟢 marcar como abierta
        await updateInviteStatus(tokenId, "opened");
      } catch {
        setError("Invitación no válida");
      }
    }

    load();
  }, [token]);

  async function handleAccept() {
    if (!token) return;

    const tokenId = token; // ✅ string garantizado

    try {
      setLoadingAction(true);

      // 🟡 marcar como iniciada
      await updateInviteStatus(tokenId, "started");

      // redirigir al flujo normal (login / registro)
      navigate(`/login?invite=${tokenId}`);
    } catch {
      alert("Error al aceptar la invitación");
    } finally {
      setLoadingAction(false);
    }
  }

  if (error) return <h2>{error}</h2>;
  if (!invite) return <p>Cargando invitación…</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Invitación pública</h1>

      <p>
        <b>Email:</b> {invite.email}
      </p>
      <p>
        <b>Status:</b> {invite.status}
      </p>
      <p>
        <b>Campaign:</b> {invite.campaignId}
      </p>

      <button onClick={handleAccept} disabled={loadingAction}>
        {loadingAction ? "Procesando…" : "Aceptar invitación"}
      </button>
    </div>
  );
}
