import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBI51K6_kxThUWKNciET-aepLzy5qz3VZE",
  authDomain: "iivvo-global.firebaseapp.com",
  projectId: "iivvo-global",
  storageBucket: "iivvo-global.firebasestorage.app",
  messagingSenderId: "690823312044",
  appId: "1:690823312044:web:20cd2ad155a7b0e503e509",
};

const app = initializeApp(firebaseConfig);

// 🔐 AUTH (esto es lo clave)
export const auth = getAuth(app);

export default app;
