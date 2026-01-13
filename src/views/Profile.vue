<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted, ref } from 'vue'

const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

const bearerToken = ref('')
const error = ref('')

function copyToClipboard(event) {
  event.target.select()
  navigator.clipboard.writeText(event.target.value)
}

onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      bearerToken.value = await getAccessTokenSilently()
    } catch (e) {
      error.value = `Fehler beim Laden des Tokens: ${e.message}`
      console.warn(e)
    }
  }
})
</script>

<template>
  <div class="profile-wrapper">

    <!-- LOADING -->
    <div v-if="isLoading" class="loading">
      <div class="spinner-border" role="status"></div>
    </div>

    <!-- PROFIL -->
    <div v-else-if="isAuthenticated && user" class="profile-card">

      <!-- USERNAME GANZ OBEN -->
      <h1 class="username">{{ user.name }}</h1>

      <img
        :src="user.picture"
        :alt="user.name"
        class="profile-pic"
      />

      <details class="debug">
        <summary>OAuth2 / Debug-Informationen</summary>

        <pre>{{ JSON.stringify(user, null, 2) }}</pre>

        <textarea
          readonly
          rows="3"
          @click="copyToClipboard"
        >{{ bearerToken }}</textarea>
      </details>

    </div>

    <!-- NICHT EINGELOGGT -->
    <div v-else class="not-logged-in">
      Sie sind nicht eingeloggt.
    </div>

  </div>
</template>

