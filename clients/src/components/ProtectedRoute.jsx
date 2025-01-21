import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/userAuth";
import { useEffect } from "react";

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const {refreshAuth, loading, isAuthenticated } = useAuth();
    console.log(isAuthenticated)
    useEffect(()=> {
        refreshAuth();
    }, [])

    if(loading) {
        return <div className="loading">Loading...</div>
    }
    if(!isAuthenticated) {
        console.log("not authenticated")
        return <Navigate to={"/login"} state={{from:location}} replace />
    }
    return children
}
export default ProtectedRoute;