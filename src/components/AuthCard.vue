<template>
  <div class="auth-card">
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
      <h2 class="text-xl font-bold text-main-900 mb-4">Authentication Required</h2>
      <p class="mb-6 text-gray-600">Please sign in or create an account to access this page.</p>
      <div class="flex justify-center gap-4">
        <button @click="goToLogin" class="bg-main-200 hover:bg-main-300 text-main-900 font-medium py-2 px-4 rounded">
          Login
        </button>
        <button @click="goToSignup" class="bg-main-900 hover:bg-main-800 text-white font-medium py-2 px-4 rounded">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToLogin() {
  router.push('/login');
}

function goToSignup() {
  router.push('/signup');
}
</script>

<style scoped>
.auth-card {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>