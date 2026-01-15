<template>
  <div class="profile-wrapper">

    <!-- 🚫 Nicht eingeloggt -->
    <div v-if="!isAuthenticated" class="info-card">
      <p>Du bist nicht eingeloggt.</p>
    </div>

    <!-- ✅ Eingeloggt -->
    <div v-else class="profile-card">
      <h2>Mein Profil</h2>

      <label>Name</label>
      <input v-model="profile.name" />

      <label>E-Mail</label>
      <input v-model="profile.email" />

      <button @click="saveProfile">
        Änderungen speichern
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { API_BASE_URL } from '@/api/api'

const { isAuthenticated, getAccessTokenSilently } = useAuth0()
const profile = ref({})

const loadProfile = async () => {
  if (!isAuthenticated.value) return

  try {
    const token = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) throw new Error()
    profile.value = await res.json()
  } catch (err) {
    console.error('Profil konnte nicht geladen werden', err)
  }
}

const saveProfile = async () => {
  try {
    const token = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile.value)
    })

    if (!res.ok) throw new Error()
    alert('Profil gespeichert')
  } catch (err) {
    alert('Speichern fehlgeschlagen')
  }
}

onMounted(loadProfile)
</script>

<style scoped>
/* 🌑 Seitenlayout */
.profile-wrapper {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  padding: 40px;
}

/* Formular-Box */
.profile-card {
  width: 100%;
  height: fit-content;
  max-width: 420px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;  
}

/* Nicht eingeloggt */
.info-card {
  background-color: #1e1e1e;
  color: #bbb;
  padding: 24px 32px;
  border-radius: 12px;
  font-size: 1.1rem;
}

/* Inputs */
input {
  background-color: #2a2a2a;
  border: none;
  padding: 8px;
  color: white;
  border-radius: 6px;
}

/* Button */
button {
  margin-top: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>
