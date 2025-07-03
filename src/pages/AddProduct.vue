<script setup>
import { ref } from 'vue';
import { useProductStore } from '../Stores/addProdunct';
import AddImage from "../components/AddImage.vue";
import Avatar from "../components/Avatar.vue";
import axios from 'axios';
import { useToast } from '../useToast';
import { useRouter } from 'vue-router';

const router = useRouter();
const { showToast } = useToast();
const productStore = useProductStore();

const name = ref('');
const description = ref('');
const price = ref('');
const quantity = ref(''); // quantity replaces inStock
const category = ref('');
const images = ref([]);
const isLoading = ref(false);

const errors = ref({
  name: '',
  description: '',
  price: '',
  quantity: '',
  category: ''
});

function handleImageUpload(file, index) {
  if (file instanceof File) {
    images.value[index] = file;
    console.log('Image uploaded:', file);
  } else {
    console.warn('Invalid file:', file);
  }
}

function validate() {
  let isValid = true;
  errors.value = {
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
  };

  if (!name.value) {
    errors.value.name = 'Product name is required';
    isValid = false;
  }
  if (!description.value) {
    errors.value.description = 'Description is required';
    isValid = false;
  }
  if (!price.value) {
    errors.value.price = 'Price is required';
    isValid = false;
  }
  if (!quantity.value) {
    errors.value.quantity = 'Quantity is required';
    isValid = false;
  }
  if (!category.value) {
    errors.value.category = 'Category is required';
    isValid = false;
  }

  return isValid;
}

async function submitProduct() {
  if (isLoading.value) return;
  const isValid = validate();
  if (!isValid) {
    showToast('Please fix the errors before submitting.', 'warning');
    return;
  }

  isLoading.value = true;
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("quantity", quantity.value);
  formData.append("category", category.value);

  images.value.forEach((file) => {
    if (file instanceof File) {
      formData.append('productImages', file);
    }
  });

  try {
    await axios.post('http://localhost:3000/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    showToast('Product submitted successfully!', 'success');

    name.value = '';
    description.value = '';
    price.value = '';
    quantity.value = '';
    category.value = '';
    images.value = [];

    setTimeout(() => {
      router.push('/product-management');
    }, 1000);

  } catch (err) {
    showToast(err.response?.data?.message || 'Failed to submit product.', 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="mb-10 pr-2 pl-2">
    <div class="mt-2 mb-3 flex justify-end gap-1 lg:mt-10 lg:gap-10">
      <Avatar />
    </div>
    <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">
      <h2 class="text-main-950 mb-6 text-2xl font-bold">Add Product</h2>

      <div class="flex flex-col gap-4 md:flex-row">
        <div class="flex flex-row flex-wrap justify-center gap-3 md:flex-col md:justify-start md:gap-5">
          <AddImage @upload="(file) => handleImageUpload(file, 0)" />
          <AddImage @upload="(file) => handleImageUpload(file, 1)" />
          <AddImage @upload="(file) => handleImageUpload(file, 2)" />
          <AddImage @upload="(file) => handleImageUpload(file, 3)" />
        </div>

        <form @submit.prevent="submitProduct"
          class="mb-2 flex w-full flex-col justify-center gap-6 rounded-xl border-2 border-[#B0B0B0] p-4 pt-5 pr-4 pb-5">

          <fieldset class="fieldset flex flex-col gap-1">
            <legend class="fieldset-legend mb-[0.5rem]">Product Name</legend>
            <input v-model="name" type="text" :class="['input w-full', errors.name ? 'border border-red-500' : '']" placeholder="Bag" />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </fieldset>

          <fieldset class="fieldset flex flex-col gap-1">
            <legend class="fieldset-legend mb-[0.5rem]">Product Description</legend>
            <textarea v-model="description" :class="['textarea h-[10rem] w-full resize-none p-2 text-black outline-none', errors.description ? 'border border-red-500' : '']" placeholder="Small Bag"></textarea>
            <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
          </fieldset>

          <fieldset class="fieldset flex flex-col gap-1">
            <legend class="fieldset-legend mb-[0.5rem]">Product Category</legend>
            <select v-model="category" :class="['select select-lg w-full pr-10 text-[0.9rem]', errors.category ? 'border border-red-500' : '']">
              <option disabled value="">Categories</option>
              <option>Bags</option>
              <option>Frames</option>
              <option>Accessories</option>
              <option>Tablecloth</option>
              <option>Clothes</option>
              <option>Sock & Glove</option>
            </select>
            <p v-if="errors.category" class="text-red-500 text-sm">{{ errors.category }}</p>
          </fieldset>

          <fieldset class="fieldset flex flex-col gap-1">
            <legend class="fieldset-legend mb-[0.5rem]">Product Price</legend>
            <input v-model="price" type="text" :class="['input w-full', errors.price ? 'border border-red-500' : '']" placeholder="$200" />
            <p v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</p>
          </fieldset>

          <fieldset class="fieldset flex flex-col gap-1">
            <legend class="fieldset-legend mb-[0.5rem]">Quantity In Stock</legend>
            <input v-model="quantity" type="text" :class="['input w-full', errors.quantity ? 'border border-red-500' : '']" placeholder="200" />
            <p v-if="errors.quantity" class="text-red-500 text-sm">{{ errors.quantity }}</p>
          </fieldset>

          <button type="submit" :disabled="isLoading" :class="[
            'bg-main-200 hover:bg-main-300/70 flex items-center justify-center gap-2 self-center rounded-xl py-3 w-full md:w-[10rem]',
            isLoading ? 'opacity-80 cursor-not-allowed' : ''
          ]">
            <svg v-if="!isLoading" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6V12M12 9H6" stroke="#763A26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#763A26" stroke-width="1.5"/>
            </svg>
            <svg v-else class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16 8 8 0 01-8-8z"/>
            </svg>
            <span class="text-main-950 text-lg font-medium">{{ isLoading ? 'Submitting...' : 'Submit' }}</span>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
