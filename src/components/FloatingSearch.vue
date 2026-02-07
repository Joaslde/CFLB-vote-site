<template>
  <div class="search-wrapper" :class="{ 'active': isOpen }">
    <input 
      ref="searchInput"
      type="text" 
      v-model="query" 
      @input="handleSearch"
      placeholder="Rechercher..." 
      class="search-input"
    />
    <button class="search-bubble" @click="toggleSearch">
      <i :class="isOpen ? 'bi bi-x-lg' : 'bi bi-search'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const props = defineProps(['candidates']);
const emit = defineEmits(['highlight']);

const isOpen = ref(false);
const query = ref('');
const searchInput = ref(null);

const toggleSearch = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => searchInput.value.focus());
  } else {
    query.value = '';
  }
};

const handleSearch = () => {
  if (!query.value) return;
  const term = query.value.toLowerCase();

  const match = props.candidates.find((c) => {
    const nameToCheck = c.nom || c.name || ''; // Sécurité
    return nameToCheck.toLowerCase().includes(term);
  });

  if (match) {
    const element = document.getElementById(`candidate-${match.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    emit('highlight', match.id);
  }
};
</script>

<style scoped>
.search-wrapper {
  position: fixed;
  bottom: 103px;
  right: 35px;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.search-bubble {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #eea810;
  border: none;
  color: #000;
  font-size: 1.4rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.search-input {
  width: 0;
  padding: 0;
  border: none;
  background: #fff;
  height: 50px;
  border-radius: 25px;
  outline: none;
  transition: all 0.4s ease;
  opacity: 0;
  margin-right: -25px;
}

.search-wrapper.active .search-input {
  width: 220px; /* Plus petit sur mobile */
  padding: 0 45px 0 20px;
  opacity: 1;
  margin-right: -55px; /* Superpose la bulle sur l'input */
}

@media (max-width: 576px) {
  .search-wrapper.active .search-input {
    width: 75vw; /* Prend la largeur de l'écran sur mobile */
  }
}
</style>