import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-S0uO4AH3MlOUOtHpHImfWQYL6SRHni4",
  authDomain: "osiris-cap-e5811.firebaseapp.com",
  projectId: "osiris-cap-e5811",
  storageBucket: "osiris-cap-e5811.firebasestorage.app",
  messagingSenderId: "259982935102",
  appId: "1:259982935102:web:fe58ad7b48f4a117147d6f",
  measurementId: "G-DCJKTCL33H"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);