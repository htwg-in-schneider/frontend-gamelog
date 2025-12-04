<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const game = ref({
  titel: "",
  beschreibung: "",
  platform: "",
  bildurl: ""
});

const loadGame = async () => {
  try {
    const response = await fetch(`http://localhost:8081/api/games/${id}`);
    game.value = await response.json();
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
};

const updateGame = async () => {
  try {
    const response = await fetch(`http://localhost:8081/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game.value)
    });
    if (!response.ok) throw new Error("Update fehlgeschlagen");

    alert("Game erfolgreich aktualisiert!");
    router.push("/");
  } catch (error) {
    console.error("Fehler:", error);
    alert("Konnte Game nicht aktualisieren.");
  }
};

onMounted(loadGame);
</script>

<template>
  <div class="form-container">
    <h2>Spiel bearbeiten</h2>
    <form @submit.prevent="updateGame">
      <label for="editTitle">Titel</label>
      <input id="editTitle" type="text" class="form-control" v-model="game.titel" />

      <label for="editDescription">Beschreibung</label>
      <textarea id="editDescription" class="form-control" v-model="game.beschreibung"></textarea>

      <label for="editPlatform">Platform</label>
      <input id="editPlatform" type="text" class="form-control" v-model="game.platform" />

      <label for="editImageUrl">Bild-URL</label>
      <input id="editImageUrl" type="text" class="form-control" v-model="game.bildurl" />

      <button type="submit" class="save-btn">Speichern</button>
    </form>
  </div>
</template>
