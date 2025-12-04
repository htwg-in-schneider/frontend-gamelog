<template>
  <div class="card" @click="goToGameDetail">
    <div class="image-wrapper">
      <img :src="game.bildurl" class="card-img" />
    </div>

    <h3 class="title">{{ game.titel }}</h3>

    <button class="edit-btn" @click.stop="$emit('edit-game', game)">Bearbeiten</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({ game: Object });

const router = useRouter();

const goToGameDetail = () => {
  router.push(`/game/${game.id}`);
};
</script>
