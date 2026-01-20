<script setup>
  import { RouterView } from 'vue-router'
  import AppLoader from './components/AppLoader.vue'
  </script>
  
  <template>
    <AppLoader />
  
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </template>
  
  <style>
  /* Style global pour le corps de la page */
  body {
    margin: 0;
    padding: 0;
    background-color: #F8F5F2; /* Ivoire Premium */
    color: #0E0E0E;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    overflow-x: hidden;
  }
  
  /* Transition douce entre les pages */
  .fade-page-enter-active,
  .fade-page-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-page-enter-from,
  .fade-page-leave-to {
    opacity: 0;
  }
  </style>