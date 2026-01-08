/**
 * Router for Lay's Flavor Configurator
 * Handles navigation between views: main, login, signup, submissions, configurator
 * TODO: Implement SPA router logic (pathname-based navigation)
 */

import { MainPageView } from '../views/MainPageView.js';
import { LoginView } from '../views/LoginView.js';
import { SignupView } from '../views/SignupView.js';
import { YourSubmissionsView } from '../views/YourSubmissionsView.js';
import { ConfiguratorView } from '../views/ConfiguratorView.js';

const ROUTES = {
  '/': MainPageView,
  '/login': LoginView,
  '/signup': SignupView,
  '/submissions': YourSubmissionsView,
  '/configurator': ConfiguratorView
};

/**
 * Get view component based on pathname
 * @param {string} pathname - URL pathname
 * @returns {Object} View component
 */
export function getRouteView(pathname) {
  return ROUTES[pathname] || ROUTES['/'];
}

/**
 * Navigate to a specific route
 * @param {string} pathname - Route path
 * TODO: Implement history.pushState and view rendering
 */
export function navigate(pathname) {
  // TODO: Update URL
  // TODO: Render appropriate view component
  console.log(`Navigating to: ${pathname}`);
}
