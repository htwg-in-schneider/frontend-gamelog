  import { createRouter, createWebHistory } from 'vue-router';
  import GameOverview from '@/views/GameOverview.vue';
  import AddGame from '@/views/AddGame.vue';
  import GameDetail from '@/views/GameDetail.vue';
  import Home from '@/views/Home.vue';
  import About from '@/views/About.vue';
  import Profile from '@/views/Profile.vue';
  import User from '@/views/User.vue';
  import Members from '@/views/Members.vue';

  const repoName = '/gamelog-frontend/'; 
  const routes = [
    {
      path: '/',
      name: 'Overview',
      component: Home,
    },
    {
      path: '/games',
      name: 'GameOverview',
      component: GameOverview,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/game/:id',
      name: 'GameDetail',
      component: GameDetail,
      props: true, 
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
    },
    { 
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/users/:id',
      name: 'UserProfile',
      component: User,
      props: true
    },
    {
  path: '/members',
  name: 'Members',
  component: Members,
},

  ];

  const router = createRouter({
    history: createWebHistory(repoName),
    routes,
  });

  export default router;
