<template>
  <div class="game-card" @click="$emit('select', game)">
    <div class="thumbnail">{{ game.name[0] }}</div>
    <div class="game-name">{{ game.name }}</div>
  </div>
</template>

<script setup>
defineProps({
  game: Object
});
</script>

<style scoped>
.game-card {
  background-color: #2a2a2a;
  color: #fff;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}

.game-card:hover {
  transform: scale(1.05);
  background-color: #3a3a3a;
}

.thumbnail {
  width: 100%;
  height: 100px;
  background-color: #444;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.game-name {
  font-weight: bold;
}
</style>
