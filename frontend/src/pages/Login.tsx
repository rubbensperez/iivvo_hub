import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirige después de login exitoso
      navigate("/dashboard");
    } catch {
      // ❌ Sin err, sin any → lint OK
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🔐 Login Hub iiVVO</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Entrar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
