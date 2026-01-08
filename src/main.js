// Entry point for Vite + Three.js app
import * as THREE from 'three';
import { initScene } from './scene/initScene.js';
import { setupLights } from './scene/lights.js';
import { loadModel } from './scene/model.js';
import { setupControls } from './ui/controls.js';
import './styles/main.css';

// Orchestrate scene and UI (placeholder)
initScene();
setupLights();
loadModel();
setupControls();
