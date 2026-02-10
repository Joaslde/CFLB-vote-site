<template>
    <div class="scan-container">
      
      <div v-if="!isAuthenticated" class="login-overlay">
        <div class="login-card fade-in-up">
          <h2 class="premium-title">Accès Staff</h2>
          <p class="mb-4">Identifiez-vous pour scanner.</p>
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
            <span class="status-badge">Actif</span>
          </div>
          <button @click="logout" class="btn-logout"><i class="bi bi-box-arrow-right"></i></button>
        </header>
  
        <div class="camera-container">
          <div id="reader" class="camera-view"></div>
          
          <div class="scan-overlay">
            <div class="target-box"></div>
          </div>
        </div>
  
        <div class="scan-footer">
          <p class="instruction">Placez le QR Code dans le carré</p>
          <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';
  import { Html5Qrcode } from "html5-qrcode";
  import Swal from 'sweetalert2';
  import { ticketService } from '../services/ticketService';
  
  const isAuthenticated = ref(localStorage.getItem('admin_session') === 'active');
  const loginForm = reactive({ user: '', pass: '' });
  const errorMessage = ref('');
  let html5QrCode = null;
  
  const handleLogin = () => {
    if (loginForm.user === import.meta.env.VITE_ADMIN_USER && 
        loginForm.pass === import.meta.env.VITE_ADMIN_PASS) {
      isAuthenticated.value = true;
      localStorage.setItem('admin_session', 'active');
      nextTick(() => startCamera());
    } else {
      Swal.fire('Erreur', 'Identifiants incorrects', 'error');
    }
  };
  
  const logout = async () => {
    await stopCamera();
    localStorage.removeItem('admin_session');
    location.reload();
  };
  
  const startCamera = async () => {
    html5QrCode = new Html5Qrcode("reader");
    try {
      await html5QrCode.start(
        { facingMode: "environment" }, 
        {
          fps: 15,
          qrbox: { width: 250, height: 250 }, // Définit la zone de lecture réelle
        },
        onScanSuccess,
        onScanFailure
      );
    } catch (err) {
      errorMessage.value = "Erreur caméra : Vérifiez les permissions.";
    }
  };
  
  const stopCamera = async () => {
    if (html5QrCode && html5QrCode.isScanning) {
      await html5QrCode.stop();
    }
  };
  
  const onScanSuccess = async (decodedText) => {
    if (!html5QrCode) return;
    html5QrCode.pause(); // Stop le flux pendant le pop-up
  
    try {
      const result = await ticketService.verifyAndUseTicket(decodedText);
  
      if (result.status === 'success') {
        await Swal.fire({
          title: 'BILLET VALIDE ',
          html: `<b style="font-size: 1.5rem;">${result.buyer}</b>`,
          icon: 'success',
          confirmButtonText: 'VALIDER L\'ENTRÉE',
          confirmButtonColor: '#28a745',
          allowOutsideClick: false // Oblige à cliquer sur le bouton
        });
      } else if (result.status === 'already_used') {
        await Swal.fire({
          title: 'DÉJÀ UTILISÉ ',
          text: 'Ce ticket a déjà été scanné.',
          icon: 'error',
          confirmButtonText: 'REFUSER L\'ACCÈS',
          confirmButtonColor: '#dc3545',
          allowOutsideClick: false
        });
      } else {
        await Swal.fire({
          title: 'CODE INVALIDE ',
          text: 'Ce code n\'existe pas.',
          icon: 'warning',
          confirmButtonText: 'RESAISIR',
          allowOutsideClick: false
        });
      }
    } catch (err) {
      Swal.fire('Erreur Base', 'Problème de connexion Supabase', 'error');
    } finally {
      html5QrCode.resume(); // Reprend la caméra après fermeture du pop-up
    }
  };
  
  const onScanFailure = () => { /* Scan en cours... */ };
  
  onMounted(() => { if (isAuthenticated.value) startCamera(); });
  onUnmounted(() => stopCamera());
  </script>
  
  <style scoped>
  /* Conteneur principal utilisant dvh pour mobile */
  .scan-container {
    height: 100dvh;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  /* LOGIN */
  .login-overlay {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    padding: 20px;
  }
  .login-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 350px;
    text-align: center;
  }
  .premium-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  .btn-login {
    width: 100%;
    padding: 12px;
    background: #000;
    color: #D4AF37;
    border: none;
    border-radius: 50px;
    font-weight: bold;
  }
  
  /* SCANNER LAYOUT */
  .scanner-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .scan-header {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  
  .camera-container {
    flex: 1;
    position: relative;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .camera-view {
    width: 100%;
    height: 100%;
  }
  
  /* LE CADRE DE SCAN CENTRÉ */
  .scan-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  
  
  /* Coins du cadre pour le look "scanner" */
  .target-box::before {
    content: "";
    position: absolute;
    top: -5px; left: -5px; width: 40px; height: 40px;
    border-top: 5px solid #D4AF37; border-left: 5px solid #D4AF37;
  }
  
  .scan-footer {
    padding: 20px;
    text-align: center;
    background: white;
  }
  
  .instruction { font-weight: 600; color: #555; margin: 0; }
  .btn-logout { background: #fee; border: none; color: #d33; padding: 8px 12px; border-radius: 10px; }
  
  :deep(video) {
    object-fit: cover !important; /* Force la caméra à remplir l'écran */
  }
  </style>