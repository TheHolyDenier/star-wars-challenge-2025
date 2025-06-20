import '@styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'reflect-metadata';
import { useNotificationStore } from '@/stores/notification';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const notificationStore = useNotificationStore();

app.config.errorHandler = (err, vm, info) => {
  notificationStore.add(`An error occurred: ${err.message}. Please try again later.`, 'error');
  console.error(err, vm, info);
};

app.mount('#app');
