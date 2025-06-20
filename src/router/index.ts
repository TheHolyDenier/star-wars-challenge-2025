import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'SW Coda' },
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('@/views/PeopleView.vue'),
      meta: { title: 'People - SW Coda' },
    },
    {
      path: '/planets',
      name: 'planets',
      component: () => import('@/views/PlanetsView.vue'),
      meta: { title: 'Planets - SW Coda' },
    },
    {
      path: '/error/:status?',
      name: 'error',
      component: () => import('@/views/ErrorView.vue'),
      props: true,
      meta: { title: 'Error - SW Coda' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'error', params: { status: '404', message: 'Page not found' } },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const defaultTitle = 'SW - Coda';
  document.title = to.meta.title || defaultTitle;
  next();
});

export default router;
