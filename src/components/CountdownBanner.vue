<template>
    <div class="mobile-timer-container">
      <div class="glass-pill-countdown">
        <span class="label">Fin des votes :</span>
        <div class="timer-values">
          <div class="segment">{{ timeLeft.days }}<span>j</span></div>
          <div class="dots">:</div>
          <div class="segment">{{ timeLeft.hours }}<span>h</span></div>
          <div class="dots">:</div>
          <div class="segment">{{ timeLeft.minutes }}<span>m</span></div>
          <div class="dots">:</div>
          <div class="segment">{{ timeLeft.seconds }}<span>s</span></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const TARGET_DATE = new Date('2026-03-21T00:00:00').getTime();
  const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  let timerInterval = null;
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    if (distance < 0) {
      clearInterval(timerInterval);
      return;
    }
    timeLeft.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };
  
  onMounted(() => {
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
  });
  
  onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
  });
  </script>
  
  <style scoped>
  /* Masqué par défaut sur PC */
  .mobile-timer-container {
    display: none;
  }
  
  @media (max-width: 991px) {
    .mobile-timer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 15px 0 5px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      /* On utilise un fond transparent pour ne pas bloquer le reste */
      background: transparent; 
    }
  
    .glass-pill-countdown {
      display: flex;
      align-items: center;
      gap: 15px;
      background: rgba(255, 255, 255, 0.7); /* Effet verre blanc */
      backdrop-filter: blur(10px); /* Flou d'arrière-plan */
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.3); /* Bordure or fine */
      border-radius: 50px; /* Forme cylindrique / pilule */
      padding: 8px 20px;
      /* Ombre interne pour l'effet "creux" et ombre externe pour le décollage */
      box-shadow: 
        inset 2px 2px 5px rgba(0,0,0,0.05),
        0 10px 20px rgba(0,0,0,0.08);
    }
  
    .label {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.65rem;
      font-weight: 700;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  
    .timer-values {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #0E0E0E; /* Noir pour trancher sur le verre */
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 1rem;
    }
  
    .segment {
      display: flex;
      align-items: baseline;
    }
  
    .segment span {
      font-size: 0.6rem;
      color: #D4AF37; /* Les unités en Or */
      margin-left: 2px;
      font-weight: 600;
    }
  
    .dots {
      font-size: 0.8rem;
      color: #D4AF37;
      opacity: 0.5;
    }
  }
  </style>