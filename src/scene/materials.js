/**
 * Material and Color Utilities for Three.js
 * Handles bag color and material application
 */

import * as THREE from 'three';

/**
 * Create a material for the chip bag
 * @param {string} hexColor - Hex color code
 * @returns {THREE.Material} Phong material
 */
export function createBagMaterial(hexColor) {
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(hexColor),
    shininess: 100,
    side: THREE.DoubleSide
  });
  
  return material;
}

/**
 * Create text material/texture for flavor name
 * @param {string} text - Text to display
 * @param {string} fontStyle - Font style (bold, italic, etc.)
 * @returns {THREE.CanvasTexture} Text canvas texture
 * TODO: Implement proper canvas texture generation
 */
export function createTextMaterial(text, fontStyle) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 256;
  
  // TODO: Apply fontStyle to canvas context
  context.fillStyle = '#000000';
  context.font = 'bold 48px Arial';
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Apply material to mesh
 * @param {THREE.Mesh} mesh - Target mesh
 * @param {THREE.Material} material - Material to apply
 */
export function applyMaterial(mesh, material) {
  mesh.material = material;
}
