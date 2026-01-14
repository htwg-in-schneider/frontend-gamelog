<template>
  <div class="profile-wrapper">
    <div class="profile-card" v-if="user">

      <h2 class="username">{{ user.name }}</h2>

      <p class="meta">
        {{ reviews.length }} Bewertung<span v-if="reviews.length !== 1">en</span>
      </p>

      <h3 class="section-title">Letzte Bewertungen</h3>

      <div v-if="reviews.length" class="reviews-grid">
        <ReviewCardCover
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        />
      </div>

      <p v-else class="info-text">
        Noch keine Bewertungen vorhanden.
      </p>

      <router-link to="/games" class="back-link">
        ← Zurück zur Übersicht
      </router-link>
    </div>

    <div v-else class="profile-card">
      <p>User nicht gefunden.</p>
      <router-link to="/games" class="back-link">Zurück</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ReviewCard from '@/components/ReviewCardCover.vue'
import ReviewCardCover from '@/components/ReviewCardCover.vue'

const route = useRoute()
const userId = route.params.id

const user = ref(null)
const reviews = ref([])

/* 🔓 Öffentliches Profil + Reviews laden */
const loadUser = async () => {
  try {
    const res = await fetch(
      `http://localhost:8081/api/public/users/${userId}`
    )

    if (!res.ok) throw new Error()

    const data = await res.json()
    user.value = { id: data.id, name: data.name }
    reviews.value = data.reviews ?? []

  } catch (err) {
    console.error('User konnte nicht geladen werden', err)
    user.value = null
  }
}

onMounted(loadUser)
</script>

<style scoped>
.profile-wrapper {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.profile-card {
  width: 80%;
  max-width: 900px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 40px;
  border-radius: 12px;
}

.username {
  text-align: center;
  margin-bottom: 8px;
}

.meta {
  text-align: center;
  opacity: 0.8;
  margin-bottom: 32px;
}

.section-title {
  margin-bottom: 12px;
}

.reviews-grid {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.info-text {
  opacity: 0.7;
}

.back-link {
  display: inline-block;
  margin-top: 32px;
  color: #4cafef;
}
</style>
