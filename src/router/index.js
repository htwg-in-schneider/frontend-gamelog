import { createRouter, createWebHistory } from 'vue-router';
import GameOverview from '@/views/GameOverview.vue'; // Übersichtsseite
import AddGame from '@/views/AddGame.vue';           // Neue Add-Game-Seite
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
    component: GameDetail, // GameDetail importiert statisch, kann bei Bedarf auch dynamisch
  },
  {
    path: '/add-game',
    name: 'AddGame',
    component: AddGame,
  },
  {
    path: '/edit-game/:id',
    name: 'EditGame',
    component: () => import('@/views/EditGame.vue'), // dynamischer Import
  }
];

const router = createRouter({
  history: createWebHistory(repoName),
  routes,
});

export default router;
