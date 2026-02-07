<script setup>
import logo from '../assets/CFLB-logo-bgless.png';
</script>
<template>
  <nav class="standard-pc-nav d-none d-lg-flex">

    <div class="nav-brand">
      <router-link to="/">
        <img :src="logo" alt="CFLB Logo" class="nav-logo">
      </router-link>
    </div>

    <div class="nav-links-container">
      <router-link to="/" class="nav-link" exact >Accueil</router-link>
      <router-link to="/evenement" class="nav-link" >Événement</router-link>
      <router-link to="/candidates" class="nav-link" >Candidates</router-link> <router-link
        to="/ticket" class="nav-link gold-link" >Ticket</router-link>
    </div>

    <div class="nav-socials">
      <a href="#" class="social-icon"><i class="bi bi-instagram"></i></a>
      <a href="#" class="social-icon"><i class="bi bi-tiktok"></i></a>
      <a href="#" class="social-icon"><i class="bi bi-facebook"></i></a>
    </div>
  </nav>
</template>

<style scoped>
.standard-pc-nav {
  /* STICKY : Elle occupe sa place dans le flux vertical puis reste en haut au scroll */
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;

  /* Style demandé (Sombre et opaque) */
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  /* Alignement */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  /* On garde un peu d'air pour le logo */
}

.nav-logo {
  height: 50px;
  width: auto;
  transition: 0.3s;
}

/* Conteneur de liens simple */
.nav-links-container {
  display: flex;
  gap: 40px;
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
  /* Indispensable pour le placement du trait */
  padding: 5px 0;
  transition: 0.3s;
}

/* HOVER : On prépare l'apparition douce */
.nav-link:hover {
  color: #fff;
}

/* ACTIVE & HOVER : Le soulignement jaune */
/* On utilise 'router-link-active' qui est la classe par défaut de Vue, 
   ou 'active' si tu l'as forcée dans le template */
.nav-link.active::after,
.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  /* Ajuste selon la hauteur de ta navbar */
  left: 0;
  width: 100%;
  height: 3px;
  /* Un peu plus épais pour bien le voir */
  background-color: #D4AF37;
  /* Ton jaune doré */
  border-radius: 2px;
  transition: all 0.3s ease;
}

.gold-link {
  color: #D4AF37 !important;
  font-weight: 700;
}

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
</style>