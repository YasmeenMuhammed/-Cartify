import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../services/category-services";


export const CategoriesContext = createContext(null);

export default function CategoriesProvider({ children }) {

    const [categories, setCateogries] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, SetError] = useState(null)


    async function fetchCategories() {
        try {
            setIsLoading(true);
            const data = await getAllCategories();
            if (data.success) {
                setCateogries(data.data.data);
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            SetError(error)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return <CategoriesContext.Provider value={{categories , isLoading , isError , error}} >
        {children}
    </CategoriesContext.Provider>
}