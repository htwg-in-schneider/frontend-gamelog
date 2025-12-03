<template>
   <SpecialBanner />
  <main class="main-grid">
    <GameCard
      v-for="game in games"
      :key="game.id"
      :game="game"
      @click.native="goToDetail(game.id)"
    />
  </main>
</template>

<script>
import GameCard from '@/components/GameCard.vue';
import { games } from '@/data.js';
import { useRouter } from 'vue-router';
import SpecialBanner from '@/components/SpecialBanner.vue';

export default {
  name: 'GameOverview',
  components: { GameCard },
  setup() {
    const router = useRouter();

    const goToDetail = (id) => {
      router.push(`/game/${id}`);
    };

    return { games, goToDetail };
  },
};
</script>

<style>
.main-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
