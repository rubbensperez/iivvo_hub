import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // 👈 USAR ESTE AUTH

export type Role = "admin" | "operador" | "lectura" | null;

export function useClaims() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const token = await user.getIdTokenResult();
      setRole((token.claims.role as Role) ?? null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { loading, role };
}
