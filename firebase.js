// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 GANTI DENGAN CONFIG DARI FIREBASE-MU!
const firebaseConfig = {
  apiKey: "AIzaSyCM9gdMGFdOZ8wyMqCJBrPMczewFnQ6OWc",
  authDomain: "login-register-2ff99.firebaseapp.com",
  projectId: "login-register-2ff99",
  storageBucket: "login-register-2ff99.firebasestorage.app",
  messagingSenderId: "803350710809",
  appId: "1:803350710809:web:d0ec214a9c310e89ebb888"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);