<template>
  <div id="app-root">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
#app-root {
  min-height: 100vh;
  width: 100%;
}
</style>
