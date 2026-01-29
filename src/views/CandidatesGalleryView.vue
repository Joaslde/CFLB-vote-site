<template>
  <div class="complet">
    <div class="page-container">
      <header class="page-header container mt-5 mb-5 text-center text-md-start">
        <h1 class="premium-title">Les Candidates</h1>
        <p class="premium-subtitle">Découvrez les visages de l'excellence et de l'élégance.</p>
      </header>
  
      <div class="container pb-5">
        <div class="d-flex justify-content-center">
          <div class="candidates-grid">
  <div 
    v-for="(candidate, index) in candidates" 
    :key="candidate.id" 
    :id="`candidate-${candidate.id}`"
    class="grid-item"
    :class="{ 'highlight-pulse': highlightedId === candidate.id }"
    @click="goToProfile(candidate.id)"
  >
    <div class="candidate-card">
      <div v-if="index === 0" class="winner-crown">
        <img width="60" height="60" src="https://img.icons8.com/3d-fluency/94/crown.png" alt="crown"/>
      </div>

      
      <div class="candidate-rank">
          {{ index + 1 }}{{ index === 0 ? 'ère' : 'ème' }}
        </div>

      <div class="card-bg" :style="{ backgroundImage: `url(${candidate.photo})` }"></div>
      <div class="card-overlay"></div>

      <div class="card-content">
        <div class="avatar-circle">
          <img :src="candidate.photo" :alt="candidate.nom">
        </div>
        <h3 class="candidate-name">{{ candidate.nom }}</h3>
        <button class="btn-profil">Voir profil</button>
        <span class="candidate-id">#{{ candidate.id }}</span>
       
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
  
      <FloatingSearch :candidates="candidates" @highlight="handleHighlight" />
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { candidateService } from '../services/candidateService';
import FloatingSearch from '../components/FloatingSearch.vue';
  
const router = useRouter();
const candidates = ref([]);
const highlightedId = ref(null);
  
onMounted(async () => {
  try {
    const data = await candidateService.getAllCandidates();
    // TRI PAR VOTES : On trie du plus grand au plus petit
    candidates.value = data.sort((a, b) => {
      return (b.votes_count || 0) - (a.votes_count || 0);
    });
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
/* IMPORT DES POLICES GOOGLE */
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat:wght@300;400;600;700&display=swap');

/* VARIABLES DE STYLE */
:offset {
  --font-premium: 'Lobster', cursive;
  --font-main: 'Montserrat', sans-serif;
  --color-red: #e63946; /* Un beau rouge élégant */
}

.page-container {
  background-color: rgb(255, 255, 255);
  font-family: 'Montserrat', sans-serif;
}

/* STYLE DES TITRES */
.premium-title {
  font-family: 'Lobster', cursive;
  color: var(--color-red, #e60417);
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.premium-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  color: #000000;
  font-size: 1.1rem;
}

@media (min-width: 768px) {
  header {
    margin-left: 150px;
  }
  .premium-title {
    font-size: 4rem;
  }
}

/* --- NOUVEAU LAYOUT GRID (Remplace le Masonry) --- */
.candidates-grid {
  display: grid;
  /* 2 colonnes sur mobile par défaut */
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 1200px;
  padding: 10px;
}

@media (min-width: 768px) {
  .candidates-grid {
    /* 3 colonnes sur PC */
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

.grid-item {
  width: 100%;
}

/* --- Cartes style --- */
.candidate-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 280px; /* Légèrement plus grand pour le confort mobile */
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .candidate-card { height: 300px; }
  .btn-profil { margin-top:2px;}
}

.candidate-id {
  position: absolute;
  bottom: 2px;
  left: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  opacity:.5;
  color: #ffffff; /* Couleur dorée */
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  /* On réduit un peu le flou pour voir la silhouette */
  filter: blur(5px) brightness(0.6);
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

.candidate-card:hover .card-bg {
  transform: scale(1.2);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8));
}

.card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Contenu vers le bas */
  align-items: center;
  padding: 20px;
  text-align: center;
  z-index: 2;
}

.avatar-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #e6b515;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate-name {
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.btn-profil {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: 'Montserrat', sans-serif;
  transition: 0.3s;
}

.btn-profil:hover {
  background: #D4AF37;
  color: #000;
  border-color: #D4AF37;
}
@media (max-width: 500px) {

  .btn-profil {
    margin-top: 3px;
    font-size: 11px;
  }
  .candidate-card { height: 250px; }
}

@media (min-width: 768px) {
  .avatar-circle { width: 120px; height: 120px; border-width: 3px; }
  .candidate-name { font-size: 1.6rem; }
  .candidate-id { font-size: 1.2rem; }
}

.candidate-card:hover {
  transform: translateY(-10px);
}

/* Animation Pulse */
.highlight-pulse {
  animation: pulse-highlight 0.6s ease-in-out 0s 3;
}

@keyframes pulse-highlight {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(212, 175, 55, 0.6); }
  100% { transform: scale(1); }
}
/* --- STYLE DE LA COURONNE --- */
.winner-crown {
  position: absolute;
  top: 10px; /* Elle dépasse légèrement en haut */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  filter: drop-shadow(0 0 20px #e6b515);
  animation: float-crown 3s ease-in-out infinite, glow-crown 2s ease-in-out infinite alternate;
}

@keyframes float-crown {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

@keyframes glow-crown {
  from { filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5)); }
  to { filter: drop-shadow(0 0 20px rgba(212, 175, 55, 1)); }
}

/* --- STYLE DU RANG --- */
.candidate-rank {
  position: absolute;
  top: 12px;
  left: 10px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 3;
  padding: 2px 10px;
  border-radius: 10px;

}

/* Ajustement pour mobile */
@media (max-width: 768px) {
  .winner-crown img {
    width: 45px;
    height: 45px;
  }
  .candidate-rank {
    font-size: 0.6rem;
  }
}
</style>