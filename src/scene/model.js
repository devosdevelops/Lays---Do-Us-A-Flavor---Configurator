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
 * Calculate relative luminance of a color (for contrast checking)
 * @param {string} hexColor - Hex color code
 * @returns {number} Luminance value 0-1
 */
function getLuminance(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // WCAG relative luminance formula
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance;
}

/**
 * Get contrasting text color (white or black) based on background
 * @param {string} hexColor - Background color
 * @returns {string} Text color (#ffffff or #000000)
 */
function getContrastingTextColor(hexColor) {
  return getLuminance(hexColor) > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Get font style string for canvas
 * @param {string} fontStyle - Font style identifier
 * @returns {string} Canvas font string
 */
function getFontString(fontSize, fontStyle) {
  const sizeStr = `${fontSize}px`;
  
  switch(fontStyle) {
    case 'elegant':
      return `italic bold ${sizeStr} Georgia, serif`;
    case 'modern':
      return `bold ${sizeStr} 'Trebuchet MS', sans-serif`;
    case 'playful':
      return `bold ${sizeStr} 'Comic Sans MS', cursive`;
    case 'retro':
      return `bold ${sizeStr} 'Courier New', monospace`;
    case 'bold':
    default:
      return `bold ${sizeStr} Arial, sans-serif`;
  }
}

/**
 * Update model text - applies text to existing text material on the bag
 * @param {string} flavorName - Name of the flavor to display on the bag
 * @param {string} bagColor - Hex color of the bag for text background
 * @param {string} fontStyle - Font style to apply
 */
export function updateModelText(flavorName, bagColor, fontStyle = 'bold') {
  if (!loadedModel) {
    console.warn('Model not loaded yet');
    return;
  }
  
  // Create canvas texture with flavor name
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  
  const ctx = canvas.getContext('2d', { alpha: true });
  
  // Fill with bag color
  ctx.fillStyle = bagColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Flip canvas vertically (Three.js textures are upside down by default)
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  
  // Draw text with contrasting color
  const textColor = getContrastingTextColor(bagColor);
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Word wrap logic with dynamic font sizing
  const maxWidth = 1900;
  const maxFontSize = 380;
  const minFontSize = 150;
  let fontSize = maxFontSize;
  let lines = [];
  
  // Try to fit the text, reducing font size if needed
  while (fontSize >= minFontSize) {
    ctx.font = getFontString(fontSize, fontStyle);
    lines = [];
    let currentLine = '';
    
    const words = flavorName.split(' ');
    let tooWide = false;
    
    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
        
        // Check if even a single word is too wide
        const wordMetrics = ctx.measureText(word);
        if (wordMetrics.width > maxWidth) {
          tooWide = true;
        }
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    
    // If it fits or we're at min size, use this font size
    if (!tooWide || fontSize === minFontSize) {
      break;
    }
    
    // Try smaller font
    fontSize -= 30;
  }
  
  // Draw lines centered
  const lineHeight = fontSize + 50;
  const totalHeight = lines.length * lineHeight;
  let y = (canvas.height - totalHeight) / 2 + lineHeight / 2;
  
  lines.forEach(line => {
    ctx.fillText(line, canvas.width / 2, y);
    y += lineHeight;
  });
  
  ctx.restore();
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  // Find and update text/label materials only
  loadedModel.traverse((child) => {
    if (child.isMesh && child.material) {
      const materialName = child.material.name?.toLowerCase() || '';
      const meshName = child.name?.toLowerCase() || '';
      
      // Only update text-related materials
      const isText = (materialName.includes('text') || meshName.includes('text'));
      
      if (isText) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            mat.map = texture;
            mat.needsUpdate = true;
          });
        } else {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
        console.log(`Updated text on: ${child.name}`);
      }
    }
  });
  
  console.log('Model text updated to:', flavorName, 'with', textColor, 'text (font:', fontStyle, ', size:', fontSize, 'px)');
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
