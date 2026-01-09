<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with CTA -->
    <header class="text-gray-900 py-8 shadow-md" style="background-color: var(--lay-yellow);">
      <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2">Lay's "Do Us A Flavor" Configurator</h1>
          <p class="text-lg opacity-90">Design your dream chip flavor and vote on community favorites</p>
        </div>
        <div class="text-right">
          <div v-if="isLoggedIn" class="space-y-2">
            <p class="text-sm text-gray-700 mb-2">Welcome, {{ currentUser?.username }}!</p>
            <button @click="handleLogout" class="btn-secondary px-4 py-2">Logout</button>
          </div>
          <div v-else class="flex gap-2">
            <router-link to="/login" class="px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" style="background-color: var(--lay-red);">Login</router-link>
            <router-link to="/signup" class="px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" style="background-color: #22C55E;">Sign Up</router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <!-- CTA Section -->
      <section class="mb-12">
        <div class="bg-white rounded-lg shadow-md p-8 border-l-4" style="border-color: var(--lay-red);">
          <h2 class="text-2xl font-bold mb-4">Create Your Own Flavor</h2>
          <p class="text-gray-600 mb-6">Have a flavor idea? Design your own chip bag and submit it to the community for voting.</p>
          <button @click="goToConfigurator" class="btn-primary text-lg">
            Launch Configurator →
          </button>
        </div>
      </section>

      <!-- Submissions Grid -->
      <section>
        <h2 class="text-2xl font-bold mb-6">Community Submissions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubmissionCard 
            v-for="submission in submissions" 
            :key="submission.id" 
            :submission="submission"
          />
        </div>
      </section>

      <!-- User Account Links -->
      <section v-if="isLoggedIn" class="mt-12 pt-8 border-t border-gray-300">
        <h3 class="text-lg font-semibold mb-4">Your Account</h3>
        <div class="flex flex-wrap gap-3">
          <router-link to="/submissions" class="btn-outline">Your Submissions</router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import SubmissionCard from '../components/SubmissionCard.vue';
import { MOCK_SUBMISSIONS } from '../utils/mock-data.js';
import { useAuth } from '../composables/useAuth.js';

const router = useRouter();
const { isLoggedIn, user: currentUser, logout } = useAuth();
const submissions = ref(MOCK_SUBMISSIONS);

const goToConfigurator = () => {
  if (!isLoggedIn.value) {
    router.push('/login');
  } else {
    router.push('/configurator');
  }
};

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>
