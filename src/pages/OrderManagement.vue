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
      <div class="flex justify-between">
        <h2 class="text-main-950 mb-6 text-2xl font-bold">List of Products</h2>
      </div>

      <div class="mb-4 flex items-center justify-between gap-5 md:flex-row">
        <div class="flex flex-1 items-center gap-2">
          <SearchBar />
          <FilterProduct @apply-filters="handleFilters" />
          <p class="m-0 text-[1.2rem] font-bold text-nowrap">Sort By</p>
        </div>

        <div class="flex gap-3">
          <Listbox v-model="selectedPerson">
            <div class="relative w-[16rem]">
              <ListboxButton
                class="w-full cursor-pointer rounded bg-[#F1D6B7] px-4 py-2 text-left font-medium text-[#622B15] focus:outline-none"
                >{{ selectedPerson.name }}</ListboxButton
              >
              <ListboxOptions
                class="absolute z-10 mt-1 w-full rounded bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
              >
                <ListboxOption
                  v-for="person in people"
                  :key="person.id"
                  :value="person"
                  v-slot="{ active, selected, disabled }"
                >
                  <li
                    :class="[
                      'cursor-pointer px-4 py-2 text-sm',
                      selected
                        ? 'font-semibold text-[#892A16]'
                        : 'text-gray-700',
                      active && !disabled ? 'bg-[#F1D6B7]' : '',
                      disabled ? 'cursor-not-allowed opacity-40' : '',
                    ]"
                  >
                    {{ person.name }}
                  </li></ListboxOption
                >
              </ListboxOptions>
            </div>
          </Listbox>

          <!-- <select
            class="btn text-main-900 select-bg w-[16rem] appearance-none border-0 bg-[#F1D6B7] px-2 focus:outline-none md:px-5"
          >
            <option disabled selected>Order Date (Newest First)</option>
            <option class="h-5 bg-white p-2">Order Date (Oldest First)</option>
            <option>Total Price (High to Low)</option>
            <option>Total Price (Low to High)</option>
            <option>Status (A-Z)</option>
            <option>Status (Z-A)</option>
          </select> -->

          <!-- <div
            class="btn text-main-900 border-0 bg-[#F1D6B7] px-2 md:px-5"
            @click="addProduct"
          >
            <img src="/src/assets/icons/add.svg" alt="Add product icon" />
            <p class="hidden sm:flex">Add Product</p>
          </div> -->
          <div
            class="btn text-main-900 border-0 bg-[#F1D6B7] px-2 md:px-5"
            @click="deleteSelected"
          >
            <img src="/src/assets/icons/delete.svg" alt="Delete icon" />
            <p class="hidden sm:flex">Delete</p>
          </div>
        </div>
      </div>

      <div v-if="products.length === 0" class="py-4 text-center text-gray-500">
        Oops! We couldn't find any products that match your filters.
      </div>
      <ProductTable
        v-else
        :products="products"
        v-model:selectedProducts="selectedProducts"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        :openMenuIndex="openMenuIndex"
        :paginatedProducts="paginatedProducts"
        :totalPages="totalPages"
        :handleAction="handleAction"
        :toggleMenu="toggleMenu"
        :prevPage="prevPage"
        :nextPage="nextPage"
        :changePage="changePage"
      />
    </section>
    <ViewDetails
      v-if="showViewModal"
      :viewedProduct="viewedProduct"
      @close="showViewModal = false"
    />
  </div>
</template>

<script setup>
import Avatar from "../components/Avatar.vue";
import FilterProduct from "../components/FilterProduct.vue";
import ProductTable from "../components/ProductTable.vue";
import SearchBar from "../components/SearchBar.vue";
import ViewDetails from "../components/ViewDetails.vue";
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const people = [
  { id: 1, name: "Order Date (Newest First)" },
  { id: 2, name: "Order Date (Oldest First)" },
  { id: 3, name: "Total Price (High to Low)" },
  { id: 4, name: "Total Price (Low to High)" },
  { id: 5, name: "Status (A-Z)" },
  { id: 6, name: "Status (Z-A)" },
];
const selectedPerson = ref(people[0]);

const router = useRouter();
const allProducts = ref([
  {
    productId: 1001,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Bag",
    description: "Small Bag...",
    price: "$500",
    inStock: 60,
    category: "Bags",
  },
  {
    productId: 1002,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Shoes",
    description: "Running shoes...",
    price: "$120",
    inStock: 30,
    category: "Footwear",
  },
  {
    productId: 1003,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Watch",
    description: "Smart watch...",
    price: "$250",
    inStock: 15,
    category: "Accessories",
  },
  {
    productId: 1004,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Bag",
    description: "Small Bag...",
    price: "$500",
    inStock: 60,
    category: "Bags",
  },
  {
    productId: 1005,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Shoes",
    description: "Running shoes...",
    price: "$120",
    inStock: 30,
    category: "Footwear",
  },
  {
    productId: 1006,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Watch",
    description: "Smart watch...",
    price: "$250",
    inStock: 15,
    category: "Accessories",
  },
  {
    productId: 1007,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Bag",
    description: "Small Bag...",
    price: "$500",
    inStock: 60,
    category: "Bags",
  },
  {
    productId: 1008,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Shoes",
    description: "Running shoes...",
    price: "$120",
    inStock: 30,
    category: "Footwear",
  },
  {
    productId: 1009,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Watch",
    description: "Smart watch...",
    price: "$250",
    inStock: 15,
    category: "Accessories",
  },
  {
    productId: 1010,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Bag",
    description: "Small Bag...",
    price: "$500",
    inStock: 60,
    category: "Bags",
  },
  {
    productId: 1011,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Shoes",
    description: "Running shoes...",
    price: "$120",
    inStock: 30,
    category: "Footwear",
  },
  {
    productId: 1012,
    productImage: [
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
      "src/assets/icons/image.png",
    ],
    productName: "Watch",
    description: "Smart watch...",
    price: "$250",
    inStock: 15,
    category: "Accessories",
  },
]);
const products = ref([...allProducts.value]);
const selectedProducts = ref([]);

const currentPage = ref(1);
const itemsPerPage = 9;

const openMenuIndex = ref(null);

function toggleMenu(index) {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
}

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

function handleFilters(filters) {
  console.log("Filters applied:", filters);

  const filtered = allProducts.value.filter((product) => {
    let isValid = true;

    if (filters.idEnabled && filters.id !== "") {
      isValid =
        isValid && product.productId.toString().includes(filters.id.toString());
    }

    if (filters.nameEnabled && filters.name !== "") {
      isValid =
        isValid &&
        product.productName.toLowerCase().includes(filters.name.toLowerCase());
    }

    if (filters.priceEnabled) {
      const numericPrice = Number(product.price.replace("$", ""));
      isValid = isValid && numericPrice <= filters.price;
    }

    if (filters.categoryEnabled && filters.category !== "") {
      isValid = isValid && product.category === filters.category;
    }

    return isValid;
  });

  products.value = filtered;
}

if (
  !filters.idEnabled &&
  !filters.nameEnabled &&
  !filters.priceEnabled &&
  !filters.categoryEnabled
) {
  products.value = [...allProducts.value];
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
  } else {
    products.value = products.value.filter(
      (p) => p.productId !== product.productId,
    );
    openMenuIndex.value = null;
  }

  // openMenuIndex.value = null
}

function deleteSelected() {
  if (selectedProducts.value.length === 0) {
    alert("Please select at least one product to delete.");
    return;
  }

  products.value = products.value.filter(
    (product) => !selectedProducts.value.includes(product.productId),
  );
  selectedProducts.value = [];
}

function addProduct() {
  router.push("/product-management/add-product");
}

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage),
);

const paginatedProducts = computed(() =>
  products.value.slice(
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

const areAllSelected = computed(() => {
  return paginatedProducts.value.every((product) =>
    selectedProducts.value.includes(product.productId),
  );
});
</script>
<style>
.select-bg {
  background-color: #f1d6b7 !important;
}
</style>
