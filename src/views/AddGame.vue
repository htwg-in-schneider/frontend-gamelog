<template>
  <div class="form-container">
    <h2>Neues Spiel erstellen</h2>

    <!-- 🔒 Hinweis für Nicht-Admins -->
    <p v-if="!isAdmin" class="error-text">
      Sie haben keine Berechtigung, ein neues Spiel zu erstellen.
    </p>

    <form v-if="isAdmin" @submit.prevent="createGame">
      <label>Titel</label>
      <input v-model="game.titel" class="form-control" required />

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
        required
      ></textarea>

      <label>Bild URL</label>
      <input
        v-model="game.bildurl"
        class="form-control"
        required
      />

      <button type="submit" class="save-btn">
        Erstellen
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

// 🔹 ADMIN Status
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

// 🔹 Profil laden & ADMIN prüfen
const loadProfile = async () => {
  try {
    const token = await getAccessTokenSilently()

    const res = await fetch('http://localhost:8081/api/profile', {
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

// 🔹 Spiel erstellen (ADMIN)
const createGame = async () => {
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

    const res = await fetch('http://localhost:8081/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(game.value)
    })

    if (!res.ok) throw new Error('Fehler beim Erstellen')

    alert('Spiel erfolgreich erstellt!')
    router.push({ name: 'GameOverview' })
  } catch (err) {
    console.error(err)
    alert('Fehler beim Speichern!')
  }
}

onMounted(loadProfile)
</script>

<style scoped>
.platform-checkbox {
  margin-bottom: 5px;
}

.error-text {
  color: red;
  margin-top: 10px;
}

.save-btn {
  margin-top: 15px;
  background-color: #4caf50;
  color: white;
  padding: 8px 14px;
  border: none;
  cursor: pointer;
}
</style>
