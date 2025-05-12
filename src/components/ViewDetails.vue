<template>
    <div class="fixed inset-0 flex pl-10 justify-center items-center z-50" @click.self="closeModal" style="background-color: rgba(0, 0, 0, 0.3);">
        <div class="bg-white w-150 right-5 md:w-[60%] md:right-0 rounded-xl shadow-lg p-5 relative max-h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-400">
            <button class="absolute top-4 right-4 text-xl font-bold cursor-pointer" @click="$emit('close')">
                <img src="../assets/icons/close.svg" alt="Close icon" />
            </button>

            <h2 class="text-center text-xl font-bold text-main-900 mt-10 mb-4 pb-2">Product Details</h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-6">
                <img v-for="n in 4" :key="n" :src="viewedProduct.productImages[n-1]" class="w-50 h-50 border-4 border-main-400 rounded-3xl" />
            </div>

            <div class="bg-[#FBECD6] border-2 border-[#F9D4AD] rounded-lg p-4 text-sm space-y-2">
                <p class="text-gray-700"><strong class="text-main-900">Product Name:</strong> {{ viewedProduct.name }}</p>
                <p class="text-gray-700"><strong class="text-main-900">Product Price:</strong> {{ viewedProduct.price }}</p>
                <p class="text-gray-700"><strong class="text-main-900">Product Description:</strong> {{ viewedProduct.description }}</p>
                <p class="text-gray-700"><strong class="text-main-900">Quantity In Stock:</strong> {{ viewedProduct.inStock }}</p>
                <p class="text-gray-700"><strong class="text-main-900">Product Category:</strong> {{ viewedProduct.category }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    viewedProduct: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>