// dashboard.js
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');

  // Cek status login
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Tampilkan email user
      userInfo.innerHTML = `<i class='bx bxs-envelope'></i> ${user.email}`;
    } else {
      // Jika tidak login, redirect ke halaman login
      window.location.href = 'index.html';
    }
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await signOut(auth);
        window.location.href = 'index.html';
      } catch (error) {
        alert('Logout gagal: ' + error.message);
      }
    });
  }
});