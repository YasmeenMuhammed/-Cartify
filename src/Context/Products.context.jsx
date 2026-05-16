import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/products-services";

export const ProductContext = createContext(null);

export default function ProductContextProvider({ children }) {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    async function fetchProducts() {
        try {
            setIsLoading(true)
            const response = await getAllProducts({
                page: currentPage,
            });
            if (response.success) {
                setIsLoading(false)
                setProducts(response.data.data);
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error);
            setIsError(true);
            setError(error)

        }
    }

    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    return <ProductContext.Provider value={{ products, isLoading, isError, error, setCurrentPage, currentPage }}>
        {children}
    </ProductContext.Provider>
} 