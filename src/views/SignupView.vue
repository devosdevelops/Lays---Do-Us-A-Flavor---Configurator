<template>
  <div class="min-h-screen bg-gradient-to-br from-lay-neutral to-gray-100 flex items-center justify-center py-12 px-4" style="--lay-neutral: #F5EDE5;">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Join the Flavor Contest</h1>
      <p class="text-center text-gray-600 mb-8">Create your account to submit and vote</p>
      
      <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-semibold mb-2">Username</label>
          <input 
            v-model="form.username"
            type="text" 
            id="username" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-lay-yellow"
            placeholder="choose_username"
            required
          />
        </div>
        
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
            minlength="6"
          />
          <p class="text-xs text-gray-500 mt-1">Minimum 6 characters required</p>
        </div>
        
        <button type="submit" :disabled="loading" class="btn-primary w-full text-center" :class="{ 'opacity-50 cursor-not-allowed': loading }">
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-gray-600">Already have an account? <router-link to="/login" class="text-lay-red font-semibold hover:underline" style="--lay-red: #C8102E;">Sign in</router-link></p>
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
const { signup } = useAuth();

const form = ref({
  username: '',
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref(null);

const handleSignup = async () => {
  error.value = null;

  // Validate password length
  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters long';
    return;
  }

  loading.value = true;

  try {
    const result = await signup(form.value.username, form.value.email, form.value.password);
    
    if (result.success) {
      // Auto-logged in, redirect to home
      router.push('/');
    } else {
      error.value = result.error || 'Signup failed';
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
