// auth.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"; // ← HAPUS SPASI DI AKHIR!
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"; // ← HAPUS SPASI!

document.addEventListener('DOMContentLoaded', () => {
  // Redirect otomatis jika sudah login & verifikasi
  onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname.split('/').pop();
    if (user && user.emailVerified) {
      if (path === 'index.html' || path === 'register.html') {
        window.location.replace('./dashboard.html');
      }
    } else if (user && !user.emailVerified) {
      if (path !== 'index.html') {
        window.location.replace('./index.html');
      }
    }
  });

  // === REGISTER ===
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = registerForm.username.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value;

      if (!username || !email || !password) {
        alert('Semua field wajib diisi!');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          createdAt: new Date().toISOString()
        });

        await sendEmailVerification(user);
        alert('✅ Registrasi berhasil!\nSilakan cek email untuk verifikasi.');
        window.location.replace('./index.html'); // ✅ LANGSUNG KE LOGIN
      } catch (error) {
        let msg = '❌ Registrasi gagal: ';
        if (error.code === 'auth/email-already-in-use') {
          msg += 'Email sudah terdaftar.';
        } else if (error.code === 'auth/weak-password') {
          msg += 'Password minimal 6 karakter.';
        } else if (error.code === 'auth/invalid-email') {
          msg += 'Format email tidak valid.';
        } else {
          msg += error.message;
        }
        alert(msg);
      }
    });
  }

  // === LOGIN ===
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          alert('📧 Silakan verifikasi email Anda terlebih dahulu!');
          await auth.signOut();
          return;
        }

        // ✅ LOGIN SUKSES → KE DASHBOARD
        window.location.replace('./dashboard.html');
      } catch (error) {
        let msg = '❌ Login gagal: ';
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
          msg += 'Email atau password salah.';
        } else if (error.code === 'auth/user-not-found') {
          msg += 'Akun tidak ditemukan.';
        } else {
          msg += error.message;
        }
        alert(msg);
      }
    });
  }
});