/**
 * Lighting Setup for Three.js Scene
 * Creates ambient and directional lights for chip bag preview
 */

import * as THREE from 'three';

/**
 * Setup scene lighting
 * @param {THREE.Scene} scene - Three.js scene
 */
export function setupLights(scene) {
  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  // Directional light for shadows and highlights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);
  
  // Point light for accent
  const pointLight = new THREE.PointLight(0xFFCC00, 0.5);
  pointLight.position.set(-5, 3, 5);
  scene.add(pointLight);
  
  console.log('Lights setup complete');
  
  return { ambientLight, directionalLight, pointLight };
}

/**
 * Update lighting intensity (for time-of-day effects, etc.)
 * TODO: Implement dynamic lighting controls
 */
export function updateLightingIntensity(intensity) {
  // TODO: Update light intensities based on input
  console.log('Lighting intensity updated to:', intensity);
}
