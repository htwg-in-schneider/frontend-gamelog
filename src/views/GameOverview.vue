<template>
  <div class="page-content">

    <!-- ZENTRIERTER CONTENT -->
    <div class="overview-container">

      <!-- SUCHLEISTE + FILTER -->
      <div class="search-container overview-search">
        <input
          v-model="searchTerm"
          placeholder="Spiel suchen..."
          class="search-input"
        />

        <select
          v-model="selectedPlatform"
          class="filter-dropdown"
        >
          <option value="">Alle Plattformen</option>
          <option
            v-for="p in availablePlatforms"
            :key="p"
            :value="p"
          >
            {{ p }}
          </option>
        </select>
      </div>

      <!-- ADD GAME BUTTON -->
      <button
        v-if="isAdmin"
        class="add-game-btn"
        @click="goToAddGame"
      >
        Neues Spiel
      </button>

      <!-- SPIELE GRID -->
      <div class="main-grid overview-grid">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
          :is-admin="isAdmin"
          @edit-game="goToEditGame"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import GameCard from '@/components/Gamecard.vue'
import { API_BASE_URL } from '@/api/api'

// Router
const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

// ADMIN Status
const isAdmin = ref(false)

// Zustand
const games = ref([])
const searchTerm = ref('')
const selectedPlatform = ref('')
const availablePlatforms = ref([])

// Profil laden & ADMIN prüfen
const loadProfile = async () => {
  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Profil konnte nicht geladen werden')

    const profile = await res.json()
    isAdmin.value = profile.role === 'ADMIN'
  } catch (err) {
    console.error('Profil-Fehler:', err)
    isAdmin.value = false
  }
}

// Spiele laden
const loadGames = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/games`)
    const data = await response.json()

    games.value = data.map(g => ({
      ...g,
      platformNames: g.platforms ? g.platforms.map(p => p.name) : []
    }))
  } catch (error) {
    console.error('Fehler beim Laden der Spiele:', error)
  }
}

// Plattformen laden
const loadPlatforms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/platforms`)
    const data = await response.json()
    availablePlatforms.value = data.map(p => p.name)
  } catch (error) {
    console.error('Fehler beim Laden der Plattformen:', error)
  }
}

// Gefilterte Spiele
const filteredGames = computed(() => {
  return games.value.filter(game => {
    const matchesSearch = game.titel
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())

    const matchesPlatform =
      selectedPlatform.value === '' ||
      game.platformNames.some(
        p => p.toLowerCase() === selectedPlatform.value.toLowerCase()
      )

    return matchesSearch && matchesPlatform
  })
})

// Navigation
const goToAddGame = () => router.push({ name: 'AddGame' })
const goToEditGame = (game) =>
  router.push({ name: 'EditGame', params: { id: game.id } })

// On Mount
onMounted(() => {
  loadProfile()
  loadGames()
  loadPlatforms()
})
</script>
