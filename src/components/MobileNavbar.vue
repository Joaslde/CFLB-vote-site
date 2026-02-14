<template>
  <div class="mobile-nav-wrapper d-lg-none">

    <div class="orbit-container" :class="{ 'is-open': isOpen }">

      <router-link to="/" class="sub-bubble bubble-1" @click="isOpen = false">
        <i class="bi bi-house-door"></i>
        <span>Accueil</span>
      </router-link>

      <router-link to="/evenement" class="sub-bubble bubble-2" @click="isOpen = false">
        <i class="bi bi-calendar-event"></i>
        <span>Event</span>
      </router-link>

      <router-link :to="{ path:'/candidates' , hash: '#this'}" class="sub-bubble bubble-3" @click="isOpen = false">
        <i class="bi bi-people"></i>
        <span>Votes</span>
      </router-link>

      <router-link to="/ticket" class="sub-bubble bubble-4" @click="isOpen = false">
        <i class="bi bi-ticket-perforated"></i>
        <span>Ticket</span>
      </router-link>

      <router-link :to="{ path: '/evenement', hash: '#contact' }" class="sub-bubble bubble-5" @click="isOpen = false">
        <i class="bi bi-envelope"></i>
        <span>Contact</span>
      </router-link>

    </div>

    <button class="main-bubble" @click="isOpen = !isOpen" :class="{ 'is-active': isOpen }">
      <div class="hamburger-premium">
        <span class="line line-1"></span>
        <span class="line line-2"></span>
        <span class="line line-3"></span>
      </div>
    </button>

    <div v-if="isOpen" class="menu-overlay" @click="isOpen = false"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

</script>

<style scoped>
/* --- WRAPPER FIXE --- */
.mobile-nav-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

/* --- BULLE PRINCIPALE --- */
.main-bubble {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.4);
  /* Or translucide */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 101;
}

.main-bubble.is-active {
  transform: scale(0.9) rotate(90deg);
  background: rgba(230, 4, 23, 0.4);
  /* Devient rouge translucide à l'ouverture */
}

/* --- HAMBURGER PREMIUM (Lignes fines) --- */
.hamburger-premium {
  width: 25px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.line {
  display: block;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.line-1 {
  width: 100%;
}

.line-2 {
  width: 70%;
}

.line-3 {
  width: 100%;
}

/* Animation vers la Croix (X) */
.is-active .line-1 {
  transform: translateY(8px) rotate(45deg);
  width: 100%;
}

.is-active .line-2 {
  opacity: 0;
  transform: translateX(20px);
}

.is-active .line-3 {
  transform: translateY(-8px) rotate(-45deg);
  width: 100%;
}

/* --- SUB-BULLES (L'ORBITE) --- */
.sub-bubble {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.4rem;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  pointer-events: none;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.sub-bubble span {
  font-size: 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: -4px;
  font-family: 'Montserrat';
}

/* --- POSITIONNEMENT EN QUART DE CERCLE --- */
/* On utilise la trigonométrie : x = R * cos(a), y = R * sin(a) */
.is-open .sub-bubble {
  opacity: 1;
  pointer-events: auto;
}

/* Distances (Rayon d'environ 120px à 140px) */
.is-open .bubble-1 {
  transform: translate(-140px, 0);
  transition-delay: 0.1s;
}

/* 180° - Gauche */
.is-open .bubble-2 {
  transform: translate(-125px, -65px);
  transition-delay: 0.15s;
}

/* ~150° */
.is-open .bubble-3 {
  transform: translate(-85px, -115px);
  transition-delay: 0.2s;
}

/* ~125° */
.is-open .bubble-4 {
  transform: translate(-30px, -145px);
  transition-delay: 0.25s;
}

/* ~100° */
.is-open .bubble-5 {
  transform: translate(33px, -155px);
  transition-delay: 0.3s;
}

/* ~90° - Haut */

/* --- OVERLAY --- */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  z-index: 99;
  width: 100vw;
  height: 100vh;
  margin-left: -100vw;
  /* Pour couvrir tout l'écran depuis le coin */
  margin-top: -100vh;
  transform: translate(100vw, 100vh);
}
</style>