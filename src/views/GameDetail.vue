<template>
  <div class="game-detail">
    <h2>{{ game.title }}</h2>
   
    <p>{{ game.description }}</p>
    <p><strong>Price:</strong> {{ game.price }}</p>
  </div>
</template>

<script>
import { games } from '@/data.js';
import { useRoute } from 'vue-router';

export default {
  name: 'GameDetail',
  setup() {
    const route = useRoute();
    const game = games.find(g => g.id === parseInt(route.params.id));
    return { game };
  },
};
</script>
