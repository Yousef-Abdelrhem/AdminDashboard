import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProductStore = defineStore("product", () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function addProduct(productData: {
    name: string;
    description: string;
    price: string | number;
    inStock: string | number;
    category: string;
    images: File[];
  }) {
    isLoading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price.toString());
      formData.append("inStock", productData.inStock.toString());
      formData.append("category", productData.category);

      for (const file of productData.images) {
        formData.append("images", file);
      }

      const response = await axios.post(
        "https://admin-dashboard-gilt-omega.vercel.app/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to add product.";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    error,
    addProduct,
  };
});
