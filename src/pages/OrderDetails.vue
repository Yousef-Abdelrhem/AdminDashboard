<template>
  <div class="pr-2 pl-2">
    <div
      class="mt-2 mb-3 flex justify-end gap-1 pt-1 pr-3.5 lg:mt-10 lg:gap-10"
    >
      <Avatar />
    </div>

    <section
      class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-main-950 mb-6 text-lg font-bold sm:text-xl md:text-2xl">
          Order Details
        </h2>
        <p
          :class="{
            'bg-[#FFB349]':
              orderDetails?.status === 'pending' ||
              orderDetails?.status === 'Pending',
            'bg-[#9ED5DB]':
              orderDetails?.status === 'Processing' ||
              orderDetails?.status === 'processing',
            'bg-[#D981FF]':
              orderDetails?.status === 'Shipped' ||
              orderDetails?.status === 'shipped',
            'bg-[#48CB5C]':
              orderDetails?.status === 'Delivered' ||
              orderDetails?.status === 'paid' ||
              orderDetails?.status === 'delivered' ||
              orderDetails?.status === 'Paid',
            'bg-[#FF7C77]':
              orderDetails?.status === 'Canceled' ||
              orderDetails?.status === 'canceled' ||
              orderDetails?.status === 'canceled',
          }"
          class="rounded-full border-0 px-8 py-1.5 text-white sm:px-10 md:px-12"
        >
          {{ uppercaseWord(orderDetails?.status) }}
        </p>
      </div>
      <hr class="border-[#B0B0B0]" />
      <div class="flex gap-1">
        <img src="/src/assets/icons/customer.svg" alt="Customer Icon" />
        <h2 class="text-main-700 my-6 text-lg font-bold sm:text-xl md:text-2xl">
          Customer Information
        </h2>
      </div>
      <section
        class="border-main-900 w-full rounded-xl border-2 px-2 py-5 sm:px-4"
      >
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">
            Customer Name:
          </p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ uppercaseWord(orderDetails?.user?.firstName) }}
            {{ uppercaseWord(orderDetails?.user?.lastName) }}
          </p>
        </div>
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">
            Customer Phone:
          </p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ orderDetails?.user?.phone || "N/A" }}
          </p>
        </div>
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">
            Customer Email:
          </p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ orderDetails?.user?.email || "N/A" }}
          </p>
        </div>
      </section>

      <div class="flex gap-1">
        <img src="/src/assets/icons/address.svg" alt="Address Icon" />
        <h2 class="text-main-700 my-6 text-lg font-bold sm:text-xl md:text-2xl">
          Shipping Address
        </h2>
      </div>
      <section
        class="border-main-900 w-full rounded-xl border-2 px-2 py-5 sm:px-4"
      >
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">Street:</p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ uppercaseWord(orderDetails?.shippingAddress?.street) }}
          </p>
        </div>
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">City:</p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ uppercaseWord(orderDetails?.shippingAddress?.city) }}
          </p>
        </div>
        <div class="flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">Postal Code:</p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ orderDetails?.shippingAddress?.postalCode }}
          </p>
        </div>
      </section>

      <div class="flex gap-1">
        <img src="/src/assets/icons/payment.svg" alt="Payment Icon" />
        <h2 class="text-main-700 my-6 text-lg font-bold sm:text-xl md:text-2xl">
          Payment Information
        </h2>
      </div>
      <section
        class="border-main-900 w-full rounded-xl border-2 px-2 py-5 sm:px-4"
      >
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">
            Payment Method:
          </p>
          <p class="text-sm text-gray-800 sm:text-lg">
            {{ uppercaseWord(orderDetails?.paymentMethod) }}
          </p>
        </div>
        <div class="mb-3 flex gap-1">
          <p class="text-main-900 text-sm font-bold sm:text-lg">
            Payment Status:
          </p>
          <p
            :class="{
              'text-[#FFB349]': orderDetails?.paymentStatus === 'pending',
              'text-[#9ED5DB]': orderDetails?.paymentStatus === 'processing',
              'text-[#D981FF]': orderDetails?.paymentStatus === 'shipped',
              'text-[#48CB5C]':
                orderDetails?.paymentStatus === 'delivered' ||
                orderDetails?.paymentStatus === 'paid',
              'text-[#FF7C77]': orderDetails?.paymentStatus === 'canceled',
            }"
            class="text-sm font-bold sm:text-lg"
          >
            {{ uppercaseWord(orderDetails?.paymentStatus) }}
          </p>
        </div>
      </section>

      <div class="flex">
        <h2 class="text-main-700 my-6 text-lg font-bold sm:text-xl md:text-2xl">
          Ordered Items
        </h2>
      </div>
      <div class="overflow-auto rounded-lg border border-gray-200">
        <table class="w-full">
          <thead>
            <tr class="text-gray-800">
              <th class="px-3 py-5 text-sm sm:text-lg">Product Name</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Quantity</th>
              <th class="px-3 py-5 text-sm sm:text-lg">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in orderDetails?.orderItems || []"
              :key="item._id"
              :class="{ 'bg-[#F1D6B7]': index % 2 === 0 }"
            >
              <td
                class="flex items-center justify-center gap-2 py-3 text-center text-sm sm:text-lg"
              >
                <img
                  v-if="item.product?.images?.length"
                  :src="item.product.images[0]"
                  alt="Product Image"
                  class="h-10 w-10 rounded object-cover"
                />
                <span>{{ item.product?.name || "N/A" }}</span>
              </td>
              <td class="py-3 text-center text-sm sm:text-lg">
                {{ item.quantity }}
              </td>
              <td class="py-3 text-center text-sm sm:text-lg">
                {{ item.price }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="border-main-900 mt-4 flex w-full items-center justify-center rounded-xl border-2 py-3"
      >
        <div class="flex gap-1">
          <p class="text-main-900 text-lg font-bold">Total:</p>
          <p class="text-lg font-bold text-gray-800">
            ${{ orderDetails?.totalPrice.toFixed(2) ?? 0 }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Avatar from "../components/Avatar.vue";
import { getAllOrderDetails } from "../services/OrderDetailsService";
import { useOrdersDetailsStore } from "../stores/orderDetailsStore";

const orderDetails = ref(null);
const orderStore = useOrdersDetailsStore();

function truncatedDescription(description) {
  if (!description) return "";
  const words = description
    .split(" ")
    .map((w) => w.trim())
    .filter(Boolean);
  const firstThree = words.slice(0, 3).join(" ");
  return firstThree + (words.length > 3 ? "..." : "");
}

function uppercaseWord(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
import { useRoute } from "vue-router";

const route = useRoute();
const orderId = route.params.id;

onMounted(async () => {
  try {
    const response = await getAllOrderDetails();
    const order = response.orders.find((o) => o._id === orderId);
    orderDetails.value = order;
    orderStore.setTotalPrice(order?.totalPrice ?? 0);
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
});
</script>
