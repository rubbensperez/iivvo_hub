import { getFunctions, httpsCallable } from "firebase/functions";
import firebaseApp from "../firebase";

export type InviteStatus = "invited" | "opened" | "started" | "completed";

export interface Invite {
  id: string;
  campaignId: string;
  email: string;
  token: string;
  status: InviteStatus;
  createdAt?: any;
}

const functions = getFunctions(firebaseApp, "us-central1");

export async function createInvite(campaignId: string, email: string) {
  const fn = httpsCallable(functions, "createInvite");
  const res = await fn({ campaignId, email });
  return res.data;
}
