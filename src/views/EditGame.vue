<template>
  <div class="form-container">
    <h2>Spiel bearbeiten</h2>

    <form @submit.prevent="updateGame">
      <label>Titel</label>
      <input v-model="game.titel" class="form-control" />

      <label>Platform</label>
      <input v-model="game.platform" class="form-control" />

      <label>Beschreibung</label>
      <textarea v-model="game.beschreibung" class="form-control"></textarea>

      <label>Bild URL</label>
      <input v-model="game.bildurl" class="form-control" />

      <button type="submit" class="save-btn">Speichern</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const game = ref({ titel: '', platform: '', beschreibung: '', bildurl: '' });

const loadGame = async () => {
  try {
    const res = await fetch(`http://localhost:8081/api/games/${id}`);
    game.value = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const updateGame = async () => {
  try {
    const res = await fetch(`http://localhost:8081/api/games/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game.value),
    });

    if (!res.ok) throw new Error('Update fehlgeschlagen');

    alert('Spiel erfolgreich aktualisiert!');
    router.push({ name: 'Overview' });
  } catch (err) {
    console.error(err);
    alert('Fehler beim Speichern!');
  }
};

onMounted(loadGame);
</script>
