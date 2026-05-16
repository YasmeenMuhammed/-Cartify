
import { apiClient } from "./api_client";

export async function sendDataToSignUp(values) {
    try {
        const options = {
            method: 'POST',
            url: `/api/v1/auth/signup`,
            data: {
                "name": values.name,
                "email": values.email,
                "password": values.password,
                "rePassword": values.rePassword,
                "phone": values.phone
            }
        }
        const response = await apiClient.request(options);
        console.log(response);
        return response;

    } catch (error) {
        console.log(error);
        
        throw error
    }

}

export async function sendDataToLogIn(values) {
    try {
        const options = {
            method: 'POST',
            url: `/api/v1/auth/signin`,
            data: {
                email: values.email,
                password: values.password,
            }
        }
        const response = await apiClient.request(options);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        
        throw error
    }
}

export async function verifyToken(){
    try {
        const options = {
            method:'GET',
            url: '/api/v1/auth/verifyToken',
        }

        const response = await apiClient.request(options);
        return response
    } catch (error) {
        throw error
    }
}