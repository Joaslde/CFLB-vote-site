<template>
    <nav class="standard-pc-nav d-none d-lg-flex" :class="{ 'is-scrolled': isScrolled }">
      
      <div class="nav-brand">
        <router-link to="/">
          <img :src="logo" alt="CFLB Logo" class="nav-logo">
        </router-link>
      </div>
  
      <div class="nav-pill">
        <router-link to="/" class="nav-link" active-class="active">Accueil</router-link>
        <router-link to="/evenement" class="nav-link" active-class="active">Événement</router-link>
        <router-link to="/candidates" class="nav-link" active-class="active">Candidates</router-link>
        <router-link to="/ticket" class="nav-link gold-link" active-class="active">Ticket</router-link>
      </div>
  
      <div class="nav-socials">
        <a href="https://instagram.com" target="_blank" class="social-icon"><i class="bi bi-instagram"></i></a>
        <a href="https://tiktok.com" target="_blank" class="social-icon"><i class="bi bi-tiktok"></i></a>
        <a href="https://facebook.com" target="_blank" class="social-icon"><i class="bi bi-facebook"></i></a>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import logo from '../assets/CFLB-logo-bgless.png'; 
  
  const isScrolled = ref(false);
  
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 30;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .standard-pc-nav {
    position: fixed;
    top: 25px; /* Départ légèrement plus bas pour l'effet flottant */
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1400px;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 40px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* --- LOGO --- */
  .nav-logo {
    height: 101px;
    filter: brightness(1); /* On garde les couleurs originales ou blanc selon ton logo */
    transition: 0.3s;
  }
  
  /* --- LE PILULIER (GLASSMORPHISM) --- */
  .nav-pill {
    background: rgba(2, 1, 1, 0.137);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    padding: 10px 35px;
    display: flex;
    gap: 35px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .nav-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    transition: 0.3s;
  }
  
  .nav-link.active {
    color: #D4AF37;
  }
  .nav-link:hover{
    color:#d4af3769;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 2px;
    background: #D4AF37;
  }
  
  .gold-link {
    color: #D4AF37 !important;
    font-weight: 700;
  }
  
  /* --- RESEAUX --- */
  .nav-socials {
    display: flex;
    gap: 20px;
  }
  .social-icon {
    color: white;
    font-size: 1.2rem;
    transition: 0.3s;
  }
  .social-icon:hover {
    color: #D4AF37;
    transform: translateY(-2px);
  }
  
  /* --- ÉTAT SCROLLÉ (STICKY) --- */
  .is-scrolled {
    top: 0;
    width: 100%;
    max-width: none;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.85); /* Plus opaque au scroll */
    border-bottom: 1px solid rgba(212, 175, 55, 0.3); /* Ligne dorée subtile en bas */
    padding: 3px 60px;
  }
  
  .is-scrolled .nav-pill {
    background: transparent;
    border: none;
    box-shadow: none;
  }
  </style>