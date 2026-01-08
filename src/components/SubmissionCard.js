/**
 * Reusable Submission Card Component
 * Displays flavor submission with title, description, color preview, and vote button
 */

import { voteSubmission } from '../services/api.js';

export function SubmissionCard(submission) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow';
  
  card.innerHTML = `
    <div style="background-color: ${submission.bagColor}; height: 120px;" class="flex items-center justify-center">
      <div class="text-center text-white font-bold ${submission.fontStyle}">
        ${submission.name}
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900">${submission.name}</h3>
      <p class="text-sm text-gray-600 mt-2">${submission.description}</p>
      
      <div class="mt-4 flex flex-wrap gap-2">
        ${submission.flavorNotes.map(note => `
          <span class="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
            ${note}
          </span>
        `).join('')}
      </div>
      
      <div class="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
        <span class="text-sm text-gray-600">
          <span class="text-lg font-bold text-gray-900">${submission.votes}</span> votes
        </span>
        <button 
          class="btn-secondary px-3 py-1 text-sm vote-btn" 
          data-id="${submission.id}"
          aria-label="Vote for ${submission.name}"
        >
          👍 Vote
        </button>
      </div>
    </div>
  `;
  
  // Add vote handler
  card.querySelector('.vote-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    // TODO: Call voteSubmission(submission.id) and update count
    console.log('Vote submitted for:', submission.id);
  });
  
  return card;
}
