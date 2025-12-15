<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()

function goToGames() {
  router.push('/games') 
}
</script>   

<template>
  <div class="page-content">

    <h1>Welcome to GameLog!</h1>
    <a>Explore all our Games here!</a>
    <button class="add-game-btn" @click="goToGames">
  got to games tab
</Button>

  </div>
</template>

<style scoped>

</style>
