
import type { ReactNode } from "react";
import { useClaims } from "./useClaims";

type Role = "admin" | "operador" | "lectura";

type Props = {
  allow: Role[];
  children: ReactNode;
};

export default function Can({ allow, children }: Props) {
  const { role } = useClaims();

  if (!role || !allow.includes(role)) {
    return null;
  }

  return <>{children}</>;
}

