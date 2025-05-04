import axios from 'axios';

const productsApi = 'https://admin-dashboard-gilt-omega.vercel.app/api/products';

function getAuthHeaders() {
    const token = localStorage.getItem('token'); 
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export async function getAllProducts() {
    return axios.get(`${productsApi}`, getAuthHeaders())
        .then((response) => {
            console.log("Products response:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
            throw error;
        });
}

export function getProductById(id) {
    return axios.get(`${productsApi}/${id}`, getAuthHeaders());
}

export function deleteProduct(id) {
    return axios.delete(`${productsApi}/${id}`, getAuthHeaders());
}

export function createProduct(data) {
    return axios.post(`${productsApi}`, data, getAuthHeaders());
}

export function updateProduct(id, data) {
    return axios.put(`${productsApi}/${id}`, data, getAuthHeaders());
}

export function filterProducts(filters) {
    return axios.post(`${productsApi}/filter`, filters, getAuthHeaders());
}
