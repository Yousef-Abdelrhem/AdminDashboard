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
      <h2 class="text-main-950 mb-6 text-2xl font-bold">List of Customer</h2>

      <div class="mb-4 flex justify-between gap-5">
        <SearchBar v-model="searchQuery" />

        <FilterCustomer @apply-filters="handleFilters" />
      </div>
      <div v-if="customers.length === 0" class="py-4 text-center text-gray-500">
        Oops! We couldn't find any customers that match your filters.
      </div>
      <CustomerTable
        v-else
        :customers="customers.length ? customers : []"
        v-model:selectedCustomers="selectedCustomers"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        :openMenuIndex="openMenuIndex"
        :paginatedCustomers="paginatedCustomers"
        :totalPages="totalPages"
        :handleAction="handleAction"
        :toggleMenu="toggleMenu"
        :prevPage="prevPage"
        :nextPage="nextPage"
        :changePage="changePage"
      />
    </section>
  </div>
</template>

<script setup>
import Avatar from "../components/Avatar.vue";
import SearchBar from "../components/SearchBar.vue";
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getAllCustomers } from "../services/CustomerService";
import FilterCustomer from "../components/FilterCustomer.vue";
import CustomerTable from "../components/CustomerTable.vue";

const router = useRouter();

const selectedCustomers = ref([]);
const allCustomers = ref([]);
const customers = ref([]);
const searchQuery = ref("");

onMounted(async () => {
  try {
    const response = await getAllCustomers();
    if (response && Array.isArray(response.customers)) {
      allCustomers.value = response.customers;
      customers.value = [...allCustomers.value];
    } else {
      console.error("Error: Invalid data structure.", response);
    }
  } catch (error) {
    console.error("Error fetching Customers:", error);
  }
});

const currentPage = ref(1);
const itemsPerPage = 9;
const openMenuIndex = ref(null);

function toggleMenu(index) {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
  console.log(filters.tag);
}

const filters = reactive({
  idEnabled: false,
  id: "",
  nameEnabled: false,
  name: "",
  numOrderEnabled: false,
  numOrder: "",
  priceEnabled: false,
  price: 200,
  tagEnabled: false,
  tag: null,
});

function handleFilters(filters) {
  console.log("Filters applied:", filters);

  const filtered = allCustomers.value.filter((customer) => {
    let isValid = true;

    if (filters.idEnabled && filters.id !== "") {
      isValid =
        isValid &&
        customer.customerId.toString().includes(filters.id.toString());
    }

    if (filters.nameEnabled && filters.name !== "") {
      isValid =
        isValid &&
        customer.customerName
          .toLowerCase()
          .includes(filters.name.toLowerCase());
    }

    if (filters.numOrderEnabled && filters.numOrder !== "") {
      isValid =
        isValid &&
        customer.numberOfOrders
          .toString()
          .includes(filters.numOrder.toString());
    }

    if (filters.priceEnabled) {
      const numericPrice = Number(customer.total.replace("$", ""));
      isValid = isValid && numericPrice <= filters.price;
    }

    if (filters.tagEnabled && filters.tag) {
      isValid =
        isValid &&
        customer.tags.some(
          (tag) => tag.toLowerCase() === filters.tag.toLowerCase(),
        );
    }

    return isValid;
  });

  customers.value = filtered;
}

if (
  !filters.idEnabled &&
  !filters.nameEnabled &&
  !filters.numOrderEnabled &&
  !filters.priceEnabled &&
  !filters.tagEnabled
) {
  customers.value = [...allCustomers.value];
}

const activeAction = ref(null);
const activeCustomerId = ref(null);

const showViewModal = ref(false);
const viewedCustomer = ref({});

function handleAction(action, customer) {
  activeAction.value = action;
  activeCustomerId.value = customer.customerId;

  console.log(`Action: ${action} on`, customer);

  if (action === "view") {
    viewedCustomer.value = customer;
    showViewModal.value = true;
  } else {
    allCustomers.value = allCustomers.value.filter(
      (c) => c.customerId !== customer.customerId,
    );
    customers.value = customers.value.filter(
      (c) => c.customerId !== customer.customerId,
    );
  }

  openMenuIndex.value = null;
}

const totalPages = computed(() =>
  Math.ceil(customers.value.length / itemsPerPage),
);

const paginatedCustomers = computed(() =>
  customers.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage,
  ),
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

watch(searchQuery, (newValue) => {
  if (newValue.trim() === "") {
    handleFilters(filters);
    return;
  }

  const filteredBySearch = allCustomers.value.filter((customer) =>
    customer.customerName.toLowerCase().includes(newValue.toLowerCase()),
  );
  const filtered = filteredBySearch.filter((customer) => {
    let isValid = true;

    if (filters.idEnabled && filters.id !== "") {
      isValid =
        isValid &&
        customer.customerId.toString().includes(filters.id.toString());
    }
    return isValid;
  });

  customers.value = filtered;
});
</script>
