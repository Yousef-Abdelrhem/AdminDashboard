<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center pl-10"
    @click.self="closeModal"
    style="background-color: rgba(0, 0, 0, 0.3)"
  >
    <div
      class="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-400 relative right-5 max-h-[90vh] w-150 overflow-auto rounded-xl bg-white p-5 shadow-lg md:right-0 md:w-[60%]"
    >
      <button
        class="absolute top-4 right-4 cursor-pointer text-xl font-bold"
        @click="$emit('close')"
      >
        <img src="../assets/icons/close.svg" alt="Close icon" />
      </button>

      <h2 class="text-main-900 mt-10 mb-4 pb-2 text-center text-xl font-bold">
        Product Details
      </h2>

      <div class="mb-6 flex gap-10">
        <img
          v-for="(image, index) in viewedProduct.images"
          :key="index"
          :src="image"
          class="border-main-400 h-50 w-50 rounded-3xl border-4"
        />
      </div>

      <div
        class="space-y-2 rounded-lg border-2 border-[#F9D4AD] bg-[#FBECD6] p-4 text-sm"
      >
        <p class="text-gray-700">
          <strong class="text-main-900">Product Name:</strong>
          {{ viewedProduct.name }}
        </p>
        <p class="text-gray-700">
          <strong class="text-main-900">Product Price:</strong>
          {{ viewedProduct.price }}
        </p>
        <p class="text-gray-700">
          <strong class="text-main-900">Product Description:</strong>
          {{ viewedProduct.description }}
        </p>
        <p class="text-gray-700">
          <strong class="text-main-900">Quantity In Stock:</strong>
          {{ viewedProduct.quantity }}
        </p>
        <p class="text-gray-700">
          <strong class="text-main-900">Product Category:</strong>
          {{ viewedProduct.category }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  viewedProduct: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>
