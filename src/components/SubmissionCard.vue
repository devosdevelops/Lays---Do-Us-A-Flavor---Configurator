<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="h-32 overflow-hidden">
      <BagPreviewCanvas :submission="submission" />
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900">{{ submission.flavorName }}</h3>
      
      <div class="mt-4 flex flex-wrap gap-2">
        <span 
          v-for="note in submission.keyFlavors" 
          :key="note"
          class="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold"
        >
          {{ note }}
        </span>
      </div>
      
      <div class="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
        <span class="text-sm text-gray-600">
          <span class="text-lg font-bold text-gray-900">{{ voteCount }}</span> votes
        </span>
        <button 
          @click="handleVote"
          :disabled="voting || hasVoted"
          class="btn-secondary px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          :aria-label="`Vote for ${submission.flavorName}`"
        >
          {{ voting ? 'Voting...' : hasVoted ? '✓ Voted' : '👍 Vote' }}
        </button>
      </div>
      
      <div v-if="voteError" class="mt-2 text-xs text-red-600">
        {{ voteError }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { voteSubmission } from '../services/api.js';
import { useAuth } from '../composables/useAuth.js';
import BagPreviewCanvas from './BagPreviewCanvas.vue';

const props = defineProps({
  submission: {
    type: Object,
    required: true
  }
});

const { isLoggedIn } = useAuth();
const voting = ref(false);
const hasVoted = ref(false);
const voteCount = ref(props.submission.voteCount || 0);
const voteError = ref(null);

const handleVote = async () => {
  if (!isLoggedIn.value) {
    voteError.value = 'Please log in to vote';
    return;
  }
  
  if (hasVoted.value) {
    voteError.value = 'You have already voted on this submission';
    return;
  }
  
  voting.value = true;
  voteError.value = null;
  
  try {
    await voteSubmission(props.submission._id);
    voteCount.value += 1;
    hasVoted.value = true;
  } catch (error) {
    console.error('Vote error:', error);
    if (error.message.includes('already voted')) {
      hasVoted.value = true;
    }
    voteError.value = error.message || 'Failed to vote';
  } finally {
    voting.value = false;
  }
};
</script>
