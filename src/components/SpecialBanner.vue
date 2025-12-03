<template>
  <div v-if="banner.isVisible" class="banner">
    <p>Special Offer!</p>
    <button @click="banner.hideBanner">Close</button>
  </div>
</template>

<script setup>
import { useBannerStore } from '@/stores/banner.js';

const banner = useBannerStore();
</script>

<style scoped>
.banner {
  background-color: #0d6efd;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>
