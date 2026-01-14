<template>
  <div class="review-card cover-layout">
    <!-- 🎮 Cover links -->
    <div class="cover-wrapper">
      <img
        :src="review.gameCover"
        alt="Game Cover"
        class="cover-img"
      />
    </div>

    <!-- 📄 Inhalt rechts -->
    <div class="content">
      <div class="stars">
        <span v-for="n in 5" :key="n">
          <svg
            v-if="n <= review.stars"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFD700"
            width="16"
            height="16"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#555"
            width="16"
            height="16"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </span>
      </div>

      <div class="user-name">{{ review.userName }}</div>
      <div class="review-text">{{ review.text }}</div>

      <span
        v-if="canDelete"
        class="delete-link"
        @click="deleteReview"
      >
        Löschen
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const props = defineProps({
  review: Object,
  isAdmin: Boolean,
  currentUserName: String
})

const emit = defineEmits(['deleted'])
const { getAccessTokenSilently } = useAuth0()

const canDelete = computed(() =>
  props.isAdmin || props.review.userName === props.currentUserName
)

const deleteReview = async () => {
  if (!confirm('Bewertung wirklich löschen?')) return

  try {
    const token = await getAccessTokenSilently()
    const res = await fetch(
      `http://localhost:8081/api/reviews/${props.review.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (!res.ok) throw new Error()
    emit('deleted')
  } catch {
    alert('Bewertung konnte nicht gelöscht werden')
  }
}
</script>
