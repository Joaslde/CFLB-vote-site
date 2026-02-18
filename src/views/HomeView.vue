<template>
  <div class="home-container">
    
    <section class="hero-section">
      <nav class="hero-navbar d-none d-lg-flex" :class="{ 'is-scrolled': isScrolled }">
        <div class="nav-brand">
          <img :src="logo" alt="CFLB Logo" class="nav-logo">
        </div>

        <div class="nav-center-pill">
          <router-link to="/" class="nav-link" active-class="active-link">Accueil</router-link>
          <router-link to="/evenement" class="nav-link" active-class="active-link">Événement</router-link>
          <router-link to="/candidates" class="nav-link" active-class="active-link">Candidates</router-link>
          <router-link to="/ticket" class="nav-link highlight-link" active-class="active-link">Ticket</router-link>
        </div>

        <div class="nav-socials">
          <a href="#" class="social-icon"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-icon"><i class="bi bi-tiktok"></i></a>
          <a href="#" class="social-icon"><i class="bi bi-facebook"></i></a>
        </div>
      </nav>

      <video autoplay muted loop playsinline class="hero-video">
        <source src="../assets/video2.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>

      <div class="hero-card-frame">
        <div class="navbar-placeholder"></div>

        <div class="hero-content fade-in-up">
          <h1 class="premium-title main-title">
            Conférence des Femmes <span class="text-gold">Leaders du Bénin</span>
          </h1>
          <p class="premium-subtitle">
            2ᵉ Édition — 21 Mars 2026  Université d’Abomey-Calavi
          </p>
          
          <div class="hero-actions">
            <button class="btn-hero-quick" @click="router.push('/candidates')">
              DÉCOUVRIR LES CANDIDATES
            </button>

            <button class="btn-hero-quick " @click="router.push('/ticket')"> 
              RÉSERVER MON PASSE
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="manifesto-section scroll-trigger">
      <div class="container text-center">
        <p class="manifesto-text font-premium text-red">Une plateforme d'inspiration et d'impact,</p>
        <p class="manifesto-text font-main text-dark">où le leadership féminin prend toute sa dimension,</p>
        <p class="manifesto-text font-main text-gold small-text">et où l’excellence devient visible.</p>
      </div>
    </section>

    <section class="signature-section scroll-trigger">
      <div class="signature-bg"></div>
      <div class="signature-content container">
        <div class="keyword-container">
          <span class="keyword k-1">VISION</span>
          <span class="keyword k-2">IMPACT</span>
          <span class="keyword k-3">INNOVATION</span>
        </div>
      </div>
    </section>

    <section class="event-section scroll-trigger">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
             <div class="event-image-wrapper">
                <img :src="photo" alt="Conférence des Femmes Leaders du Bénin" class="img-fluid rounded-shadow">
             </div>
          </div>
          <div class="col-lg-6 text-center text-lg-start ps-lg-5">
            <h2 class="font-premium text-red section-title mb-3">L'Événement</h2>
            <p class="event-desc">
              La Conférence des Femmes Leaders du Bénin est une plateforme nationale dédiée à la promotion du leadership féminin, de l’innovation et de l’excellence.
              Le 21 mars 2026, l’Université d’Abomey-Calavi accueillera une matinée stratégique réunissant leaders, entrepreneurs, jeunesse engagée et acteurs du changement.
            </p>
            
            <button class="btn-event-link mt-4" @click="router.push('/evenement')">
              EN SAVOIR PLUS
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="preview-section scroll-trigger">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="font-premium text-red section-title ">Les Candidates 2026</h2>
          <p class="event-desc">Classement en temps réel basé sur les votes du public.</p>
        </div>
        
        <div class="preview-grid">
          <div 
            v-for="(candidate, index) in topCandidates" 
            :key="candidate.id"
            class="preview-card" 
            @click="router.push('/candidates')"
          >
            <div class="rank-badge">#{{ index + 1 }}</div>
            
            <img :src="candidate.photo" :alt="`Candidate ${candidate.nom} - CFLB 2026`">
            
            <div class="preview-info">
              <h4>{{ candidate.nom }}</h4>
              <span class="vote-pill">{{ candidate.votes_count }} Votes</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <button class="btn-event-link" @click="router.push('/candidates')">
            DÉCOUVRIR TOUTES LES CANDIDATES
          </button>
        </div>
      </div>
    </section>

    <section class="cta-noble-section scroll-trigger">
      <div class="content-wrapper">
        <h2 class="font-premium text-red cta-title">Rejoignez l’expérience CFLB 2026</h2>
        <p class="cta-subtitle text-dark">Inspirez-vous. Connectez-vous. Prenez part à un mouvement d’impact.</p>
        <button class="btn-noble-gold" @click="router.push('/ticket')">
          ACHETER MON PASSE
        </button>
      </div>
    </section>

    <footer class="elegant-footer"   >
      <div class="container text-center">
        <img :src="logo" alt="Logo CFLB" class="footer-logo mb-4">
        <h4 class="font-premium footer-title">Conférence des Femmes Leaders du Bénin</h4>
        <div class="footer-divider"></div>
        <div class="social-links">
          <a href="#"><i class="bi bi-whatsapp"></i></a>
          <a href="#"><i class="bi bi-facebook"></i></a>
          <a href="#"><i class="bi bi-linkedin"></i></a>
        </div>
        <p class="copyright">© 2026 CFLB. Tous droits réservés. Leadership • Innovation • Excellence</p>
        
        <p class="dev-signature mt-3">
          Design & Code par <a href="https://joas-lde.netlify.app" target="_blank" rel="noopener noreferrer">Joas L.</a>
        </p>
      </div>

      <section class="seo-content container mt-5">

  <h2>À propos de la Conférence des Femmes Leaders du Bénin</h2>
  <p>
    La CFLB est un événement annuel visant à promouvoir le leadership féminin au Bénin
    en réunissant des femmes influentes, des entrepreneures, des décideurs et la jeunesse engagée.
    Cette 2ᵉ édition se tiendra à l’Université d’Abomey-Calavi le 21 mars 2026.
  </p>
</section>


    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { candidateService } from '../services/candidateService';
import logo from '../assets/CFLB-logo-bgless.png'; 
import photo from '../assets/conf.jpeg';
import { useHead } from '@vueuse/head'

useHead({
  title: 'Conférence des Femmes Leaders du Bénin 2026 | CFLB Officiel',
  
  meta: [
    {
      name: 'description',
      content: "La Conférence des Femmes Leaders du Bénin 2026 (CFLB) se tiendra le 21 mars 2026 à l’Université d’Abomey-Calavi. Leadership féminin, innovation et excellence au cœur d’un événement national."
    },
    {
      name: 'keywords',
      content: 'Conférence femmes leaders Bénin, leadership féminin Bénin, CFLB 2026, événement Université Abomey-Calavi, femmes entrepreneures Bénin'
    },

    // Open Graph
    {
      property: 'og:title',
      content: 'Conférence des Femmes Leaders du Bénin 2026 | CFLB'
    },
    {
      property: 'og:description',
      content: "Plateforme nationale dédiée au leadership féminin au Bénin. Rendez-vous le 21 mars 2026 à l’Université d’Abomey-Calavi."
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://cflb.fr/'
    },
    {
      property: 'og:image',
      content: 'https://cflb.fr/preview-home.jpg'
    },

    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'CFLB 2026 - Conférence des Femmes Leaders du Bénin'
    },
    {
      name: 'twitter:description',
      content: 'Leadership féminin, innovation et excellence au Bénin.'
    },
    {
      name: 'twitter:image',
      content: 'https://cflb.fr/preview-home.jpg'
    }
  ],

  link: [
    {
      rel: 'canonical',
      href: 'https://cflb.fr/'
    }
  ]
})


useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Conférence des Femmes Leaders du Bénin 2026",
        "startDate": "2026-03-21T09:00:00+01:00",
        "endDate": "2026-03-21T13:00:00+01:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Université d'Abomey-Calavi",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BJ"
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": "Conférence des Femmes Leaders du Bénin",
          "url": "https://cflb.fr/"
        },
        "image": [
          "https://cflb.fr/preview-home.jpg"
        ],
        "description": "Plateforme nationale dédiée au leadership féminin, à l’innovation et à l’excellence au Bénin."
      })
    }
  ]
})








const router = useRouter();
const topCandidates = ref([]);

// Récupération des candidates réelles
onMounted(async () => {
  try {
    const allCandidates = await candidateService.getAllCandidates();
    // Tri par votes (décroissant) et on garde les 3 premiers
    topCandidates.value = allCandidates
      .sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0))
      .slice(0, 3);
  } catch (error) {
    console.error("Erreur chargement top 3:", error);
  }

  // Animation scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.scroll-trigger').forEach((el) => {
    observer.observe(el);
  });
});

// Gestion du Scroll pour la Navbar
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});


// Dans ton script setup
onMounted(() => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    const signatureBg = document.querySelector('.signature-bg');
    
    // On simule le fixed avec du JS
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const section = document.querySelector('.signature-section');
      const sectionTop = section.offsetTop;
      
      if (scrolled >= sectionTop) {
        signatureBg.style.transform = `translateY(${scrolled - sectionTop}px)`;
      }
    });
  }
});
</script>

<style scoped>
/* IMPORT FONTS */
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rouge+Script&display=swap');

/* --- VARIABLES GLOBALES --- */
:root {
  --gold: #D4AF37;
  --red: #e60417;
  --dark: #111;
  --ivory: #f8f9fa; /* Blanc cassé très léger pour les fonds alternatifs */
  --white: #ffffff;
}

.home-container {
  overflow-x: hidden;
  background-color: #ffffff;
}

/* TYPOGRAPHIE */
.font-premium { font-family: 'Lobster', cursive;  }
.font-main { font-family: 'Montserrat', sans-serif; }
.text-gold { color: #d6ad28; }
.text-red { color: red; }
.text-dark { color: #222; }
.premium-title {font-family: 'Lobster', cursive; font-size: 10rem; }

/* --- SECTION 1: HERO --- */

/* --- NAVBAR HERO (PC Only) --- */
.hero-navbar {
  position: fixed;
  top: 50px; /* Position initiale : à l'intérieur de la bordure blanche */
  left: 50%;
  transform: translateX(-50%);
  width: 85%; /* Largeur initiale : alignée avec la bordure blanche */
  max-width: 1300px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* Transition fluide */
  margin-top: -8px;
}

/* --- ÉLÉMENTS DE LA NAVBAR --- */

/* 1. Logo */
.nav-logo {
  height: 100px;
  width: auto;
  transition: 0.3s;
}

/* 2. Le Cylindre Central (Glassmorphism) */
.nav-center-pill {
  background: rgba(255, 255, 255, 0.1); /* Verre transparent */
  backdrop-filter: blur(12px); /* Flou derrière */
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2); /* Bordure subtile */
  border-radius: 50px; /* Forme cylindrique */
  padding: 12px 40px;
  display: flex;
  gap: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

/* Liens */
.nav-link {
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  transition: 0.3s;
}

/* Effet Hover & Active */
.nav-link:hover, .nav-link.active-link {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

/* Petite ligne dorée au survol */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background-color: #D4AF37; /* OR */
  transition: 0.3s ease;
}

.nav-link:hover::after, .nav-link.active-link::after {
  transform: translateX(-50%) scaleX(1);
}

/* Lien "Ticket" spécial */
.highlight-link {
  color: #D4AF37 !important;
  font-weight: 700;
}

/* 3. Réseaux Sociaux */
.nav-socials {
  display: flex;
  gap: 20px;
}
.social-icon {
  color: white;
  font-size: 1.2rem;
  transition: 0.3s;
  opacity: 0.8;
}
.social-icon:hover {
  opacity: 1;
  color: #D4AF37;
  transform: translateY(-3px);
}

/* --- ÉTAT SCROLLÉ (STICKY MODE) --- */
.hero-navbar.is-scrolled {
  top: 0;
  width: 100%;
  max-width: none;
  border-radius: 0;
  padding: 15px 50px;
  /* Fond global sombre pour la lisibilité sur les sections blanches */
  background: rgba(10, 10, 10, 0.85); 
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding:1px;
}

/* En mode scrollé, le cylindre central perd son fond pour se fondre dans la barre */
.hero-navbar.is-scrolled .nav-center-pill {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  backdrop-filter: none;
}




.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
}

.hero-video {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
  /* On garde un léger filtre pour que le texte blanc soit lisible */
  filter: brightness(0.8); 
  object-position: 100% 25%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  /* Dégradé subtil pour aider la lecture */
  background: radial-gradient(circle, rgba(235, 166, 19, 0.1) 0%, rgba(216, 145, 12, 0.4) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 20px;
}

.main-title {
  font-family: 'Lobster', cursive; /* On force la police ici */
  font-size: 8rem;
  font-weight:10rem;
  margin-bottom: 10px;
  color: #ffffff; /* Ton rouge demandé */
  text-shadow: 2px 2px 10px rgba(0,0,0,0.8);
  animation: fadeUp 2s ease-out;
  line-height: 1.2; /* Pour éviter que les lettres se chevauchent si c'est sur 2 lignes */
  width: 100%; /* S'assure qu'il prend la largeur du parent */
}

@media (max-width: 768px) {
  .hero-content {
    padding: 1px; /* On réduit le padding pour laisser plus de place au texte */
    width: 95%;    /* On occupe presque tout l'écran */
    margin-left:5px;
    margin-top:90px;
    
  }

  .main-title {
    /* 10vw signifie 10% de la largeur de l'écran. 
       C'est dynamique : ça grossit sur grand mobile et réduit sur petit. */
    font-size: 2.4rem; 
    font-weight:9px;
    line-height: 1.3;
    margin-bottom: 25px;
    display: block;
    width: 100%;
  }

 
  
}


.premium-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  animation: fadeUp 2.5s ease-out;
}

/* Bouton Héro */
.btn-hero-quick {
  background: rgba(255, 255, 255, 0.103);
  backdrop-filter: blur(7px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 20px;
}
.btn-hero-quick:hover {
  background: #D4AF37;
  border-color: #D4AF37;
  color: #000;
  transform: translateY(-5px);
}


/* --- SECTION 2: MANIFESTE --- */
.manifesto-section {
  background-color: #fff;
  padding: 120px 20px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;
}
.manifesto-section.visible { opacity: 1; transform: translateY(0); }

.manifesto-text {
  font-size: 2rem;
  margin: 15px 0;
  line-height: 1.4;
}
.small-text { font-size: 1.2rem; font-weight: 600; margin-top: 30px; letter-spacing: 2px; text-transform: uppercase; }

/* --- SECTION 3: SIGNATURE (COULEUR) --- */
.signature-section {
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

.signature-bg {
  position: absolute;
  inset: 0;
  background-image: url('https://i.pinimg.com/736x/b4/74/b2/b474b2670edd1457bc872942195d9323.jpg'); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  /* PLUS DE NOIR ET BLANC */
  filter: brightness(0.9); 
  z-index: 0;
}

.keyword-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  z-index: 2;
}

.keyword {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 4rem;
  color: rgba(255,255,255,0.1);
  -webkit-text-stroke: 2px #fff;
  letter-spacing: 10px;
  text-shadow: 0 0 20px rgba(0,0,0,0.5);
  z-index:5;
}

.signature-section.visible .k-2 { color: #D4AF37; -webkit-text-stroke: 0; text-shadow: 0 0 30px rgba(212, 175, 55, 0.8); }

/* --------Nouveau style--------- */


/* --- CONFIGURATION PC (Uniquement pour écrans > 1024px) --- */
@media (min-width: 1024px) {
  
  /* On remonte la vue globale du contenu */
  .hero-section {
    align-items: flex-start; /* Aligne en haut au lieu du centre */
    padding-top: 10vh;
  }

  /* La bordure blanche fine inspirée de "Câlin" */
  .hero-card-frame {
    position: absolute;
    inset: 30px; /* Distance du bord de l'écran (marge interne) */
    border: 2px solid rgba(255, 255, 255, 0.6); /* Bordure fine blanche */
    border-radius: 40px; /* Coins arrondis */
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Alignement vers le haut */
    padding: 60px; /* Espace interne à la carte */
    pointer-events: none; /* Pour que la bordure ne gêne pas les clics */
  }

  /* On réactive les clics pour le contenu à l'intérieur */
  .hero-content {
    pointer-events: auto;
    text-align: left; /* Alignement à gauche */
    max-width: 700px; /* Largeur pour forcer le passage à la ligne */
    margin-top: 10vh; /* Fait descendre le texte un peu sous la future navbar */
    margin-left: 0;
  }

  .main-title {
    font-size: 4.5rem; /* Taille plus élégante et "petite" sur PC */
    line-height: 1.1;
    margin-bottom: 20px;
  }

  .premium-subtitle {
    font-size: 1.1rem;
    max-width: 500px; /* Texte bien rangé à gauche */
    margin-bottom: 40px;
  }

  /* Conteneur des boutons */
  .hero-actions {
    display: flex;
    gap: 20px; /* Espace entre les deux boutons */
    align-items: center;
  }

  .btn-hero-quick, .btn-event-participate {
    margin-top: 0; /* On enlève le margin top par défaut du mobile */
  }

  /* Style du nouveau bouton PC */
  .btn-event-participate {
    display: inline-block; /* On l'affiche sur PC */
    background: transparent;
    backdrop-filter: blur(7px);
    border: 1.5px solid #ffffff;
    color: white;
    padding: 12px 30px;
    border-radius: 50px;
    font-family: 'Montserrat';
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;
  }

  .btn-event-participate:hover {
    background: white;
    color: black;
  }

  /* Placeholder pour la navbar en haut */
  .navbar-placeholder {
    height: 80px;
    width: 100%;
  }
}

/* --- AJUSTEMENT MOBILE (POUR LE BOUTON) --- */
@media (max-width: 1023px) {
  /* On s'assure que la bordure et le 2ème bouton n'existent pas sur mobile */
  .hero-card-frame {
    border: none;
    position: relative;
    padding: 0;
  }
  
  .btn-event-participate {
    display: none; /* CACHÉ SUR MOBILE */
  }
}


/* --- SECTION 4: L'ÉVÉNEMENT (BLANC) --- */
.event-section {
  background-color: #ffffff;
  padding: 100px 20px;
  color: #333;
}
.event-image-wrapper {
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 20px 20px 0px rgb(245, 245, 245); /* Effet graphique */
}
.rounded-shadow {
  border-radius: 20px;
  transition: transform 0.5s;
}
.rounded-shadow:hover { transform: scale(1.03); }

.subtitle-event { font-weight: 700; margin-bottom: 20px; letter-spacing: -1px; }
.event-desc { font-family: 'Montserrat'; font-size: 1.1rem; line-height: 1.8; color: #555; }

.btn-event-link {
  background: transparent;
  color:#d6ad28;
  border: 2px solid #d6ad28;
  padding: 10px 25px;
  font-weight: 700;
  font-family: 'Montserrat';
  letter-spacing: 1px;
  transition: 0.3s;
}
.btn-event-link:hover { background: #d6ad28; color: #fff; }


/* --- SECTION 5: APERÇU (TOP 3 RÉEL) --- */
.preview-section {
  background-color:rgb(241, 243, 245); /* Pas noir, un gris très très clair */
  padding: 100px 20px;
}

.preview-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.preview-card {
  width: 280px;
  height: 400px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: 0.4s ease;
}
.preview-card:hover { transform: translateY(-15px); }

.preview-card img {
  width: 100%; height: 100%; object-fit: cover;
}

.rank-badge {
  position: absolute;
  top: 15px; left: 15px;
  background: #D4AF37;
  color: white;
  font-weight: bold;
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 5;
}

.preview-info {
  position: absolute;
  bottom: 0; left: 0; width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: white;
  text-align: center;
}
.preview-info h4 { font-family: 'Montserrat'; font-weight: 600; font-size: 1.1rem; }
.vote-pill { font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 10px; }

.btn-noble-outline {
  background: #f0aa14;
  border: 1px solid #D4AF37;
  color: #ffffff; /* Or plus foncé pour lisibilité sur fond clair */
  padding: 15px 40px;
  font-family: 'Montserrat';
  letter-spacing: 2px;
  font-size: 0.9rem;
  transition: 0.3s;
  cursor: pointer;
}
.btn-noble-outline:hover { background: #D4AF37; color: #fff; }

/* --- SECTION 6: CTA NOBLE (BLANC) --- */
.cta-noble-section {
  
  position: relative;
  padding: 120px 20px;
  text-align: center;
  background: white; /* BLANC */
}

.cta-title { font-size: 3.5rem; margin-bottom: 10px; }
.cta-subtitle { font-family: 'Montserrat'; font-size: 1.2rem; margin-bottom: 40px; font-weight: 500; }

.btn-noble-gold {
  background: #e6b515; /* JAUNE DORÉ */
  color:rgb(255, 255, 255);
  padding: 18px 60px;
  border: none;
  /* border-radius: 5px; */
  font-family: 'Montserrat';
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}
.btn-noble-gold:hover { transform: scale(1.05); background: #c5a028; }

/* --- SECTION 7: FOOTER --- */
.elegant-footer {
  background: #050505;
  padding: 10px 10px;
  color: rgba(255,255,255,0.6);
}
.footer-logo { width: 200px;} /* LOGO 200PX */
.footer-title { color: #D4AF37; font-size: 2rem; }
.footer-divider { width: 50px; height: 1px; background: #333; margin: 30px auto; }
.social-links { margin-bottom: 30px; font-size: 1.5rem; }
.social-links a { color: rgba(255,255,255,0.4); margin: 0 15px; transition: 0.3s; }
.social-links a:hover { color: #D4AF37; }
.copyright { font-family: 'Montserrat'; font-size: 0.8rem; letter-spacing: 1px; }

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  /* .main-title { font-size: 2.8rem; } */
  .manifesto-text { font-size: 1.3rem; }
  .keyword { font-size: 2.5rem; }
  .preview-card { width: 100%; height: 350px; }
  .cta-title { font-size: 2.5rem; }
  .section-title{font-size: 2.5rem; margin:2rem;}
  .footer-logo {  margin-bottom: -5rem ; } /* LOGO 200PX */
  .footer-title { margin-top: -2rem; }


}
/* --- AJOUTS CSS POUR LA SIGNATURE --- */
.dev-signature {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3); /* Très discret de base */
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.dev-signature a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.dev-signature a:hover {
  color: #D4AF37; /* S'illumine en or au survol */
  text-decoration: underline;
}

/* ANIMATIONS GENERALES */
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);} 40% {transform: translateY(-10px) translateX(-50%);} 60% {transform: translateY(-5px) translateX(-50%);} }
</style>



<style scoped >
  .seo-content{
    display: none;
  } 
</style>