import { getAuth } from "firebase/auth";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "https://us-central1-iivvo-global.cloudfunctions.net";

export async function fetchWithAuth<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();

  const res = await fetch(`${API_BASE}/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

