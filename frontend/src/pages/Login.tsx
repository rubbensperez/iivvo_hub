import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 🔑 SI YA HAY SESIÓN → REDIRIGE
  if (!loading && user) {
    navigate("/campaigns", { replace: true });
    return null;
  }

  // ⏳ Mientras Firebase resuelve sesión
  if (loading) {
    return <p>Cargando sesión…</p>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/campaigns");
    } catch (err: any) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Login iiVVO Hub</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: 12, width: "100%" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 12, width: "100%" }}
        />

        <button type="submit">Entrar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
