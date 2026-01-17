import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import firebaseApp from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { createInvite } from "../../services/invites";
import type { Invite } from "../../services/invites";

const db = getFirestore(firebaseApp);

export default function InvitesTab({ campaignId }: { campaignId: string }) {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "campaignInvites"),
      where("campaignId", "==", campaignId)
    );

    const unsub = onSnapshot(q, (snap) => {
      const rows: Invite[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setInvites(rows);
    });

    return () => unsub();
  }, [campaignId]);

  const onCreate = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      await createInvite(campaignId, email);
      setEmail("");
    } catch (e: any) {
      setError(e.message || "Error creando invitación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Invitados</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="email"
          placeholder="email@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={onCreate} disabled={loading}>
          Invitar
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table width="100%" cellPadding={8}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {invites.map((i) => (
            <tr key={i.id}>
              <td>{i.email}</td>
              <td>{i.status}</td>
              <td style={{ fontFamily: "monospace" }}>{i.token}</td>
            </tr>
          ))}
          {invites.length === 0 && (
            <tr>
              <td colSpan={3}>Sin invitados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
