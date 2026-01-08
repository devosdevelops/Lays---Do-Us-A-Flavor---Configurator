/**
 * Login View - User authentication placeholder
 * TODO: Implement real login logic
 */

import { navigate } from '../router/index.js';

export function LoginView() {
  const appDiv = document.getElementById('app');
  
  const html = `
    <div class="min-h-screen bg-gradient-to-br from-lay-neutral to-gray-100 flex items-center justify-center py-12 px-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p class="text-center text-gray-600 mb-8">Sign in to manage your submissions</p>
        
        <form id="login-form" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-semibold mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
              placeholder="your_username"
              required
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" class="btn-primary w-full text-center">Sign In</button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-gray-600">Don't have an account? <button id="to-signup" class="text-lay-red font-semibold hover:underline">Sign up</button></p>
        </div>
        
        <div class="mt-4 text-center">
          <button id="back-home" class="text-gray-600 hover:text-gray-900">← Back to Home</button>
        </div>
      </div>
    </div>
  `;
  
  appDiv.innerHTML = html;
  
  // Event listeners
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: Call API login function
    console.log('Login submitted (UI only)');
  });
  
  document.getElementById('to-signup').addEventListener('click', () => {
    navigate('/signup');
  });
  
  document.getElementById('back-home').addEventListener('click', () => {
    navigate('/');
  });
}
