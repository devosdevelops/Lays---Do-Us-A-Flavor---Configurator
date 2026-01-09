/**
 * Three.js GLB Model Loader for Chip Bag
 * Loads the dummy model and applies color/material updates
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelPath from '../assets/models/chips_arthur_de_klerck.glb?url';

let loadedModel = null;

/**
 * Load GLB model from path
 * @param {THREE.Scene} scene - Three.js scene to add model to
 * @returns {Promise<THREE.Group>} Loaded model group
 */
export async function loadModel(scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    
    loader.load(
      modelPath,
      (gltf) => {
        loadedModel = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        
        loadedModel.position.sub(center.multiplyScalar(scale));
        loadedModel.scale.multiplyScalar(scale);
        
        scene.add(loadedModel);
        
        console.log('Model loaded successfully:', loadedModel);
        resolve(loadedModel);
      },
      (progress) => {
        console.log('Loading model:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Failed to load model:', error);
        reject(error);
      }
    );
  });
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
  
  const colorValue = parseInt(hexColor.replace('#', ''), 16);
  
  loadedModel.traverse((child) => {
    if (child.isMesh && child.material) {
      // Skip logo/text materials - only color the bag body
      const materialName = child.material.name?.toLowerCase() || '';
      const meshName = child.name?.toLowerCase() || '';
      
      // Don't color materials that are clearly logos or text
      const isLogo = materialName.includes('logo') || 
                     materialName.includes('text') || 
                     materialName.includes('label') ||
                     meshName.includes('logo') ||
                     meshName.includes('text') ||
                     meshName.includes('label');
      
      if (!isLogo) {
        // Handle array of materials
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            mat.color.setHex(colorValue);
          });
        } else {
          child.material.color.setHex(colorValue);
        }
        console.log(`Colored mesh: ${child.name}`);
      } else {
        console.log(`Skipped logo/text: ${child.name}`);
      }
    }
  });
  
  console.log('Model color updated to:', hexColor);
}

/**
 * Update model font/text material
 * @param {string} fontStyle - Font style identifier
 */
export function updateModelFont(fontStyle) {
  console.log('Model font updated to:', fontStyle);
}

/**
 * Dispose model and cleanup
 */
export function disposeModel() {
  if (loadedModel) {
    loadedModel.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    loadedModel = null;
  }
}

export { loadedModel };
