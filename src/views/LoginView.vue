<template>
  <div class="min-h-screen bg-gradient-to-br from-lay-neutral to-gray-100 flex items-center justify-center py-12 px-4" style="--lay-neutral: #F5EDE5;">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Welcome Back</h1>
      <p class="text-center text-gray-600 mb-8">Sign in to manage your submissions</p>
      
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
        
        <button type="submit" class="btn-primary w-full text-center">Sign In</button>
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
import { login } from '../services/api.js';

const router = useRouter();
const form = ref({
  email: '',
  password: ''
});

const handleLogin = async () => {
  // TODO: Call real login API
  console.log('Login submitted:', form.value);
  alert('Login submitted (UI only - see console)');
};
</script>

<style scoped>
input:focus {
  border-color: var(--lay-yellow);
}
</style>
