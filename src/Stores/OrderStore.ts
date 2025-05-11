import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API, Order } from "../Interfaces/Api";
export const useOrderStore = defineStore("order", () => {
  const orders = ref<Order[]>([]);
  const loading = ref(false);
  async function fetchOrders() {
    try {
      loading.value = true;
      console.log(`${API.base_url}${API.ordersEndpoint}`);
      const res = await axios.get(`${API.base_url}${API.ordersEndpoint}`);
      orders.value = res.data.orders;
      console.log(res.data.orders);
    } catch (err) {
      console.log(err);
    }
    loading.value = false;
  }

  async function updateOrdereStatus(orderID: number, newStatus: string) {
    console.log(orderID, newStatus);
    try {
      const res = await axios.patch(
        `${API.base_url}${API.ordersEndpoint}/${orderID}`,
        { status: newStatus },
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteOrder(orderID: number) {
    try {
      const res = await axios.delete(
        `${API.base_url}${API.ordersEndpoint}/${orderID}`,
      );
      console.log(res);

      orders.value = orders.value.filter((order) => order.orderId !== orderID);
      console.log(orders.value);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return { orders, fetchOrders, updateOrdereStatus, deleteOrder };
});
