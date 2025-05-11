<template>
  <div class="pr-2 pl-2">
    <div class="mt-2 mb-3 flex justify-end gap-1 pt-1 pr-3.5 lg:mt-10 lg:gap-10">
      <Avatar />
    </div>

    <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">
      <div class="flex justify-between">
        <h2 class="text-main-950 mb-6 text-2xl font-bold">List of Orders</h2>
      </div>

      <div class="mb-4 flex items-center justify-between gap-5 md:flex-row">
        <div class="flex flex-1 items-center gap-2">
          <SearchBar />
          <FilterProduct @apply-filters="handleFilters" />
          <p class="m-0 text-[1.2rem] font-bold text-nowrap">Sort By</p>
        </div>
        <!-- Sort DropDown list -->
        <div class="flex gap-3">
          <Listbox v-model="selectedPerson">
            <div class="relative w-[16rem]">
              <ListboxButton
                class="w-full cursor-pointer rounded bg-[#F1D6B7] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2215%22%20height%3D%2210%22%20viewBox%3D%220%200%2015%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.50103%200.00892258H13.501C13.6225%200.00930309%2013.7416%200.0428123%2013.8455%200.105841C13.9494%200.16887%2014.0341%200.259032%2014.0905%200.366624C14.1469%200.474216%2014.173%200.595162%2014.1658%200.716444C14.1586%200.837727%2014.1185%200.954751%2014.0497%201.05492L8.0497%209.72159C7.80103%2010.0809%207.20237%2010.0809%206.95303%209.72159L0.953034%201.05492C0.883583%200.95496%200.842856%200.837876%200.835277%200.716393C0.827698%200.594909%200.853556%200.47367%200.910043%200.36585C0.96653%200.258031%201.05148%200.167753%201.15568%200.104826C1.25987%200.0418997%201.37931%200.00873089%201.50103%200.00892258Z%22%20fill%3D%22%23763A26%22%2F%3E%3C%2Fsvg%3E')] bg-[right_10px_center] bg-no-repeat px-4 py-2 text-left font-medium text-[#622B15] focus:outline-none">
                {{ selectedPerson.name }}</ListboxButton>
              <ListboxOptions
                class="absolute z-10 mt-1 w-full rounded bg-white shadow-lg ring-1 ring-black/10 focus:outline-none">
                <ListboxOption v-for="person in people" :key="person.id" :value="person"
                  v-slot="{ active, selected, disabled }">
                  <li :class="[
            'cursor-pointer px-4 py-2 text-sm',
            selected
              ? 'font-semibold text-[#892A16]'
              : 'text-gray-700',
            active && !disabled ? 'bg-[#F1D6B7]' : '',
            disabled ? 'cursor-not-allowed opacity-40' : '',
          ]">
                    {{ person.name }}
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>

          <div class="btn text-main-900 border-0 bg-[#F1D6B7] px-2 md:px-5" @click="deleteSelected">
            <img src="/src/assets/icons/delete.svg" alt="Delete icon" />
            <p class="hidden sm:flex">Delete</p>
          </div>
        </div>
      </div>

      <div v-if="filteredOrders.length === 0" class="py-4 text-center text-gray-500">
        Oops! We couldn't find any orders that match your filters.
      </div>
      <OrderTable v-else v-model:selectedProducts="selectedProducts" :currentPage="currentPage"
        :itemsPerPage="itemsPerPage" :openMenuIndex="openMenuIndex" :paginatedProducts="paginatedProducts"
        :totalPages="totalPages" :handleAction="handleAction" :toggleMenu="toggleMenu" :prevPage="prevPage"
        :nextPage="nextPage" :changePage="changePage" />

    </section>
    <ViewDetails v-if="showViewModal" :viewedProduct="viewedProduct" @close="showViewModal = false" />
  </div>
</template>

<script setup>
import Avatar from "../components/Avatar.vue";
import FilterProduct from "../components/FilterProduct.vue";
import ProductTable from "../components/ProductTable.vue";
import SearchBar from "../components/SearchBar.vue";
import ViewDetails from "../components/ViewDetails.vue";
import OrderTable from "../components/OrdersTable.vue";
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useOrderStore } from "../Stores/OrderStore";
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = route.params.id;

const people = [
  { id: 1, name: "Order Date (Newest First)" },
  { id: 2, name: "Order Date (Oldest First)" },
  { id: 3, name: "Total Price (High to Low)" },
  { id: 4, name: "Total Price (Low to High)" },
  { id: 5, name: "Status (A-Z)" },
  { id: 6, name: "Status (Z-A)" },
];
const searchQuery = ref("");

const orderStore = useOrderStore();
const selectedPerson = ref(people[0]);

const router = useRouter();
const selectedProducts = ref([]);

const currentPage = ref(1);
const itemsPerPage = 9;

const openMenuIndex = ref(null);

const allOrders = ref([]);
const filteredOrders = ref([]);


const filters = reactive({
  idEnabled: false,
  id: "",
  nameEnabled: false,
  name: "",
  priceEnabled: false,
  price: 200,
  categoryEnabled: false,
  category: "",
});


function toggleMenu(index) {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
}

const activeAction = ref(null);
const activeProductId = ref(null);

const showViewModal = ref(false);
const viewedProduct = ref({});

function handleAction(action, product) {
  activeAction.value = action;
  activeProductId.value = product.productId;

  console.log(`Action: ${action} on`, product);

  if (action === "edit") {
    //edit  
  } else if (action === "view") {
    viewedProduct.value = product;
    showViewModal.value = true;
    openMenuIndex.value = null;
    // router.push({ name: 'OrderDetails', params: { id: product._id } });

  } else if (action === "delete") {
    orderStore.deleteOrder(product.orderId);
    openMenuIndex.value = null;
  }
}


function handleFilters(filters) {
  console.log("Filters applied:", filters);

  const filtered = allOrders.value.filter((order) => {
    let isValid = true;

    if (filters.idEnabled && filters.id !== "") {
      isValid = isValid && order.orderId.toString().includes(filters.id.toString());
    }

    if (filters.nameEnabled && filters.name !== "") {
      isValid = isValid && order.customerName?.toLowerCase().includes(filters.name.toLowerCase());
    }

    if (filters.priceEnabled) {
      const numericPrice = Number(order.totalPrice);
      isValid = isValid && numericPrice <= filters.price;
    }

    if (filters.categoryEnabled && filters.category !== "") {
      isValid = isValid && order.status === filters.category;
    }

    return isValid;
  });

  filteredOrders.value = filtered;
}


function deleteSelected() {
  if (selectedProducts.value.length === 0) {
    alert("Please select at least one order to delete.");
    return;
  }

  // Delete each selected order using the store method
  selectedProducts.value.forEach(orderId => {
    orderStore.deleteOrder(orderId);
  });

  console.log("Deleting orders:", selectedProducts.value);
  selectedProducts.value = [];
}

const totalPages = computed(() =>
  Math.ceil((filteredOrders.value.length || 0) / itemsPerPage),
);

const paginatedProducts = computed(() =>
  filteredOrders.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage,
  )
);

const changePage = (page) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const areAllSelected = computed(() => {
  return paginatedProducts.value.every((order) =>
    selectedProducts.value.includes(order.orderId),
  );
});

onMounted(async () => {
  // Make sure the store is properly initialized
  const orderStoreInstance = useOrderStore();
  
  try {
    // Check if fetchOrders exists and is a function
    if (typeof orderStoreInstance.fetchOrders === 'function') {
      await orderStoreInstance.fetchOrders();
      
      // Make sure orders exist before copying them
      if (orderStoreInstance.orders && Array.isArray(orderStoreInstance.orders)) {
        allOrders.value = [...orderStoreInstance.orders];
        filteredOrders.value = [...orderStoreInstance.orders];
      } else {
        console.error('Orders is not an array:', orderStoreInstance.orders);
        allOrders.value = [];
        filteredOrders.value = [];
      }
    } else {
      console.error('fetchOrders is not a function');
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    allOrders.value = [];
    filteredOrders.value = [];
  }
});
</script>

<style>
.select-bg {
  background-color: #f1d6b7 !important;
}
</style>
