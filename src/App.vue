<script setup>
  import { RouterView, useRoute } from 'vue-router'
  import AppLoader from './components/AppLoader.vue'
  import NavbarPC from './components/NavbarPC.vue';
  import MobileNavbar from './components/MobileNavbar.vue';
  
  const route = useRoute();
</script>

<template>
  <AppLoader />

  <header>
    <NavbarPC v-if="route.path !== '/'" />
    
    <MobileNavbar v-if="route.name !== 'candidate-profile'" />
  </header>

  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade-page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
  /* Style global */
  body {
    margin: 0;
    padding: 0;
    background-color: #F8F5F2; 
    color: #0E0E0E;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    overflow-x: hidden;
  }

  /* Transition entre les pages */
  .fade-page-enter-active,
  .fade-page-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-page-enter-from,
  .fade-page-leave-to {
    opacity: 0;
  }
</style>