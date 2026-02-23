<template>
  <div class="profile-page-wrapper">

    <div class="profile-page" v-if="candidate">
      <button class="back-button" @click="router.push('/candidates')">
        <i class="bi bi-chevron-left"></i>
      </button>

      <div class="hero-background" :style="{ backgroundImage: `url(${candidate.photo})` }"></div>
      <div class="hero-overlay"></div>

      <div class="info-card-container">
        <div class="info-card">
          <div class="card-header d-flex justify-content-between align-items-start mb-3">
            <div>
              <span class="candidate-hashtag">#candidate{{ candidate.id }}</span>
              <h1 class="candidate-name">{{ candidate.nom_complet }}</h1>
              <p class="candidate-category">{{ candidate.categorie }}</p>
            </div>
            <div class="event-logo-circle">
              <img :src="logo" alt="Logo">
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

          <button class="btn-vote" @click="showVoteModal = true">
            VOTER MAINTENANT
          </button>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="showVoteModal" class="modal-overlay" @click.self="showVoteModal = false">
          <div class="vote-modal">
            <div class="modal-header-custom">
              <h2>Soutenir {{ candidate.nom }}</h2>
              <button class="close-btn" @click="showVoteModal = false">&times;</button>
            </div>

            <div class="modal-body-custom">
              <div class="input-group-custom">
                <label>Nombre de votes souhaité</label>
                <input type="number" v-model="voteAmount" min="1" max="100" class="vote-input" />
              </div>

              <div class="input-group-custom mt-4">
                <label>Prix total (FCFA)</label>
                <input type="text" :value="totalPrice + ' FCFA'" disabled class="price-display" />
              </div>

              <button class="btn-pay mt-5" @click="initiatePayment" :disabled="voteAmount < 1">
                PAYER {{ totalPrice }} FCFA
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="slide-fade">
        <div v-if="notification.show" class="notification-container" :class="notification.type">
          <div class="notification-content">
            <div class="notification-icon">
              <i v-if="notification.type === 'success'" class="bi bi-check-circle-fill"></i>
              <i v-else class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div class="notification-text">
              {{ notification.message }}
            </div>
            <button class="notification-close" @click="notification.show = false">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <div v-else class="loading-state">
      <div class="spinner-border" style="color: #D4AF37; width: 3rem; height: 3rem;" role="status"></div>
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { candidateService } from '../services/candidateService';
import { ticketService } from '../services/ticketService'; // ← MANQUAIT ÇA
import logo from '../assets/CFLB-logo-bgless.png';
import { useHead } from '@vueuse/head';

// 1. DÉCLARER LES RÉFÉRENCES EN PREMIER
const route = useRoute();
const router = useRouter();
const candidate = ref(null);
const showVoteModal = ref(false);
const voteAmount = ref(1);
const PRICE_PER_VOTE = 100;
const notification = ref({ show: false, message: '', type: 'success' });
//exemple
// 2. DÉCLARER LES COMPUTED APRÈS LE CANDIDAT
const previewImage = computed(() => candidate.value?.photo || 'https://cflb.fr/preview-home.jpg');
const candidateName = computed(() => candidate.value?.nom || 'Candidate CFLB');
const candidateCategory = computed(() => candidate.value?.categorie || 'Leadership féminin');
const totalPrice = computed(() => voteAmount.value * PRICE_PER_VOTE);

// 3. SEO RÉACTIF (useHead accepte des computed)
useHead({
  title: () => `${candidateName.value} | Conférence des Femmes Leaders du Bénin 2026`,
  meta: [
    {
      name: 'description',
      content: () => `${candidateName.value} (${candidateCategory.value}) - Découvrez son profil et soutenez-la.`
    },
    { property: 'og:title', content: () => `${candidateName.value} | CFLB 2026` },
    { property: 'og:description', content: () => `Soutenez ${candidateName.value} à la CFLB 2026.` },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: () => window.location.href },
    { property: 'og:image', content: () => previewImage.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: () => previewImage.value },
  ],
  link: [
    { rel: 'canonical', href: () => window.location.href }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": candidateName.value,
        "image": previewImage.value,
        "url": window.location.href,
        "description": `Candidate CFLB 2026 - ${candidateCategory.value}`
      }))
    }
  ]
});

// 4. LE RESTE DE TA LOGIQUE
  const loadCandidate = async () => {
    try {
      candidate.value = await candidateService.getCandidateById(route.params.id);
    } catch (error) {
      console.error("Erreur profil:", error);
    }
  };

  const showNotify = (msg, type = 'success') => {
    notification.value = { show: true, message: msg, type: type };
  };

  onMounted(() => {
    loadCandidate();
    window.addKkiapayListener('success', handleKkiapaySuccess);
  });

  onUnmounted(() => {
    window.removeKkiapayListener('success', handleKkiapaySuccess);
  });

  // Dans initiatePayment()
  const initiatePayment = async () => {
    if (!candidate.value) return;

    const transactionRef = `tmp_${candidate.value.id}_${Date.now()}`;

    await ticketService.createPendingPayment({
      transactionRef,
      candidateId: candidate.value.id,
      voteCount: voteAmount.value,
      amount: totalPrice.value
    });

    localStorage.setItem('current_payment_ref', transactionRef);

    window.openKkiapayWidget({
      amount: totalPrice.value,
      position: "right",
      // label = notre transactionRef → apparaît dans stateData du webhook
      label: transactionRef,
      data: { candidateId: candidate.value.id, voteCount: voteAmount.value },
      key: "942cbc25f83c21b1f0ac7161490d56b2ea1f6b34",
      sandbox: false
    });
  };
  // Dans handleKkiapaySuccess()
  const handleKkiapaySuccess = async (response) => {
    const kkiapayTransactionId = response?.transactionId;
    const transactionRef = localStorage.getItem('current_payment_ref');

    // Anti-double traitement
      const alreadyDone = await ticketService.isTransactionAlreadyDone(kkiapayTransactionId);
     if (alreadyDone) {
    // Webhook a déjà traité — juste update l'UI
    const votesToAdd = parseInt(voteAmount.value);
    if (candidate.value) candidate.value.votes_count += votesToAdd;
    localStorage.removeItem('current_payment_ref');
    showVoteModal.value = false;
    voteAmount.value = 1;
    showNotify(` Vos ${votesToAdd} votes ont été ajoutés !`);
    return;
  }

  const candidateId = candidate.value?.id;
  const votesToAdd = parseInt(voteAmount.value);

  // ENSUITE le guard
  if (!candidateId || isNaN(votesToAdd) || votesToAdd < 1) {
    console.error('VOTE_FAIL - refs perdues', { candidateId, votesToAdd });
    showNotify("Erreur technique. Contactez le support.", "error");
    return;
  }  

  try {
      // 1. Incrémenter les votes
      await candidateService.incrementVotes(candidateId, votesToAdd);

      // 2. Mettre à jour le pending → done
      await ticketService.resolvePendingPayment(transactionRef, kkiapayTransactionId);

      // 3. Update UI
      if (candidate.value) candidate.value.votes_count += votesToAdd;
      localStorage.removeItem('current_payment_ref');
      showVoteModal.value = false;
      voteAmount.value = 1;
      showNotify(`Vos ${votesToAdd} votes ont été ajoutés !`);

    } catch (error) {
  // Vérifier si le webhook a déjà sauvé entre temps
  const savedByWebhook = await ticketService.isTransactionAlreadyDone(kkiapayTransactionId);
  if (savedByWebhook) {
    // Webhook a sauvé — juste update UI
    if (candidate.value) candidate.value.votes_count += votesToAdd;
    localStorage.removeItem('current_payment_ref');
    showVoteModal.value = false;
    voteAmount.value = 1;
    showNotify(` Vos ${votesToAdd} votes ont été ajoutés !`);
    return;
  }
  // Vraie erreur — ni webhook ni frontend n'a réussi
  await ticketService.failPendingPayment(transactionRef);
  console.error('VOTE_FAIL', { kkiapayTransactionId, candidateId, votesToAdd });
  showNotify("Paiement reçu mais erreur technique. Contactez le support.", "error");
}
  };

// const initiatePayment = () => {
//   if (!candidate.value) return;
//   window.openKkiapayWidget({
//     amount: totalPrice.value,
//     position: "right",
//     callback: "",
//     data: { candidateId: candidate.value.id, voteCount: voteAmount.value },
//     key: "942cbc25f83c21b1f0ac7161490d56b2ea1f6b34", //  clé reel
//     //key: "28970c60ec7211f0831cdb9efbf9fe95", //  clé sandbox
//      sandbox: false
//   });
// };

// const handleKkiapaySuccess = async (response) => {
//   const votesToAdd = parseInt(voteAmount.value);
//   const candidateId = candidate.value?.id;
//   if(!candidateId) return;

//   try {
//     await candidateService.incrementVotes(candidateId, votesToAdd);
//     if (candidate.value) {
//       candidate.value.votes_count = (candidate.value.votes_count || 0) + votesToAdd;
//     }
//     showVoteModal.value = false;
//     voteAmount.value = 1; 
//     showNotify(`Félicitations ! Vos ${votesToAdd} votes ont été ajoutés.`);
//   } catch (error) {
//     showNotify("Erreur technique lors de la mise à jour.", "error");
//   }
// };
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 20%, transparent 70%);
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
    left: 32%;
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
    display: none;
    /* Pas besoin d'overlay sur desktop */
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
  max-width: 13rem;
  /* 208px - même largeur mobile et desktop */
  width: 100%;
  margin: 0 auto;
}

.candidate-hashtag {
  color: #eea810;
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
  background: linear-gradient(135deg, #cfaa2e, #eea810);
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
    height: 14.5rem;
  }

  .info-card {
    max-width: 15.5rem;
    /* 184px - réduit de 208px */
    padding: 16px;
    border-radius: 20px;
  }

  .card-header {
    margin-bottom: 12px;
  }

  .candidate-hashtag {
    font-size: .65rem;
  }

  .candidate-name {
    font-size: 1.22rem;
    margin: 3px 0;

  }

  .candidate-category {
    margin-top: 10px;
    font-size: 0.6rem;
    margin-bottom: -.7rem;

  }

  .event-logo-circle {
    width: 40px;
    height: 40px;
    padding: 3px;
    margin-top: 2.2rem;


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
    font-size: 1.59rem;
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




/* Pop up */


/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.vote-modal {
  background: rgba(30, 30, 30, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.modal-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.modal-header-custom h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #FFD700;
  /* Doré */
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  line-height: 1;
}

.input-group-custom label {
  display: block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.vote-input,
.price-display {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  color: white;
  font-size: 1.2rem;
  outline: none;
}

.vote-input:focus {
  border-color: #FFD700;
}

.price-display {
  background: rgba(212, 175, 55, 0.1);
  color: #FFD700;
  font-weight: bold;
}

.btn-pay {
  width: 100%;
  background: #FFD700;
  color: black;
  border: none;
  padding: 15px;
  border-radius: 15px;
  font-weight: 800;
  letter-spacing: 2px;
  transition: 0.3s;
}

.btn-pay:disabled {
  opacity: 0.5;
  filter: grayscale(1);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}






/* pop up apres payement */

.notification-container {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 350px;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

.notification-content {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 15px;
  position: relative;
}

.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin-left: auto;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

.notification-close:hover {
  opacity: 1;
  color: #D4AF37;
}

/* Responsive styles for mobile screens */
@media (max-width: 500px) {
  .notification-container {
    min-width: unset;
    width: 90vw;
    max-width: 98vw;
    top: 15px;
    border-radius: 14px;
    padding: 0 4px;
  }

  .notification-content {
    padding: 12px 8px;
    gap: 10px;
  }

  .notification-close {
    font-size: 1.2rem;
  }
}
</style>