import axios from "axios";

const storeApi = "http://localhost:3000/api/store/68134da7318c974a2c621c5a";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getAllstore() {
  return axios
    .get(`${storeApi}`, getAuthHeaders())
    .then((response) => {
      console.log("Products response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
}
