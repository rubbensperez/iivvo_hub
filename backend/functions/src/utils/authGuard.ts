import { HttpsError } from "firebase-functions/v2/https";

type AllowedRole = "admin" | "operador";

export function authGuard(auth: any) {
  if (!auth) {
    throw new HttpsError("unauthenticated", "Usuario no autenticado");
  }

  const token = auth.token || {};
  const role = token.role as AllowedRole | undefined;

  if (!role || !["admin", "operador"].includes(role)) {
    throw new HttpsError(
      "permission-denied",
      "No tienes permisos para esta acción"
    );
  }

  return {
    uid: auth.uid,
    role,
    email: token.email || null,
  };
}
