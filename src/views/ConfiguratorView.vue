<template>
  <div class="h-screen bg-gray-900 flex flex-col">
    <!-- Top Bar -->
    <div class="text-gray-900 px-6 py-4 flex items-center justify-between shadow-md" style="background-color: var(--lay-yellow);">
      <div>
        <h1 class="text-2xl font-bold">Chip Bag Configurator</h1>
        <p class="text-sm text-gray-700">Design and preview your flavor submission</p>
      </div>
      <button @click="goBack" class="btn-outline">← Back</button>
    </div>

    <!-- Main Layout -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Controls Panel -->
      <div class="w-80 bg-white border-r border-gray-300 overflow-y-auto p-6 space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">Flavor Name</label>
          <input 
            v-model="config.name"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
            placeholder="e.g., Spicy Mango Dream"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-3">Bag Color</label>
          <div class="space-y-2">
            <label v-for="color in bagColors" :key="color.hex" class="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
              <input 
                v-model="config.bagColor"
                type="radio" 
                :value="color.hex"
                class="color-radio"
              />
              <div 
                :style="{ backgroundColor: color.hex }" 
                class="w-8 h-8 rounded border border-gray-300"
              ></div>
              <span class="text-sm text-gray-700">{{ color.name }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-3">Font Style</label>
          <div class="space-y-2">
            <label v-for="font in fontStyles" :key="font.value" class="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
              <input 
                v-model="config.fontStyle"
                type="radio" 
                :value="font.value"
                class="font-radio"
              />
              <span class="text-sm" :class="font.class">{{ font.name }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-3">Flavor Notes (Select up to 3)</label>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="note in flavorNotes" :key="note" class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition">
              <input 
                :checked="config.flavorNotes.includes(note)"
                @change="toggleFlavorNote(note)"
                type="checkbox"
                class="flavor-checkbox"
              />
              <span class="text-sm text-gray-700">{{ note }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">Design Image (Optional)</label>
          <input 
            type="file" 
            @change="handleImageUpload"
            class="w-full text-sm text-gray-500 file:px-3 file:py-2 file:rounded file:border-0 file:bg-lay-yellow file:text-gray-900 file:font-semibold file:cursor-pointer hover:file:bg-yellow-400"
            accept="image/*"
          />
          <p class="text-xs text-gray-600 mt-2">{{ config.imageUpload ? '✓ Image loaded' : 'Upload to add a custom image' }}</p>
        </div>
      </div>

      <!-- Canvas Container -->
      <div class="flex-1 bg-gray-800 flex items-center justify-center relative">
        <div id="three-canvas" style="width: 100%; height: 100%;"></div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div class="bg-white border-t border-gray-300 px-6 py-4 flex items-center justify-between">
      <p class="text-gray-600"><span id="config-status">Design ready</span></p>
      <div class="flex gap-3">
        <button @click="resetConfig" class="btn-outline">Reset</button>
        <button @click="submitDesign" class="btn-primary">Submit Design</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { 
  MOCK_BAG_COLORS, 
  MOCK_FONT_STYLES, 
  MOCK_FLAVOR_NOTES, 
  createInitialConfig 
} from '../utils/mock-data.js';
import { initScene, startAnimation, stopAnimation, updateSceneBackground } from '../scene/initScene.js';
import { loadModel, updateModelColor, updateModelText, updateModelImage, clearModelImage, disposeModel } from '../scene/model.js';

const router = useRouter();
const config = ref(createInitialConfig());
const bagColors = ref(MOCK_BAG_COLORS);
const fontStyles = ref(MOCK_FONT_STYLES);
const flavorNotes = ref(MOCK_FLAVOR_NOTES);

let sceneContext = null;

// Watch for color changes and update the 3D model
watch(() => config.value.bagColor, (newColor) => {
  if (newColor) {
    updateModelColor(newColor);
    updateSceneBackground(newColor);
    // Also update text with new background color
    updateModelText(config.value.name, newColor, config.value.fontStyle);
  }
});

// Watch for flavor name changes and update the 3D model text
watch(() => config.value.name, (newName) => {
  if (newName) {
    updateModelText(newName, config.value.bagColor, config.value.fontStyle);
  }
});

// Watch for font style changes and update the 3D model text
watch(() => config.value.fontStyle, (newFont) => {
  if (newFont) {
    updateModelText(config.value.name, config.value.bagColor, newFont);
  }
});

onMounted(async () => {
  try {
    // Get canvas container
    const container = document.getElementById('three-canvas');
    if (!container) {
      console.error('Canvas container not found');
      return;
    }
    
    // Initialize Three.js scene
    sceneContext = initScene(container);
    console.log('Scene initialized');
    
    // Load the chip bag model
    await loadModel(sceneContext.scene);
    console.log('Model loaded');
    
    // Apply initial color
    updateModelColor(config.value.bagColor);
    updateSceneBackground(config.value.bagColor);
    
    // Apply initial text
    updateModelText(config.value.name, config.value.bagColor, config.value.fontStyle);
    
    // Start animation loop
    startAnimation();
    console.log('Animation started');
  } catch (error) {
    console.error('Failed to initialize configurator:', error);
  }
});

onUnmounted(() => {
  stopAnimation();
  disposeModel();
  if (sceneContext && sceneContext.cleanup) {
    sceneContext.cleanup();
  }
});

const goBack = () => {
  router.push('/');
};

const resetConfig = () => {
  config.value = createInitialConfig();
  // Clear the image upload input
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.value = '';
  }
  // Remove image from model
  clearModelImage();
  // Update 3D model to reflect reset
  updateModelColor(config.value.bagColor);
  updateSceneBackground(config.value.bagColor);
  updateModelText(config.value.name, config.value.bagColor, config.value.fontStyle);
  console.log('Config reset:', config.value);
};

const submitDesign = () => {
  // TODO: Call API submitDesign(config.value)
  console.log('Submitting design:', config.value);
  alert('Design submitted (UI only - see console)');
};

const toggleFlavorNote = (note) => {
  if (config.value.flavorNotes.includes(note)) {
    config.value.flavorNotes = config.value.flavorNotes.filter(n => n !== note);
  } else {
    if (config.value.flavorNotes.length >= 3) {
      alert('Maximum 3 flavor notes allowed');
      return;
    }
    config.value.flavorNotes.push(note);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      config.value.imageUpload = e.target.result;
      updateModelImage(img);
      console.log('Image loaded:', file.name);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>

<style scoped>
input[type="text"]:focus,
textarea:focus,
input[type="file"]:focus {
  border-color: var(--lay-yellow);
}
</style>
