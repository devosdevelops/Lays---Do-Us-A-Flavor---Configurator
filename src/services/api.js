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

// Submit a new flavor design with optional image
export async function submitDesign(designData) {
  try {
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    
    const { token } = JSON.parse(authData);
    
    // Create FormData for multipart submission
    const formData = new FormData();
    formData.append('flavorName', designData.name);
    formData.append('bagColor', designData.bagColor);
    formData.append('fontChoice', designData.fontStyle);
    
    // Append keyFlavors as array (backend expects this format)
    if (designData.flavorNotes && Array.isArray(designData.flavorNotes)) {
      formData.append('keyFlavors', JSON.stringify(designData.flavorNotes));
    } else {
      formData.append('keyFlavors', JSON.stringify([]));
    }
    
    // Append image if present (backend handles Cloudinary upload)
    if (designData.imageUpload) {
      formData.append('image', designData.imageUpload);
    }
    
    console.log('Submitting design with:', {
      name: designData.name,
      bagColor: designData.bagColor,
      fontStyle: designData.fontStyle,
      flavorNotes: designData.flavorNotes,
      hasImage: !!designData.imageUpload
    });
    
    const response = await fetch(`${API_BASE}/api/submissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Note: Do NOT set Content-Type for FormData - browser handles it automatically
      },
      credentials: 'include',
      body: formData
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('API error response:', responseData);
      throw new Error(responseData.message || responseData.error || responseData.errors?.join(', ') || 'Failed to submit design');
    }
    
    console.log('Design submitted:', responseData);
    console.log('Image URL:', responseData.bagImageUrl);
    return { success: true, submissionId: responseData._id, bagImageUrl: responseData.bagImageUrl };
  } catch (error) {
    console.error('Submit design error:', error);
    throw error;
  }
}

// Vote on a submission
export async function voteSubmission(submissionId) {
  try {
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    
    const { token } = JSON.parse(authData);
    
    const response = await fetch(`${API_BASE}/api/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ submissionId })
    });
    
    if (!response.ok) {
      const data = await response.json();
      // 409 means user already voted on this submission
      if (response.status === 409) {
        throw new Error('You have already voted on this submission');
      }
      throw new Error(data.message || 'Failed to vote');
    }
    
    const data = await response.json();
    console.log('Vote submitted:', data);
    return { success: true, vote: data };
  } catch (error) {
    console.error('Vote submission error:', error);
    throw error;
  }
}

// Get all submissions (public endpoint)
export async function getSubmissions() {
  try {
    const response = await fetch(`${API_BASE}/api/submissions`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    
    const submissions = await response.json();
    console.log('Fetched submissions:', submissions);
    return submissions;
  } catch (error) {
    console.error('Get submissions error:', error);
    throw error;
  }
}

// Get current user's submissions
export async function getUserSubmissions() {
  try {
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    
    const { token } = JSON.parse(authData);
    
    const response = await fetch(`${API_BASE}/api/submissions/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch your submissions');
    }
    
    const submissions = await response.json();
    console.log('Fetched user submissions:', submissions);
    return submissions;
  } catch (error) {
    console.error('Get user submissions error:', error);
    throw error;
  }
}

// Delete a submission
export async function deleteSubmission(submissionId) {
  try {
    // Get token from localStorage
    const authData = localStorage.getItem('auth');
    if (!authData) {
      throw new Error('Not authenticated');
    }
    
    const { token } = JSON.parse(authData);
    
    const response = await fetch(`${API_BASE}/api/submissions/${submissionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete submission');
    }
    
    const data = await response.json();
    console.log('Submission deleted:', data);
    return { success: true, deletedId: data._id };
  } catch (error) {
    console.error('Delete submission error:', error);
    throw error;
  }
}
