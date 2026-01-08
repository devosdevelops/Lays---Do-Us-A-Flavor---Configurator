/**
 * Three.js GLB Model Loader for Chip Bag
 * Loads the dummy model and applies color/material updates
 * TODO: Implement actual GLTFLoader and DRACOLoader integration
 */

import * as THREE from 'three';

const MODEL_PATH = '/src/assets/models/chips_arthur_de_klerck.glb';

let loadedModel = null;

/**
 * Load GLB model from path
 * @param {THREE.Scene} scene - Three.js scene to add model to
 * @returns {Promise<THREE.Group>} Loaded model group
 */
export async function loadModel(scene) {
  try {
    console.log('Loading model from:', MODEL_PATH);
    
    // TODO: Import and setup GLTFLoader
    // TODO: Setup DRACOLoader for compression
    
    // Placeholder: Create a simple box as model stand-in
    const geometry = new THREE.BoxGeometry(2, 3, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xFFCC00 });
    loadedModel = new THREE.Mesh(geometry, material);
    scene.add(loadedModel);
    
    console.log('Model loaded (placeholder)');
    return loadedModel;
  } catch (error) {
    console.error('Failed to load model:', error);
  }
}

/**
 * Update model color
 * @param {string} hexColor - Hex color code
 */
export function updateModelColor(hexColor) {
  if (!loadedModel) {
    console.warn('Model not loaded yet');
    return;
  }
  
  // TODO: Traverse model and update bag material color
  if (loadedModel.material) {
    loadedModel.material.color.setHex(hexColor);
  }
  
  console.log('Model color updated to:', hexColor);
}

/**
 * Update model font/text material
 * @param {string} fontStyle - Font style identifier
 * TODO: Implement canvas texture for text and apply to model
 */
export function updateModelFont(fontStyle) {
  // TODO: Create canvas texture with flavor name
  // TODO: Apply texture to model
  console.log('Model font updated to:', fontStyle);
}

/**
 * Dispose model and cleanup
 */
export function disposeModel() {
  if (loadedModel) {
    loadedModel.geometry.dispose();
    loadedModel.material.dispose();
    loadedModel = null;
  }
}

export { loadedModel };
