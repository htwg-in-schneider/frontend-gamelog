<template>
  <div class="page-content">
    <div class="search-container">
      <input v-model="searchTerm" placeholder="Spiel suchen..." class="search-input" />
    </div>

    <button class="add-game-btn" @click="goToAddGame">Neues Spiel</button>

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

const router = useRouter();
const games = ref([]);
const searchTerm = ref('');

const loadGames = async () => {
  try {
    const response = await fetch('http://localhost:8081/api/games');
    games.value = await response.json();
  } catch (error) {
    console.error('Fehler beim Laden der Spiele:', error);
  }
};

onMounted(loadGames);

const filteredGames = computed(() => {
  return games.value.filter(game =>
    game.titel.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const goToAddGame = () => router.push({ name: 'AddGame' });
const goToEditGame = (game) => router.push({ name: 'EditGame', params: { id: game.id } });
</script>
