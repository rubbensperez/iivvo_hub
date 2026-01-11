const admin = require("firebase-admin");

admin.initializeApp({
  projectId: "iivvo-global",
  credential: admin.credential.applicationDefault(),
});

async function run() {
  const uid = "XNwP8dT76maQhIqu0BnVyHCSlh32";
  const role = "admin"; // admin | operador | lectura

  await admin.auth().setCustomUserClaims(uid, {
    role,
    admin: role === "admin",
  });

  console.log(`✅ Role '${role}' asignado al usuario ${uid}`);
}

run().catch(console.error);

