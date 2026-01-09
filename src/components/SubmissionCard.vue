<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div 
      :style="{ backgroundColor: submission.bagColor }" 
      class="flex items-center justify-center h-32"
    >
      <div class="text-center text-white font-bold" :class="submission.fontStyle">
        {{ submission.name }}
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900">{{ submission.name }}</h3>
      <p class="text-sm text-gray-600 mt-2">{{ submission.description }}</p>
      
      <div class="mt-4 flex flex-wrap gap-2">
        <span 
          v-for="note in submission.flavorNotes" 
          :key="note"
          class="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold"
        >
          {{ note }}
        </span>
      </div>
      
      <div class="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
        <span class="text-sm text-gray-600">
          <span class="text-lg font-bold text-gray-900">{{ submission.votes }}</span> votes
        </span>
        <button 
          @click="handleVote"
          class="btn-secondary px-3 py-1 text-sm"
          :aria-label="`Vote for ${submission.name}`"
        >
          👍 Vote
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { voteSubmission } from '../services/api.js';

defineProps({
  submission: {
    type: Object,
    required: true
  }
});

const handleVote = async () => {
  // TODO: Call voteSubmission(submission.id) and update count
  console.log('Vote submitted for:', this.submission?.id);
};
</script>
