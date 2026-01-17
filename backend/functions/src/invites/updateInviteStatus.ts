import { onRequest } from "firebase-functions/v2/https";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

initializeApp();

const db = getFirestore();

type InviteStatus = "opened" | "started" | "completed";

export const updateInviteStatus = onRequest(
  { cors: true, region: "us-central1" },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
      }

      const { token, status } = req.body as {
        token?: string;
        status?: InviteStatus;
      };

      if (!token || !status) {
        res.status(400).json({ error: "token and status are required" });
        return;
      }

      if (!["opened", "started", "completed"].includes(status)) {
        res.status(400).json({ error: "invalid status" });
        return;
      }

      const ref = db.collection("invites").doc(token);
      const snap = await ref.get();

      if (!snap.exists) {
        res.status(404).json({ error: "invite not found" });
        return;
      }

      await ref.update({
        status,
        updatedAt: FieldValue.serverTimestamp(),
      });

      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal error" });
    }
  }
);
