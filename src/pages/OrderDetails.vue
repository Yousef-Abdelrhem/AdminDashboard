<template>
    <div class="pr-2 pl-2">
        <div class="mt-2 mb-3 flex gap-1 lg:mt-10 lg:gap-10 justify-end pr-3.5 pt-1">
            <Avatar />
        </div>

        <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">

            <div class="flex justify-between items-center">
                <h2 class="text-main-950 text-lg sm:text-xl md:text-2xl mb-6 font-bold">Order Details</h2>
                <p class="border-0 bg-[#48CB5C] rounded-full px-8 sm:px-10 md:px-12 py-1.5 text-white">Paid</p>
            </div>
            <hr class="border-[#B0B0B0]">
            <div class="flex gap-1">
                <img src="/src/assets/icons/customer.svg" alt="Add product icon" />
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Customer Information</h2>
            </div>
            <section class="w-full rounded-xl border-2 border-main-900 py-5 px-2 sm:px-4">
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Customer Name: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">Ahmed Mohemed</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Customer Phone: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">+20 102 1226875</p>
                </div>
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Customer Email: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">reham@gmail.com</p>
                </div>
            </section>
            <div class="flex gap-1">
                <img src="/src/assets/icons/address.svg" alt="Add product icon" />
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Shipping Address</h2>
            </div>
            <section class="w-full rounded-xl border-2 border-main-900 py-5 px-2 sm:px-4">
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Street: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">15 El Nasr Street</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">City: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">Cairo</p>
                </div>
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Postal Code: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">11311</p>
                </div>
            </section>
            <div class="flex gap-1">
                <img src="/src/assets/icons/payment.svg" alt="Add product icon" />
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Payment Information</h2>
            </div>
            <section class="w-full rounded-xl border-2 border-main-900 py-5 px-2 sm:px-4">
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Payment Method: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">Visa</p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Transaction Id:</p>
                    <p class="text-gray-800 text-sm sm:text-lg">12345 </p>
                </div>
                <div class="flex gap-1 mb-3">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Postal Code: </p>
                    <p class="text-gray-800 text-sm sm:text-lg">123456789</p>
                </div>
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-sm sm:text-lg">Payment Status: </p>
                    <p class="text-[#2C8A3A] font-bold text-sm sm:text-lg">Paid</p>
                </div>
            </section>
            <div class="flex">
                <h2 class="text-main-700 text-lg sm:text-xl md:text-2xl my-6 font-bold">Ordered Items</h2>
            </div>
            <div class="rounded-lg border border-gray-200 overflow-auto">
                <div>
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
                            <tr v-for="(product, index) in paginatedProducts" :key="product.productId"
                                :class="{ 'bg-[#F1D6B7]': index % 2 === 0 }">
                                <td class="py-3 px-3 flex justify-center items-center">
                                    <img class="rounded-full border-3 border-main-900 w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15"
                                        :src="product.productImages && product.productImages.length > 0 ? product.productImages[0] : 'default-image-url'" />
                                </td>
                                <td class="text-center py-3 text-sm sm:text-lg">{{ product.name }}</td>
                                <td class="text-center py-2 text-sm sm:text-lg">{{ truncatedDescription(product.description) }}</td>
                                <td class="text-center py-3 text-sm sm:text-lg">{{ product.quantity }}</td>
                                <td class="text-center py-3 text-sm sm:text-lg">{{ product.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full flex justify-center items-center rounded-xl border-2 mt-4 border-main-900 py-3">
                <div class="flex gap-1">
                    <p class="text-main-900 font-bold text-lg">Total: </p>
                    <p class="text-gray-800 font-bold text-lg">$3000</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Avatar from "../components/Avatar.vue";

export default {
    name: "OrderDetails",
    components: {
        Avatar
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 3,
            products: [
                {
                    productId: 1,
                    name: "Product A",
                    description: "This is a long description for product A that needs to be truncated.",
                    quantity: 10,
                    price: "$100",
                    productImages: ["/src/assets/icons/customer.svg"]
                },
                {
                    productId: 2,
                    name: "Product B",
                    description: "Short desc.",
                    quantity: 5,
                    price: "$50",
                    productImages: ["/src/assets/icons/address.svg"]
                },
                {
                    productId: 3,
                    name: "Product C",
                    description: "Another that is a bit lengthy and needs to be shortened.",
                    quantity: 20,
                    price: "$75",
                    productImages: ["/src/assets/icons/payment.svg"]
                }
            ]
        };
    },
    computed: {
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        }
    },
    methods: {
        truncatedDescription(description) {
            if (!description) return '';
            const sentences = description.split(' ').map(sentence => sentence.trim()).filter(Boolean);
            const firstFourSentences = sentences.splice(0, 3).join(' ');
            return firstFourSentences + (sentences.length > 3 ? '...' : '');
        }
    }
};
</script>
