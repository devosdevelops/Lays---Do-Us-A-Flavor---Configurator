/**
 * Vue Router for Lay's Flavor Configurator
 * Handles SPA navigation between views
 */

import { createRouter, createWebHistory } from 'vue-router';
import MainPageView from '../views/MainPageView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import YourSubmissionsView from '../views/YourSubmissionsView.vue';
import ConfiguratorView from '../views/ConfiguratorView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPageView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/submissions',
    name: 'Submissions',
    component: YourSubmissionsView
  },
  {
    path: '/configurator',
    name: 'Configurator',
    component: ConfiguratorView
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

