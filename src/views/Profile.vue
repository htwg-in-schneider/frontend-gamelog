<template>
  <div class="profile-card">
    <h2>Mein Profil</h2>

    <label>Name</label>
    <input v-model="profile.name" />

    <label>E-Mail</label>
    <input v-model="profile.email" />

    <button @click="saveProfile">
      Änderungen speichern
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { getAccessTokenSilently } = useAuth0()
const profile = ref({})

const loadProfile = async () => {
  const token = await getAccessTokenSilently()
  const res = await fetch('http://localhost:8081/api/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })
  profile.value = await res.json()
}

const saveProfile = async () => {
  const token = await getAccessTokenSilently()
  await fetch('http://localhost:8081/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(profile.value)
  })
  alert('Profil gespeichert')
}

onMounted(loadProfile)
</script>
