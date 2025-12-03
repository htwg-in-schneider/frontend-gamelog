import { createRouter, createWebHistory } from 'vue-router';
import GameOverview from '@/views/GameOverview.vue'; // Deine Übersichtsseite
import GameDetail from '@/views/GameDetail.vue';     // Einzelne Spieleseite

const repoName = '/gamelog-frontend/'; // GitHub Pages Pfad

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: GameOverview,
  },
  {
    path: '/game/:id',
    name: 'GameDetail',
    component: GameDetail,
  },
];

const router = createRouter({
  history: createWebHistory(repoName),
  routes,
});

export default router;
