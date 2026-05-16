
import { apiClient } from './api_client';

export async function getAllProducts({
    page,
    keyword,
    priceGreaterThan,
    priceLessThan,
    sortedBy,
    category,
    brand,
    limit
} = {}) {

    try {

        const options = {
            url: `/api/v1/products?${page ? `page=${page}` : ""
                }${keyword ? `&keyword=${keyword}` : ""
                }${priceGreaterThan ? `&price[gte]=${priceGreaterThan}` : ""
                }${priceLessThan ? `&price[lte]=${priceLessThan}` : ""
                }${sortedBy ? `&sort=${sortedBy}` : ""
                }${category ? `&category[in]=${category}` : ""
                }${brand ? `&brand=${brand}` : ""
                }${limit ? `&limit=${limit}` : ""}`,
            method: 'GET'
        }

        const response = await apiClient.request(options);
        console.log(response);
        return response

    } catch (error) {
        throw error
    }

}

export async function getSpecificProduct({ id }) {

    try {
        const options = {
            url: `/api/v1/products/${id}`,
            method: 'GET'
        }

        const response = await apiClient.request(options);
        return response
    } catch (error) {
        throw error
    }
}


export async function getProductReviews({ id }) {

    try {
        const options = {
            url: `/api/v1/products/${id}/reviews`,
            method: 'GET'
        }

        const response = await apiClient.request(options);
        return response
    } catch (error) {
        throw error
    }
}

export async function getAllReviews() {
    try {
        const options = {
            url: `/api/v1/reviews`,
            method: 'GET'
        }

        const response = await apiClient.request(options);
        return response

    } catch (error) {
        throw error
    }
}

export async function postReview({ productId, reviewData, rating }) {
    try {
        const options = {
            url: `/api/v1/products/${productId}/reviews`,
            method: 'POST',
            data: {
                review: reviewData,
                rating: rating
            }
        }

        const response = await apiClient.request(options);
        return response

    } catch (error) {
        throw error
    }
}
