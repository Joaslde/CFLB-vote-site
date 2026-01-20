<template>
    <div class="profile-page" v-if="candidate">
      <button class="back-button" @click="$router.push('/candidates')">
        <i class="bi bi-chevron-left"></i>
      </button>
  
      <div class="hero-background" :style="{ backgroundImage: `url(${candidate.photo})` }"></div>
      <div class="hero-overlay"></div>

      <div class="info-card-container">
        <div class="info-card">
          <div class="card-header d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="candidate-hashtag">#candidate{{ candidate.id }}</span>
              <h1 class="candidate-name">{{ candidate.nom }}</h1>
              <p class="candidate-category">{{ candidate.categorie }}</p>
            </div>
            <div class="event-logo-circle">
              <img :src="logo" alt="Logo Glow Empire">
            </div>
          </div>

          <div class="stats-row d-flex my-3">
            <div class="stat-item">
              <span class="stat-value">{{ candidate.votes_count || 0 }}</span>
              <span class="stat-label">Votes</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">Actif</span>
              <span class="stat-label">Statut</span>
            </div>
          </div>

          <button class="btn-vote" @click="handleVote">
            VOTER MAINTENANT
          </button>
        </div>
      </div>
    </div>
  
    <div v-else class="loading-state">
      <div class="spinner-border text-warning" role="status"></div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { candidateService } from '../services/candidateService';
import logo from '../assets/CFLB-logo-bgless.png';
  
  const route = useRoute();
  const candidate = ref(null);
  
  onMounted(async () => {
    try {
      const id = route.params.id;
      candidate.value = await candidateService.getCandidateById(id);
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
    }
  });
  
  const handleVote = () => {
    console.log("Action de vote pour:", candidate.value.nom);
    // Ici on ajoutera la logique de paiement/vote plus tard
  };
  </script>
  
  <style scoped>
  .profile-page {
    position: relative;
    min-height: 100vh;
    width: 100%;
    background-color: #000;
    color: white;
  }
  
  /* Background Image - Mobile: plein écran */
  .hero-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    z-index: 1;
  }
  
  .hero-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 70%);
    z-index: 2;
  }
  
  /* Desktop: Image à taille normale */
  @media (min-width: 780px) {
    .profile-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      min-height: 100vh;
    }
    
    .hero-background {
      left:32%;    
      position: absolute;
      width: 510px;
      height: max-width;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }
    
    .hero-overlay {
      display: none; /* Pas besoin d'overlay sur desktop */
    }
  }
  
  /* Bouton Retour - Mobile: position fixe */
  .back-button {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
  }
  
  /* Desktop: Bouton retour position relative */
  @media (min-width: 780px) {
    .back-button {
      position: absolute;
      width: 44px;
      height: 45px;
      font-size: 1.2rem;
      top: 21px;
      left: 228px;
      margin-top: 42px;
      margin-bottom: 7px;
      margin-left: 9px;
    }
  }
  
  /* Info Card (Style Glassmorphism) - Mobile: position absolue */
  .info-card-container {
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 100%;
    padding: 0 20px;
    z-index: 5;
    display: flex;
    justify-content: center;
  }

  /* Masquer la version desktop sur mobile */
  .info-card-container-desktop,
  .info-card-desktop {
    display: none;
  }

  /* Masquer la version mobile sur desktop */
  @media (min-width: 780px) {
    .info-card-container-mobile,
    .info-card-mobile {
      display: none;
    }

    .info-card-container-desktop {
      display: block;
      position: relative;
      bottom: auto;
      width: auto;
      padding: 0;
    }

    .info-card-desktop {
      display: block;
    }
  }
  
  .info-card,
  .info-card-desktop {
    background: rgba(20, 20, 20, 0.6);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    padding: 20px;
    max-width: 13rem; /* 208px - même largeur mobile et desktop */
    width: 100%;
    margin: 0 auto;
  }
  
  .candidate-hashtag {
    color: #D4AF37;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  
  .candidate-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 4px 0;
    line-height: 1.2;
  }
  
  .candidate-category {
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    font-size: 0.65rem;
    letter-spacing: 1px;
  }
  
  /* Logo de l'événement */
  .event-logo-circle {
    width: 45px;
    height: 45px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
    flex-shrink: 0;
  }
  
  .event-logo-circle img {
    width: 100%;
    height: auto;
  }
  
  /* Stats */
  .stats-row {
    gap: 1rem;
  }
  
  @media (min-width: 780px) {
    .stats-row {
      gap: 1.5rem;
    }
  }
  
  .stat-value {
    display: block;
    font-size: 1rem;
    font-weight: 700;
  }
  
  .stat-label {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }
  
  /* Bouton Vote */
  .btn-vote {
    width: 100%;
    background: linear-gradient(135deg, #D4AF37, #FFD700);
    border: none;
    color: #000;
    padding: 12px;
    border-radius: 15px;
    font-weight: 800;
    font-size: 0.75rem;
    letter-spacing: 1px;
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
    transition: transform 0.3s ease;
  }

  .btn-vote:hover {
    transform: scale(1.04);
    box-shadow: 0 12px 32px rgba(212, 175, 55, 0.45);
    filter: brightness(1.11);
  }

  /* Responsive Mobile - Réduction légère de la taille */
  @media (max-width: 779px) {
    .info-card-container {
      padding: 0 16px;
      bottom: 16px;
      height:14.5rem;
    }

    .info-card {
      max-width: 15.5rem; /* 184px - réduit de 208px */
      padding: 16px;
      border-radius: 20px;
    }

    .card-header {
      margin-bottom: 12px;
    }

    .candidate-hashtag {
      font-size: 0.65rem;
    }

    .candidate-name {
      font-size: 1.25rem;
      margin: 3px 0;
    }

    .candidate-category {
        margin-top:18px;
      font-size: 0.6rem;
      margin-bottom:-.2rem;

    }

    .event-logo-circle {
      width: 40px;
      height: 40px;
      padding: 3px;
      margin-top:2.2rem;

    }

    .stats-row {
      gap: 0.75rem;
      margin-top: 12px;
      margin-bottom: 12px;
    }

    .stat-value {
      font-size: 0.9rem;
    }

    .stat-label {
      font-size: 0.6rem;
    }

    .btn-vote {
      padding: 10px;
      font-size: 0.7rem;
      border-radius: 12px;
    }
  }

  /* Responsive Desktop - modifications spécifiques */
  @media (min-width: 780px) {
    .info-card-desktop {
      max-width: 248px;
      width: 248px;
      height: 275px;
      padding-top: 29px;
      padding-bottom: 37px;
      padding-left: 25px;
      padding-right: 25px;
      border-radius: 30px;
      margin-top: -311px;
      margin-bottom: 1px;
      z-index: 5;
    }
    
    .card-header {
      margin-top: -6px;
      margin-bottom: -3px;
    }
    
    .candidate-hashtag {
      font-size: 0.75rem;
    }
    
    .candidate-name {
      font-size: 1.5rem;
    }
    
    .candidate-category {
      font-size: 0.7rem;
      margin-top: 9px;
      margin-bottom: -4px;
    }
    
    .event-logo-circle {
      width: 52px;
      height: 52px;
      margin-top: 24px;
      margin-left: -22px;
      margin-right: -6px;
    }
    
    .stats-row {
      margin-top: 15px;
      margin-bottom: 9px;
    }
    
    .stat-value {
      font-size: 1.1rem;
    }
    
    .stat-label {
      font-size: 0.7rem;
    }
    
    .btn-vote {
      padding: 14px;
      font-size: 0.8rem;
      border-radius: 18px;
    }
  }
  
  .btn-vote:active {
    transform: scale(0.95);
  }
  
  .loading-state {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
  }
  </style>