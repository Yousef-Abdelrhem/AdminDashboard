<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.3);">
    <div class="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl text-center">
      <h2 class="text-xl font-semibold mb-4 text-main-900">Are you sure?</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer" @click="$emit('cancel')">
          Cancel
        </button>
        <button class="px-4 py-2 rounded bg-main text-white hover:bg-main-900 cursor-pointer" @click="$emit('confirm')">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: {
    type: String,
    default: "This action cannot be undone.",
  },
});
</script>
