<template>
  <div class="complet mt-5">
    <div class="page-container">
      
      <header class="page-header container mt-5 mb-4 text-center" id="this" >
        <h1 class="premium-title">Les Candidates</h1>
        <p class="premium-subtitle">Découvrez les visages de l'excellence et de l'élégance.</p>
      </header>

      <div class="filter-container mb-5">
        <div class="category-switch">
          <div 
            class="switch-pill" 
            :class="activeCategory === 'Styliste' ? 'slide-right' : 'slide-left'"
          ></div>
          
          <button 
            class="switch-btn" 
            :class="{ active: activeCategory === 'IA' }"
            @click="setCategory('IA')"
          >
            CANDIDATS IA
          </button>
          
          <button 
            class="switch-btn" 
            :class="{ active: activeCategory === 'Styliste' }"
            @click="setCategory('Styliste')"
          >
            STYLISTES
          </button>
        </div>
      </div>

      <div class="container pb-5">
        <div class="d-flex justify-content-center">
          <div v-if="loading" class="candidates-grid">
            <div v-for="n in 6" :key="'skel-' + n" class="grid-item">
              <div class="candidate-card skeleton-card">
                <div class="card-content">
                  <div class="avatar-circle skeleton shimmer"></div>
                  <div class="skeleton-text skeleton shimmer"></div>
                  <div class="skeleton-btn skeleton shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="candidates.length > 0" class="candidates-grid fade-in">
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

          <div v-else class="text-center text-muted py-5">
            <p>Aucune candidate dans cette catégorie pour le moment.</p>
          </div>
        </div>
      </div>

      <FloatingSearch :candidates="candidates" @highlight="handleHighlight" />
      <Footer/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { candidateService } from '../services/candidateService';
import FloatingSearch from '../components/FloatingSearch.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const candidates = ref([]);
const highlightedId = ref(null);
const loading = ref(true);

// Utilisation de 'Styliste' avec un S majuscule comme demandé
const activeCategory = ref('IA');

/**
 * Récupère les données depuis le service
 */
const fetchCandidates = async () => {
  loading.value = true;
  try {
    // Appel au service avec la catégorie active
    const data = await candidateService.getCandidatesByCategory(activeCategory.value);
    candidates.value = data;
  } catch (error) {
    console.error("Erreur chargement candidates:", error);
  } finally {
    // Un petit délai peut être ajouté ici pour tester le skeleton visuellement
    // setTimeout(() => { loading.value = false; }, 1000);
    loading.value = false;
  }
};

const setCategory = (cat) => {
  if (activeCategory.value === cat) return;
  activeCategory.value = cat;
  fetchCandidates();
};

onMounted(() => {
  fetchCandidates();
});

const goToProfile = (id) => {
  router.push({ name: 'candidate-profile', params: { id } });
};

const handleHighlight = (id) => {
  highlightedId.value = id;
  setTimeout(() => {
    if (highlightedId.value === id) highlightedId.value = null;
  }, 2000);
};
</script>

<style scoped>
/* --- ANIMATION D'APPARITION DES VRAIES CARTES --- */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- STYLE SKELETON BASE --- */
.skeleton-card {
  background: #fdfbf7 !important; /* Ivoire très clair */
  border: 1px solid #f0e6d2;
  cursor: default !important;
}

.skeleton {
  background: #eeeae0; /* Base champagne */
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

/* L'effet de balayage (Shimmer) */
.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

/* Eléments spécifiques du Skeleton */
.skeleton-text {
  width: 70%;
  height: 20px;
  margin: 15px auto;
  border-radius: 10px;
}

.skeleton-btn {
  width: 100px;
  height: 35px;
  border-radius: 20px;
  margin: 0 auto;
}

.skeleton-id {
  width: 40px;
  height: 12px;
  margin: 15px auto 0;
}

/* --- RESTE DU STYLE (SWITCH ETC) --- */
.category-switch {
  position: relative;
  display: flex;
  background: #f0f0f0;
  padding: 5px;
  border-radius: 50px;
  width: 320px;
  height: 50px;
  margin: 0 auto;
}

.switch-pill {
  position: absolute;
  top: 5px; bottom: 5px;
  width: calc(50% - 5px);
  background: #0E0E0E;
  border-radius: 50px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
}

.slide-left { transform: translateX(0); }
.slide-right { transform: translateX(100%); }

.switch-btn {
  flex: 1;
  border: none;
  background: transparent;
  z-index: 2;
  font-weight: 700;
  cursor: pointer;
  color: #888;
  transition: color 0.3s;
}

.switch-btn.active { color: #D4AF37; }
</style>

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


/* --- STYLE DU SWITCH (BOUTON GAUCHE/DROITE) --- */
.filter-container {
  display: flex;
  justify-content: center;
}

.category-switch {
  position: relative;
  display: flex;
  background: #f0f0f0; /* Fond gris clair */
  padding: 5px;
  border-radius: 50px;
  width: 320px;
  height: 50px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
}

.switch-pill {
  position: absolute;
  top: 5px;
  bottom: 5px;
  width: calc(50% - 5px);
  background: #0E0E0E; /* Noir premium */
  border-radius: 50px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
}

.slide-left { transform: translateX(0); }
.slide-right { transform: translateX(100%); }

.switch-btn {
  flex: 1;
  border: none;
  background: transparent;
  z-index: 2;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: color 0.3s;
  color: #888;
}

.switch-btn.active {
  color: #D4AF37; /* Texte doré quand actif */
}




/* --- LAYOUT GRID (Remplace le Masonry) --- */
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
  left: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.5rem;
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