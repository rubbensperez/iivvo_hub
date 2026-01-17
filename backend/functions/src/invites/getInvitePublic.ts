import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export const getInvitePublic = onRequest(async (req, res) => {
  try {
    const token = req.query.token as string;

    if (!token) {
      res.status(400).json({ error: "Missing token" });
      return;
    }

    const snap = await db
      .collection("invites")
      .where("token", "==", token)
      .limit(1)
      .get();

    if (snap.empty) {
      res.status(404).json({ error: "Invite not found" });
      return;
    }

    const doc = snap.docs[0];
    const data = doc.data();

    // marcar opened solo si estaba invited
    if (data.status === "invited") {
      await doc.ref.update({
        status: "opened",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.json({
      campaignId: data.campaignId,
      email: data.email,
      status: data.status,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Internal error" });
  }
});
