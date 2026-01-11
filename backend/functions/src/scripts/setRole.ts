import { initializeApp, applicationDefault } from 
"firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

initializeApp({
  credential: applicationDefault(),
});

const auth = getAuth();

/**
 * USO:
 * npx ts-node src/scripts/setRole.ts <UID> 
<admin|operador|lectura>
 */
async function run() {
  const [, , uid, role] = process.argv;

  if (!uid || !role) {
    console.error("Uso: setRole <UID> <admin|operador|lectura>");
    process.exit(1);
  }

  if (!["admin", "operador", "lectura"].includes(role)) {
    console.error("Rol inválido");
    process.exit(1);
  }

  await auth.setCustomUserClaims(uid, {
    role,
    admin: role === "admin",
  });

  console.log(`✅ Rol '${role}' asignado al usuario ${uid}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

