<template>
  <div class="card">
    <div class="image-wrapper">
      <img :src="props.game.bildurl" class="card-img" />
    </div>

    <h3 class="title">{{ props.game.titel }}</h3>

    <button class="edit-btn" @click="$emit('edit-game', props.game)">Bearbeiten</button>
    <button class="details-btn" @click="goToGameDetail">Details</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Props definieren
const props = defineProps({
  game: Object
});

const router = useRouter();

// Funktion zum Weiterleiten auf die GameDetail-Seite
const goToGameDetail = () => {
  console.log('Details-Button geklickt, Game ID:', props.game.id);
  router.push({ name: 'GameDetail', params: { id: props.game.id } });
};
</script>

<style scoped>

</style>
