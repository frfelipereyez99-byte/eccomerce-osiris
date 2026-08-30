import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const btnLoginGoogle = document.getElementById("login-google");
const usuarioInfo = document.getElementById("usuario-info");
const btnLogout = document.getElementById("logout");

const provider = new GoogleAuthProvider();

btnLoginGoogle?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
  }
});

btnLogout?.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
});

async function guardarUsuario(user) {
  const usuarioRef = doc(db, "usuarios", user.uid);
  await setDoc(
    usuarioRef,
    {
      uid: user.uid,
      nombre: user.displayName,
      email: user.email,
      foto: user.photoURL,
      ultimoAcceso: serverTimestamp()
    },
    { merge: true }
  );
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await guardarUsuario(user);
    if (usuarioInfo) {
      usuarioInfo.innerHTML = `
        <img src="${user.photoURL}" alt="${user.displayName}">
        <span>${user.displayName}</span>
      `;
    }
    if (btnLoginGoogle) btnLoginGoogle.style.display = "none";
    if (btnLogout) btnLogout.style.display = "inline-flex";
  } else {
    if (usuarioInfo) usuarioInfo.innerHTML = "";
    if (btnLoginGoogle) btnLoginGoogle.style.display = "inline-flex";
    if (btnLogout) btnLogout.style.display = "none";
  }
});