<template>
  <div class="game-card">
    <img :src="game.image" :alt="game.title" />
    <h3>{{ game.title }}</h3>
    <button @click="showDetails">Details</button>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    game: Object,
  },
  methods: {
    showDetails() {
      alert(this.game.description);
    },
  },
};
</script>

<style scoped>
.game-card {
  background: #27272B;
  color: #e6e6e6;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  transition: transform 0.25s ease;
}
.game-card:hover {
  transform: translateY(-4px);
}
.game-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}
button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #0a58ca;
}
</style>
