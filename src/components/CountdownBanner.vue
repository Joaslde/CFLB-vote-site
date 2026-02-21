<template>
    <div class="mobile-only-banner">
      <div class="countdown-wrapper">
        <span class="event-text">FIN DES VOTES DANS :</span>
        <div class="timer">
          <div class="time-segment">
            <span class="number">{{ timeLeft.days }}</span>
            <span class="unit">j</span>
          </div>
          <div class="time-segment">
            <span class="number">{{ timeLeft.hours }}</span>
            <span class="unit">h</span>
          </div>
          <div class="time-segment">
            <span class="number">{{ timeLeft.minutes }}</span>
            <span class="unit">m</span>
          </div>
          <div class="time-segment">
            <span class="number">{{ timeLeft.seconds }}</span>
            <span class="unit">s</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Date cible : 21 Mars 2026
  const TARGET_DATE = new Date('2026-03-21T00:00:00').getTime();
  
  const timeLeft = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  let timerInterval = null;
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
  
    if (distance < 0) {
      clearInterval(timerInterval);
      return;
    }
  
    // Calculs mathématiques pour le temps restant
    timeLeft.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };
  
  onMounted(() => {
    updateCountdown();
    // Mise à jour chaque seconde
    timerInterval = setInterval(updateCountdown, 1000);
  });
  
  onUnmounted(() => {
    // Nettoyage de la mémoire
    if (timerInterval) clearInterval(timerInterval);
  });
  </script>
  
  <style scoped>
  /* LE COEUR DU PROBLÈME : Affichage uniquement sur mobile */
  .mobile-only-banner {
    display: none; /* Caché par défaut (Desktop) */
  }
  
  @media (max-width: 991px) {
    .mobile-only-banner {
      display: block; /* Affiché uniquement sur mobile/tablette */
      background: #0E0E0E; /* Noir profond */
      color: #D4AF37; /* Or */
      padding: 10px 0;
      text-align: center;
      border-bottom: 1px solid rgba(212, 175, 55, 0.4);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  }
  
  .countdown-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .event-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #fff;
  }
  
  .timer {
    display: flex;
    gap: 12px;
  }
  
  .time-segment {
    display: flex;
    align-items: baseline;
    gap: 2px;
  }
  
  .number {
    font-size: 1.2rem;
    font-weight: 800;
    font-family: 'Courier New', Courier, monospace; /* Style digital */
  }
  
  .unit {
    font-size: 0.7rem;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.8;
  }
  </style>