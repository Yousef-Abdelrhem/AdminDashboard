<template>
    <div class="relative flex justify-center items-center">
        <div class="cursor-pointer" @click.prevent="toggleFilterMenu()">
            <img src="/src/assets/icons/filter.svg" alt="Filter icon" />
        </div>

        <div v-if="openFilterMenu"
            class="absolute top-11 right-0 z-10 w-80 rounded-lg border border-main-900 bg-white shadow-md p-4">

            <button class="absolute top-2 right-2 text-xl font-bold cursor-pointer" @click="openFilterMenu = false">
                <img src="../assets/icons/close.svg" alt="Close icon" />
            </button>
            <div class="space-y-4 mt-6">

                <div>
                    <label class="flex items-center space-x-2 text-main-900 font-semibold">
                        <input type="checkbox" class="accent-main-900" v-model="filters.idEnabled" />
                        <span :class="filters.idEnabled ? 'text-main-900' : 'text-gray-500'">Enter Id</span>
                    </label>
                    <input type="number" class="w-full border border-gray-400 h-10 rounded-md px-3 mt-1"
                        v-model="filters.id" :disabled="!filters.idEnabled" />
                </div>

                <div>
                    <label class="flex items-center space-x-2 text-main-900 font-semibold">
                        <input type="checkbox" class="accent-main-900" v-model="filters.nameEnabled" />
                        <span :class="filters.nameEnabled ? 'text-main-900' : 'text-gray-500'">Enter Product Name</span>
                    </label>
                    <input type="text" class="w-full border border-gray-400 h-10 rounded-md px-3 mt-1"
                        v-model="filters.name" :disabled="!filters.nameEnabled" />
                </div>
                <div>
                    <label class="flex items-center space-x-2 text-main-900 font-semibold">
                        <input type="checkbox" class="accent-main-900" v-model="filters.priceEnabled" />
                        <span :class="filters.priceEnabled ? 'text-main-900' : 'text-gray-500'">Choose Product Price</span>
                        <span class="ml-11 text-sm text-main-900 font-bold ransition-colors duration-300" :class="filters.priceEnabled ? 'text-main-900' : 'hidden'">${{ filters.price }}</span>
                    </label>

                    <div class="flex justify-between items-center mt-1">
                        <input type="range" class="w-full accent-main-900" min="200" step="10" max="600"
                            v-model="filters.price" :disabled="!filters.priceEnabled" />
                        </div>
                        
                        <div class="flex justify-between text-sm text-gray-600 mt-1 px-1">
                        <span>$200</span>
                        <span>$600</span>
                    </div>
                </div>
                <div>
                    <label class="flex items-center space-x-2 text-main-900 font-semibold">
                        <input type="checkbox" class="accent-main-900" v-model="filters.categoryEnabled" />
                        <span :class="filters.categoryEnabled ? 'text-main-900' : 'text-gray-500'">Choose Category</span>
                    </label>
                    <select class="w-full border border-gray-400 hover:accent-amber-100 h-10 rounded-md px-3 mt-1"
                        v-model="filters.category" :disabled="!filters.categoryEnabled">
                        <option>Bags</option>
                        <option>Clothes</option>
                        <option>Frames</option>
                        <option>Accessories</option>
                        <option>Tablecloth</option>
                        <option>Sock & Glove</option>
                    </select>
                </div>

                <div class="pt-4 border-t border-gray-200">
                    <button @click="applyFilters" class="w-full h-10 bg-main-900 text-white font-semibold rounded-md">
                        Apply
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterMenu',
    data() {
        return {
            openFilterMenu: false,
            filters: {
                idEnabled: false,
                id: '',
                nameEnabled: false,
                name: '',
                priceEnabled: false,
                price: 200,
                categoryEnabled: false,
                category: '',
            }
        }
    },
    methods: {
        toggleFilterMenu() {
            this.openFilterMenu = !this.openFilterMenu;
        },
        applyFilters() {
            this.$emit('apply-filters', this.filters);
            this.openFilterMenu = false;
        }
    }
}
</script>
<style>
select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    background-image: url('src/assets/icons/arrow-down.svg');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    font-size: 16px;
    color: #763A26
}
</style>