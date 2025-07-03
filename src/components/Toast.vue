<template>
  <div
    v-if="visible"
    :class="[
      'fixed bottom-8 right-6 px-6 py-4 rounded-lg shadow-lg font-bold text-sm transition-all duration-300 z-50',
      toastTypeClass
    ]"
  >
    {{ message }}
  </div>
</template>

<script>
import { useToast } from '../useToast';
import { computed } from 'vue';

export default {
  setup() {
    const { message, type, visible } = useToast();

    const toastTypeClass = computed(() => {
      switch (type.value) {
        case 'success':
          return 'bg-green-100 text-green-800';
        case 'error':
          return 'bg-red-100 text-red-800';
        case 'warning':
          return 'bg-yellow-100 text-yellow-800';
        case 'info':
        default:
          return 'bg-blue-100 text-blue-800';
      }
    });

    return { message, type, visible, toastTypeClass };
  },
};
</script>
