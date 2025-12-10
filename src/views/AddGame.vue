<template>
  <div class="form-container">
    <h2>Neues Spiel erstellen</h2>

    <form @submit.prevent="createGame">
      <label>Titel</label>
      <input v-model="game.titel" class="form-control" required />

      <label>Plattformen</label>
      <div v-for="p in allowedPlatforms" :key="p" class="platform-checkbox">
        <input
          type="checkbox"
          :value="p"
          v-model="selectedPlatforms"
          :id="`platform-${p}`"
        />
        <label :for="`platform-${p}`">{{ p }}</label>
      </div>

      <p v-if="platformError" class="error-text">{{ platformError }}</p>

      <label>Beschreibung</label>
      <textarea v-model="game.beschreibung" class="form-control" required></textarea>

      <label>Bild URL</label>
      <input v-model="game.bildurl" class="form-control" required />

      <button type="submit" class="save-btn">Erstellen</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// erlaubte Plattformen
const allowedPlatforms = ['PC', 'Switch', 'PS5', 'XBOX', 'Mobile'];

const game = ref({ titel: '', beschreibung: '', bildurl: '', platforms: [] });
const selectedPlatforms = ref([]);
const platformError = ref('');

const createGame = async () => {
  // Validierung: mind. eine Plattform auswählen und nur gültige
  const invalid = selectedPlatforms.value.some(p => !allowedPlatforms.includes(p));
  if (invalid || selectedPlatforms.value.length === 0) {
    platformError.value = 'Bitte wählen Sie mindestens eine gültige Plattform aus.';
    return;
  }
  platformError.value = '';

  // Plattformen ins Game-Objekt übernehmen
  game.value.platforms = selectedPlatforms.value.map(p => ({ name: p }));

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

<style scoped>
.platform-checkbox {
  margin-bottom: 5px;
}

.error-text {
  color: red;
  margin-top: 5px;
}
</style>
