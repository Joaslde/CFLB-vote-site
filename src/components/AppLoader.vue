<template>
  <transition name="slide-up">
    <div v-if="visible" class="loader-overlay">
      <div class="logo-container">
        <img :src="logo" alt="Logo Glow Empire" class="pulsing-logo" style="width:15rem; " />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import logo from '../assets/CFLB-logo-bgless.png';

const visible = ref(true);

onMounted(() => {
  // Simule le temps de chargement (ex: 1.5 secondes)
  setTimeout(() => {
    visible.value = false;
  }, 1500);
});
</script>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #e6b515; /* Le doré officiel */
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pulsing-logo {
    width: 150px; /* Ajuster selon la taille du logo */
    animation: pulse 2s infinite ease-in-out;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  /* Animation de sortie : Glissement vers le haut */
  .slide-up-leave-active {
    transition: transform 0.8s ease-in-out;
  }
  .slide-up-leave-to {
    transform: translateY(-100%);
  }
  </style>