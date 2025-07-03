<template>
  <div class="overflow-auto rounded-lg border border-gray-200">
    <div v-if="orderStore.orders && orderStore.orders.length > 0">
      <table class="w-full">
        <thead>
          <tr class="text-gray-800">
            <th class="px-2 py-5">Order Id</th>
            <th class="px-2 py-5">Order Date</th>
            <th class="px-2 py-5">Order Status</th>
            <th class="px-2 py-5">Payment Status</th>
            <th class="px-2 py-5">Customer Name</th>
            <th class="px-2 py-5">Total</th>
            <th class="px-2 py-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in paginatedOrders"
            :key="order.orderId"
            :class="[index % 2 === 0 ? 'bg-[#F1D6B7]' : '']"
          >
            <td class="py-3 text-center">
              <input
                type="checkbox"
                :value="order.orderId"
                :checked="props.selectedProducts.includes(order.orderId)"
                @change="handleCheckboxChange(order.orderId)"
                class="accent-main-900 mr-2"
              />
              {{ order.orderId }}
            </td>
            <td class="py-3 text-center">
              <!-- {{ order.orderDate.split("T")[0] }} -->
              {{
                new Date(order.createdAt).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "UTC",
                })
              }}
            </td>

            <td class="px-2 py-3 text-center">
              <div class="relative inline-block">
                <button
                  @click="toggleStatusDropdown(index)"
                  :class="[
                    'flex items-center justify-center rounded-full px-4 py-1 text-sm font-medium',
                    order.status === 'pending'
                      ? 'bg-amber-300'
                      : order.status === 'processing'
                        ? 'bg-teal-200'
                        : order.status === 'shipped'
                          ? 'bg-purple-300'
                          : order.status === 'delivered'
                            ? 'bg-green-300'
                            : order.status === 'canceled'
                              ? 'bg-red-300'
                              : 'bg-gray-200',
                  ]"
                >
                  {{ order.status }} ▼
                </button>
                <div
                  v-if="statusDropdownIndex === index"
                  class="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <div class="py-1">
                    <button
                      v-for="status in orderStatuses"
                      :key="status"
                      @click="updateOrderStatus(order, status)"
                      :class="[
                        'block w-full px-4 py-2 text-left text-sm',
                        status === 'pending'
                          ? 'bg-amber-300'
                          : status === 'processing'
                            ? 'bg-teal-200'
                            : status === 'shipped'
                              ? 'bg-purple-300'
                              : status === 'delivered'
                                ? 'bg-green-300'
                                : status === 'canceled'
                                  ? 'bg-red-300'
                                  : 'bg-gray-200',
                      ]"
                    >
                      {{ status }}
                    </button>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-3 text-center">
              <div class="relative inline-block">
                <button
                  :class="[
                    'flex items-center justify-center rounded-full px-4 py-1 text-sm font-medium',
                    order.paymentStatus === 'pending'
                      ? 'bg-amber-300 text-amber-900'
                      : order.paymentStatus === 'paid'
                        ? 'bg-green-300 text-green-900'
                        : order.paymentStatus === 'failed'
                          ? 'bg-red-300 text-red-900'
                          : order.paymentStatus === 'refunded'
                            ? 'bg-purple-300 text-purple-900'
                            : 'bg-gray-200 text-gray-800',
                  ]"
                >
                  {{ order.paymentStatus }}
                </button>
              </div>
            </td>

            <td class="px-2 py-3 text-center">
              {{ order?.user?.firstName + " " + order?.user?.lastName }}
            </td>
            <td class="px-2 py-3 text-center">
              {{ order.totalPrice.toFixed(2) }}
            </td>

            <td class="relative px-2 py-3 text-center">
              <a class="cursor-pointer" @click.prevent="props.toggleMenu(index)"
                >...</a
              >
              <div
                v-if="props.openMenuIndex === index"
                class="border-main-900 absolute right-2 z-10 mt-2 w-36 rounded-lg border-1 bg-white shadow-md"
              >
                <ul class="text-sm">
                  <hr class="ml-2 w-30 text-gray-400" />
                  <li
                    @click="props.handleAction('view', order)"
                    :class="[
                      'hover:text-main-900 flex cursor-pointer gap-3 px-2 py-2 text-gray-500',
                      props.activeAction === 'view' && order.orderId,
                    ]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                    >
                      <path
                        d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path
                        d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                    </svg>
                    <p class="flex">View Details</p>
                  </li>
                  <hr class="ml-2 w-30 text-gray-400" />
                  <li
                    @click="props.handleAction('delete', order)"
                    :class="[
                      'hover:text-main-900 flex cursor-pointer gap-3 px-2 py-2 text-gray-500 hover:rounded-b-lg',
                      props.activeAction === 'delete' && order.orderId
                        ? 'text-main-900'
                        : '',
                    ]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                    >
                      <path
                        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M9.5 16.5L9.5 10.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M14.5 16.5L14.5 10.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
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
        <button
          @click="props.prevPage"
          :disabled="props.currentPage === 1"
          class="flex h-9 w-9 items-center justify-center rounded border-2 border-[#F1D6B7]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <span
          v-for="page in props.totalPages"
          :key="page"
          @click="props.changePage(page)"
          :class="[
            'flex h-9 w-9 cursor-pointer items-center justify-center rounded border-2 border-[#F1D6B7]',
            props.currentPage === page ? 'text-main-900 bg-[#F1D6B7]' : '',
          ]"
        >
          {{ page }}
        </span>

        <button
          @click="props.nextPage"
          :disabled="props.currentPage === props.totalPages"
          class="flex h-9 w-9 items-center justify-center rounded border-2 border-[#F1D6B7]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-else>
      <p class="py-4 text-center text-gray-500">No orders available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useOrderStore } from "../Stores/OrderStore";
import { Order } from "../Interfaces/Api";

const orderStore = useOrderStore();

const props = defineProps({
  orders: Array, // ✅ this is new
  selectedProducts: Array,
  currentPage: Number,
  itemsPerPage: Number,
  openMenuIndex: Number,
  paginatedProducts: Array,
  totalPages: Number,
  activeAction: String,
  activeProductId: String,
  handleAction: Function,
  toggleMenu: Function,
  prevPage: Function,
  nextPage: Function,
  changePage: Function,
});

const emit = defineEmits(["update:selectedProducts", "delete-selected"]);

// Compute paginated orders based on the current page
const paginatedOrders = computed(() => {
  if (!props.currentPage || !props.itemsPerPage) {
    return orderStore.orders;
  }

  const startIndex = (props.currentPage - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;

  return props.orders.slice(startIndex, endIndex);
});

// Order status management
const orderStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "canceled",
];
const statusDropdownIndex = ref(null);

function toggleStatusDropdown(index) {
  statusDropdownIndex.value =
    statusDropdownIndex.value === index ? null : index;
}

function updateOrderStatus(order, newStatus) {
  // Update the order status
  order.status = newStatus;
  // Here you would typically call an API to update the status in the backend
  // orderStore.orders = orderStore.orders.map((itm) => itm.id == - order.id ? itm.status = newStatus : itm);
  orderStore.updateOrdereStatus(order.orderId, newStatus);
  statusDropdownIndex.value = null;
}

function handleCheckboxChange(orderId) {
  const selectedProductsCopy = [...props.selectedProducts];
  const index = selectedProductsCopy.indexOf(orderId);

  if (index > -1) {
    selectedProductsCopy.splice(index, 1);
  } else {
    selectedProductsCopy.push(orderId);
  }
  console.log(selectedProductsCopy);

  // Emit the updated array back to the parent
  emit("update:selectedProducts", selectedProductsCopy);
}

onMounted(() => {
  orderStore.fetchOrders();
});
</script>
