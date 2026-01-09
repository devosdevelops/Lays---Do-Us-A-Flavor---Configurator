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
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-600 text-lg">Loading your submissions...</p>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-700">{{ error }}</p>
      </div>
      
      <div v-else-if="submissions.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg mb-4">You haven't created any submissions yet.</p>
        <button @click="goToConfigurator" class="btn-primary">Create Your First Submission</button>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="submission in submissions" 
          :key="submission._id"
          class="bg-white rounded-lg shadow p-6 flex items-start justify-between hover:shadow-lg transition-shadow"
        >
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900">{{ submission.flavorName }}</h3>

            <div class="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                Published
              </span>
              <span>👍 {{ submission.voteCount }} votes</span>
              <span>{{ new Date(submission.createdAt).toLocaleDateString() }}</span>
            </div>
          </div>
          <div class="flex gap-2 ml-4">
            <button @click="deleteSubmission(submission._id)" class="px-3 py-1 text-sm border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors">Delete</button>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserSubmissions, deleteSubmission as apiDeleteSubmission } from '../services/api.js';
import { useAuth } from '../composables/useAuth.js';

const router = useRouter();
const { isLoggedIn } = useAuth();
const submissions = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }
  
  try {
    submissions.value = await getUserSubmissions();
  } catch (err) {
    console.error('Failed to load submissions:', err);
    error.value = 'Failed to load submissions. Please try again.';
  } finally {
    loading.value = false;
  }
});

const goToConfigurator = () => {
  router.push('/configurator');
};

const deleteSubmission = async (submissionId) => {
  if (!confirm('Are you sure you want to delete this submission?')) {
    return;
  }
  
  try {
    await apiDeleteSubmission(submissionId);
    submissions.value = submissions.value.filter(s => s._id !== submissionId);
  } catch (err) {
    console.error('Failed to delete submission:', err);
    error.value = err.message || 'Failed to delete submission.';
  }
};
</script>
