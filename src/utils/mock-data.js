/**
 * Mock data for development and testing
 * Contains sample submissions, design options, and UI state
 */

export const MOCK_SUBMISSIONS = [
  {
    id: 'sub-001',
    username: 'flavor_creator_1',
    name: 'Smoky BBQ Delight',
    flavorNotes: ['Smoked Paprika', 'BBQ', 'Savory'],
    bagColor: '#DC4419',
    fontStyle: 'bold',
    votes: 187,
    imageUrl: 'https://via.placeholder.com/300x200?text=Smoky+BBQ',
    createdAt: '2026-01-05'
  },
  {
    id: 'sub-002',
    username: 'spice_master',
    name: 'Lime & Cilantro Crunch',
    flavorNotes: ['Lime', 'Cilantro', 'Jalapeño'],
    bagColor: '#2FBF71',
    fontStyle: 'modern',
    votes: 142,
    imageUrl: 'https://via.placeholder.com/300x200?text=Lime+Cilantro',
    createdAt: '2026-01-03'
  },
  {
    id: 'sub-003',
    username: 'umami_fan',
    name: 'Truffle & Garlic',
    flavorNotes: ['Truffle', 'Garlic', 'Umami'],
    bagColor: '#8B6914',
    fontStyle: 'elegant',
    votes: 256,
    imageUrl: 'https://via.placeholder.com/300x200?text=Truffle+Garlic',
    createdAt: '2026-01-01'
  },
  {
    id: 'sub-004',
    username: 'sweet_tooth',
    name: 'Honey & Sriracha',
    flavorNotes: ['Honey', 'Sriracha', 'Chili'],
    bagColor: '#FFA500',
    fontStyle: 'playful',
    votes: 203,
    imageUrl: 'https://via.placeholder.com/300x200?text=Honey+Sriracha',
    createdAt: '2025-12-30'
  },
  {
    id: 'sub-005',
    username: 'dill_pickle_lover',
    name: 'Classic Dill Pickle',
    flavorNotes: ['Dill', 'Pickle', 'Vinegar'],
    bagColor: '#009245',
    fontStyle: 'retro',
    votes: 98,
    imageUrl: 'https://via.placeholder.com/300x200?text=Dill+Pickle',
    createdAt: '2025-12-28'
  }
];

export const MOCK_BAG_COLORS = [
  { name: 'Lay\'s Yellow', hex: '#FFCC00' },
  { name: 'Cherry Red', hex: '#C8102E' },
  { name: 'Ocean Blue', hex: '#003DA5' },
  { name: 'Forest Green', hex: '#2FBF71' },
  { name: 'Burnt Orange', hex: '#DC4419' },
  { name: 'Plum Purple', hex: '#662E91' },
  { name: 'Warm Cream', hex: '#F5EDE5' },
  { name: 'Charcoal', hex: '#555555' }
];

export const MOCK_FONT_STYLES = [
  { name: 'Bold', value: 'bold', class: 'font-bold' },
  { name: 'Elegant', value: 'elegant', class: 'italic font-serif' },
  { name: 'Modern', value: 'modern', class: 'font-sans' },
  { name: 'Playful', value: 'playful', class: 'font-bold tracking-wide' },
  { name: 'Retro', value: 'retro', class: 'text-uppercase tracking-wider' }
];

export const MOCK_FLAVOR_NOTES = [
  'Spicy',
  'Savory',
  'Sweet',
  'Smoky',
  'Tangy',
  'Umami',
  'Herby',
  'Zesty',
  'Crispy',
  'Creamy',
  'Bold',
  'Subtle'
];

export const MOCK_USER_SUBMISSIONS = [
  {
    id: 'user-sub-001',
    name: 'My Wasabi Dream',
    flavorNotes: ['Wasabi', 'Ginger'],
    bagColor: '#2FBF71',
    fontStyle: 'modern',
    votes: 5,
    status: 'published',
    createdAt: '2026-01-08'
  },
  {
    id: 'user-sub-002',
    name: 'Curry Craze',
    flavorNotes: ['Curry', 'Turmeric', 'Coconut'],
    bagColor: '#FFA500',
    fontStyle: 'bold',
    votes: 0,
    status: 'draft',
    createdAt: '2026-01-07'
  }
];

/**
 * Simulate current user context (would come from auth state)
 */
export const MOCK_CURRENT_USER = {
  id: 'user-123',
  username: 'flavor_explorer',
  email: 'explorer@lays.com',
  isLoggedIn: false // Start not logged in
};

/**
 * Local state for configurator (updates in memory only)
 */
export const createInitialConfig = () => ({
  name: '',
  flavorNotes: [],
  bagColor: '#FFCC00',
  fontStyle: 'bold',
  imageUpload: null
});
