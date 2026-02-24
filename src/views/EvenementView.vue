<template>
    <div class="event-page">
      
      <section class="hero-section">
      <video class="hero-video-mobile" autoplay muted loop playsinline>
        <source src="../assets/video3.mp4" type="video/mp4">
      </video>

      <div class="hero-overlay"></div>
      
      <div class="hero-content container text-center fade-in-up">
        <h1 class="hero-title">Conférence des Femmes <span class="text-gold">Leaders du Bénin</span></h1>
        <h2 class="hero-subtitle">Inspirer. Connecter. Propulser.</h2>
        
        <div class="hero-buttons">
          <button @click="goToTicket" class="btn-hero-quick">ACHETER UN PASSE</button>
          <button @click="scrollToProgram" class="btn-hero-quick">DÉCOUVRIR</button>
        </div>
      </div>
    </section>

    <section class="section-manifeste">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9 text-center">
            <div class="manifeste-content">
              <p class="intro-text">
                La Conférence des Femmes Leaders du Bénin est une plateforme 
                <span class="highlight">d’inspiration</span>, 
                de <span class="highlight">formation</span> et de 
                <span class="highlight">visibilité</span> dédiée à la promotion du leadership féminin, 
                de l’innovation et de l’excellence.
              </p>
              <div class="date-badge">
                <span class="line"></span>
                <span class="date-text">2ᵉ ÉDITION — 21 MARS 2026</span>
                <span class="line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-concept container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img :src="photo" alt="Concept de la Conférence des Femmes Leaders du Bénin 2026" class="img-fluid reveal-img shadow-lg">
          </div>
          <div class="col-lg-6 ps-lg-5">
            <h2 class="section-title">Une vision claire. <span class="text-gold" >Un impact réel.</span></h2>
            <div class="separator-gold"></div>
            <p class="text-body">
              La Conférence des Femmes Leaders du Bénin existe pour révéler, connecter et propulser les femmes leaders d’aujourd’hui et de demain.
            </p>
            <p class="text-body">
              Elle crée un espace stratégique où se rencontrent ambition, innovation et engagement social.
              Plus qu’un événement, c’est un mouvement en faveur de l’excellence féminine au Bénin.
            </p>
          </div>
        </div>
      </section>
  
      <section class="section-infos text-white py-5">
        <div class="container">
          <div class="row text-center g-4">
            <div class="col-md-4 info-box">
              <i class="bi bi-calendar-event gold-icon"></i>
              <h3>DATE</h3>
              <p>21 mars 2026</p>
            </div>
            <div class="col-md-4 info-box border-side">
              <i class="bi bi-geo-alt gold-icon"></i>
              <h3>LIEU</h3>
              <p>Université d’Abomey-Calavi<br>Amphithéâtre Idriss DEBY</p>
            </div>
            <div class="col-md-4 info-box">
              <i class="bi bi-clock gold-icon"></i>
              <h3>HORAIRE</h3>
              <p>09h00 – 13h00</p>
            </div>
          </div>
          <div class="text-center mt-4 text-muted small-text">
            Un rendez-vous stratégique au cœur du plus grand campus universitaire du Bénin.
          </div>
        </div>
      </section>
  
      <section class="section-public container py-5">
        <div class="row align-items-center flex-row-reverse">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img src="https://i.pinimg.com/736x/c8/63/f7/c863f7ba82b9c55a6a8972b71657fc35.jpg" alt="Public Cible" class="img-fluid reveal-img shadow-lg">
          </div>
          <div class="col-lg-6 pe-lg-5">
            <h2 class="section-title" style="" >À qui s’adresse cette conférence ?</h2>
            <div class="separator-red"></div>
            <ul class="clean-list">
              <li><i class="bi bi-check2-circle"></i> Femmes leaders et entrepreneures ambitieuses</li>
              <li><i class="bi bi-check2-circle"></i> Jeunesse en quête de repères et d’opportunités</li>
              <li><i class="bi bi-check2-circle"></i> Professionnels et décideurs</li>
              <li><i class="bi bi-check2-circle"></i> Hommes engagés pour l’égalité</li>
              <li><i class="bi bi-check2-circle"></i> Grand public intéressé par l’innovation</li>
            </ul>
            <p class="mt-4 text-muted fst-italic">
              "La CFLB rassemble celles et ceux qui veulent faire avancer les choses."
            </p>
          </div>
        </div>
      </section>
  
      <section id="programme" class="section-programme bg-light py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="section-title">Un programme riche et stratégique</h2>
            <p class="text-muted">Une matinée intense mêlant réflexion, créativité et connexion.</p>
          </div>
          
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="timeline">
                <div class="timeline-item">
                  <div class="marker"></div>
                  <div class="content">Discours du Président du Comité & lancement officiel</div>
                </div>
                <div class="timeline-item">
                  <div class="marker"></div>
                  <div class="content">Présentation des 6 premières candidates (IA)</div>
                </div>
                <div class="timeline-item">
                  <div class="marker"></div>
                  <div class="content">Défilé de 3 stylistes et leurs mannequins</div>
                </div>
                <div class="timeline-item">
                  <div class="marker highlight"></div>
                  <div class="content"><strong>Panels thématiques sur le leadership et l’innovation</strong></div>
                </div>
                <div class="timeline-item">
                  <div class="marker"></div>
                  <div class="content">Présentation des 6 dernières candidates</div>
                </div>
                <div class="timeline-item">
                  <div class="marker"></div>
                  <div class="content">Défilé des 3 derniers stylistes</div>
                </div>
                <div class="timeline-item">
                  <div class="marker"></div>
                  <div class="content">Clôture & networking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="section-promise py-5">
        <div class="container text-center">
          <h2 class="gold-title mb-4">Ce que vous allez vivre</h2>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <p class="promise-text">
                Une expérience inspirante et transformatrice.<br>
                Des rencontres avec des femmes leaders influentes.<br>
                Des opportunités concrètes de réseautage.<br>
                Une immersion dans l’innovation, la culture et l’excellence féminine.
              </p>
              <div class="quote-box mt-5">
                <i class="bi bi-quote quote-icon"></i>
                <p class="quote-text">« Le leadership féminin n’est pas une tendance. C’est une nécessité stratégique. »</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section class="section-orga container py-5">
        <div class="row align-items-center">
          <div class="col-md-5">
             <img src="https://i.pinimg.com/1200x/50/97/0f/50970f20f51fa989a526ae9bda22731a.jpg" alt="Comité Organisation" class="img-fluid rounded shadow">
          </div>
          <div class="col-md-7 ps-md-5 mt-4 mt-md-0">
            <h2 class="section-title">Une organisation engagée</h2>
            <div class="separator-red"></div>
            <p class="text-body">
              La conférence est organisée par le <strong>Comité d’Organisation de la Conférence des Femmes Leaders du Bénin (CFLB)</strong>, 
              une structure engagée dans la promotion du leadership féminin, de l’entrepreneuriat et de l’impact social au Bénin.
            </p>
            <p class="text-body">
              À travers cette initiative, le comité affirme sa volonté de créer un écosystème durable d’excellence et d’influence.
            </p>
          </div>
        </div>
      </section>
  
      <section class="section-ticket py-5">
        <div class="container">
          <div class="ticket-wrapper">
            <div class="ticket-content text-center">
              <h2 class="ticket-title">Réservez votre place</h2>
              <div class="ticket-price">
                <span class="type">Passe Unique</span>
                <span class="amount">3.000 FCFA</span>
              </div>
              <p class="ticket-info">Accès général • Places limitées</p>
              <p class="ticket-dates">Vente du 21 février au 19 mars 2026</p>
              <button @click="goToTicket" class="btn-ticket pulse-btn">ACHETER MON PASSE</button>
            </div>
          </div>
        </div>
      </section>
  
      <section class="section-soutiens py-5">
      <div class="container">
        
        <div class="text-center mb-5">
          <h2 class="section-title">Nos Soutiens & Partenaires</h2>
          <div class="separator-gold mx-auto"></div>
          <p class="text-muted">Des institutions et des personnalités qui portent notre vision.</p>
        </div>

        <div class="row g-4 mb-5 justify-content-center fade-in-up">
          <div class="col-md-6 mb-4 mb-md-0">
            <h3 class="role-title text-center mb-3">Partenaires</h3>
            <div class="partner-card">
              <img src="../assets/partenaires.jpeg" alt="Nos Partenaires" class="img-fluid">
            </div>
            <p class="partner-caption text-center mt-3">
              Des alliances stratégiques fortes, unies par une vision commune de l'excellence et du développement.
            </p>
          </div>
          
          <div class="col-md-6">
            <h3 class="role-title text-center mb-3">Sponsor Officiel</h3>
            <div class="partner-card">
              <img src="../assets/sponsor-officiel.jpeg" alt="TriBR - Sponsor Officiel" class="img-fluid">
            </div>
            <p class="partner-caption text-center mt-3">
              <strong>TriBR</strong>, fier partenaire et sponsor officiel, engagé à propulser l'innovation et le leadership féminin vers de nouveaux sommets.
            </p>
          </div>
        </div>

        <div class="row align-items-center mb-5 mt-5">
          <div class="col-lg-5 mb-4 mb-lg-0 text-center">
            <div class="vip-img-wrapper">
              <img src="../assets/marraine.jpeg" alt="Claudia AHO - Marraine" class="img-fluid vip-img">
            </div>
          </div>
          <div class="col-lg-7 ps-lg-5">
            <h3 class="role-title text-gold">Marraine Officielle</h3>
            <h4 class="person-name">Claudia AHO</h4>
            <div class="separator-gold"></div>
            <p class="person-desc">
              La Conférence des Femmes Leaders du Bénin a l’immense honneur de présenter sa Marraine officielle, <strong>CLAUDIA AHO</strong>. À la tête de <em>La Taverne Chez Claudia</em>, fondatrice du <em>Réseaux Curves</em> et PDG du <em>Groupe Himalaya</em>, elle incarne le leadership dans toute sa dimension.
            </p>
            <p class="person-desc">
              Bien plus qu’une entrepreneure accomplie, elle est une femme de foi et une bâtisseuse de destinée. Son parcours exceptionnel témoigne qu'une femme alignée avec sa vision et engagée dans sa mission devient une force inarrêtable. Elle n'est pas seulement une dirigeante, mais une véritable source d'inspiration pour notre génération.
            </p>
          </div>
        </div>

        <div class="row align-items-center flex-row-reverse mt-5">
  
  <div class="col-lg-5 mb-4 mb-lg-0 text-center">
    <div class="vip-img-wrapper">
      <img src="../assets/parrain.jpeg" alt="Rachad YARI KASSIM - Parrain" class="img-fluid vip-img">
    </div>
  </div>
  
  <div class="col-lg-7 pe-lg-5 text-lg-end text-center">
    <h3 class="role-title text-gold">Parrain Officiel</h3>
    <h4 class="person-name">Rachad YARI KASSIM</h4> 
    
    <div class="separator-gold ms-auto me-auto me-lg-0"></div>
    
    <p class="person-desc">
      La Conférence des Femmes Leaders du Bénin a l’honneur d'accueillir <strong>RACHAD YARI KASSIM</strong>, figure inspirante de la créativité et de l’audace entrepreneuriale. Fondateur de <em>Yaris Look</em> et CEO de <em>Yaris Studio</em>, il incarne cette génération de bâtisseurs qui transforment leur passion en véritable mission, élevant ainsi les standards de l'excellence africaine.
    </p>

    <p class="person-desc">
      Véritable modèle de leadership et d'innovation, son parcours témoigne d'un esprit visionnaire. Son engagement à nos côtés prouve que l'union des talents permet de bâtir un avenir audacieux, faisant de lui un partenaire de choix pour accompagner les femmes leaders dans leur quête d'autonomisation et de rayonnement.
    </p>
  </div>
  
</div>

      </div>
    </section>

      <section class="section-contact text-center py-4" id="contact" >
        <div class="container">
          <p class="mb-2 text-muted">Pour toute information complémentaire, contactez-nous directement.</p>
          <a href="https://wa.me/22998523870" class="contact-link">
            <i class="bi bi-whatsapp"></i> +229 98 52 38 70
          </a>
        </div>
      </section>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import Footer from '../components/Footer.vue';
  import { useHead } from '@vueuse/head'
  import photo from '../assets/conf.jpeg';

 

useHead({
  title: 'Programme Officiel & Informations | Conférence des Femmes Leaders du Bénin 2026',

  meta: [
    {
      name: 'description',
      content: "Découvrez le programme officiel, les horaires, le lieu et les détails de la Conférence des Femmes Leaders du Bénin 2026 à l’Université d’Abomey-Calavi."
    },
    {
      name: 'keywords',
      content: 'Programme conférence femmes leaders Bénin, événement leadership féminin 2026, Université Abomey-Calavi conférence, CFLB programme officiel'
    },

    // Open Graph
    {
      property: 'og:title',
      content: 'Programme Officiel - CFLB 2026'
    },
    {
      property: 'og:description',
      content: 'Tous les détails de la Conférence des Femmes Leaders du Bénin 2026 : date, lieu, programme et réservation.'
    },
    {
      property: 'og:type',
      content: 'event'
    },
    {
      property: 'og:url',
      content: 'https://cflb.fr/evenement'
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
      content: 'Programme Officiel - CFLB 2026'
    },
    {
      name: 'twitter:description',
      content: 'Date, lieu et programme complet de la Conférence des Femmes Leaders du Bénin.'
    },
    {
      name: 'twitter:image',
      content: 'https://cflb.fr/preview-home.jpg'
    }
  ],

  link: [
    {
      rel: 'canonical',
      href: 'https://cflb.fr/evenement'
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
        "description": "Plateforme nationale dédiée au leadership féminin, à l’innovation et à l’excellence.",
        "startDate": "2026-03-21T09:00:00+01:00",
        "endDate": "2026-03-21T13:00:00+01:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Université d'Abomey-Calavi - Amphithéâtre Idriss DEBY",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BJ"
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": "Comité d’Organisation de la Conférence des Femmes Leaders du Bénin",
          "url": "https://cflb.fr/"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://cflb.fr/ticket",
          "price": "3000",
          "priceCurrency": "XOF",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-02-21T00:00:00+01:00"
        },
        "image": [
          "https://cflb.fr/preview-home.jpg"
        ]
      })
    }
  ]
})


  
  const router = useRouter();
  
  const goToTicket = () => {
    router.push('/ticket');
  };
  
  const scrollToProgram = () => {
    const element = document.getElementById('programme');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  </script>
  
  <style scoped>
  /* --- GLOBALS --- */
  .event-page {
    font-family: 'Montserrat', sans-serif;
    color: #333;
    overflow-x: hidden;
  }
  
  h1, h2, h3 {
    font-family: 'Lobster', cursive; /* Police Prestige */
  }
  
  .text-gold { color: #D4AF37; }
  .text-body { font-size: 1.05rem; line-height: 1.8; color: #555; margin-bottom: 1rem; }
  
  /* SEPARATORS */
  .separator-gold { width: 60px; height: 3px; background: #D4AF37; margin: 20px 0; }
  .separator-red { width: 60px; height: 3px; background: #D4AF37; margin: 20px 0; }
  
/* --- CONFIGURATION DU HERO (PC PAR DÉFAUT) ---     color: #D4AF37;
*/
.hero-section {
  position: relative;
  height: 85dvh; /* Légèrement réduit pour inviter au scroll */
  background-image: url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}
/* On masque la vidéo sur PC */
.hero-video-mobile {
  display: none;
}

/* --- STYLE DES BOUTONS GLASSMORPHISME (Recopié du Home) --- */
.btn-hero-quick {
  background: rgba(255, 255, 255, 0.103);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Pour le support Safari mobile */
  border: 1px solid white;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  transition: all 0.3s;
  margin: 10px; /* Petit espace entre les boutons */
}

.btn-hero-quick:hover {
  background: #D4AF37;
  border-color: #D4AF37;
  color: #000;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}

/* --- LOGIQUE MOBILE (Écrans < 768px) --- */
@media (max-width: 767px) {
  .hero-section {
    background-image: none !important; /* On enlève l'image sur mobile */
    background-color: #000;
  }

  .hero-video-mobile {
    display: block; /* On affiche la vidéo */
    position: absolute;
    top: 65%;
    left: 50%;
    min-width: 100%;
    min-height: 50%;
    width: auto;
    height: auto;
    z-index: 0;
    transform: translate(-50%, -50%);
    object-fit: cover; /* Important pour que la vidéo remplisse bien l'écran */
  }
  .hero-content{
    margin-top:4rem;
  }

  .hero-title {
    font-size: 2.2rem !important; /* Titre un peu plus petit sur mobile */
    margin-top: 3rem;
    margin-bottom: 1rem;

  }

  .hero-subtitle{
    margin-bottom: 1rem;
    font-size: 1rem !important; /* Titre un peu plus petit sur mobile */

  }
}

/* --- OVERLAY & CONTENT --- */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(235, 166, 19, 0.1) 0%, rgba(216, 145, 12, 0.4) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
}

/* Typographies imposées */
.hero-title {
  font-family: 'Lobster', cursive;
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 10px;
}

.hero-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
}  


/* --- SECTION MANIFESTE (LE NOUVEAU STYLE) --- */
.section-manifeste {
  background: #0E0E0E; /* Noir profond */
  padding: 80px 20px;
  position: relative;
}

.manifeste-content {
  position: relative;
}

.intro-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  line-height: 1.8;
  color: #f1f1f1;
  font-weight: 300;
  margin-bottom: 40px;
}

.highlight {
  color: #D4AF37; /* Or */
  font-weight: 600;
}

/* Badge de date stylisé */
.date-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.date-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 4px;
  color: #D4AF37;
  font-size: 0.9rem;
}

.line {
  flex: 1;
  max-width: 50px;
  height: 1px;
  background: rgba(212, 175, 55, 0.4);
}

/* --- BOUTON GLASSMORPHISME --- */
.btn-hero-quick {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 14px 35px;
  border-radius: 50px;
  font-weight: 600;
  transition: 0.4s;
  margin: 10px;
}

.btn-hero-quick:hover {
  background: #D4AF37;
  border-color: #D4AF37;
  color: #000;
  transform: translateY(-5px);
}

/* --- MOBILE --- */
@media (max-width: 768px) {
  .intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .section-manifeste {
    padding: 60px 20px;
  }
}



  /* --- SECTIONS CONTENT --- */
  .section-title {
    font-size: 2.5rem;
    color: #0E0E0E;
    margin-bottom: 15px;
  }
  
  .reveal-img {
    border-radius: 10px;
    transition: transform 0.5s ease;
  }
  .reveal-img:hover { transform: scale(1.02); }
  
  /* --- 3. INFOS PRATIQUES --- */
  .section-infos{
    background: #0E0E0E;
  }

  .info-box {
    padding: 20px;
  }
  .border-side {
    border-left: 1px solid rgba(255,255,255,0.1);
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  @media (max-width: 768px) { .border-side { border: none; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); } }
  
  .gold-icon {
    font-size: 2rem;
    color: #D4AF37;
    display: block;
    margin-bottom: 15px;
  }
  
  .small-text { font-size: 0.9rem; opacity: 0.7; font-style: italic; }
  
  /* --- 4. PUBLIC --- */
  .clean-list { list-style: none; padding: 0; }
  .clean-list li {
    margin-bottom: 15px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .clean-list li i {     color: #D4AF37;
 font-size: 1.3rem; } /* Check rouge pour rappel */
  
  /* --- 5. PROGRAMME (Timeline) --- */
  .timeline {
    position: relative;
    padding-left: 30px;
    border-left: 2px solid #ddd;
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 30px;
  }
  
  .marker {
    position: absolute;
    left: -36px;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #D4AF37;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #D4AF37;
  }
  
  .marker.highlight { background: #DC3545; box-shadow: 0 0 0 2px #DC3545; }
  
  .content {
    font-size: 1.1rem;
    background: white;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  
  /* --- 6. PROMESSE (Luxe) --- */
  .section-promise {
    background: #0E0E0E;
    color: white;
    background-image: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
  }
  
  .gold-title { font-size: 3rem; color: #D4AF37; }
  
  .promise-text {
    font-size: 1.2rem;
    line-height: 2;
    font-weight: 300;
  }
  
  .quote-box {
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    padding: 30px;
    position: relative;
  }
  
  .quote-icon { font-size: 2rem; color: #D4AF37; opacity: 0.5; }
  .quote-text {
    font-family: 'Lobster', cursive;
    font-size: 1.8rem;
    color: #D4AF37;
    margin: 0;
  }
  
  /* --- 8. BILLETTERIE --- */
  .section-ticket {
    background: #f9f9f9;
  }
  
  .ticket-wrapper {
    max-width: 500px;
    margin: 0 auto;
    border: 2px solid #D4AF37;
    padding: 10px; /* Double border effect */
    border-radius: 15px;
  }
  
  .ticket-content {
    background: white;
    padding: 40px;
    border-radius: 10px;
    border: 1px dashed #ccc;
  }
  
  .ticket-title { font-size: 2rem; margin-bottom: 20px; color: #0E0E0E; }
  
  .ticket-price {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .ticket-price .type {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
    color: #888;
  }
  
  .ticket-price .amount {
    font-size: 3.5rem;
    font-weight: 800;
    color: #D4AF37;
    font-family: 'Montserrat', sans-serif;
  }
  
  .ticket-dates { font-size: 0.9rem; color: #DC3545; margin-bottom: 25px; font-weight: 600; }
  
  .btn-ticket {
    background: #0E0E0E;
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1.2rem;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .btn-ticket:hover { background: #333; transform: scale(1.05); }


/* ==========================================
   SECTION SOUTIENS & PARTENAIRES
   ========================================== */
   .section-soutiens {
  background: #FAFAFA; /* Un gris très très clair pour contraster avec les autres sections blanches */
  border-top: 1px solid #eee;
}

.role-title {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #888;
}

.person-name {
  font-family: 'Lobster', cursive;
  font-size: 2.8rem;
  color: #0E0E0E;
  margin-top: 5px;
  margin-bottom: 10px;
}

.person-desc {
  font-family: 'Montserrat', sans-serif;
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
  text-align: justify;
}

/* --- Légende sous les partenaires --- */
.partner-caption {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  padding: 0 15px;
}
.partner-caption strong {
  color: #0E0E0E;
  font-weight: 700;
}

/* --- Cartes Partenaires / Sponsors (PC par défaut) --- */
.partner-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  padding: 30px;
  height: 250px; /* Un peu plus grand de base */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.15);
  border-color: rgba(212, 175, 55, 0.3);
}

.partner-card img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

/* --- AJUSTEMENTS MOBILE --- */
@media (max-width: 991px) {
  .person-desc {
    text-align: center;
    text-align-last: center; 
  }
  
  .vip-img-wrapper::before {
    display: none; 
  }
  
  .vip-img {
    top: 0;
    left: 0;
    max-height: 350px;
    width: 100%; /* S'assure que la photo prend bien l'écran sur mobile */
  }
  
  .person-name {
    font-size: 2.3rem;
  }
  
  /* C'est ici qu'on force les cartes partenaires à être grandes sur mobile */
  .partner-card {
    height: auto; /* Permet de s'adapter au logo */
    min-height: 220px; /* Maintient une belle zone blanche */
    padding: 15px; /* On réduit le padding interne pour laisser la place à l'image */
  }

  .partner-card img {
    width: 90%; /* Force le logo à prendre la largeur de la carte */
    max-height: 200px; /* Évite que ça ne devienne trop étiré verticalement */
  }

  .partner-caption {
    font-size: 0.9rem;
    margin-bottom: 20px; /* Espace avant de passer au bloc suivant */
  }
} 

/* --- Effet Luxe sur les photos VIP --- */
.vip-img-wrapper {
  position: relative;
  display: inline-block;
  padding: 15px;
}

/* Le fameux cadre doré décalé à l'arrière-plan */
.vip-img-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 20px;
  bottom: 20px;
  border: 3px solid #D4AF37;
  border-radius: 20px;
  z-index: 1;
}

.vip-img {
  position: relative;
  z-index: 2;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  top: 20px;
  left: 20px;
  max-height: 400px;
  object-fit: cover;
  transition: 0.5s ease;
}

.vip-img-wrapper:hover .vip-img {
  transform: scale(1.02);
}

/* --- AJUSTEMENTS MOBILE --- */
@media (max-width: 991px) {
  .person-desc {
    text-align: center;
    text-align-last: center; /* Améliore le rendu justifié sur mobile */
  }
  
  .vip-img-wrapper::before {
    display: none; /* On désactive le cadre décalé sur mobile pour gagner de la place */
  }
  
  .vip-img {
    top: 0;
    left: 0;
    max-height: 350px;
  }
  
  .person-name {
    font-size: 2.3rem;
  }
  
  .partner-card {
    height: 180px;
  }
}





  
  /* Animation Pulse pour le bouton achat */
  .pulse-btn { animation: pulse 2s infinite; }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(14, 14, 14, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(14, 14, 14, 0); }
    100% { box-shadow: 0 0 0 0 rgba(14, 14, 14, 0); }
  }
  
  /* --- 9. CONTACT --- */
  .contact-link {
    color: #333;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 700;
    transition: color 0.3s;
  }
  .contact-link:hover { color: #D4AF37; }
  
  /* --- ANIMATION FADE IN --- */
  .fade-in-up {
    animation: fadeInUp 1s ease-out;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Responsive Font Sizes */
  @media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .section-title { font-size: 2rem; }
    .gold-title { font-size: 2.2rem; }
    .ticket-price .amount { font-size: 2.8rem; }
  }
  </style>