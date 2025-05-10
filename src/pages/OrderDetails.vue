<template>
    <div class="pr-2 pl-2">
        <div class="mt-2 mb-3 flex gap-1 lg:mt-10 lg:gap-10 justify-end pr-3.5 pt-1">
            <Avatar />
        </div>

        <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">
            <div class="flex justify-between items-center">
                <h2 class="text-main-950 text-lg sm:text-xl md:text-2xl mb-6 font-bold">Order Details</h2>
                <p :class="{
                    'bg-[#FFB349]': orderDetails?.status === 'pending' || orderDetails?.status === 'Pending',
                    'bg-[#9ED5DB]': orderDetails?.status === 'Processing' || orderDetails?.status === 'processing',
                    'bg-[#D981FF]': orderDetails?.status === 'Shipped' || orderDetails?.status === 'shipped' ,
                    'bg-[#48CB5C]': orderDetails?.status === 'Delivered' || orderDetails?.status === 'paid' ||orderDetails?.status === 'delivered' || orderDetails?.status === 'Paid',
                    'bg-[#FF7C77]': orderDetails?.status === 'Cancelled' || orderDetails?.status === 'cancelled'
                }" class="border-0 rounded-full px-8 sm:px-10 md:px-12 py-1.5 text-white">
                    {{ uppercaseWord(orderDetails?.status) }}
                </p>
            </div>
            <hr class="border-[#B0B0B0]">
            <div class="flex gap-1">
                <img src="/src/assets/icons/customer.svg" alt="Customer Icon" />
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Customer Information</h2>
            </div>
            <section class="w-full rounded-xl border-2 border-main-900 py-5 px-2 sm:px-4">
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Customer Name: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ uppercaseWord(orderDetails?.customer?.customerName) }}</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Customer Phone: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ orderDetails?.customer?.customerNumber }}</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Customer Email: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ orderDetails?.customer?.customerEmail }}</p>
                </div>
            </section>

            <div class="flex gap-1">
                <img src="/src/assets/icons/address.svg" alt="Address Icon" />
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Shipping Address</h2>
            </div>
            <section class="w-full rounded-xl border-2 border-main-900 py-5 px-2 sm:px-4">
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Street: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ uppercaseWord(orderDetails?.shippingAddress?.street) }}</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">City: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ uppercaseWord(orderDetails?.shippingAddress?.city) }}</p>
                </div>
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Postal Code: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ orderDetails?.shippingAddress?.postalCode }}</p>
                </div>
            </section>

            <div class="flex gap-1">
                <img src="/src/assets/icons/payment.svg" alt="Payment Icon" />
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Payment Information</h2>
            </div>
            <section class="w-full rounded-xl border-2 border-main-900 py-5 px-2 sm:px-4">
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Payment Method: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ uppercaseWord(orderDetails?.paymentInfo?.paymentMethod) }}</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Transaction ID: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ orderDetails?.paymentInfo?.transactionId }}</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Postal Code: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">{{ orderDetails?.paymentInfo?.billingPostalCode }}</p>
                </div>
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Payment Status: </p>
                    <p :class="{
                        'text-[#FFB349]': orderDetails?.paymentInfo.paymentStatus === 'pending',
                        'text-[#9ED5DB]': orderDetails?.paymentInfo.paymentStatus === 'processing',
                        'text-[#D981FF]': orderDetails?.paymentInfo.paymentStatus === 'shipped',
                        'text-[#48CB5C]': orderDetails?.paymentInfo.paymentStatus === 'delivered' || orderDetails?.paymentInfo.paymentStatus === 'paid',
                        'text-[#FF7C77]': orderDetails?.paymentInfo.paymentStatus === 'cancelled'
                    }" class="font-bold text-sm sm:text-lg">
                        {{ uppercaseWord(orderDetails?.paymentInfo.paymentStatus) }}
                    </p>
                </div>
            </section>

            <div class="flex">
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Ordered Items</h2>
            </div>
            <div class="rounded-lg border border-gray-200 overflow-auto">
                <table class="w-full">
                    <thead>
                        <tr class="text-gray-800">
                            <th class="py-5 px-3 text-sm sm:text-lg">Product Image</th>
                            <th class="py-5 px-3 text-sm sm:text-lg">Product Name</th>
                            <th class="py-5 px-3 text-sm sm:text-lg">Description</th>
                            <th class="py-5 px-3 text-sm sm:text-lg">Quantity</th>
                            <th class="py-5 px-3 text-sm sm:text-lg">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in orderDetails?.products || []" :key="product.productId"
                            :class="{ 'bg-[#F1D6B7]': index % 2 === 0 }">
                            <td class="py-3 px-3 flex justify-center items-center">
                                <img class="rounded-full border-3 border-main-900 w-12 h-12"
                                    :src="product.productId.productImages?.[0] || 'default-image-url'" />
                            </td>
                            <td class="text-center py-3 text-sm sm:text-lg">{{ product.productId.name }}</td>
                            <td class="text-center py-2 text-sm sm:text-lg">{{ truncatedDescription(product.productId.description)
                                }}</td>
                            <td class="text-center py-3 text-sm sm:text-lg">{{ product.quantity }}</td>
                            <td class="text-center py-3 text-sm sm:text-lg">{{ product.productId.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full flex justify-center items-center rounded-xl border-2 mt-4 border-main-900 py-3">
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-lg">Total: </p>
                    <p class="text-gray-800 font-bold text-lg">${{ orderDetails?.totalPrice ?? 0 }}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Avatar from '../components/Avatar.vue';
import { getAllOrderDetails } from '../services/OrderDetailsService';
import { useOrderStore } from '../stores/orderDetailsStore';

const orderDetails = ref(null);
const orderStore = useOrderStore();

function truncatedDescription(description) {
    if (!description) return '';
    const words = description.split(' ').map(w => w.trim()).filter(Boolean);
    const firstThree = words.slice(0, 3).join(' ');
    return firstThree + (words.length > 3 ? '...' : '');
}

function uppercaseWord(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

onMounted(async () => {
    try {
        const response = await getAllOrderDetails();
        orderDetails.value = response.orders[0]; 
        orderStore.setTotalPrice(orderDetails.value.totalPrice); 
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
});
</script>