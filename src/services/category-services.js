
import { apiClient } from './api_client';

export async function getAllCategories() {

    try {
        const options = {
            url: `/api/v1/categories`,
            method: 'GET'
        }

        const response = await apiClient.request(options);
        return response

    } catch (error) {
        console.log(error);
        throw error

    }
}

export async function getAllBrands() {
    try {
        const options = {
            url: '/api/v1/brands',
            method: 'GET'
        }
        const response = await apiClient.request(options);
        return response
    } catch (error) {
        throw error
    }


}