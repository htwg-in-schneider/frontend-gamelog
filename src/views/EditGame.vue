<template>
  <div class="page-content">
    <div class="form-container">
      <h2>Spiel bearbeiten</h2>

      <!-- Hinweis für Nicht-Admins -->
      <p v-if="!isAdmin" class="error-text">
        Sie haben keine Berechtigung, dieses Spiel zu bearbeiten.
      </p>

      <form @submit.prevent="updateGame">
        <label>Titel</label>
        <input
          v-model="game.titel"
          class="form-control"
          :disabled="!isAdmin"
          required
        />

        <label>Plattformen</label>
        <div
          v-for="p in allowedPlatforms"
          :key="p"
          class="platform-checkbox"
        >
          <input
            type="checkbox"
            :value="p"
            v-model="selectedPlatforms"
            :id="`platform-${p}`"
            :disabled="!isAdmin"
          />
          <label :for="`platform-${p}`">{{ p }}</label>
        </div>

        <p v-if="platformError" class="error-text">
          {{ platformError }}
        </p>

        <label>Beschreibung</label>
        <textarea
          v-model="game.beschreibung"
          class="form-control"
          :disabled="!isAdmin"
          required
        ></textarea>

        <label>Bild URL</label>
        <input
          v-model="game.bildurl"
          class="form-control"
          :disabled="!isAdmin"
          required
        />

        <!-- Buttons nur für ADMIN -->
        <div v-if="isAdmin" class="button-row">
          <button type="submit" class="save-btn">Speichern</button>
          <button type="button" class="delete-btn" @click="deleteGame">
            Löschen
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { API_BASE_URL } from '@/api/api'

const route = useRoute()
const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

const id = route.params.id

// ADMIN Status
const isAdmin = ref(false)

// erlaubte Plattformen
const allowedPlatforms = ['PC', 'Switch', 'PS5', 'XBOX', 'Mobile']

const game = ref({
  titel: '',
  beschreibung: '',
  bildurl: '',
  platforms: []
})

const selectedPlatforms = ref([])
const platformError = ref('')

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

// Spiel laden (öffentlich)
const loadGame = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/games/${id}`)
    if (!res.ok) throw new Error('Laden fehlgeschlagen')

    const data = await res.json()
    game.value = data
    selectedPlatforms.value = data.platforms
      ? data.platforms.map(p => p.name)
      : []
  } catch (err) {
    console.error(err)
    alert('Spiel konnte nicht geladen werden')
  }
}

// Spiel aktualisieren (ADMIN)
const updateGame = async () => {
  if (!isAdmin.value) return

  const invalid = selectedPlatforms.value.some(
    p => !allowedPlatforms.includes(p)
  )

  if (invalid || selectedPlatforms.value.length === 0) {
    platformError.value =
      'Bitte wählen Sie mindestens eine gültige Plattform aus.'
    return
  }

  platformError.value = ''
  game.value.platforms = selectedPlatforms.value.map(p => ({ name: p }))

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/games/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(game.value)
    })

    if (!res.ok) throw new Error('Update fehlgeschlagen')

    alert('Spiel erfolgreich aktualisiert!')
    router.push({ name: 'GameOverview' })
  } catch (err) {
    console.error(err)
    alert('Fehler beim Speichern!')
  }
}

// Spiel löschen (ADMIN)
const deleteGame = async () => {
  if (!isAdmin.value) return
  if (!confirm('Möchten Sie dieses Spiel wirklich löschen?')) return

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(`${API_BASE_URL}/api/games/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Löschen fehlgeschlagen')

    alert('Spiel erfolgreich gelöscht!')
    router.push({ name: 'GameOverview' })
  } catch (err) {
    console.error(err)
    alert('Fehler beim Löschen!')
  }
}

onMounted(() => {
  loadProfile()
  loadGame()
})
</script>

<style scoped>
</style>
