/**
 * Signup View - User registration placeholder
 * TODO: Implement real signup logic
 */

import { navigate } from '../router/index.js';

export function SignupView() {
  const appDiv = document.getElementById('app');
  
  const html = `
    <div class="min-h-screen bg-gradient-to-br from-lay-neutral to-gray-100 flex items-center justify-center py-12 px-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center mb-2">Join the Flavor Contest</h1>
        <p class="text-center text-gray-600 mb-8">Create your account to submit and vote</p>
        
        <form id="signup-form" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-semibold mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
              placeholder="choose_username"
              required
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-semibold mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
              placeholder="your@email.com"
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
          
          <button type="submit" class="btn-primary w-full text-center">Create Account</button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-gray-600">Already have an account? <button id="to-login" class="text-lay-red font-semibold hover:underline">Sign in</button></p>
        </div>
        
        <div class="mt-4 text-center">
          <button id="back-home" class="text-gray-600 hover:text-gray-900">← Back to Home</button>
        </div>
      </div>
    </div>
  `;
  
  appDiv.innerHTML = html;
  
  // Event listeners
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: Call API signup function
    console.log('Signup submitted (UI only)');
  });
  
  document.getElementById('to-login').addEventListener('click', () => {
    navigate('/login');
  });
  
  document.getElementById('back-home').addEventListener('click', () => {
    navigate('/');
  });
}
