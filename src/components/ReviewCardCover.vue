<template>
  <div class="review-card">
    <div class="stars">
      <span v-for="n in 5" :key="n" class="star">
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
</template>

<script setup>
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { API_BASE_URL } from '@/api/api'

const props = defineProps({
  review: Object,
  isAdmin: Boolean,
  currentUserId: Number
})

const emit = defineEmits(['deleted'])

const { getAccessTokenSilently } = useAuth0()

const canDelete = computed(() => {
  return (
    props.isAdmin ||
    props.review.userId === props.currentUserId
  )
})

const deleteReview = async () => {
  if (!confirm('Bewertung wirklich löschen?')) return

  try {
    const token = await getAccessTokenSilently()

    const res = await fetch(
      `${API_BASE_URL}/api/reviews/${props.review.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!res.ok) throw new Error()

    emit('deleted')
  } catch (err) {
    console.error(err)
    alert('Bewertung konnte nicht gelöscht werden')
  }
}
</script>

<style scoped>
.review-card {
  background-color: #3a3a3a;
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
  min-width: 180px;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stars {
  display: flex;
}

.user-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.review-text {
  font-size: 0.85rem;
  color: #ddd;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.delete-link {
  margin-top: 6px;
  font-size: 0.8rem;
  color: #ff6b6b;
  cursor: pointer;
}

.delete-link:hover {
  text-decoration: underline;
}
</style>
