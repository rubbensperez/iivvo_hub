import React from "react";
import { useClaims } from "./useClaims";
import type { Role } from "./useClaims";

interface CanProps {
  allow: Role[];
  children: React.ReactNode;
}

export function Can({ allow, children }: CanProps) {
  const { loading, role } = useClaims();

  if (loading) return null;
  if (!role) return null;
  if (!allow.includes(role)) return null;

  return <>{children}</>;
}
