<template>
  <div id="app">
    <Header />

    <main class="page-content">
      <!-- Deine Seiten, Slots, Komponenten oder Router Views -->
      <GameOverview />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/header.vue'
import Footer from './components/hooter.vue'

</script>

