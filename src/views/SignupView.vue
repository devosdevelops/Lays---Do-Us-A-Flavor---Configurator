<template>
  <div class="min-h-screen bg-gradient-to-br from-lay-neutral to-gray-100 flex items-center justify-center py-12 px-4" style="--lay-neutral: #F5EDE5;">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Join the Flavor Contest</h1>
      <p class="text-center text-gray-600 mb-8">Create your account to submit and vote</p>
      
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
          />
        </div>
        
        <button type="submit" class="btn-primary w-full text-center">Create Account</button>
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
import { signup } from '../services/api.js';

const router = useRouter();
const form = ref({
  username: '',
  email: '',
  password: ''
});

const handleSignup = async () => {
  // TODO: Call real signup API
  console.log('Signup submitted:', form.value);
  alert('Signup submitted (UI only - see console)');
};
</script>

<style scoped>
input:focus {
  border-color: var(--lay-yellow);
}
</style>
