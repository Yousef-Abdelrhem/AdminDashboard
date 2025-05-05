<template>
    <div class="rounded-lg border border-gray-200 overflow-auto">
        <div v-if="paginatedProducts && paginatedProducts.length > 0">
            <table class="w-full">
                <thead>
                    <tr class="text-gray-800">
                        <th class="py-5 px-2">Product Id</th>
                        <th class="py-5 px-2">Product Image</th>
                        <th class="py-5 px-2">Product Name</th>
                        <th class="py-5 px-2">Description</th>
                        <th class="py-5 px-2">Price</th>
                        <th class="py-5 px-2">In Stock</th>
                        <th class="py-5 px-2">Category</th>
                        <th class="py-5 px-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in paginatedProducts" :key="product.productId"
                        :class="{ 'bg-[#F1D6B7]': index % 2 === 0 }">
                        <td class="text-center py-3">
                            <input type="checkbox" :value="product.productId"
                                :checked="props.selectedProducts.includes(product.productId)"
                                @change="handleCheckboxChange(product.productId)" class="mr-2 accent-main-900" />
                            {{ product.productId }}
                        </td>
                        <td class="py-3 px-2 flex justify-center items-center">
                            <img class="rounded-full border-3 border-main-900 w-15 h-15"
                                :src="product.productImages && product.productImages.length > 0 ? product.productImages[0] : 'default-image-url'" />
                        </td>
                        <td class="text-center py-3 px-2">{{ product.name }}</td>
                        <td class="text-center py-3 px-2">{{ truncatedDescription(product.description) }}</td>
                        <td class="text-center py-3 px-2">{{ product.price }}</td>
                        <td class="text-center py-3 px-2">{{ product.inStock }}</td>
                        <td class="text-center py-3 px-2">{{ product.category }}</td>
                        <td class="text-center py-3 px-2 relative">
                            <a class="cursor-pointer" @click.prevent="toggleMenu(index)">...</a>
                            <div v-if="openMenuIndex === index"
                                class="absolute right-2 z-10 mt-2 w-36 rounded-lg border-1 border-main-900 bg-white shadow-md"
                                @click.self="closeModal">
                                <ul class="text-sm">
                                    <li @click="handleAction('edit', product)" :class="[
                                        'flex gap-3 px-2 py-2 cursor-pointer text-gray-500 hover:text-main-900 hover:rounded-t-lg',
                                        activeAction === 'edit' && activeProductId === product.productId ? 'text-main-900' : ''
                                    ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                            height="24" fill="none">
                                            <path
                                                d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
                                                stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
                                            </path>
                                            <path
                                                d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg>
                                        <p class="flex">Edit</p>
                                    </li>
                                    <hr class="w-30 ml-2 text-gray-400">
                                    <li @click="handleAction('view', product)" :class="[
                                        'flex gap-3 px-2 py-2 cursor-pointer text-gray-500 hover:text-main-900 ',
                                        activeAction === 'view' && activeProductId
                                    ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                            height="24" fill="none">
                                            <path
                                                d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                                                stroke="currentColor" stroke-width="1.5" />
                                            <path
                                                d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                                                stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                        <p class="flex">View Details</p>
                                    </li>
                                    <hr class="w-30 ml-2 text-gray-400">
                                    <li @click="handleAction('delete', product)" :class="[
                                        'flex gap-3 px-2 py-2 cursor-pointer text-gray-500 hover:text-main-900 hover:rounded-b-lg',
                                        activeAction === 'delete' && activeProductId === product.productId ? 'text-main-900' : ''
                                    ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                            height="24" fill="none">
                                            <path
                                                d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path
                                                d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round" />
                                            <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round" />
                                        </svg>
                                        <p class="flex">Delete</p>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination my-4 flex justify-center gap-1 text-gray-600">
                <button class="w-9 h-9 flex justify-center items-center rounded border-2 border-[#F1D6B7]"
                    @click="prevPage" :disabled="currentPage === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <span class="w-9 h-9 flex justify-center items-center rounded border-2 border-[#F1D6B7]"
                    v-for="page in totalPages" :key="page" @click="changePage(page)"
                    :class="{ 'bg-[#F1D6B7] text-main-900': currentPage === page }">
                    {{ page }}
                </span>
                <button class="w-9 h-9 flex justify-center items-center rounded border-2 border-[#F1D6B7]"
                    @click="nextPage" :disabled="currentPage === totalPages">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
        <div v-else>
            <p class="text-center text-gray-500 py-4">No products available.</p>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    products: Array,
    selectedProducts: Array,
    currentPage: Number,
    itemsPerPage: Number,
    openMenuIndex: Number,
    paginatedProducts: Array,
    totalPages: Number,
    activeAction: String,
    handleAction: Function,
    toggleMenu: Function,
    prevPage: Function,
    nextPage: Function,
    changePage: Function,
});

const emit = defineEmits(['update:selectedProducts', 'delete-selected']);

function handleCheckboxChange(productId) {
    const index = props.selectedProducts.indexOf(productId);
    if (index > -1) {
        props.selectedProducts.splice(index, 1);
    } else {
        props.selectedProducts.push(productId);
    }
}

const truncatedDescription = (description) => {
    if (!description) return '';
    const sentences = description.split(' ').map(sentence => sentence.trim()).filter(Boolean);
    const firstFourSentences = sentences.splice(0, 3).join(' ');
    return firstFourSentences + (sentences.length > 3 ? '...' : '');
};

</script>