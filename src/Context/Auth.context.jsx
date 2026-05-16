import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../services/auth";
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token'));

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem('userInfo')) ||
        JSON.parse(sessionStorage.getItem('userInfo'))
    );

    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                const response = await verifyToken();
                if (response.success) {
                    setIsLoading(false);
                    setIsAuthenticated(true);
                    setUserInfo(response.data.decoded);
                    console.log(response);
                    localStorage.setItem('userInfo', JSON.stringify(response.data.decoded));
                    sessionStorage.setItem('userInfo', JSON.stringify(response.data.decoded));
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        checkAuth();

    }, [token])

    function logOut() {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userInfo');
        setUserInfo(null);

    }



    return <AuthContext.Provider value={{ token, setToken, logOut, isAuthenticated, userInfo, isLoading }}>
        {children}
    </AuthContext.Provider>

}