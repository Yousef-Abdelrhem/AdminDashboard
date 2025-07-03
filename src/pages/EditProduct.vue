<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import AddImage from "../components/AddImage.vue";
import Avatar from "../components/Avatar.vue";
import { useToast } from "../useToast";

const router = useRouter();
const { showToast } = useToast();
const route = useRoute();
const productId = route.params.id as string | undefined;

const name = ref("");
const description = ref("");
const price = ref("");
const quantity = ref(""); // unified on `quantity`
const category = ref("");
const images = ref<File[]>([]);
const imagePreviews = ref<string[]>(['', '', '', '']);
const isLoading = ref(false);

const errors = ref({
  name: '',
  description: '',
  price: '',
  quantity: '',
  category: ''
});

function handleImageUpload(file: File, index: number) {
  images.value[index] = file;
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (productId) {
    try {
      const response = await axios.get(
        `https://admin-dashboard-gilt-omega.vercel.app/api/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const product = response.data.product;
      name.value = product.name;
      description.value = product.description;
      price.value = product.price;
      quantity.value = product.inStock; // Use `inStock` data for `quantity`
      category.value = product.category;
      imagePreviews.value = product.productImages || [];
    } catch (err) {
      showToast('Failed to load product data.', 'error');
    }
  }
});

function validate() {
  let valid = true;
  errors.value = { name: '', description: '', price: '', quantity: '', category: '' };

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
  if (!quantity.value) {
    errors.value.quantity = 'Stock quantity is required';
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
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("inStock", quantity.value);
    formData.append("category", category.value);

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

    const method = productId ? "patch" : "post";

    await axios({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    showToast(`Product ${productId ? "updated" : "added"} successfully!`, 'success');
  } catch (err: any) {
    console.error("Failed to submit product:", err);
    showToast(err.response?.data?.message || "Failed to submit product.", 'error');
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      router.push('/product-management');
    }, 1000);
  }
}
</script>
