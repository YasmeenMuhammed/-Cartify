import { useEffect, useState } from "react";

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);



    useEffect(() => {
        window.addEventListener('online', () => {
            setIsOnline(true);
        })
        window.addEventListener('offline', () => {
            setIsOnline(false);
        })

        return function () {
            window.removeEventListener('online', () => {
                setIsOnline(true);
            })
            window.removeEventListener('offline', () => {
                setIsOnline(false);
            })
        }
    }, [])  //Initial Render

    return isOnline;

}