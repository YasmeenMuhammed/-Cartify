import { apiClient } from "./api_client";

export async function addProductToCart({ id }) {
    try {
        const options = {
            url: `/api/v2/cart`,
            method: 'POST',
            data: {
                productId: id,
            }
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }


}

export async function getCartItems() {
    try {
        const options = {
            url: `/api/v2/cart`,
            method: 'GET',
        }
        const response = await apiClient.request(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export async function deleteCartItem({ id }) {
    try {
        const options = {
            url: `/api/v2/cart/${id}`,
            method: 'DELETE',
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}


export async function updateCartItem({ id, count }) {
    try {
        const options = {
            url: `/api/v2/cart/${id}`,
            method: 'PUT',
            data: {
                count: count,
            }
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteAllCart() {
    try {
        const options = {
            url: '/api/v2/cart',
            method: "DELETE"
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }

}

// WishList

export async function addProductToWishList({ id }) {
    try {
        const options = {
            url: `/api/v1/wishlist`,
            method: 'POST',
            data: {
                productId: id,
            }
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getWishListItems() {
    try {
        const options = {
            url: `/api/v1/wishlist`,
            method: 'GET',
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteProductFromWishList({ id }) {
    try {
        const options = {
            url: `/api/v1/wishlist/${id}`,
            method: 'DELETE',
        }
        const response = await apiClient.request(options);
        return response;
    } catch (error) {
        throw error;
    }
}