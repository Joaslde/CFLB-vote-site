<template>
    <div class="scan-container">
      
      <div v-if="!isAuthenticated" class="login-overlay">
        <div class="login-card fade-in-up">
          <h2 class="premium-title">Accès Staff</h2>
          <p class="mb-4">Veuillez vous identifier pour scanner.</p>
          <form @submit.prevent="handleLogin">
            <input v-model="loginForm.user" type="text" placeholder="Identifiant" required class="premium-input">
            <input v-model="loginForm.pass" type="password" placeholder="Mot de passe" required class="premium-input">
            <button type="submit" class="btn-login">CONNEXION</button>
          </form>
        </div>
      </div>
  
      <div v-else class="scanner-wrapper">
        <header class="scan-header">
          <div class="header-content">
            <h1 class="page-title">Scanner</h1>
            <span class="status-badge">Caméra active</span>
          </div>
          <button @click="logout" class="btn-logout"><i class="bi bi-box-arrow-right"></i></button>
        </header>
  
        <div class="camera-container">
          <div id="reader" class="camera-view"></div>
          <div class="scan-overlay"></div>
        </div>
  
        <div class="scan-instructions">
          <p>Centrez le QR Code du client</p>
          <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
  import { Html5Qrcode } from "html5-qrcode"; // Note: Import sans 'Scanner'
  import Swal from 'sweetalert2';
  import { ticketService } from '../services/ticketService';
  
  // --- AUTHENTIFICATION ---
  const isAuthenticated = ref(localStorage.getItem('admin_session') === 'active');
  const loginForm = reactive({ user: '', pass: '' });
  
  const handleLogin = () => {
    const adminUser = import.meta.env.VITE_ADMIN_USER;
    const adminPass = import.meta.env.VITE_ADMIN_PASS;
  
    if (loginForm.user === adminUser && loginForm.pass === adminPass) {
      isAuthenticated.value = true;
      localStorage.setItem('admin_session', 'active');
      // On attend que le DOM soit mis à jour pour lancer la caméra
      nextTick(() => {
        startCamera();
      });
    } else {
      Swal.fire('Erreur', 'Identifiants incorrects', 'error');
    }
  };
  
  const logout = () => {
    stopCamera().then(() => {
      localStorage.removeItem('admin_session');
      location.reload();
    });
  };
  
  // --- GESTION CAMÉRA ---
  const errorMessage = ref('');
  let html5QrCode = null;
  
  const startCamera = async () => {
    errorMessage.value = '';
    
    // 1. Création de l'instance
    html5QrCode = new Html5Qrcode("reader");
  
    try {
      // 2. Démarrage direct (facingMode: environment = caméra arrière)
      await html5QrCode.start(
        { facingMode: "environment" }, 
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanFailure
      );
    } catch (err) {
      console.error("Erreur caméra:", err);
      errorMessage.value = "Impossible d'accéder à la caméra. Vérifiez les permissions.";
      Swal.fire('Erreur Caméra', 'Autorisez l\'accès à la caméra dans votre navigateur.', 'error');
    }
  };
  
  const stopCamera = async () => {
    if (html5QrCode && html5QrCode.isScanning) {
      await html5QrCode.stop();
      html5QrCode.clear();
    }
  };
  
  // --- LOGIQUE DE VERIFICATION ---
  const onScanSuccess = async (decodedText) => {
    if (!html5QrCode) return;
  
    // Mettre en pause le flux vidéo
    html5QrCode.pause();
  
    try {
      const result = await ticketService.verifyAndUseTicket(decodedText);
  
      if (result.status === 'success') {
        await Swal.fire({
          title: '✅ BILLET VALIDE',
          html: `<h3 style="color:#28a745">${result.buyer}</h3><p>Accès autorisé</p>`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } else if (result.status === 'already_used') {
        await Swal.fire({
          title: '⚠️ DÉJÀ UTILISÉ',
          text: 'Ce ticket a déjà été scanné !',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Refuser l\'accès'
        });
      } else {
        await Swal.fire({
          title: '❌ INCONNU',
          text: 'Code QR non reconnu dans la base.',
          icon: 'warning'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Erreur', 'Erreur réseau ou base de données', 'error');
    } finally {
      // Reprendre le scan
      html5QrCode.resume();
    }
  };
  
  const onScanFailure = (error) => {
    // Rien à faire ici, c'est juste que la caméra ne voit pas de QR code pour l'instant
  };
  
  // --- LIFECYCLE ---
  onMounted(() => {
    if (isAuthenticated.value) {
      startCamera();
    }
  });
  
  onUnmounted(() => {
    stopCamera();
  });
  </script>
  
  <style scoped>
  .scan-container {
    min-height: 100vh;
    background: #ffffff; /* FOND BLANC DEMANDÉ */
    color: #333;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
  }
  
  /* --- LOGIN --- */
  .login-overlay {
    position: fixed;
    inset: 0;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .login-card {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    width: 90%;
    max-width: 350px;
    text-align: center;
  }
  
  .premium-title {
    font-family: 'Lobster', cursive;
    color: #D4AF37;
    font-size: 2rem;
  }
  
  .premium-input {
    width: 100%;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fcfcfc;
    outline: none;
  }
  
  .premium-input:focus {
    border-color: #D4AF37;
  }
  
  .btn-login {
    width: 100%;
    padding: 15px;
    background: #000;
    color: #D4AF37;
    border: none;
    border-radius: 50px;
    font-weight: bold;
  }
  
  /* --- SCANNER UI --- */
  .scanner-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .scan-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    z-index: 10;
  }
  
  .page-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #000;
  }
  
  .status-badge {
    font-size: 0.7rem;
    background: #e6f9e6;
    color: #28a745;
    padding: 4px 8px;
    border-radius: 20px;
    margin-left: 10px;
  }
  
  .btn-logout {
    background: #f8d7da;
    color: #721c24;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* ZONE CAMERA */
  .camera-container {
    flex: 1;
    position: relative;
    background: #000; /* Le fond sous la caméra reste noir pour le contraste */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .camera-view {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Le cadre décoratif */
  .scan-overlay {
    position: absolute;
    width: 250px;
    height: 250px;
    border: 4px solid rgba(212, 175, 55, 0.7); /* Doré semi-transparent */
    border-radius: 20px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5); /* Assombrit le reste */
    pointer-events: none;
  }
  
  .scan-instructions {
    background: white;
    padding: 20px;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-top: -20px;
    z-index: 10;
    position: relative;
  }
  
  .scan-instructions p {
    color: #666;
    font-weight: 600;
    margin: 0;
  }
  
  .error-msg {
    color: red;
    font-size: 0.9rem;
    margin-top: 10px;
  }
  </style>