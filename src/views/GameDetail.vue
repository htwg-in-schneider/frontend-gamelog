<script setup>
//import Navbar from '@/components/Navbar.vue';
//import Footer from '@/components/footer.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const game = ref(null);

onMounted(async () => fetchGame());

async function fetchGame() {
  try {
    const response = await fetch(`http://localhost:8081/api/games/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    game.value = await response.json();
  } catch (error) {
    console.error('Fehler beim Laden des Spiels:', error);
  }
}
</script>

<template>
  <Navbar />

  <div class="container py-5">
    <div v-if="game">
      <h2>{{ game.titel }}</h2>
      <div class="image-wrapper">
        <img :src="game.bildurl" class="card-img" />
      </div>
      <p><strong>Plattform:</strong> {{ game.platform }}</p>
      <p><strong>Beschreibung:</strong> {{ game.beschreibung }}</p>
      <router-link to="/" class="details-btn">Zurück zur Übersicht</router-link>
    </div>
    <div v-else>
      <p>Spiel wurde nicht gefunden.</p>
      <router-link to="/" class="details-btn">Zurück</router-link>
    </div>
  </div>

  <Footer />
</template>
