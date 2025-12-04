import { createRouter, createWebHistory } from 'vue-router';
import GameOverview from '@/views/GameOverview.vue';
import AddGame from '@/views/AddGame.vue';
import GameDetail from '@/views/GameDetail.vue';

const repoName = '/gamelog-frontend/'; // GitHub Pages Pfad, lokal kannst du auch '/'

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
    props: true, // <-- wichtig, damit id als Prop an GameDetail übergeben wird
  },
  {
    path: '/add-game',
    name: 'AddGame',
    component: AddGame,
  },
  {
    path: '/edit-game/:id',
    name: 'EditGame',
    component: () => import('@/views/EditGame.vue'),
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(repoName),
  routes,
});

export default router;
