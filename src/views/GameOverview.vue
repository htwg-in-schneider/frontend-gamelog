<template>
  <div class="overview-container">
    <h1>Meine Spiele</h1>
    <div class="games-grid">
      <GameCard 
        v-for="game in games" 
        :key="game.id" 
        :game="game" 
        @select="selectGame" 
      />
    </div>
  </div>
</template>

<script setup>
import GameCard from '../components/GameCard.vue';
import { reactive } from 'vue';

const games = reactive([
  { id: 1, name: 'Spiel 1' },
  { id: 2, name: 'Spiel 2' },
  { id: 3, name: 'Spiel 3' },
  { id: 4, name: 'Spiel 4' },
  { id: 5, name: 'Spiel 5' },
]);

function selectGame(game) {
  alert(`Du hast ${game.name} ausgewählt!`);
}
</script>

<style scoped>
.overview-container {
  background-color: #1e1e1e;
  min-height: 100vh;
  color: #fff;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}
</style>
