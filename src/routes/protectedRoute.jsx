import useAuth from "../hooks/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";
import routes from "./routes.js"

export const ProtectedRoute = () => {
    const {context:auth} = useAuth();
    const token = auth?.token;

    if (!token) {
        return <Navigate to={routes["login-page"]} />;
    }

    return <Outlet />;
};
