/**
 * Three.js Scene Initialization
 * Sets up camera, renderer, orbit controls, and animation loop
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, animationId = null;

/**
 * Initialize Three.js scene
 * @param {HTMLElement} container - DOM element to mount canvas to
 * @returns {Object} Scene, camera, renderer references
 */
export function initScene(container) {
  // Scene setup
  scene = new THREE.Scene();
  // Background color will be set by updateSceneBackground
  scene.background = new THREE.Color(0xFFFF59);
  
  // Camera setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
  
  // Orbital Controls setup
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = false;
  controls.enableZoom = true;
  controls.enablePan = true;
  
  // Lighting setup - increased intensity
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 0.6);
  pointLight.position.set(-5, -5, 5);
  scene.add(pointLight);
  
  // Create white platform/podium beneath the bag
  const platformGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.2, 64);
  const platformMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.7
  });
  const platform = new THREE.Mesh(platformGeometry, platformMaterial);
  platform.position.y = -1.8;
  platform.castShadow = true;
  platform.receiveShadow = true;
  scene.add(platform);
  
  // Handle window resize
  const handleResize = () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  return { scene, camera, renderer, controls, cleanup: () => window.removeEventListener('resize', handleResize) };
}

/**
 * Start animation loop
 */
export function startAnimation() {
  function animate() {
    animationId = requestAnimationFrame(animate);
    if (controls) {
      controls.update();
    }
    renderer.render(scene, camera);
  }
  animate();
}

/**
 * Stop animation loop
 */
export function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

/**
 * Update scene background color based on bag color
 * @param {string} bagHexColor - Hex color of the bag
 */
export function updateSceneBackground(bagHexColor) {
  // Convert hex to RGB
  const hex = bagHexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Lighten and brighten the color (increase all channels toward 1)
  const lightened = {
    r: Math.min(1, r + 0.35),
    g: Math.min(1, g + 0.35),
    b: Math.min(1, b + 0.35)
  };
  
  const bgColor = new THREE.Color(lightened.r, lightened.g, lightened.b);
  scene.background = bgColor;
}

export { scene, camera, renderer, controls };
