
import {Navigate, Outlet} from "react-router-dom";
import {useSession} from "../context/SessionContext.tsx";

export const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useSession();
    if (loading) {
        return <div>Loading...</div>
    }
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
};