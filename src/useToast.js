import { ref } from 'vue';

const message = ref('');
const type = ref('info'); 
const visible = ref(false);

function showToast(msg, toastType = 'info') {
  message.value = msg;
  type.value = toastType;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 3000);
}

export function useToast() {
  return {
    message,
    type,
    visible,
    showToast,
  };
}
