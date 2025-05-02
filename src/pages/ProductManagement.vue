<template>
    <div class="pr-2 pl-2">
        <div class="mt-2 mb-3 flex gap-1 lg:mt-10 lg:gap-10 justify-end pr-3.5 pt-1">
            <Avatar />
        </div>

        <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">
            <div class="flex justify-between">
                <h2 class="text-main-950 mb-6 text-2xl font-bold">List of Products</h2>
                <div class="flex gap-3">
                    <div class="btn border-0 bg-[#F1D6B7] px-2 md:px-5 text-main-900" @click="addProduct">
                        <img src="/src/assets/icons/add.svg" alt="Add product icon" />
                        <p class="hidden sm:flex">Add Product</p>
                    </div>
                    <div class="btn border-0 bg-[#F1D6B7] px-2 md:px-5 text-main-900" @click="deleteSelected">
                        <img src="/src/assets/icons/delete.svg" alt="Delete icon" />
                        <p class="hidden sm:flex">Delete</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-between gap-5 mb-4">
                <SearchBar />
                <FilterProduct @apply-filters="handleFilters" />
            </div>
            <div v-if="products.length === 0" class="text-center text-gray-500 py-4">
                Oops! We couldn't find any products that match your filters.
            </div>
            <ProductTable v-else :products="products" v-model:selectedProducts="selectedProducts"
                :currentPage="currentPage" :itemsPerPage="itemsPerPage" :openMenuIndex="openMenuIndex"
                :paginatedProducts="paginatedProducts" :totalPages="totalPages" :handleAction="handleAction"
                :toggleMenu="toggleMenu" :prevPage="prevPage" :nextPage="nextPage" :changePage="changePage" />
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
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";

const router =useRouter();
const allProducts = ref([
    {
        productId: 1001,
        productImage: [
            "src/assets/icons/image.png",
            "src/assets/icons/image.png",
            "src/assets/icons/image.png",
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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
            "src/assets/icons/image.png"
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

const openMenuIndex = ref(null)

function toggleMenu(index) {
    openMenuIndex.value = openMenuIndex.value === index ? null : index
}

const filters = reactive({
    idEnabled: false,
    id: '',
    nameEnabled: false,
    name: '',
    priceEnabled: false,
    price: 200,
    categoryEnabled: false,
    category: ''
});

function handleFilters(filters) {
    console.log('Filters applied:', filters);

    const filtered = allProducts.value.filter(product => {
        let isValid = true;

        
        if (filters.idEnabled && filters.id !== '') {
            isValid = isValid && product.productId.toString().includes(filters.id.toString());
        }

        if (filters.nameEnabled && filters.name !== '') {
            isValid = isValid && product.productName.toLowerCase().includes(filters.name.toLowerCase());
        }

        
        if (filters.priceEnabled) {
            const numericPrice = Number(product.price.replace('$', ''));
            isValid = isValid && numericPrice <= filters.price;
        }

        
        if (filters.categoryEnabled && filters.category !== '') {
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


const activeAction = ref(null)
const activeProductId = ref(null)

const showViewModal = ref(false)
const viewedProduct = ref({})

function handleAction(action, product) {
    activeAction.value = action
    activeProductId.value = product.productId

    console.log(`Action: ${action} on`, product)

    if (action === 'edit') {
        //edit
    } else if (action === 'view') {
        viewedProduct.value = product
        showViewModal.value = true
        openMenuIndex.value = null
    } else {
        products.value = products.value.filter(p => p.productId !== product.productId)
        openMenuIndex.value = null
    }

    // openMenuIndex.value = null
}

function deleteSelected() {
    if (selectedProducts.value.length === 0) {
        alert('Please select at least one product to delete.');
        return;
    }

    products.value = products.value.filter(
        (product) => !selectedProducts.value.includes(product.productId)
    );
    selectedProducts.value = [];
}

function addProduct(){
    router.push('/product-management/add-product')
}

const totalPages = computed(() =>
    Math.ceil(products.value.length / itemsPerPage)
);

const paginatedProducts = computed(() =>
    products.value.slice(
        (currentPage.value - 1) * itemsPerPage,
        currentPage.value * itemsPerPage
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
    return paginatedProducts.value.every((product) =>
        selectedProducts.value.includes(product.productId)
    );
});

</script>
