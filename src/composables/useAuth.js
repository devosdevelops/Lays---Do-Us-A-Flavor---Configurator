/**
 * Authentication Composable for Vue
 * Manages login state, token storage, and auth logic
 */

import { ref, computed } from 'vue';

const isLoggedIn = ref(false);
const user = ref(null);
const token = ref(null);

// Load auth state from localStorage on init
function initAuth() {
  const stored = localStorage.getItem('auth');
  if (stored) {
    try {
      const auth = JSON.parse(stored);
      token.value = auth.token;
      user.value = auth.user;
      isLoggedIn.value = true;
    } catch (e) {
      console.error('Failed to load stored auth:', e);
      localStorage.removeItem('auth');
    }
  }
}

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function login(email, password) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.message || 'Login failed' };
    }

    const data = await response.json();
    
    // Store auth state
    token.value = data.token;
    user.value = data.user;
    isLoggedIn.value = true;
    
    // Persist to localStorage
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Signup user with email and password and auto-login
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function signup(username, email, password) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.message || 'Signup failed' };
    }

    // Account created successfully, auto-login with provided credentials
    return await login(email, password);
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Logout user
 */
function logout() {
  token.value = null;
  user.value = null;
  isLoggedIn.value = false;
  localStorage.removeItem('auth');
}

export function useAuth() {
  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    user: computed(() => user.value),
    token: computed(() => token.value),
    login,
    signup,
    logout
  };
}

// Initialize on module load
initAuth();
