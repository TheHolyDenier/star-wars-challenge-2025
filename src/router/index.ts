import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('@/views/PeopleView.vue'),
    },
    {
      path: '/planets',
      name: 'planets',
      component: () => import('@/views/PlanetsView.vue'),
    },
    {
      path: '/error/:status?',
      name: 'error',
      component: () => import('@/views/ErrorView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'error', params: { status: '404', message: 'Page not found' } },
    },
  ],
});

export default router;
