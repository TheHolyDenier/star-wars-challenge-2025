import '@styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'reflect-metadata';
import { handleError } from '@/errors/handle-error';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.config.errorHandler = handleError;

app.mount('#app');
