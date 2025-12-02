<template>
  <!-- Direkt die Übersichtsseite rendern -->
  <GameOverview />
</template>

<script setup>
import GameOverview from './views/GameOverview.vue';
</script>

<style>
/* Optional globaler Dark Mode Hintergrund */
body {
  margin: 0;
  background-color: #1e1e1e;
  font-family: Arial, sans-serif;
}
</style>
