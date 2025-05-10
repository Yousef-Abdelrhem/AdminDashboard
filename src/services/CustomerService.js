import axios from 'axios';

const customersApi = 'https://admin-dashboard-gilt-omega.vercel.app/api/customers';

function getAuthHeaders() {
    const token = localStorage.getItem('token'); 
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export async function getAllCustomers() {
    return axios.get(`${customersApi}`, getAuthHeaders())
        .then((response) => {
            console.log("Customers response:", response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching customers:", error);
            throw error;
        });
}

