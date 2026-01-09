<template>
  <div class="min-h-screen bg-gradient-to-br from-lay-neutral to-gray-100 flex items-center justify-center py-12 px-4" style="--lay-neutral: #F5EDE5;">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Welcome Back</h1>
      <p class="text-center text-gray-600 mb-8">Sign in to manage your submissions</p>
      
      <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-semibold mb-2">Email</label>
          <input 
            v-model="form.email"
            type="email" 
            id="email" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-semibold mb-2">Password</label>
          <input 
            v-model="form.password"
            type="password" 
            id="password" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button type="submit" :disabled="loading" class="btn-primary w-full text-center" :class="{ 'opacity-50 cursor-not-allowed': loading }">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-gray-600">Don't have an account? <router-link to="/signup" class="text-lay-red font-semibold hover:underline" style="--lay-red: #C8102E;">Sign up</router-link></p>
      </div>
      
      <div class="mt-4 text-center">
        <router-link to="/" class="text-gray-600 hover:text-gray-900">← Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth.js';

const router = useRouter();
const { login } = useAuth();

const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  error.value = null;
  loading.value = true;

  try {
    const result = await login(form.value.email, form.value.password);
    
    if (result.success) {
      router.push('/');
    } else {
      error.value = result.error || 'Login failed';
    }
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input:focus {
  border-color: var(--lay-yellow);
}
</style>
