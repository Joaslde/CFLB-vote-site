<template>
  <div class="ticket-page">
    <div class="page-container">
      <div class="ticket-sales-card fade-in-up">

        <div class="card-header">
          <div class="logo-circle">
            <img :src="logo" alt="Logo Événement">
          </div>
          <h1 class="premium-title">Billet Officiel</h1>
          <p class="subtitle">Conférence des Femmes Leaders</p>
        </div>

        <div class="card-body">
          <div class="price-tag">
            <span class="amount">3.000</span>
            <span class="currency">FCFA</span>
          </div>

          <form @submit.prevent="initiatePayment" class="ticket-form">
            <div class="form-group">
              <label>Nom complet</label>
              <input type="text" v-model="form.nom" placeholder="Votre nom et prénom" required class="premium-input">
            </div>

            <button type="submit" class="btn-purchase" :disabled="loading">
              <span v-if="!loading">ACHETER MON PASS</span>
              <span v-else class="spinner-border spinner-border-sm"></span>
            </button>
          </form>

          <p class="secure-note">
            <i class="bi bi-shield-lock"></i> Paiement sécurisé via Kkiapay
          </p>
        </div>
      </div>
    </div>
    <button v-if="hasExistingTicket" @click="router.push('/merci-ticket')" class="btn-recall-ticket">
      <i class="bi bi-ticket-perforated"></i> Mon dernier ticket
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ticketService } from '../services/ticketService';
import logo from '../assets/CFLB-logo-bgless.png';

const router = useRouter();
const loading = ref(false);
const form = reactive({
  nom: ''
});

// 1. Initialisation du paiement
const initiatePayment = () => {
  if (!form.nom || form.nom.length < 3) {
    alert("Veuillez entrer votre nom complet.");
    return;
  }

  // Sécurité : Vérifier si le script Kkiapay est chargé dans index.html
  if (typeof window.openKkiapayWidget !== 'function') {
    alert("Le module de paiement n'est pas encore chargé. Veuillez patienter ou rafraîchir la page.");
    return;
  }

  loading.value = true;

  window.openKkiapayWidget({
    amount: 2943,
    position: "center",
    callback: "",
    data: { buyerName: form.nom },
    key: "942cbc25f83c21b1f0ac7161490d56b2ea1f6b34", //  clé reel
    //key: "28970c60ec7211f0831cdb9efbf9fe95", //  clé sandbox
     sandbox: false
  });

  // On remet loading à false après un délai au cas où l'utilisateur ferme le widget
  setTimeout(() => { loading.value = false; }, 3000);
};

// 2. Gestion du succès (Appelé par le listener)
const handleKkiapaySuccess = async (response) => {
  try {
    loading.value = true;

    // 1. Génération du code
    const ticketCode = ticketService.generateUniqueCode(form.nom);

    // 2. Sauvegarde locale (immédiate)
    ticketService.saveToLocalStorage(ticketCode);
    localStorage.setItem('event_ticket_code', ticketCode);
    localStorage.setItem('event_buyer_name', form.nom);

    // 3. Sauvegarde Supabase (sans select)
    await ticketService.saveTicketToSupabase(form.nom, ticketCode);

    // 4. Encodage sécurisé du nom (gère les accents)
    const encodedName = btoa(unescape(encodeURIComponent(form.nom)));

    // 5. Redirection
    // On utilise un try/catch spécifique pour la redirection au cas où la page n'existe pas
    try {
      await router.push({
        name: 'merci-ticket',
        query: {
          buyer: encodedName,
          ref: response.transactionId
        }
      });
    } catch (routeError) {
      console.warn("La page merci n'est pas encore prête, mais le ticket est enregistré !");
      alert(`Merci ${form.nom} ! Votre paiement est validé. Votre code ticket est : ${ticketCode}`);
    }

  } catch (error) {
    // Si on arrive ici, c'est que la sauvegarde a VRAIMENT échoué avant la redirection
    console.error("Erreur critique:", error);
    alert("Petit souci technique, mais pas d'inquiétude : si vous avez été débité, votre ticket est en cours de validation.");
  } finally {
    loading.value = false;
  }
};
// 3. Listeners
onMounted(() => {
  window.addKkiapayListener('success', handleKkiapaySuccess);
});

onUnmounted(() => {
  window.removeKkiapayListener('success', handleKkiapaySuccess);
});

const hasExistingTicket = ref(false);

onMounted(() => {
  window.addKkiapayListener('success', handleKkiapaySuccess);
  // Vérifie si un ticket est déjà en mémoire
  hasExistingTicket.value = !!localStorage.getItem('event_ticket_code');
});
</script>






<!-- -----STYLE----- -->







<style scoped>
/* On ajoute le style pour le spinner que tu n'avais pas */
.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spinner-border .75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}


/* --- STRUCTURE GLOBALE --- */
.ticket-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8F5F2;
  /* Ivoire */
  padding: 20px;
  /* Optionnel : mettre une image de fond floutée légère */
}

/* --- CARTE D'ACHAT --- */
.ticket-sales-card {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  text-align: center;
  padding-bottom: 30px;
}

/* --- HEADER --- */
.card-header {
  background: #0E0E0E;
  padding: 40px 20px 20px;
  color: white;
  border-bottom-left-radius: 50% 20px;
  border-bottom-right-radius: 50% 20px;
  margin-bottom: 20px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #D4AF37;
}

.logo-circle img {
  width: 60px;
  height: auto;
}

.premium-title {
  font-family: 'Lobster', cursive;
  font-size: 2.2rem;
  color: #D4AF37;
  margin: 0;
}

.subtitle {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 2px;
  opacity: 0.8;
}

/* --- PRIX --- */
.price-tag {
  font-family: 'Montserrat', sans-serif;
  color: #0E0E0E;
  margin-bottom: 30px;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
}

.currency {
  font-size: 1rem;
  vertical-align: super;
  font-weight: 600;
  color: #D4AF37;
}

/* --- INPUTS --- */
.ticket-form {
  padding: 0 30px;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

.form-group label {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
  text-transform: uppercase;
}

.premium-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  transition: 0.3s;
  background: #fcfcfc;
}

.premium-input:focus {
  border-color: #D4AF37;
  outline: none;
  background: white;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.1);
}

/* --- BOUTON --- */
.btn-purchase {
  width: 100%;
  background: #0E0E0E;
  color: #D4AF37;
  border: none;
  padding: 18px;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.btn-purchase:hover {
  background: #D4AF37;
  color: #0E0E0E;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.btn-purchase:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* --- NOTES --- */
.secure-note {
  font-size: 0.75rem;
  color: #888;
  font-family: 'Montserrat', sans-serif;
}

/* Animation simple */
.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}



/* bouton de recuperation  */

.btn-recall-ticket {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(14, 14, 14, 0.8);
  backdrop-filter: blur(5px);
  color: #D4AF37;
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-recall-ticket:hover {
  background: #0E0E0E;
  transform: scale(1.05);
  border-color: #D4AF37;
}
</style>