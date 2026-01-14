<template>
  <div class="detail-wrapper">
    <div class="detail-card" v-if="game">

      <!-- 🔝 HEADER -->
<h2 class="title">{{ game.titel }}</h2>

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

<!-- 🎮 GAME INFO LAYOUT -->
<div class="game-info">
  <!-- Cover links -->
  <div class="cover-wrapper">
    <img :src="game.bildurl" class="cover-img" />
  </div>

  <!-- Beschreibung rechts -->
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


      <!-- ⭐ REVIEW FORM -->
      <div v-if="isAuthenticated" class="review-form">
        <h3>Bewertung schreiben</h3>

        <label>Sterne</label>
        <select v-model.number="newReview.stars">
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>

        <label>Text</label>
        <textarea
          v-model="newReview.text"
          placeholder="Deine Bewertung..."
        />

        <button class="save-btn" @click="submitReview">
          Bewertung absenden
        </button>
      </div>

      <p v-else class="info-text">
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

    <div v-else class="detail-card">
      <p>Spiel wurde nicht gefunden.</p>
      <router-link to="/games" class="back-link">
        Zurück
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import ReviewCard from '@/components/ReviewCard.vue'

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

/* 🔹 Profil laden */
const loadProfile = async () => {
  if (!isAuthenticated.value) return

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch('http://localhost:8081/api/profile', {
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

/* 🔹 Spiel laden */
const fetchGame = async () => {
  try {
    const res = await fetch(`http://localhost:8081/api/games/${id}`)
    if (!res.ok) throw new Error()
    game.value = await res.json()
  } catch (err) {
    console.error('Fehler beim Laden des Spiels:', err)
  }
}

/* 🔹 Review absenden */
const submitReview = async () => {
  if (!newReview.value.text.trim()) {
    alert('Bitte einen Text eingeben')
    return
  }

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(
      `http://localhost:8081/api/reviews/game/${id}`,
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

/* 🔹 Neueste Reviews */
const latestReviews = computed(() => {
  if (!game.value?.reviews) return []
  return [...game.value.reviews]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)
})

/* 🔹 Durchschnittsbewertung */
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
/* 🌑 Page Wrapper */
.detail-wrapper {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
}


/* 📄 ZENTRALE KARTE */
.detail-card {
  width: 80%;
  max-width: 1200px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
}

/* 🔝 Titel + Bewertung */
.title {
  text-align: center;
  margin-bottom: 6px;
}

.rating {
  text-align: center;
  margin-bottom: 32px;
}

.rating-count {
  opacity: 0.7;
  font-size: 0.9rem;
}

.rating-none {
  opacity: 0.6;
}

/* 🎮 GAME INFO (Cover + Beschreibung) */
.game-info {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 40px;
}

/* Cover links */
.cover-wrapper {
  flex: 0 0 20%;
  display: flex;
  justify-content: center;
}

.cover-img {
  width: 100%;
  max-width: 200px;
  border-radius: 12px;
  object-fit: cover;
}

/* Beschreibung rechts */
.info-text {
  flex: 1;
}

.description {
  margin-top: 12px;
  line-height: 1.6;
}

/* ⭐ Review Form */
.review-form {
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.review-form textarea {
  min-height: 90px;
}

.save-btn {
  width: fit-content;
  background-color: #4caf50;
  color: white;
  padding: 6px 14px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}

/* 📝 Reviews */
.reviews-title {
  margin-top: 40px;
  margin-bottom: 12px;
}

.reviews-grid {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
}

/* 🔙 Back-Link */
.back-link {
  display: inline-block;
  margin-top: 32px;
  color: #4cafef;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

/* 📱 Mobile */
@media (max-width: 768px) {
  .detail-card {
    width: 92%;
    padding: 24px;
  }

  .game-info {
    flex-direction: column;
    align-items: center;
  }

  .cover-img {
    max-width: 240px;
  }

  .info-text {
    text-align: center;
  }
}

</style>
