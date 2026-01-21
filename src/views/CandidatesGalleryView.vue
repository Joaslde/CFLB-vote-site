<template>
    <div class="page-container">
      <header class="page-header container mt-5 mb-5 text-center text-md-start">
         <h1 class="premium-title">Les Candidates</h1>
        <p class="premium-subtitle">Découvrez les visages de l'excellence et de l'élégance.</p>
      </header>
  
      <div class="container pb-5">
        <div class="d-flex justify-content-center">
          <div class="masonry-grid">
            <div 
              v-for="candidate in candidates" 
              :key="candidate.id" 
              :id="`candidate-${candidate.id}`"
              class="masonry-item"
              :class="{ 'highlight-pulse': highlightedId === candidate.id }"
              @click="goToProfile(candidate.id)"
            >
              <div class="candidate-card">
                <span class="candidate-id">#{{ candidate.id }}</span>
  
                <div class="card-bg" :style="{ backgroundImage: `url(${candidate.photo})` }"></div>
                
                <div class="card-overlay"></div>
  
                <div class="card-content">
                  <div class="avatar-circle">
                    <img :src="candidate.photo" :alt="candidate.nom">
                  </div>
                  <h3 class="candidate-name">{{ candidate.nom }}</h3>
                  <button class="btn-profil">Voir profil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <FloatingSearch :candidates="candidates" @highlight="handleHighlight" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { candidateService } from '../services/candidateService'; // Vérifie bien le chemin
  import FloatingSearch from '../components/FloatingSearch.vue';
  
  const router = useRouter();
  const candidates = ref([]);
  const highlightedId = ref(null);
  
  // Récupération des données réelles
  onMounted(async () => {
    try {
      candidates.value = await candidateService.getAllCandidates();
    } catch (error) {
      console.error("Erreur chargement candidates:", error);
    }
  });
  
  const goToProfile = (id) => {
    router.push({ name: 'candidate-profile', params: { id } });
  };
  
  const handleHighlight = (id) => {
    highlightedId.value = id;
    setTimeout(() => {
      if (highlightedId.value === id) {
        highlightedId.value = null;
      }
    }, 2000);
  };
  </script>
  
  <style scoped>
  .page-container {
    background-color:rgb(255, 255, 255);
  }

  @media (min-width: 768px) {
    header{
      margin-left:150px;
    }
  }
  /* --- Layout Masonry Fixé --- */
  .masonry-grid {
    display: block;
    column-count: 2; /* 2 colonnes sur mobile d'office */
    column-gap: 12px;
    width: 100%;
    max-width: 1200px; /* Centre le contenu sur grand écran */
  }
  
  @media (min-width: 768px) {
    .masonry-grid { column-count: 3; column-gap: 20px; }
  }
  
  .masonry-item {
    display: inline-block; /* Crucial pour le masonry CSS */
    width: 100%;
    margin-bottom: 12px;
    break-inside: avoid;
  }
  
  /* --- Cartes style "Image" (plus petites) --- */
  .candidate-card {
    position: relative;
    border-radius: 24px; /* Très arrondi comme sur ta photo */
    overflow: hidden;
    height: 260px; /* Plus petit pour coller au style de ta photo */
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  @media (min-width: 768px) {
    .candidate-card { height: 320px; }
  }
  
  .candidate-id {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #fff;
    font-size: 0.7rem;
    z-index: 3;
    opacity: 0.8;
  }
  
  .card-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: blur(10px) brightness(0.7);
    transform: scale(1.1);
  }
  
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7));
  }
  
  .card-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    text-align: center;
    z-index: 2;
  }
  
  .avatar-circle {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    border: 2px solid #D4AF37;
    overflow: hidden;
    margin-bottom: 8px;
    background: #eee;
  }
  
  .avatar-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .candidate-name {
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  .btn-profil {
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border: none;
    color: #fff;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.75rem;
  }

  @media (min-width: 768px) {

    .candidate-id {
      font-size:1.5rem;
    }
    
    .avatar-circle {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 3px solid #D4AF37;
    overflow: hidden;
    margin-bottom:10px;
    background: #eee;
  }
  
  .avatar-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .candidate-name {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  .btn-profil {
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border: none;
    color: #fff;
    padding: 7px 20px;
    border-radius: 20px;
    font-size: 0.75rem;
  }


  }
  
  .candidate-card:hover {
    transform: scale(1.03);
  }
  
  .highlight-pulse {
    animation: pulse-highlight 0.6s ease-in-out 0s 3;
  }
  
  @keyframes pulse-highlight {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(212, 175, 55, 0);
    }
    50% {
      transform: scale(1.04);
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.7);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(212, 175, 55, 0);
    }
  }
  </style>