import { getFunctions, httpsCallable } from "firebase/functions";
import { auth } from "../firebase";

export default function Dashboard() {
  // 🔍 FUNCIÓN DE PRUEBA TEMPORAL
  const testWhoAmI = async () => {
    try {
      // 1️⃣ Verificar usuario autenticado
      if (!auth.currentUser) {
        throw new Error("Usuario NO autenticado");
      }

      // 2️⃣ Usar REGIÓN correcta
      const functions = getFunctions(undefined, "us-central1");

      // 3️⃣ Callable function
      const whoAmI = httpsCallable(functions, "whoAmI");

      const res = await whoAmI();

      console.log("WHOAMI:", res.data);
      alert(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      console.error("WHOAMI ERROR:", err);
      alert(err.message || "Error");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Vista general del hub</p>

      {/* 🔘 BOTÓN TEMPORAL DE DEBUG */}
      <button
        onClick={testWhoAmI}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        Test whoAmI
      </button>
    </div>
  );
}
