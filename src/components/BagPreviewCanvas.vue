<template>
  <div class="w-full h-full bg-gray-100 rounded flex items-center justify-center overflow-hidden">
    <canvas ref="canvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelPath from '../assets/models/chips_arthur_de_klerck.glb?url';

const props = defineProps({
  submission: {
    type: Object,
    required: true
  }
});

const canvas = ref(null);
let scene, camera, renderer, bagGroup = null;

const initScene = () => {
  if (!canvas.value) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3f4f6);

  // Camera - positioned to show the bag nicely
  camera = new THREE.PerspectiveCamera(
    75,
    canvas.value.clientWidth / canvas.value.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 2.5);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.6);
  pointLight.position.set(-5, 5, 5);
  scene.add(pointLight);

  // Load model
  loadModel();

  // Render loop
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
};

const loadModel = () => {
  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    bagGroup = gltf.scene;
    
    // Center and scale the model
    const box = new THREE.Box3().setFromObject(bagGroup);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDim;
    
    bagGroup.position.sub(center.multiplyScalar(scale));
    bagGroup.scale.multiplyScalar(scale);
    
    scene.add(bagGroup);
    
    // Apply submission styling directly to this model
    applyBagColor(bagGroup, props.submission.bagColor);
    applyBagText(bagGroup, props.submission.flavorName, props.submission.bagColor, props.submission.fontChoice);
    
    // Apply image if available
    if (props.submission.bagImageUrl) {
      applyBagImage(bagGroup, props.submission.bagImageUrl);
    }
    
    console.log('Bag preview model loaded');
  }, undefined, (error) => {
    console.error('Failed to load bag preview model:', error);
    // Fall back to simple bag if model fails
    createSimpleBag();
  });
};

const applyBagColor = (model, hexColor) => {
  const colorValue = parseInt(hexColor.replace('#', ''), 16);
  
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      const materialName = child.material.name?.toLowerCase() || '';
      const meshName = child.name?.toLowerCase() || '';
      
      const isLogo = materialName.includes('logo') || 
                     materialName.includes('text') || 
                     materialName.includes('label') ||
                     meshName.includes('logo') ||
                     meshName.includes('text') ||
                     meshName.includes('label');
      
      if (!isLogo) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            mat.color.setHex(colorValue);
          });
        } else {
          child.material.color.setHex(colorValue);
        }
      }
    }
  });
};

const applyBagText = (model, flavorName, bagColor, fontStyle) => {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  
  const ctx = canvas.getContext('2d', { alpha: true });
  
  // Fill with bag color
  ctx.fillStyle = bagColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Flip canvas vertically
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  
  // Get contrasting text color
  const textColor = getLuminance(bagColor) > 0.5 ? '#000000' : '#ffffff';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Word wrap with dynamic font sizing
  const maxWidth = 1900;
  const maxFontSize = 380;
  const minFontSize = 150;
  let fontSize = maxFontSize;
  let lines = [];
  
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
        
        const wordMetrics = ctx.measureText(word);
        if (wordMetrics.width > maxWidth) {
          tooWide = true;
        }
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    
    if (!tooWide || fontSize === minFontSize) {
      break;
    }
    
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
  
  // Create and apply texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      const materialName = child.material.name?.toLowerCase() || '';
      const meshName = child.name?.toLowerCase() || '';
      
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
      }
    }
  });
};

const getLuminance = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

const getFontString = (fontSize, fontStyle) => {
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
};

const applyBagImage = (model, imageUrl) => {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imageUrl, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        const materialName = (child.material.name || '').toLowerCase();
        
        if (materialName.includes('img') || materialName === 'bagimg') {
          child.material.map = texture;
          child.material.needsUpdate = true;
          
          // Fix UV mapping
          if (child.material.map) {
            child.material.map.repeat.set(1, -1);
            child.material.map.offset.set(0, 1);
          }
          
          console.log(`Applied image to: ${child.name}`);
        }
      }
    });
  }, undefined, (error) => {
    console.error('Failed to load bag image:', error);
  });
};

const createSimpleBag = () => {
  bagGroup = new THREE.Group();
  
  // Main bag body - rounded rectangle/cylinder shape
  const geometry = new THREE.CapsuleGeometry(0.6, 1.5, 4, 8);
  const material = new THREE.MeshPhongMaterial({
    color: props.submission.bagColor || '#FFCC00',
    shininess: 100
  });
  const bagMesh = new THREE.Mesh(geometry, material);
  bagGroup.add(bagMesh);

  // Add text to the bag
  addTextToBag(props.submission.flavorName);

  scene.add(bagGroup);
};

const addTextToBag = (text) => {
  // Simple text representation using canvas texture
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Wrap text if too long
  const words = text.split(' ');
  let y = canvas.height / 2 - 20;
  
  for (let i = 0; i < words.length; i++) {
    ctx.fillText(words[i], canvas.width / 2, y);
    y += 50;
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  const textGeometry = new THREE.PlaneGeometry(1.2, 1.5);
  const textMaterial = new THREE.MeshBasicMaterial({ 
    map: texture,
    transparent: true
  });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.z = 0.61;
  
  bagGroup.add(textMesh);
};

const handleResize = () => {
  if (!canvas.value) return;
  
  const width = canvas.value.clientWidth;
  const height = canvas.value.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

onMounted(() => {
  initScene();
  window.addEventListener('resize', handleResize);
});

// Update when submission changes
watch(
  () => props.submission.bagColor,
  (newColor) => {
    if (bagGroup) {
      applyBagColor(bagGroup, newColor);
    }
  }
);

watch(
  () => props.submission.flavorName,
  (newName) => {
    if (bagGroup) {
      applyBagText(bagGroup, newName, props.submission.bagColor, props.submission.fontChoice);
    }
  }
);

watch(
  () => props.submission.bagImageUrl,
  (newImageUrl) => {
    if (bagGroup && newImageUrl) {
      applyBagImage(bagGroup, newImageUrl);
    }
  }
);
</script>

<style scoped>
canvas {
  display: block;
}
</style>
