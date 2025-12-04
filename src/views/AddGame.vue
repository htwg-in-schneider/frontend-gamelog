<template>
  <div class="form-container">
    <h2>Neues Spiel erstellen</h2>

    <form @submit.prevent="createGame">
      <label>Titel</label>
      <input type="text" v-model="game.titel" class="form-control" required />

      <label>Platform</label>
      <input type="text" v-model="game.platform" class="form-control" required />

      <label>Beschreibung</label>
      <textarea v-model="game.beschreibung" class="form-control" required></textarea>

      <label>Bild URL</label>
      <input type="text" v-model="game.bildurl" class="form-control" required />

      <button type="submit" class="save-btn">Erstellen</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const game = ref({ titel: '', platform: '', beschreibung: '', bildurl: '' });

const createGame = async () => {
  try {
    const res = await fetch('http://localhost:8081/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game.value),
    });

    if (!res.ok) throw new Error('Fehler beim Erstellen');

    alert('Spiel erfolgreich erstellt!');
    router.push({ name: 'Overview' });
  } catch (err) {
    console.error(err);
    alert('Fehler beim Speichern!');
  }
};
</script>
