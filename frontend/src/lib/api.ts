import { getAuth } from "firebase/auth";

const API_ENDPOINTS = {
  getCampaigns:
    "https://getcampaigns-cdxokhhbua-uc.a.run.app",
  createCampaign:
    "https://createcampaign-cdxokhhbua-uc.a.run.app",
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;

export async function fetchWithAuth(
  endpoint: ApiEndpoint,
  options: RequestInit = {}
) {
  const auth = getAuth();

  // ⏳ Esperar a que Auth esté listo
  if (!auth.currentUser) {
    await new Promise<void>((resolve) => {
      const unsub = auth.onAuthStateChanged(() => {
        unsub();
        resolve();
      });
    });
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  const token = await user.getIdToken();
  const url = API_ENDPOINTS[endpoint];

  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error en API");
    }
    return res.json();
  });
}
