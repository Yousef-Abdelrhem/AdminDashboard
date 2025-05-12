import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrdersDetailsStore = defineStore('order', () => {
  const totalPrice = ref(0);

  function setTotalPrice(price) {
    totalPrice.value = price;
  }

  return {
    totalPrice,
    setTotalPrice
  };
});