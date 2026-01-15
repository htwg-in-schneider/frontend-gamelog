<template>
  <div class="members-wrapper">
    <div class="members-card">

      <h2 class="title">Members</h2>

      <input
        v-model="search"
        placeholder="User suchen..."
        class="search-input"
      />

      <div class="members-list">
        <router-link
          v-for="user in filteredUsers"
          :key="user.id"
          :to="`/users/${user.id}`"
          class="member-row"
        >
          <img
            :src="user.picture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)"
            alt="Avatar"
            class="avatar"
          />

          <span class="name">{{ user.name }}</span>

          <span class="count">
            {{ user.reviewCount }} Review<span v-if="user.reviewCount !== 1">s</span>
          </span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { API_BASE_URL } from '@/api/api'

const users = ref([])
const search = ref('')

const loadUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/api/public/users`)
  users.value = await res.json()
}

const filteredUsers = computed(() =>
  users.value.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

onMounted(loadUsers)
</script>

<style scoped>
.members-wrapper {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.members-card {
  width: 80%;
  max-width: 900px;
  background-color: #1e1e1e;
  padding: 32px;
  border-radius: 12px;
  color: #e0e0e0;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  background: #2a2a2a;
  border: none;
  color: white;
  border-radius: 6px;
  box-sizing: border-box;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.member-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #2a2a2a;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
}

.member-row:hover {
  background: #333;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.name {
  flex: 1;
  font-weight: bold;
}

.count {
  opacity: 0.7;
}
</style>
