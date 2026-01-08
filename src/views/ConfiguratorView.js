/**
 * Configurator View - Main app for designing custom flavors
 * Left panel: controls (color, fonts, flavors, upload)
 * Right panel: Three.js scene with chip bag preview
 * TODO: Integrate scene initialization and model loading
 */

import { navigate } from '../router/index.js';
import { createUILayout } from '../components/ui-layout.js';
import { createInitialConfig } from '../utils/mock-data.js';

export function ConfiguratorView() {
  const appDiv = document.getElementById('app');
  
  // Initialize in-memory config state
  const config = createInitialConfig();
  
  const html = `
    <div class="min-h-screen bg-gray-900 flex flex-col">
      <!-- Top Bar -->
      <div class="text-gray-900 px-6 py-4 flex items-center justify-between shadow-md" style="background-color: var(--lay-yellow);">
        <div>
          <h1 class="text-2xl font-bold">Chip Bag Configurator</h1>
          <p class="text-sm text-gray-700">Design and preview your flavor submission</p>
        </div>
        <button id="back-btn" class="btn-outline">← Back</button>
      </div>

      <!-- Main Layout -->
      <div class="flex-1 flex overflow-hidden">
        <!-- Controls Panel -->
        <div id="controls-container" class="w-80 bg-white border-r border-gray-300 overflow-y-auto p-6 space-y-6">
          <!-- Controls will be injected here -->
        </div>

        <!-- Canvas Container -->
        <div id="canvas-container" class="flex-1 bg-gray-800 flex items-center justify-center relative">
          <div id="three-canvas" style="width: 100%; height: 100%;"></div>
          <div class="absolute bottom-4 right-4 text-white text-sm bg-gray-900 bg-opacity-70 px-4 py-2 rounded">
            Three.js Scene - Model will load here
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div class="bg-white border-t border-gray-300 px-6 py-4 flex items-center justify-between">
        <p class="text-gray-600"><span id="config-status">Design ready</span></p>
        <div class="flex gap-3">
          <button id="reset-btn" class="btn-outline">Reset</button>
          <button id="submit-btn" class="btn-primary">Submit Design</button>
        </div>
      </div>
    </div>
  `;
  
  appDiv.innerHTML = html;
  
  // Create UI controls
  const controlsContainer = document.getElementById('controls-container');
  createUILayout(controlsContainer, config);
  
  // TODO: Initialize Three.js scene
  const canvasDiv = document.getElementById('three-canvas');
  console.log('TODO: Initialize Three.js scene in', canvasDiv);
  
  // Event listeners
  document.getElementById('back-btn').addEventListener('click', () => {
    navigate('/');
  });
  
  document.getElementById('reset-btn').addEventListener('click', () => {
    // Reset config to defaults
    Object.assign(config, createInitialConfig());
    console.log('Config reset:', config);
    // TODO: Re-render scene with reset values
  });
  
  document.getElementById('submit-btn').addEventListener('click', () => {
    // TODO: Call API submitDesign(config)
    console.log('Submitting design:', config);
    alert('Design submitted (UI only - see console)');
  });
  
  return config;
}
