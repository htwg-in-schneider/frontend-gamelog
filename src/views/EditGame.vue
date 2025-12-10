<template>
  <div class="form-container">
    <h2>Spiel bearbeiten</h2>

    <form @submit.prevent="updateGame">
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

      <button type="submit" class="save-btn">Speichern</button>
      <button type="button" class="save-btn" @click="deleteGame">Löschen</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

// erlaubte Plattformen
const allowedPlatforms = ['PC', 'Switch', 'PS5', 'XBOX', 'Mobile'];

const game = ref({ titel: '', beschreibung: '', bildurl: '', platforms: [] });
const selectedPlatforms = ref([]);
const platformError = ref('');

// Spiel laden
const loadGame = async () => {
  try {
    const res = await fetch(`http://localhost:8081/api/games/${id}`);
    const data = await res.json();
    game.value = data;
    selectedPlatforms.value = data.platforms ? data.platforms.map(p => p.name) : [];
  } catch (err) {
    console.error(err);
  }
};

// Spiel updaten
const updateGame = async () => {
  const invalid = selectedPlatforms.value.some(p => !allowedPlatforms.includes(p));
  if (invalid || selectedPlatforms.value.length === 0) {
    platformError.value = 'Bitte wählen Sie mindestens eine gültige Plattform aus.';
    return;
  }
  platformError.value = '';

  game.value.platforms = selectedPlatforms.value.map(p => ({ name: p }));

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

// Spiel löschen
const deleteGame = async () => {
  if (!confirm('Möchten Sie dieses Spiel wirklich löschen?')) return;

  try {
    const res = await fetch(`http://localhost:8081/api/games/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Löschen fehlgeschlagen');

    alert('Spiel erfolgreich gelöscht!');
    router.push({ name: 'Overview' });
  } catch (err) {
    console.error(err);
    alert('Fehler beim Löschen!');
  }
};

onMounted(loadGame);
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
