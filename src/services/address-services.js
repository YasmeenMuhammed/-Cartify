import { apiClient } from "./api_client";

//add address
export async function addAddress(address) {
    try {
        const options = {
            url: '/api/v1/addresses',
            method: 'POST',
            data: {
                name: address.name,
                details: address.details,
                phone: address.phone,
                city: address.city,
            }
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        console.error('Error adding address:', error);
    }
}

//get all addresses
export async function getAllAddresses() {
    try {
        const options = {
            url: '/api/v1/addresses',
            method: 'GET',
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        console.error('Error getting all addresses:', error);
        throw error
    }
}


//delete address
export async function deleteAddress(addressId) {
    try {
        const options = {
            url: `/api/v1/addresses/${addressId}`,
            method: 'DELETE',
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        console.error('Error deleting address:', error);
        throw error
    }
}