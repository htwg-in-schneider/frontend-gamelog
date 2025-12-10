<template>
  <div class="app">
    <Navbar />
    <router-view /> <!-- Hier wird GameOverview oder GameDetail geladen -->
    <FooterComponent />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import FooterComponent from './components/footer.vue'; 

export default {
  name: 'App',
  components: {
    Navbar,
    FooterComponent,
  },
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #2d2c2c; /* Dark Mode */
}
</style>
