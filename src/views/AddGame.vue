<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';

const router = useRouter();
const url = 'http://localhost:8081/api/games';
const game = ref({ titel: '', platform: '', beschreibung: '', bildurl: '' });

async function createGame() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game.value),
    });
    if (!response.ok) throw new Error(`Fehler beim Erstellen: ${response.status}`);

    alert('Spiel erfolgreich erstellt!');
    router.push('/');
  } catch (error) {
    console.error('Fehler beim Erstellen des Spiels:', error);
    alert('Speichern fehlgeschlagen!');
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Neues Spiel erstellen</h2>
    <form @submit.prevent="createGame">
      <label for="gameTitle">Titel</label>
      <input id="gameTitle" type="text" class="form-control" v-model="game.titel" required />

      <label for="gamePlatform">Platform</label>
      <input id="gamePlatform" type="text" class="form-control" v-model="game.platform" required />

      <label for="gameDescription">Beschreibung</label>
      <textarea id="gameDescription" class="form-control" v-model="game.beschreibung" required></textarea>

      <label for="gameImageUrl">Bild URL</label>
      <input id="gameImageUrl" type="text" class="form-control" v-model="game.bildurl" required />

      <button type="submit">Erstellen</button>
    </form>
  </div>
</template>
