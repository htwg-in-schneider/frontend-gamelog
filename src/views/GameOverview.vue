<template>
  <div class="page-content">

    <!-- SUCHLEISTE + PLATFORM-FILTER -->
    <div class="search-container">
      <input 
        v-model="searchTerm" 
        placeholder="Spiel suchen..." 
        class="search-input"
      />

      <select 
        v-model="selectedPlatform" 
        class="filter-dropdown"
      >
        <option value="">Alle Plattformen</option>
        <option 
          v-for="p in availablePlatforms" 
          :key="p" 
          :value="p"
        >
          {{ p }}
        </option>
      </select>
    </div>

    <!-- ADD GAME BUTTON -->
    <button class="add-game-btn" @click="goToAddGame">
      Neues Spiel
    </button>

    <!-- SPIELE GRID -->
    <div class="main-grid">
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        @edit-game="goToEditGame"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import GameCard from '@/components/Gamecard.vue';

// Router
const router = useRouter();

// Zustand
const games = ref([]);
const searchTerm = ref('');
const selectedPlatform = ref('');
const availablePlatforms = ref([]);

// 1Spiele laden
const loadGames = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/games');
    const data = await response.json();

    // Sicherstellen, dass jedes Game ein Array von Plattform-Namen hat
    games.value = data.map(g => ({
      ...g,
      platformNames: g.platforms ? g.platforms.map(p => p.name) : []
    }));
  } catch (error) {
    console.error('Fehler beim Laden der Spiele:', error);
  }
};

// Plattformen laden
const loadPlatforms = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/platforms');
    const data = await response.json();
    availablePlatforms.value = data.map(p => p.name);
  } catch (error) {
    console.error('Fehler beim Laden der Plattformen:', error);
  }
};

// Gefilterte Spiele berechnen
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesSearch = game.titel
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    const matchesPlatform =
      selectedPlatform.value === '' ||
      (game.platformNames &&
       game.platformNames.some(p => p.toLowerCase() === selectedPlatform.value.toLowerCase()));

    return matchesSearch && matchesPlatform;
  });
});

// Navigation
const goToAddGame = () => router.push({ name: 'AddGame' });
const goToEditGame = (game) =>
  router.push({ name: 'EditGame', params: { id: game.id } });

// Beim Mounten API-Calls ausführen
onMounted(() => {
  loadGames();
  loadPlatforms();
});
</script>
