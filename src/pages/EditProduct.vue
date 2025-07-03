<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import AddImage from "../components/AddImage.vue";
import Avatar from "../components/Avatar.vue";
import { useToast } from '../useToast';
import { useRouter } from 'vue-router';
const router = useRouter();
const { showToast } = useToast();
const route = useRoute();
const productId = route.params.id as string | undefined;

const name = ref('');
const description = ref('');
const price = ref('');
const inStock = ref('');
const category = ref('');
const images = ref<File[]>([]);
const imagePreviews = ref<string[]>(['', '', '', '']);
const isLoading = ref(false);

const errors = ref({
    name: '',
    description: '',
    price: '',
    inStock: '',
    category: ''
});

function handleImageUpload(file: File, index: number) {
    images.value[index] = file;
}

onMounted(async () => {
    const token = localStorage.getItem("token");
    if (productId) {
        try {
            const response = await axios.get(`https://admin-dashboard-gilt-omega.vercel.app/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const product = response.data.product;
            name.value = product.name;
            description.value = product.description;
            price.value = product.price;
            inStock.value = product.inStock;
            category.value = product.category;
            imagePreviews.value = product.productImages || [];
        } catch (err) {
            showToast('Failed to load product data.', 'error');
        }
    }
});

function validate() {
    let valid = true;
    errors.value = {
        name: '',
        description: '',
        price: '',
        inStock: '',
        category: ''
    };

    if (!name.value) {
        errors.value.name = 'Product name is required';
        valid = false;
    }
    if (!description.value) {
        errors.value.description = 'Description is required';
        valid = false;
    }
    if (!price.value) {
        errors.value.price = 'Price is required';
        valid = false;
    }
    if (!inStock.value) {
        errors.value.inStock = 'Stock quantity is required';
        valid = false;
    }
    if (!category.value) {
        errors.value.category = 'Category is required';
        valid = false;
    }

    return valid;
}

async function submitProduct() {
  if (isLoading.value) return;
  isLoading.value = true;

  const isValid = validate();
  if (!isValid) {
    showToast('Please fix the errors before submitting.', 'warning');
    isLoading.value = false;
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Authorization token missing. Please log in.", 'error');
      isLoading.value = false;
      return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('price', price.value);
    formData.append('inStock', inStock.value);
    formData.append('category', category.value);

    images.value.forEach((file, index) => {
      if (file instanceof File) {
        formData.append('productImages', file);
      }
    });

    imagePreviews.value.forEach((previewUrl, index) => {
      if (!images.value[index] && previewUrl) {
        formData.append('existingImages', previewUrl);
      }
    });

    const url = productId
      ? `https://admin-dashboard-gilt-omega.vercel.app/api/products/${productId}`
      : `https://admin-dashboard-gilt-omega.vercel.app/api/products/`;

    const method = productId ? 'patch' : 'post';

    await axios({
      method,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    showToast(`Product ${productId ? 'updated' : 'added'} successfully!`, 'success');
  } catch (err: any) {
    showToast('Failed to submit product.', 'error');
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      router.push('/product-management');
    }, 1000);
  }
}

</script>


<template>
    <div class="mb-10 pr-2 pl-2">
        <div class="mt-2 mb-3 flex justify-end gap-1 lg:mt-10 lg:gap-10">
            <Avatar />
        </div>
        <section class="w-full rounded-xl border-2 border-[#EFEFEF] p-4 pt-5 pr-4 pb-5">
            <h2 class="text-main-950 mb-6 text-2xl font-bold">Edit Product</h2>

            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex flex-row flex-wrap justify-center md:flex-col md:justify-start gap-3 md:gap-5">
                    <AddImage :previewUrl="imagePreviews[0]" @upload="(file) => handleImageUpload(file, 0)" />
                    <AddImage :previewUrl="imagePreviews[1]" @upload="(file) => handleImageUpload(file, 1)" />
                    <AddImage :previewUrl="imagePreviews[2]" @upload="(file) => handleImageUpload(file, 2)" />
                    <AddImage :previewUrl="imagePreviews[3]" @upload="(file) => handleImageUpload(file, 3)" />
                </div>

                <form @submit.prevent="submitProduct"
                    class="mb-2 flex w-full flex-col justify-center gap-3 rounded-xl border-2 border-[#B0B0B0] p-4 pt-5 pr-4 pb-5">
                    <fieldset class="fieldset flex flex-col gap-1">
                        <legend class="fieldset-legend font--light mb-[0.5rem]">
                            Product Name
                        </legend>
                        <input v-model="name" type="text"
                            :class="['input w-full', errors.name ? 'border border-red-500' : '']" placeholder="bags" />
                        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
                    </fieldset>

                    <fieldset class="fieldset flex flex-col gap-1">
                        <legend class="fieldset-legend font--light mb-[0.5rem]">
                            Product Description
                        </legend>
                        <textarea v-model="description"
                            :class="['textarea h-[10rem] w-full resize-none p-2 text-black outline-none', errors.description ? 'border border-red-500' : '']"
                            placeholder="Small Bag"></textarea>
                        <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
                    </fieldset>

                    <fieldset class="fieldset flex flex-col gap-1">
                        <legend class="fieldset-legend font--light mb-[0.5rem]">
                            Product Category
                        </legend>
                        <select v-model="category"
                            class="select select-lg w-full bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2215%22%20height%3D%2211%22%20viewBox%3D%220%200%2015%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.50006%200.333324H13.5001C13.6216%200.333705%2013.7406%200.367214%2013.8445%200.430243C13.9484%200.493272%2014.0331%200.583434%2014.0895%200.691026C14.146%200.798617%2014.172%200.919564%2014.1648%201.04085C14.1576%201.16213%2014.1175%201.27915%2014.0487%201.37932L8.04872%2010.046C7.80006%2010.4053%207.20139%2010.4053%206.95206%2010.046L0.952057%201.37932C0.882607%201.27936%200.84188%201.16228%200.8343%201.04079C0.826721%200.919311%200.85258%200.798072%200.909066%200.690252C0.965553%200.582433%201.05051%200.492155%201.1547%200.429228C1.25889%200.366302%201.37834%200.333133%201.50006%200.333324Z%22%20fill%3D%22%23763A26%22%2F%3E%3C%2Fsvg%3E')] bg-[length:15px] bg-[right_1rem_center] bg-no-repeat pr-10 text-[0.9rem] focus-within:border-0"
                            :class="['select select-lg w-full pr-10 text-[0.9rem]', errors.category ? 'border border-red-500' : '']">
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
                        <legend class="fieldset-legend font--light mb-[0.5rem]">
                            Product Price
                        </legend>
                        <input v-model="price" type="text"
                            :class="['input w-full', errors.price ? 'border border-red-500' : '']" placeholder="$200" />
                        <p v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</p>
                    </fieldset>

                    <!-- <fieldset class="fieldset flex">
                        <legend class="fieldset-legend font--light mb-[0.5rem]">
                            Product Discount
                        </legend>
                        <input type="text" class="input w-full focus-within:border-0" placeholder="20%" />
                    </fieldset> -->

                    <fieldset class="fieldset flex flex-col gap-1">
                        <legend class="fieldset-legend font--light mb-[0.5rem]">
                            Quantity In Stock
                        </legend>
                        <input v-model="inStock" type="text"
                            :class="['input w-full', errors.inStock ? 'border border-red-500' : '']"
                            placeholder="200" />
                        <p v-if="errors.inStock" class="text-red-500 text-sm">{{ errors.inStock }}</p>
                    </fieldset>

                    <button type="submit" :disabled="isLoading" :class="[
                        'bg-main-200 hover:bg-main-300/70 flex items-center justify-center gap-2 self-center rounded-xl py-3 w-full md:w-[10rem]',
                        isLoading ? 'opacity-80 cursor-not-allowed' : ''
                    ]">
                        <svg v-if="!isLoading" width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.25 13.4856V9.53063C2.25 6.80562 2.25 5.44311 3.07376 4.59655C3.89753 3.75 5.22335 3.75 7.875 3.75C10.5266 3.75 11.8525 3.75 12.6763 4.59655C13.5 5.44311 13.5 6.80562 13.5 9.53063V13.4856C13.5 15.215 13.5 16.0797 12.9566 16.3892C11.9043 16.9886 9.93037 14.9889 8.99295 14.3868C8.44927 14.0376 8.17747 13.863 7.875 13.863C7.57253 13.863 7.30069 14.0376 6.75704 14.3868C5.81963 14.9889 3.84572 16.9886 2.7934 16.3892C2.25 16.0797 2.25 15.215 2.25 13.4856Z"
                                stroke="#763A26" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M6.75 1.5H8.25C11.7855 1.5 13.5533 1.5 14.6516 2.59835C15.75 3.6967 15.75 5.46446 15.75 9V13.5"
                                stroke="#763A26" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg v-else class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle class="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
                                fill="none" />
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16 8 8 0 01-8-8z" />
                        </svg>
                        <span class="text-main-950 text-lg font-medium">
                            {{ isLoading ? 'Saving...' : 'Save' }}
                        </span>
                    </button>

                </form>
            </div>
        </section>
    </div>
</template>
