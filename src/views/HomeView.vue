<template>
      <center><h1>salut</h1> </center> 

    <button class="back-button" @click="goBack">
      <i class="bi bi-chevron-left"></i>
    </button>
  </template>

  <script setup>

    const goBack = () => {
  router.push('/candidates').then(() => {
    router.go(0); // Force un rafraîchissement si nécessaire
  });
};


  </script>
