<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <footer class="bg-gray-800 text-white text-center p-4">
      &copy; 2025 Amazon Clone. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>
