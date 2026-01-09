/**
 * API Service Layer for Lay's Flavor Configurator
 * Handles all backend communication (mocked for now)
 * TODO: Replace with real HTTP calls once backend is ready
 * See: API_and_DB_Documentation.md for endpoint specifications
 */

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// TODO: Implement real authentication
export async function login(username, password) {
  console.log('API: login called', { username });
  // TODO: POST /api/users/login
  // TODO: Store token in localStorage
  return { success: true, token: 'mock-token-12345' };
}

// TODO: Implement real signup
export async function signup(username, email, password) {
  console.log('API: signup called', { username, email });
  // TODO: POST /api/users/register
  // TODO: Store token in localStorage
  return { success: true, token: 'mock-token-12345' };
}

// Submit a new flavor design
export async function submitDesign(designData) {
  try {
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    
    const { token } = JSON.parse(authData);
    
    // Map config to API format
    const payload = {
      flavorName: designData.name,
      bagColor: designData.bagColor,
      fontChoice: designData.fontStyle,
      keyFlavors: designData.flavorNotes
    };
    
    const response = await fetch(`${API_BASE}/api/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to submit design');
    }
    
    const data = await response.json();
    console.log('Design submitted:', data);
    return { success: true, submissionId: data._id };
  } catch (error) {
    console.error('Submit design error:', error);
    throw error;
  }
}

// TODO: Implement real voting
export async function voteSubmission(submissionId) {
  console.log('API: voteSubmission called', { submissionId });
  // TODO: POST /api/submissions/:submissionId/vote with Authorization header
  return { success: true, votes: 42 };
}

// TODO: Implement real submissions fetch
export async function getSubmissions() {
  console.log('API: getSubmissions called');
  // TODO: GET /api/submissions (public endpoint)
  return [];
}

// TODO: Implement user submissions fetch
export async function getUserSubmissions(userId) {
  console.log('API: getUserSubmissions called', { userId });
  // TODO: GET /api/users/:userId/submissions with Authorization header
  return [];
}

// TODO: Implement submission deletion
export async function deleteSubmission(submissionId) {
  console.log('API: deleteSubmission called', { submissionId });
  // TODO: DELETE /api/submissions/:submissionId with Authorization header
  return { success: true };
}

// TODO: Implement submission editing
export async function updateSubmission(submissionId, updates) {
  console.log('API: updateSubmission called', { submissionId, updates });
  // TODO: PUT /api/submissions/:submissionId with Authorization header
  return { success: true };
}
