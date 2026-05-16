import { apiClient } from "./api_client";

export async function getUserOrder({ userId }) {
    try {
        const options = {
            url: `/api/v1/orders/user/${userId}`,
            method: "GET"
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }

} 