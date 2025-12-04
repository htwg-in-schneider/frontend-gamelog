<template>
  <div>
    <!-- Suchfeld -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search..."
        class="search-input"
      />
    </div>

    <!-- Add Game Button -->
    <button class="add-game-btn" @click="goToAddGame">Add Game</button>

    <main class="main-grid">
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        @edit-game="goToEditGame"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import GameCard from '../components/Gamecard.vue';

const router = useRouter();
const games = ref([]);
const searchTerm = ref('');

// Daten laden
const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/games');
    games.value = await response.json();
  } catch (error) {
    console.error('Fehler beim Laden der Games:', error);
  }
};

// Filterfunktion
const filteredGames = computed(() => {
  if (!searchTerm.value) return games.value;
  return games.value.filter((game) =>
    game.titel.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const goToAddGame = () => router.push('/add-game');
const goToEditGame = (game) => router.push(`/edit-game/${game.id}`);

onMounted(fetchGames);
</script>

<style>

</style>
