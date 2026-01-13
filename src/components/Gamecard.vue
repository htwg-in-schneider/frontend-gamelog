<template>
  <div class="card">
    <div class="image-wrapper">
      <img :src="game.bildurl" class="card-img" />
    </div>

    <h3 class="title">{{ game.titel }}</h3>

    <!-- 🔒 EDIT: nur ADMIN -->
    <button
      v-if="isAdmin"
      class="edit-btn"
      @click="$emit('edit-game', game)"
    >
      Bearbeiten
    </button>

    <!-- 👀 DETAILS: für alle -->
    <button
      class="details-btn"
      @click="goToGameDetail"
    >
      Details
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Props
defineProps({
  game: {
    type: Object,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()

// Routing
const goToGameDetail = () => {
  router.push({
    name: 'GameDetail',
    params: { id: game.id }
  })
}
</script>

<style scoped>
/* optionales Styling */
</style>
