
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvitePublic } from "../../../../services/invitesPublic";
import { updateInviteStatus } from "../../../../services/invitesStatus";
import type { PublicInvite } from "../../../../services/invitesPublic";

export default function CampaignDetail() {
  const { id } = useParams(); // id = token público
  const navigate = useNavigate();

  const [invite, setInvite] = useState<PublicInvite | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const token = id;

    async function load() {
      try {
        const data = await getInvitePublic(token);
        setInvite(data);
      } catch {
        setError("Invitación no válida");
      }
    }

    load();
  }, [id]);

  async function handleAcceptInvite() {
    if (!id || !invite || submitting) return;

    const token = id;

    setSubmitting(true);
    setError(null);

    try {
      await updateInviteStatus(token, "started");
      navigate(`/login?invite=${token}`, { replace: true });
    } catch (err: any) {
      setError(err.message || "No se pudo aceptar la invitación");
      setSubmitting(false);
    }
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!invite) {
    return <p>Cargando invitación…</p>;
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h1>Invitación pública</h1>

      <p>
        <b>Email:</b> {invite.email}
      </p>

      <p>
        <b>Campaign:</b> {invite.campaignId}
      </p>

      <p>
        <b>Status:</b> {invite.status}
      </p>

      {invite.status === "opened" ? (
        <button
          onClick={handleAcceptInvite}
          disabled={submitting}
          style={{
            marginTop: 24,
            padding: "12px 24px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {submitting ? "Procesando…" : "Aceptar invitación"}
        </button>
      ) : (
        <p style={{ marginTop: 24 }}>
          Esta invitación ya fue utilizada.
        </p>
      )}
    </div>
  );
}
