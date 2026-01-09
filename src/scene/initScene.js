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
  scene.background = new THREE.Color(0x1a1a1a);
  
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
  
  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 0.4);
  pointLight.position.set(-5, -5, 5);
  scene.add(pointLight);
  
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

export { scene, camera, renderer, controls };
