import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrwTFxKE1bbENIqk7JJBS5zTmKZ7ZlNl0",
  authDomain: "projetoatv-720cb.firebaseapp.com",
  projectId: "projetoatv-720cb",
  storageBucket: "projetoatv-720cb.firebasestorage.app",
  messagingSenderId: "304402884530",
  appId: "1:304402884530:web:ed1c91d1a2e4b3450c66ab"
};

// Inicializa o Firebase (evita inicializar duas vezes)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exportações nomeadas para os outros arquivos funcionarem
export const auth = getAuth(app);
export const db = getFirestore(app);

// Caso você ainda use o "import firebase from..." em algum lugar, 
// o ideal é mudar para as exportações acima, mas vamos manter o app como default
export default app;