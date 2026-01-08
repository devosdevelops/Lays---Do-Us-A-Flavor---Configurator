/**
 * Your Submissions View - User's created flavor submissions
 * Shows drafts, published, and ability to edit/delete
 * TODO: Load real user submissions from API
 */

import { MOCK_USER_SUBMISSIONS } from '../utils/mock-data.js';
import { navigate } from '../router/index.js';

export function YourSubmissionsView() {
  const appDiv = document.getElementById('app');
  
  const html = `
    <div class="min-h-screen bg-lay-neutral">
      <!-- Header -->
      <header class="bg-lay-yellow text-gray-900 py-8 shadow-md">
        <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold">Your Submissions</h1>
            <p class="text-gray-700 mt-2">Manage your flavor designs</p>
          </div>
          <button id="create-new" class="btn-secondary">+ New Submission</button>
        </div>
      </header>

      <!-- Content -->
      <main class="max-w-6xl mx-auto px-4 py-12">
        ${MOCK_USER_SUBMISSIONS.length === 0 ? `
          <div class="text-center py-12">
            <p class="text-gray-600 text-lg mb-4">You haven't created any submissions yet.</p>
            <button id="start-creating" class="btn-primary">Create Your First Submission</button>
          </div>
        ` : `
          <div class="space-y-4">
            ${MOCK_USER_SUBMISSIONS.map(sub => `
              <div class="bg-white rounded-lg shadow p-6 flex items-start justify-between hover:shadow-lg transition-shadow">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900">${sub.name}</h3>
                  <p class="text-gray-600 mt-2">${sub.description}</p>
                  <div class="mt-4 flex items-center gap-4 text-sm text-gray-600">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold ${sub.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                      ${sub.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span>👍 ${sub.votes} votes</span>
                    <span>${sub.createdAt}</span>
                  </div>
                </div>
                <div class="flex gap-2 ml-4">
                  <button class="btn-outline px-3 py-1 text-sm edit-btn" data-id="${sub.id}">Edit</button>
                  <button class="px-3 py-1 text-sm border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors delete-btn" data-id="${sub.id}">Delete</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </main>

      <!-- Navigation -->
      <div class="max-w-6xl mx-auto px-4 py-8 border-t border-gray-300">
        <button id="back-home" class="text-gray-600 hover:text-gray-900">← Back to Home</button>
      </div>
    </div>
  `;
  
  appDiv.innerHTML = html;
  
  // Event listeners
  document.getElementById('create-new')?.addEventListener('click', () => {
    navigate('/configurator');
  });
  
  document.getElementById('start-creating')?.addEventListener('click', () => {
    navigate('/configurator');
  });
  
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // TODO: Load submission data and open configurator in edit mode
      console.log('Edit submission:', e.target.dataset.id);
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // TODO: Call API deleteSubmission
      if (confirm('Are you sure you want to delete this submission?')) {
        console.log('Delete submission:', e.target.dataset.id);
      }
    });
  });
  
  document.getElementById('back-home').addEventListener('click', () => {
    navigate('/');
  });
}
