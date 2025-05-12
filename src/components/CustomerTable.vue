<template>
    <div class="rounded-lg border border-gray-200 overflow-auto">
        <div v-if="paginatedCustomers && paginatedCustomers.length > 0">
            <table class="w-full">
                <thead>
                    <tr class="text-gray-800">
                        <th class="py-5 px-4 text-sm md:text-lg">Id</th>
                        <th class="py-5 px-4 text-sm md:text-lg">Customer Image</th>
                        <th class="py-5 px-4 text-sm md:text-lg">Customer Name</th>
                        <th class="py-5 px-4 text-sm md:text-lg">Customer Email</th>
                        <th class="py-5 px-4 text-sm md:text-lg">No.of Order</th>
                        <th class="py-5 px-4 text-sm md:text-lg">Total</th>
                        <th class="py-5 px-4 text-sm md:text-lg">Tags</th>
                        <th class="py-5 px-4 text-sm md:text-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, index) in paginatedCustomers" :key="customer.customerId"
                        :class="{ 'bg-[#F1D6B7]': index % 2 === 0 }">
                        <td class="text-center py-3 px-4 text-md">
                            {{ customer.customerId }}
                        </td>
                        <td class="py-3 flex justify-center items-center">
                            <img class="rounded-full border-3 border-main-900 w-15 h-15"
                                :src="customer.customerImage" />
                        </td>
                        <td class="text-center py-3 px-5">{{ customer.customerName }}</td>
                        <td class="text-center py-3 px-5">{{ customer.customerEmail }}</td>
                        <td class="text-center py-3 px-5">{{ customer.numberOfOrders }}</td>
                        <td class="text-center py-3 px-5">${{ orderStore.totalPrice }}</td>
                        <td class="text-center">
                            <div class="rounded-full px-2 py-3 w-50  md:px-1 md:py-2 flex justify-center gap-2 cursor-pointer" :class="{
                                'bg-[#FFB753]': customer.tags[0] === 'premium',
                                'bg-[#ADC2FF]': customer.tags[0] === 'new customer',
                                'bg-[#D981FF]': customer.tags[0] === 'inactive customer',
                                'bg-[#67FF76]': customer.tags[0] === 'frequent buyer'
                            }" @click="toggleTags(customer)">
                                <p>{{ customer.tags[0] }}</p>
                                <img src="../assets/icons/Vector.svg" alt="">
                            </div>

                            <div v-if="openTagsForCustomer[customer.customerId]"
                                class="absolute bg-white shadow-lg rounded-lg w-48 p-2 mt-2">
                                <div v-for="tag in tagsList" :key="tag" class="p-2 cursor-pointer hover:bg-gray-100"
                                    @click="updateTag(customer, tag)">
                                    {{ tag }}
                                </div>
                            </div>
                        </td>
                        <td class="text-center py-3 px-2 relative">
                            <a class="cursor-pointer" @click.prevent="toggleMenu(index)">...</a>
                            <div v-if="openMenuIndex === index"
                                class="absolute right-2 z-10 mt-2 w-36 rounded-lg border-1 border-main-900 bg-white shadow-md"
                                @click.self="closeModal">
                                <ul class="text-sm">
                                    <li @click="handleAction('view', customer)" :class="[
                                        'flex gap-3 px-2 py-2 cursor-pointer text-gray-500 hover:text-main-900 ',
                                        activeAction === 'view' && activeCustomerId
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
                                    <li @click="handleAction('delete', customer)" :class="[
                                        'flex gap-3 px-2 py-2 cursor-pointer text-gray-500 hover:text-main-900 hover:rounded-b-lg',
                                        activeAction === 'delete' && activeCustomerId === product.customerId ? 'text-main-900' : ''
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
import { ref } from 'vue';
import { useOrdersDetailsStore } from '../stores/orderDetailsStore';

const props = defineProps({
    customers: Array,
    selectedCustomers: Array,
    currentPage: Number,
    itemsPerPage: Number,
    openMenuIndex: Number,
    paginatedCustomers: Array,
    totalPages: Number,
    activeAction: String,
    handleAction: Function,
    toggleMenu: Function,
    prevPage: Function,
    nextPage: Function,
    changePage: Function,
});

const emit = defineEmits(['update:selectedCustomers', 'delete-selected']);

const openTagsForCustomer = ref({});

const tagsList = [
    'premium',
    'new customer',
    'inactive customer',
    'frequent buyer'
];

const toggleTags = (customer) => {
    const customerId = customer.customerId;
    openTagsForCustomer.value[customerId] = !openTagsForCustomer.value[customerId];
};

const updateTag = (customer, tag) => {
    customer.tags[0] = tag;
    openTagsForCustomer.value[customer.customerId] = false;
};

const orderStore = useOrdersDetailsStore();
</script>
