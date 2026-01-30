<script setup>
    import logo from '../assets/CFLB-logo-bgless.png';
    </script>
  
<template>
    <footer class="elegant-footer">
      <div class="container text-center">
        <img :src="logo" alt="Logo CFLB" class="footer-logo mb-4">
        <h4 class="font-premium footer-title">Conférence des Femmes Leaders</h4>
        <div class="footer-divider"></div>
        <div class="social-links">
          <a href="#"><i class="bi bi-instagram"></i></a>
          <a href="#"><i class="bi bi-facebook"></i></a>
          <a href="#"><i class="bi bi-linkedin"></i></a>
        </div>
        <p class="copyright">© 2026 CFLB. Tous droits réservés. L'élégance est une attitude.</p>
      </div>
    </footer>
</template>

<style scoped>


.elegant-footer 
 { background: #050505;
  padding: 60px 20px;
  color: rgba(255,255,255,0.6);}
.footer-logo { width: 200px;  } /* LOGO 200PX */
.footer-title { color: #D4AF37; font-size: 2rem; font-family:'Lobster'; }
.footer-divider { width: 50px; height: 1px; background: #333; margin: 30px auto; }
.social-links { margin-bottom: 30px; font-size: 1.5rem; }
.social-links a { color: rgba(255,255,255,0.4); margin: 0 15px; transition: 0.3s; }
.social-links a:hover { color: #D4AF37; }
.copyright { font-family: 'Montserrat'; font-size: 0.8rem; letter-spacing: 1px; }

@media ( max-width: 768px ) {
  .footer-logo {  margin-bottom: -5rem ; } /* LOGO 200PX */
  .footer-title { margin-top: -2rem; }
}

</style>  

  