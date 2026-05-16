import { FaSignal } from "react-icons/fa";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export default function OfflineScreen({ children }) {
    const isOnline = useOnlineStatus();
    if (!isOnline) {
        return <>
            {children}
            < div className="flex fixed bottom-8 right-8 z-50 bg-red-200 text-red-900 items-center justify-center p-3 rounded-md" >
                <div className="text-center flex items-center gap-2">
                    <FaSignal />
                    <p className="text-gray-600 text-sm">You are currently offline. Please check your internet connection.</p>
                </div>
            </div >
        </>

    }
    return children;

}