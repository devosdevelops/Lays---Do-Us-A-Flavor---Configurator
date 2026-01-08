/**
 * UI Layout Component for Configurator
 * Creates control panel with color picker, font selector, flavor notes, and upload
 * Updates in-memory config object
 */

import { MOCK_BAG_COLORS, MOCK_FONT_STYLES, MOCK_FLAVOR_NOTES } from '../utils/mock-data.js';

export function createUILayout(container, config) {
  const html = `
    <!-- Design Name -->
    <div>
      <label class="block text-sm font-bold text-gray-900 mb-2">Design Name</label>
      <input 
        type="text" 
        id="design-name" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
        placeholder="e.g., Spicy Mango Dream"
        value="${config.name}"
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-bold text-gray-900 mb-2">Description</label>
      <textarea 
        id="design-description" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow resize-none"
        rows="3"
        placeholder="Describe your flavor concept..."
      >${config.description}</textarea>
    </div>

    <!-- Bag Color -->
    <div>
      <label class="block text-sm font-bold text-gray-900 mb-3">Bag Color</label>
      <div class="space-y-2">
        ${MOCK_BAG_COLORS.map(color => `
          <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
            <input 
              type="radio" 
              name="bag-color" 
              value="${color.hex}"
              ${config.bagColor === color.hex ? 'checked' : ''}
              class="color-radio"
            />
            <div 
              style="background-color: ${color.hex};" 
              class="w-8 h-8 rounded border border-gray-300"
            ></div>
            <span class="text-sm text-gray-700">${color.name}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <!-- Font Style -->
    <div>
      <label class="block text-sm font-bold text-gray-900 mb-3">Font Style</label>
      <div class="space-y-2">
        ${MOCK_FONT_STYLES.map(font => `
          <label class="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
            <input 
              type="radio" 
              name="font-style" 
              value="${font.value}"
              ${config.fontStyle === font.value ? 'checked' : ''}
              class="font-radio"
            />
            <span class="text-sm ${font.class}">${font.name}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <!-- Flavor Notes -->
    <div>
      <label class="block text-sm font-bold text-gray-900 mb-3">Flavor Notes (Select up to 3)</label>
      <div class="grid grid-cols-2 gap-2">
        ${MOCK_FLAVOR_NOTES.map(note => `
          <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
            <input 
              type="checkbox" 
              name="flavor-note" 
              value="${note}"
              class="flavor-checkbox"
              ${config.flavorNotes.includes(note) ? 'checked' : ''}
            />
            <span class="text-sm text-gray-700">${note}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <!-- Image Upload (Placeholder) -->
    <div>
      <label class="block text-sm font-bold text-gray-900 mb-2">Design Image (Optional)</label>
      <input 
        type="file" 
        id="design-image" 
        class="w-full text-sm text-gray-500 file:px-3 file:py-2 file:rounded file:border-0 file:bg-lay-yellow file:text-gray-900 file:font-semibold file:cursor-pointer hover:file:bg-yellow-400"
        accept="image/*"
      />
      <p class="text-xs text-gray-500 mt-2">TODO: Image upload will be implemented</p>
    </div>
  `;
  
  container.innerHTML = html;
  
  // Event listeners - update config object in memory
  document.getElementById('design-name').addEventListener('input', (e) => {
    config.name = e.target.value;
    console.log('Config updated:', config);
  });
  
  document.getElementById('design-description').addEventListener('input', (e) => {
    config.description = e.target.value;
    console.log('Config updated:', config);
  });
  
  document.querySelectorAll('.color-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      config.bagColor = e.target.value;
      // TODO: Update Three.js material in real-time
      console.log('Config updated:', config);
    });
  });
  
  document.querySelectorAll('.font-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      config.fontStyle = e.target.value;
      // TODO: Update Three.js text material in real-time
      console.log('Config updated:', config);
    });
  });
  
  document.querySelectorAll('.flavor-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked && config.flavorNotes.length >= 3) {
        e.target.checked = false;
        alert('Maximum 3 flavor notes allowed');
        return;
      }
      
      if (e.target.checked) {
        config.flavorNotes.push(e.target.value);
      } else {
        config.flavorNotes = config.flavorNotes.filter(note => note !== e.target.value);
      }
      console.log('Config updated:', config);
    });
  });
  
  document.getElementById('design-image').addEventListener('change', (e) => {
    // TODO: Handle file upload to cloud storage
    console.log('File selected (upload not implemented):', e.target.files[0]);
  });
}
