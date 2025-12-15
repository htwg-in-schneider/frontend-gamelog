<template>
  <Navbar />

  <div class="container py-5">
    <div v-if="game">
      <h2>{{ game.titel }}</h2>
      <div class="image-wrapper">
        <img :src="game.bildurl" class="card-img" />
      </div>
      <p><strong>Plattform:</strong> {{ game.platforms.map(p => p.name).join(', ') }}</p>
      <p><strong>Beschreibung:</strong> {{ game.beschreibung }}</p>

      <!-- Reviews -->
      <h3>Neueste Bewertungen</h3>
      <div class="reviews-grid">
        <ReviewCard
          v-for="review in latestReviews"
          :key="review.id"
          :review="review"
        />
      </div>

      <router-link to="/" class="details-btn">Zurück zur Übersicht</router-link>
    </div>

    <div v-else>
      <p>Spiel wurde nicht gefunden.</p>
      <router-link to="/" class="details-btn">Zurück</router-link>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ReviewCard from '../components/ReviewCard.vue';

const route = useRoute();
const id = route.params.id;
const game = ref(null);

onMounted(async () => {
  await fetchGame();
});

async function fetchGame() {
  try {
    const response = await fetch(`http://localhost:8081/api/games/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    game.value = await response.json();
  } catch (error) {
    console.error('Fehler beim Laden des Spiels:', error);
  }
}

// Nur die neuesten Reviews anzeigen (z.B. nach ID absteigend)
const latestReviews = computed(() => {
  if (!game.value || !game.value.reviews) return [];
  return [...game.value.reviews]
    .sort((a, b) => b.id - a.id) // neueste zuerst
    .slice(0, 5); // max. 5 Karten anzeigen, kann angepasst werden
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  color: #fff;
}

.image-wrapper {
  margin: 16px 0;
}

.card-img {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
}

.reviews-grid {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0;
}
</style>
