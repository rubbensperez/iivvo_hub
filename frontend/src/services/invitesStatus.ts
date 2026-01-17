const BASE_URL =
  "https://us-central1-iivvo-global.cloudfunctions.net";

export async function updateInviteStatus(
  token: string,
  status: "opened" | "started" | "completed"
) {
  const res = await fetch(`${BASE_URL}/updateInviteStatus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, status }),
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el estado");
  }

  return res.json();
}
