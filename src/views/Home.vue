<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import ContactForm from '@/components/ContactView.vue'

const router = useRouter()

// Auth0
const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

// Admin-Flag (wie im Saitenweise-Beispiel)
const isAdmin = ref(false)

// Navigation
function goToGames() {
  router.push('/games')
}

// 🧪 TEST-ACTION
function testAdminAction() {
  console.log('✅ ADMIN TEST BUTTON CLICKED')
}

/**
 * 🔥 WICHTIG:
 * Wir warten auf isAuthenticated UND isLoading === false
 * damit das JWT sicher verfügbar ist.
 */
watch(
  [isAuthenticated, isLoading],
  async ([authenticated, loading]) => {
    if (loading || !authenticated) {
      isAdmin.value = false
      return
    }

    try {
      const token = await getAccessTokenSilently()
      console.log('JWT:', token ? 'loaded' : 'missing')

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        console.warn('Profile request failed:', response.status)
        return
      }

      const user = await response.json()
      console.log('Profile loaded:', user)

      // ✅ ADMIN-Check (exakt wie im Beispielprojekt)
      isAdmin.value = user.role === 'ADMIN'

    } catch (err) {
      console.error('Error loading profile:', err)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="page-content">

    <h1>Welcome to GameLog!</h1>
    <p>Explore all our games here!</p>

    <button class="add-game-btn" @click="goToGames">
      Go to games tab
    </button>

    <!-- 🧪 TEST BUTTON – NUR FÜR ADMIN -->
    <button
      v-if="!isLoading && isAuthenticated && isAdmin"
      class="add-game-btn"
      @click="testAdminAction"
    >
      🧪 Admin Test Button
    </button>

    <ContactForm />
  </div>
</template>

<style scoped>
/* optional */
</style>
