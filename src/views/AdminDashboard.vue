<template>
    <div class="admin-wrapper">
      <div v-if="!isAuthenticated" class="login-container">
        <div class="login-card fade-in-up">
          <h2 class="premium-title text-gold mb-3">Accès Sécurisé</h2>
          <form @submit.prevent="checkPassword" class="login-form">
            <input type="password" v-model="passwordInput" placeholder="Mot de passe" class="premium-input" required />
            <p v-if="errorMessage" class="error-text mt-2">{{ errorMessage }}</p>
            <button type="submit" class="btn-gold mt-4 w-100">DÉVERROUILLER</button>
          </form>
        </div>
      </div>
  
      <div v-else class="dashboard-container">
        <nav class="admin-nav">
          <div class="nav-brand text-gold font-premium">Admin CFLB</div>
          <div class="nav-links">
            <a href="#overview" class="nav-link">Vue d'ensemble</a>
            <a href="#votes" class="nav-link">Analytique Votes</a>
            <a href="#tickets" class="nav-link">Analytique Tickets</a>
          </div>
          <button @click="logout" class="btn-logout">Déconnexion</button>
        </nav>
  
        <main class="dashboard-content" v-if="!loading">
          <header id="overview" class="dashboard-header mb-5">
            <h1 class="font-premium">Tableau de Bord Financier</h1>
            <div class="revenue-banner mt-4">
              <div class="revenue-info">
                <span class="revenue-label">REVENU GÉNÉRAL TOTAL (VOTES + TICKETS)</span>
                <h2 class="revenue-amount">{{ formatCurrency(totalGlobalRevenue) }}</h2>
              </div>
            </div>
          </header>
  
          <section class="mb-5">
            <h3 class="section-title">Évolution des ventes de tickets</h3>
            <div class="chart-container card-dark">
              <Line v-if="chartDataReady" :data="chartData" :options="chartOptions" />
            </div>
          </section>
  
          <div class="dashboard-grid">
            <section id="votes" class="grid-card">
              <h3 class="card-title">Analytique des Votes (100 FCFA/vote)</h3>
              
              <div class="filter-buttons mb-4">
                <button :class="['btn-filter', { active: voteFilter === 'all' }]" @click="voteFilter = 'all'">Tous</button>
                <button :class="['btn-filter', { active: voteFilter === 'Styliste' }]" @click="voteFilter = 'Styliste'">Stylistes (Filles)</button>
                <button :class="['btn-filter', { active: voteFilter === 'IA' }]" @click="voteFilter = 'IA'">IA</button>
              </div>
  
              <div class="stat-big mb-3">
                <span class="stat-value">{{ filteredVotesCount }}</span>
                <span class="stat-label">Votes enregistrés</span>
              </div>
              <div class="stat-revenue text-gold">
                Revenu : {{ formatCurrency(filteredVotesCount * 100) }}
              </div>
            </section>
  
            <section id="tickets" class="grid-card">
               <h3 class="card-title">Analytique des Tickets (3.000 FCFA/ticket)</h3>
               <div class="stat-big mb-3 mt-4">
                <span class="stat-value">{{ ticketsCount }}</span>
                <span class="stat-label">Tickets payés</span>
              </div>
              <div class="stat-revenue text-gold">
                Revenu : {{ formatCurrency(ticketsCount * 3000) }}
              </div>
            </section>
          </div>
  
          <section id="candidates" class="mt-5 mb-5">
            <h3 class="section-title">Détails par Candidate</h3>
            <div class="candidates-stats-grid">
              <div v-for="c in candidates" :key="c.id" class="candidate-stat-card">
                <div>
                  <span class="c-name">{{ c.nom }}</span>
                  <span :class="['c-type', c.categorie]">{{ c.categorie }}</span>
                </div>
                <div class="text-end">
                  <div class="c-votes">{{ c.votes_count }} votes</div>
                  <div class="text-gold small">{{ formatCurrency(c.votes_count * 100) }}</div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <div v-else class="loading-state">Chargement des données...</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { Line } from 'vue-chartjs';
  import { analyticService } from '../services/analyticService';
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
  // AUTH
  const isAuthenticated = ref(false);
  const passwordInput = ref('');
  const errorMessage = ref('');
  const loading = ref(true);
  
  // DATA
  const candidates = ref([]);
  const ticketsCount = ref(0);
  const voteFilter = ref('all');
  const dailySales = ref({});
  const chartDataReady = ref(false);
  
  const checkPassword = () => {
    if (passwordInput.value === import.meta.env.VITE_ADMIN_PASSWORD) {
      isAuthenticated.value = true;
      loadAllData();
    } else {
      errorMessage.value = "Code incorrect.";
    }
  };
  
  const loadAllData = async () => {
    try {
      loading.value = true;
      const [candData, tickData, dailyData] = await Promise.all([
        analyticService.getCandidatesStats(),
        analyticService.getTicketsStats(),
        analyticService.getDailyTicketSales()
      ]);
      
      candidates.value = candData;
      ticketsCount.value = tickData.count;
      dailySales.value = dailyData;
      chartDataReady.value = true;
    } catch (err) {
      console.error("Erreur DB:", err);
    } finally {
      loading.value = false;
    }
  };
  
  // CALCULS FINANCIERS
  const filteredVotesCount = computed(() => {
    if (voteFilter.value === 'all') {
      return candidates.value.reduce((acc, c) => acc + (c.votes_count || 0), 0);
    }
    return candidates.value
      .filter(c => c.categorie === voteFilter.value)
      .reduce((acc, c) => acc + (c.votes_count || 0), 0);
  });
  
  const totalVotesRevenue = computed(() => {
    return candidates.value.reduce((acc, c) => acc + (c.votes_count || 0), 0) * 100;
  });
  
  const totalTicketsRevenue = computed(() => ticketsCount.value * 3000);
  
  const totalGlobalRevenue = computed(() => totalVotesRevenue.value + totalTicketsRevenue.value);
  
  // CONFIG GRAPHIQUE
  const chartData = computed(() => ({
    labels: Object.keys(dailySales.value),
    datasets: [{
      label: 'Tickets vendus',
      borderColor: '#D4AF37',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      data: Object.values(dailySales.value),
      fill: true,
      tension: 0.4
    }]
  }));
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
      x: { grid: { display: false } }
    }
  };
  
  const formatCurrency = (v) => new Intl.NumberFormat('fr-BJ').format(v) + ' FCFA';
  const logout = () => { isAuthenticated.value = false; };
  </script>  
  <style scoped>
  /* --- GLOBALS --- */
  .admin-wrapper {
    min-height: 100vh;
    background: #f4f4f4;
    font-family: 'Montserrat', sans-serif;
  }
  
  .text-gold { color: #D4AF37; }
  .font-premium { font-family: 'Lobster', cursive; }
  .scroll-mt { scroll-margin-top: 100px; } /* Pour que l'ancre ne soit pas cachée par le header */
  
  /* --- 1. LOGIN SCREEN --- */
  .login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0E0E0E;
  }
  
  .login-card {
    background: #1a1a1a;
    padding: 40px;
    border-radius: 15px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    border: 1px solid rgba(212, 175, 55, 0.2);
    box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  }
  
  .premium-input {
    width: 100%;
    padding: 15px;
    border: 1px solid #333;
    background: #0E0E0E;
    color: white;
    border-radius: 8px;
    margin-top: 10px;
  }
  .premium-input:focus { outline: none; border-color: #D4AF37; }
  
  .error-text { color: #DC3545; font-size: 0.9rem; }
  
  .btn-gold {
    background: #D4AF37;
    color: #0E0E0E;
    border: none;
    padding: 15px;
    font-weight: 700;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-gold:hover { background: #c5a028; }
  
  /* --- 2. DASHBOARD LAYOUT --- */
  .dashboard-container {
    display: flex;
    flex-direction: column;
  }
  
  /* NAVBAR RESPONSIVE */
  .admin-nav {
    background: #0E0E0E;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .nav-brand { font-size: 1.5rem; }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: 0.3s;
  }
  .nav-link:hover { color: #D4AF37; }
  
  .btn-logout {
    background: transparent;
    border: 1px solid #DC3545;
    color: #DC3545;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-logout:hover { background: #DC3545; color: white; }
  
  /* MAIN CONTENT */
  .dashboard-content {
    padding: 40px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  
  /* BANNIERE REVENU */
  .revenue-banner {
    background: linear-gradient(135deg, #0E0E0E, #222);
    color: white;
    padding: 40px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border-left: 5px solid #D4AF37;
  }
  
  .revenue-label { font-size: 1rem; letter-spacing: 2px; opacity: 0.8; }
  .revenue-amount { font-size: 3.5rem; color: #D4AF37; font-weight: 800; margin: 10px 0 0 0; }
  .revenue-details { display: flex; gap: 15px; font-size: 1.1rem; opacity: 0.9; }
  .divider { color: #D4AF37; }
  
  /* CHARTS */
  .card-dark {
    background: #0E0E0E;
    padding: 20px;
    border-radius: 15px;
    height: 400px;
  }
  
  /* GRILLES DE STATS (Le fameux 2 colonnes / 1 colonne) */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
  }
  
  .grid-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  }
  
  .card-title { font-size: 1.2rem; font-weight: 700; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
  
  /* SWITCH BUTTONS */
  .filter-buttons {
    display: flex;
    background: #f1f1f1;
    border-radius: 50px;
    padding: 5px;
    gap: 5px;
  }
  
  .btn-filter {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-filter.active { background: #D4AF37; color: white; }
  
  /* STATS TEXTES */
  .stat-big { display: flex; flex-direction: column; }
  .stat-value { font-size: 3rem; font-weight: 800; line-height: 1; }
  .stat-label { font-size: 1rem; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }
  .stat-revenue { font-size: 1.5rem; font-weight: 700; background: #fafafa; padding: 15px; border-radius: 10px; display: inline-block; }
  
  /* LISTE DES CANDIDATES (Alternative aux tableaux) */
  .candidates-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .candidate-stat-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    border-left: 4px solid #333;
  }
  
  .c-name { display: block; font-weight: 700; font-size: 1.1rem; }
  .c-type { font-size: 0.8rem; padding: 3px 8px; border-radius: 20px; color: white; display: inline-block; margin-top: 5px; }
  .c-type.fille { background: #DC3545; }
  .c-type.ia { background: #0E0E0E; }
  
  .c-stats { text-align: right; }
  .c-votes { font-weight: 600; font-size: 1.2rem; }
  .c-money { font-weight: 700; font-size: 0.9rem; }
  
  /* --- RESPONSIVE --- */
  @media (min-width: 1024px) {
    /* Affichage en Sidebar sur PC */
    .dashboard-container { flex-direction: row; }
    .admin-nav {
      flex-direction: column;
      width: 280px;
      height: 100vh;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 40px 20px;
    }
    .nav-brand { margin-bottom: 50px; }
    .nav-links { flex-direction: column; width: 100%; }
    .nav-link { padding: 15px; width: 100%; border-radius: 8px; }
    .nav-link:hover { background: rgba(255,255,255,0.05); }
    .btn-logout { margin-top: auto; width: 100%; }
    .dashboard-content { height: 100vh; overflow-y: auto; }
  }
  
  @media (max-width: 768px) {
    .dashboard-content { padding: 20px; }
    .revenue-banner { flex-direction: column; align-items: flex-start; gap: 20px; }
    .revenue-amount { font-size: 2.5rem; }
    .revenue-details { flex-direction: column; gap: 5px; }
    .divider { display: none; }
    .nav-links { display: none; /* Cacher les liens sur mobile pour gagner de la place, ou faire un menu burger */ }
  }
  </style>