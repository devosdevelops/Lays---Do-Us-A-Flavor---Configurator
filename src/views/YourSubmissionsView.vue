<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="text-gray-900 py-8 shadow-md" style="background-color: var(--lay-yellow);">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Your Submissions</h1>
          <p class="text-gray-700 mt-2">Manage your flavor designs</p>
        </div>
        <button @click="goToConfigurator" class="btn-secondary">+ New Submission</button>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div v-if="submissions.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg mb-4">You haven't created any submissions yet.</p>
        <button @click="goToConfigurator" class="btn-primary">Create Your First Submission</button>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="submission in submissions" 
          :key="submission.id"
          class="bg-white rounded-lg shadow p-6 flex items-start justify-between hover:shadow-lg transition-shadow"
        >
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900">{{ submission.name }}</h3>

            <div class="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <span 
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                :class="submission.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ submission.status === 'published' ? 'Published' : 'Draft' }}
              </span>
              <span>👍 {{ submission.votes }} votes</span>
              <span>{{ submission.createdAt }}</span>
            </div>
          </div>
          <div class="flex gap-2 ml-4">
            <button @click="editSubmission(submission.id)" class="btn-outline px-3 py-1 text-sm">Edit</button>
            <button @click="deleteSubmission(submission.id)" class="px-3 py-1 text-sm border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Navigation -->
    <div class="max-w-6xl mx-auto px-4 py-8 border-t border-gray-300">
      <router-link to="/" class="text-gray-600 hover:text-gray-900">← Back to Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MOCK_USER_SUBMISSIONS } from '../utils/mock-data.js';

const router = useRouter();
const submissions = ref(MOCK_USER_SUBMISSIONS);

const goToConfigurator = () => {
  router.push('/configurator');
};

const editSubmission = (submissionId) => {
  // TODO: Load submission data and open configurator in edit mode
  console.log('Edit submission:', submissionId);
};

const deleteSubmission = (submissionId) => {
  // TODO: Call API deleteSubmission
  if (confirm('Are you sure you want to delete this submission?')) {
    console.log('Delete submission:', submissionId);
  }
};
</script>
