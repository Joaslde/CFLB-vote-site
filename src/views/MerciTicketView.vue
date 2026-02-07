<template>
    <div class="merci-page mt-5">
      <div class="page-container container py-5">
        
        <div class="text-center mb-5 fade-in">
          <div class="success-icon">✅</div>
          <h1 class="premium-title">Félicitations {{ buyerName }} !</h1>
          <p class="subtitle">Votre paiement a été validé avec succès.</p>
        </div>
  
        <div class="ticket-card-container fade-in-up">
          <div class="ticket-preview-card">
            <p class="instruction-text">Voici votre ticket officiel :</p>
            
            <div class="canvas-wrapper">
              <canvas ref="ticketCanvas" id="ticketCanvas"></canvas>
            </div>
  
            <button @click="downloadTicket" class="btn-download mt-4">
              <i class="bi bi-download"></i> TÉLÉCHARGER MON TICKET (IMAGE)
            </button>
          </div>
        </div>
  
        <div class="info-section mt-5 fade-in">
          <div class="info-card">
            <h3><i class="bi bi-question-circle"></i> FAQ & Infos Importantes</h3>
            
            <div class="faq-item">
              <h4>Comment récupérer mon ticket ?</h4>
              <p>Une image a été générée automatiquement. Si le téléchargement n'a pas démarré, cliquez sur le bouton doré ci-dessus. Présentez cette image à l'entrée.</p>
            </div>
  
            <div class="faq-item">
              <h4>J'ai perdu mon image, que faire ?</h4>
              <p>Contactez le service client muni de votre code de référence : <strong>{{ ticketCode }}</strong>.</p>
            </div>
  
            <div class="faq-item">
              <h4>Règles de l'événement</h4>
              <ul>
                <li>Tenue correcte exigée (Style Femme Leader).</li>
                <li>Le ticket est unique et scannable une seule fois.</li>
                <li>Conservez bien votre fichier numérique.</li>
              </ul>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import QRCode from 'qrcode';
  import logoUrl from '../assets/CFLB-logo-bgless.png'; // Ton logo
  
  const route = useRoute();
  const ticketCanvas = ref(null);
  const ticketCode = ref(localStorage.getItem('event_ticket_code') || 'EVT-XXXX');
  const buyerName = ref('Invité');
  
  // Décoder le nom depuis l'URL (gère les accents)
  try {
    if (route.query.buyer) {
      buyerName.value = decodeURIComponent(escape(atob(route.query.buyer)));
    }
  } catch (e) {
    console.error("Erreur décodage nom");
  }
  
  const generateTicketImage = async () => {
    const canvas = ticketCanvas.value;
    const ctx = canvas.getContext('2d');
  
    // 1. Configuration des dimensions
    canvas.width = 400;
    canvas.height = 600;
  
    // 2. Fond blanc premium
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Bordure dorée
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  
    try {
      // 3. Génération du QR Code
      // On crée un canvas temporaire pour le QR
      const qrDataUrl = await QRCode.toDataURL(ticketCode.value, {
        margin: 2,
        width: 250,
        color: { dark: '#0E0E0E', light: '#FFFFFF' }
      });
  
      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      
      qrImg.onload = () => {
        // Dessiner le QR Code au centre
        ctx.drawImage(qrImg, 75, 50, 250, 250);
  
        // 4. Rectangle bas pour le nom
        ctx.fillStyle = '#0E0E0E';
        ctx.fillRect(20, 320, canvas.width - 40, 150);
  
        // 5. Texte "Merci + Nom"
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 20px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText('MERCI POUR VOTRE ACHAT', canvas.width / 2, 360);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '24px Montserrat';
        ctx.fillText(buyerName.value.toUpperCase(), canvas.width / 2, 400);
  
        ctx.fillStyle = '#D4AF37';
        ctx.font = '14px Courier';
        ctx.fillText(ticketCode.value, canvas.width / 2, 440);
  
        // 6. Logo de l'événement (Rond)
        const logo = new Image();
        logo.src = logoUrl;
        logo.onload = () => {
          const logoSize = 80;
          const x = canvas.width / 2 - logoSize / 2;
          const y = 490;
  
          // Dessin du cercle blanc derrière le logo
          ctx.beginPath();
          ctx.arc(canvas.width / 2, y + logoSize / 2, logoSize / 2 + 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
  
          ctx.drawImage(logo, x, y, logoSize, logoSize);
          
          // 7. Déclenchement automatique du téléchargement
          setTimeout(downloadTicket, 1000);
        };
      };
    } catch (err) {
      console.error(err);
    }
  };
  
  const downloadTicket = () => {
    const link = document.createElement('a');
    link.download = `Ticket-CFLB-${buyerName.value.replace(/\s+/g, '-')}.png`;
    link.href = ticketCanvas.value.toDataURL('image/png');
    link.click();
  };
  
  onMounted(() => {
    generateTicketImage();
  });
  </script>
  
  <style scoped>
  .merci-page {
    font-family: 'Montserrat', sans-serif;
    color: #333;
  }
  
  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .ticket-preview-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .canvas-wrapper {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  
  canvas {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .btn-download {
    background: #D4AF37;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 50px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    width: 100%;
  }
  
  .btn-download:hover {
    background: #b8972f;
    transform: translateY(-2px);
  }
  
  .info-card {
    background: #f8f9fa;
    padding: 40px;
    border-radius: 20px;
    border-left: 5px solid #D4AF37;
  }
  
  .faq-item {
    margin-bottom: 25px;
  }
  
  .faq-item h4 {
    color: #0E0E0E;
    font-size: 1.1rem;
    font-weight: 700;
  }
  
  .instruction-text {
    font-weight: 600;
    margin-bottom: 20px;
    color: #666;
  }
  
  .fade-in { animation: fadeIn 0.8s ease-out; }
  .fade-in-up { animation: fadeInUp 0.8s ease-out; }
  
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>