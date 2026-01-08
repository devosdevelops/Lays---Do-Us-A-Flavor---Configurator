/**
 * Main Page View - Overview and voting on submissions
 * Displays grid of flavor submissions with CTA to create your own
 */

import { MOCK_SUBMISSIONS } from '../utils/mock-data.js';
import { navigate } from '../router/index.js';
import { SubmissionCard } from '../components/SubmissionCard.js';

export function MainPageView() {
  const appDiv = document.getElementById('app');
  
  const html = `
    <div class="min-h-screen bg-gray-50">
      <!-- Header with CTA -->
      <header class="text-gray-900 py-8 shadow-md" style="background-color: var(--lay-yellow);">
        <div class="max-w-6xl mx-auto px-4">
          <h1 class="text-4xl font-bold mb-2">Lay's "Do Us A Flavor" Configurator</h1>
          <p class="text-lg opacity-90">Design your dream chip flavor and vote on community favorites</p>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-6xl mx-auto px-4 py-12">
        <!-- CTA Section -->
        <section class="mb-12">
          <div class="bg-white rounded-lg shadow-md p-8 border-l-4" style="border-color: var(--lay-red);">
            <h2 class="text-2xl font-bold mb-4">Create Your Own Flavor</h2>
            <p class="text-gray-600 mb-6">Have a flavor idea? Design your own chip bag and submit it to the community for voting.</p>
            <button id="create-btn" class="btn-primary text-lg">
              Launch Configurator →
            </button>
          </div>
        </section>

        <!-- Submissions Grid -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Community Submissions</h2>
          <div id="submissions-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Submission cards will be inserted here -->
          </div>
        </section>

        <!-- Navigation Links (for demo) -->
        <section class="mt-12 pt-8 border-t border-gray-300">
          <h3 class="text-lg font-semibold mb-4">Navigation (Demo)</h3>
          <div class="flex flex-wrap gap-3">
            <button id="nav-login" class="btn-outline">Login</button>
            <button id="nav-signup" class="btn-outline">Signup</button>
            <button id="nav-submissions" class="btn-outline">Your Submissions</button>
          </div>
        </section>
      </main>
    </div>
  `;
  
  appDiv.innerHTML = html;
  
  // Render submission cards
  const grid = document.getElementById('submissions-grid');
  MOCK_SUBMISSIONS.forEach(submission => {
    const card = SubmissionCard(submission);
    grid.appendChild(card);
  });
  
  // Event listeners
  document.getElementById('create-btn').addEventListener('click', () => {
    navigate('/configurator');
  });
  
  document.getElementById('nav-login').addEventListener('click', () => {
    navigate('/login');
  });
  
  document.getElementById('nav-signup').addEventListener('click', () => {
    navigate('/signup');
  });
  
  document.getElementById('nav-submissions').addEventListener('click', () => {
    navigate('/submissions');
  });
}
