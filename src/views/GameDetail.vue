<template>
  <div class="members-wrapper">
    <div class="members-card" v-if="game">

      <h2 class="title">{{ game.titel }}</h2>

      <!-- Bewertung -->
      <div class="rating">
        <p v-if="averageStars">
          ⭐ {{ averageStars }} / 5
          <span class="rating-count">
            ({{ game.reviews.length }} Bewertungen)
          </span>
        </p>
        <p v-else class="rating-none">
          Noch keine Bewertungen
        </p>
      </div>

      <!-- Game Info -->
      <div class="game-info">
        <img :src="game.bildurl" class="cover-img" />

        <div class="info-text">
          <p>
            <strong>Plattform:</strong><br />
            {{ game.platforms.map(p => p.name).join(', ') }}
          </p>

          <p class="description">
            <strong>Beschreibung:</strong><br />
            {{ game.beschreibung }}
          </p>
        </div>
      </div>

      <!-- Review Form -->
      <div v-if="isAuthenticated" class="review-form">
        <h3>Bewertung schreiben</h3>

        <label>Sterne</label>
        <select v-model.number="newReview.stars">
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>

        <label>Text</label>
        <textarea v-model="newReview.text" />

        <button class="save-btn" @click="submitReview">
          Bewertung absenden
        </button>
      </div>

      <p v-else class="login-hint">
        Bitte einloggen, um eine Bewertung zu schreiben.
      </p>

      <!-- Reviews -->
      <h3 class="reviews-title">Neueste Bewertungen</h3>
      <div class="reviews-grid">
        <ReviewCard
          v-for="review in latestReviews"
          :key="review.id"
          :review="review"
          :is-admin="isAdmin"
          :current-user-name="currentUserName"
          @deleted="fetchGame"
        />
      </div>

      <router-link to="/games" class="back-link">
        ← Zurück zur Übersicht
      </router-link>

    </div>

    <div class="members-card" v-else>
      <p>Spiel wurde nicht gefunden.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import ReviewCard from '@/components/ReviewCard.vue'
import { API_BASE_URL } from '@/api/api'

const route = useRoute()
const id = route.params.id

const { isAuthenticated, getAccessTokenSilently } = useAuth0()

const game = ref(null)
const isAdmin = ref(false)
const currentUserName = ref(null)

const newReview = ref({
  stars: 5,
  text: ''
})

/* Profil laden */
const loadProfile = async () => {
  if (!isAuthenticated.value) return

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) throw new Error()

    const profile = await res.json()
    currentUserName.value = profile.name
    isAdmin.value = profile.role === 'ADMIN'
  } catch (err) {
    console.error('Profil konnte nicht geladen werden', err)
  }
}

/* Spiel laden */
const fetchGame = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/games/${id}`)
    if (!res.ok) throw new Error()
    game.value = await res.json()
  } catch (err) {
    console.error('Fehler beim Laden des Spiels:', err)
  }
}

/* Review absenden */
const submitReview = async () => {
  if (!newReview.value.text.trim()) {
    alert('Bitte einen Text eingeben')
    return
  }

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(
      `${API_BASE_URL}/api/reviews/game/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          stars: newReview.value.stars,
          text: newReview.value.text
        })
      }
    )

    if (!res.ok) {
      if (res.status === 409) {
        alert('Du hast dieses Spiel bereits bewertet.')
        return
      }
      throw new Error()
    }

    newReview.value.text = ''
    newReview.value.stars = 5
    await fetchGame()
  } catch (err) {
    console.error('Fehler beim Erstellen der Review:', err)
    alert('Bewertung konnte nicht gespeichert werden')
  }
}

/* Neueste Reviews */
const latestReviews = computed(() => {
  if (!game.value?.reviews) return []
  return [...game.value.reviews]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)
})

/* Durchschnittsbewertung */
const averageStars = computed(() => {
  if (!game.value?.reviews?.length) return null
  const sum = game.value.reviews.reduce((a, r) => a + r.stars, 0)
  return (sum / game.value.reviews.length).toFixed(1)
})

onMounted(() => {
  fetchGame()
  loadProfile()
})
</script>

<style scoped>
.members-wrapper {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.members-card {
  width: 80%;
  max-width: 900px;
  background-color: #1e1e1e;
  padding: 32px;
  border-radius: 12px;
  color: #e0e0e0;
}

.title {
  text-align: center;
  margin-bottom: 10px;
}

.rating {
  text-align: center;
  margin-bottom: 30px;
}

.rating-count {
  opacity: 0.7;
}

.rating-none {
  opacity: 0.6;
}

.game-info {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}

.cover-img {
  width: 180px;
  border-radius: 10px;
  object-fit: cover;
}

.info-text {
  flex: 1;
}

.description {
  margin-top: 12px;
  line-height: 1.6;
}

.review-form {
  background: #262626;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.review-form select,
.review-form textarea {
  background: #1e1e1e;
  border: 1px solid #3a3a3a;
  color: #fff;
  border-radius: 6px;
  padding: 8px;
}

.save-btn {
  align-self: flex-start;
  background: #198754;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.save-btn:hover {
  background: #146c43;
}

.login-hint {
  opacity: 0.7;
  margin-bottom: 20px;
}

.reviews-title {
  margin-bottom: 10px;
}

.reviews-grid {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.back-link {
  display: inline-block;
  margin-top: 30px;
  color: #4cafef;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .members-card {
    width: 92%;
  }

  .game-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cover-img {
    width: 220px;
  }
}
</style>
