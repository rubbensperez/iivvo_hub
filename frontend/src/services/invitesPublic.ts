export type PublicInvite = {
  campaignId: string;
  email: string;
  status: "invited" | "opened" | "started" | "completed";
};

const BASE_URL =
  "https://us-central1-iivvo-global.cloudfunctions.net";

export async function getInvitePublic(token: string): Promise<PublicInvite> {
  const res = await fetch(`${BASE_URL}/getInvitePublic?token=${token}`);

  if (!res.ok) {
    throw new Error("Invite no válido o no encontrado");
  }

  return res.json();
}
