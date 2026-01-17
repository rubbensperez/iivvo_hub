import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { randomUUID } from "crypto";
import { authGuard } from "../utils/authGuard";

export const createInvite = onCall(async (request) => {
  // 1. Autenticación y rol
  const user = authGuard(request.auth);

  const { campaignId, email, name } = request.data || {};

  if (!campaignId || !email) {
    throw new HttpsError(
      "invalid-argument",
      "campaignId y email son obligatorios"
    );
  }

  // 2. Token único
  const token = randomUUID();

  const db = getFirestore();

  // 3. Guardar invitación
  await db.collection("campaignInvites").doc(token).set({
    token,
    campaignId,
    email: String(email).toLowerCase(),
    name: name || null,
    status: "invited",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: user.uid,
  });

  // 4. Respuesta mínima
  return {
    ok: true,
    token,
    inviteUrl: `https://web.iivvo.com/invite/${token}`,
  };
});
