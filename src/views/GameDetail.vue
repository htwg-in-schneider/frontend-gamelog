<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const game = ref({
  titel: '',
  beschreibung: '',
  platform: '',
  bildurl: ''
});

const loadGame = async () => {
  try {
    const response = await fetch(`http://localhost:8081/api/games/${id}`);
    game.value = await response.json();
  } catch (error) {
    console.error('Fehler beim Laden:', error);
  }
};

onMounted(loadGame);
</script>

<template>
  <div class="form-container">
    <h2>{{ game.titel }}</h2>

    <div class="image-wrapper">
      <img :src="game.bildurl" class="card-img" />
    </div>

    <p><strong>Platform:</strong> {{ game.platform }}</p>
    <p><strong>Beschreibung:</strong></p>
    <p>{{ game.beschreibung }}</p>
  </div>
</template>
