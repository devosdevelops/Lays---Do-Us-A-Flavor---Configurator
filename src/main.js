/**
 * Entry point for Lay's Flavor Configurator (Vue.js)
 * Initializes Vue app, router, and global styles
 */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './styles/index.css';

const app = createApp(App);

app.use(router);
app.mount('#app');

