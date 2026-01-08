/**
 * Entry point for Lay's Flavor Configurator
 * Initializes router, views, and mock state management
 * TODO: Add real state management and SPA navigation when needed
 */

import './styles/index.css';
import { getRouteView } from './router/index.js';

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const appDiv = document.getElementById('app');
  
  if (!appDiv) {
    console.error('Root element #app not found');
    return;
  }
  
  // Get initial route (default to home)
  const pathname = window.location.pathname || '/';
  
  // Get view component and render
  const viewComponent = getRouteView(pathname);
  
  if (viewComponent && typeof viewComponent === 'function') {
    viewComponent();
  } else {
    console.error('View component not found for route:', pathname);
  }
  
  // TODO: Implement proper SPA router with history management
  // TODO: Add back/forward button support
  // TODO: Handle route change animations
});
