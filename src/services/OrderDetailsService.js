import axios from "axios";

const orderDetailsApi = "http://localhost:3000/api/orders";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getAllOrderDetails() {
  return axios
    .get(`${orderDetailsApi}`, getAuthHeaders())
    .then((response) => {
      console.log("Orders response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
}
