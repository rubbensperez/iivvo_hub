export function useClaims() {
  return {
    loading: false,
    isAuthenticated: true,
    role: "admin" as "admin" | "operador" | "lectura",
  };
}
